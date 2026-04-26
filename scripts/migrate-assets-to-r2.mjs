#!/usr/bin/env node
// Uploads /public assets to Cloudflare R2 under the `assets/` prefix.
// Idempotent — skips objects that already exist (use --force to re-upload).
// Use --dry to preview without uploading.

import { config } from "dotenv";
import {
  S3Client,
  PutObjectCommand,
  HeadObjectCommand,
} from "@aws-sdk/client-s3";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

config({ path: ".env.local" });

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, "..");
const PUBLIC_DIR = path.join(PROJECT_ROOT, "public");
const ASSETS_PREFIX = "assets/";

// These stay at /public — Next.js / browsers expect them at site root.
const KEEP_AT_ROOT = new Set([
  "favicon.ico",
  "manifest.json",
  "robots.txt",
  "oneko.gif",
]);

const CONTENT_TYPES = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".pdf": "application/pdf",
  ".json": "application/json",
  ".ico": "image/x-icon",
  ".txt": "text/plain",
};

const args = new Set(process.argv.slice(2));
const DRY = args.has("--dry");
const FORCE = args.has("--force");

function requireEnv(name) {
  const v = process.env[name];
  if (!v) {
    console.error(`Missing required env: ${name} (load .env.local first)`);
    process.exit(1);
  }
  return v;
}

const ACCOUNT_ID = requireEnv("R2_ACCOUNT_ID");
const ACCESS_KEY = requireEnv("R2_ACCESS_KEY_ID");
const SECRET_KEY = requireEnv("R2_SECRET_ACCESS_KEY");
const BUCKET = requireEnv("R2_BUCKET_NAME");

const s3 = new S3Client({
  region: "auto",
  endpoint:
    process.env.R2_ENDPOINT ||
    `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: { accessKeyId: ACCESS_KEY, secretAccessKey: SECRET_KEY },
  forcePathStyle: true,
});

async function* walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

async function objectExists(key) {
  try {
    await s3.send(new HeadObjectCommand({ Bucket: BUCKET, Key: key }));
    return true;
  } catch (err) {
    if (err.name === "NotFound" || err.$metadata?.httpStatusCode === 404)
      return false;
    throw err;
  }
}

async function main() {
  console.log(
    `R2 migrate → bucket=${BUCKET} prefix=${ASSETS_PREFIX} dry=${DRY} force=${FORCE}\n`
  );

  const stats = { uploaded: 0, skipped: 0, kept: 0, considered: 0, errors: 0 };
  const errors = [];

  for await (const file of walk(PUBLIC_DIR)) {
    const rel = path.relative(PUBLIC_DIR, file);
    const isRoot = !rel.includes(path.sep);
    if (isRoot && KEEP_AT_ROOT.has(rel)) {
      stats.kept++;
      continue;
    }
    stats.considered++;

    const key = ASSETS_PREFIX + rel.split(path.sep).join("/");
    const ext = path.extname(file).toLowerCase();
    const contentType = CONTENT_TYPES[ext] || "application/octet-stream";

    if (!FORCE && (await objectExists(key))) {
      console.log(`skip   ${key}`);
      stats.skipped++;
      continue;
    }

    if (DRY) {
      console.log(`dry    ${key}  (${contentType})`);
      stats.uploaded++;
      continue;
    }

    try {
      const body = await readFile(file);
      await s3.send(
        new PutObjectCommand({
          Bucket: BUCKET,
          Key: key,
          Body: body,
          ContentType: contentType,
          CacheControl: "public, max-age=2592000",
        })
      );
      console.log(`up     ${key}`);
      stats.uploaded++;
    } catch (err) {
      console.error(`ERR    ${key}: ${err.message}`);
      stats.errors++;
      errors.push({ key, err: err.message });
    }
  }

  console.log("\n--- summary ---");
  console.log(`kept at /public: ${stats.kept}`);
  console.log(`considered:      ${stats.considered}`);
  console.log(`uploaded:        ${stats.uploaded}${DRY ? " (dry-run)" : ""}`);
  console.log(`skipped (exist): ${stats.skipped}`);
  console.log(`errors:          ${stats.errors}`);

  if (errors.length) {
    console.error("\nFailures:");
    for (const e of errors) console.error(`  ${e.key}: ${e.err}`);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
