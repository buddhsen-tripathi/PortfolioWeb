#!/usr/bin/env node
// Uploads MDX blog posts from src/app/blogs/posts/ to Cloudflare R2 under
// the `blogs/` prefix. Idempotent — skips objects that already exist
// (use --force to re-upload edited posts). Use --dry to preview.

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
const POSTS_DIR = path.join(PROJECT_ROOT, "src", "app", "blogs", "posts");
const BLOG_PREFIX = "blogs/";

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
    `R2 migrate blogs → bucket=${BUCKET} prefix=${BLOG_PREFIX} dry=${DRY} force=${FORCE}\n`
  );

  let entries;
  try {
    entries = await readdir(POSTS_DIR, { withFileTypes: true });
  } catch (err) {
    if (err.code === "ENOENT") {
      console.log(`No local posts directory at ${POSTS_DIR} — nothing to do.`);
      return;
    }
    throw err;
  }

  const posts = entries
    .filter((e) => e.isFile() && /\.mdx?$/.test(e.name))
    .map((e) => e.name);

  if (posts.length === 0) {
    console.log("No .md/.mdx posts found locally — nothing to do.");
    return;
  }

  const stats = { uploaded: 0, skipped: 0, errors: 0 };
  const errors = [];

  for (const fileName of posts) {
    const key = `${BLOG_PREFIX}${fileName}`;
    const filePath = path.join(POSTS_DIR, fileName);

    if (!FORCE && (await objectExists(key))) {
      console.log(`skip   ${key}`);
      stats.skipped++;
      continue;
    }

    if (DRY) {
      console.log(`dry    ${key}`);
      stats.uploaded++;
      continue;
    }

    try {
      const body = await readFile(filePath);
      await s3.send(
        new PutObjectCommand({
          Bucket: BUCKET,
          Key: key,
          Body: body,
          ContentType: "text/markdown; charset=utf-8",
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
  console.log(`considered:      ${posts.length}`);
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
