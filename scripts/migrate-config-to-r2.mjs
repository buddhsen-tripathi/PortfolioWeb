#!/usr/bin/env node
// Syncs site configuration between local files and Cloudflare R2 (`config/site.config.json`).
//
// Usage:
//   bun run migrate:config            # Uploads src/site.config.local.ts (or src/site.config.ts) to R2
//   bun run migrate:config -- --dry   # Preview the JSON payload without uploading
//   bun run migrate:config -- --pull  # Pull config/site.config.json from R2 into local override files

import { config } from "dotenv";
import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { access, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

config({ path: ".env.local" });

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, "..");
const LOCAL_TS_PATH = path.join(PROJECT_ROOT, "src", "site.config.local.ts");
const LOCAL_JSON_PATH = path.join(PROJECT_ROOT, "src", "site.config.local.json");
const DEFAULT_CONFIG_PATH = path.join(PROJECT_ROOT, "src", "site.config.ts");
const CONFIG_KEY = process.env.R2_CONFIG_KEY || "config/site.config.json";

const args = new Set(process.argv.slice(2));
const DRY = args.has("--dry");
const PULL = args.has("--pull");

function requireEnv(name) {
  const v = process.env[name];
  if (!v) {
    console.error(`Missing required env: ${name} (load .env.local first)`);
    process.exit(1);
  }
  return v;
}

async function fileExists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

function createS3Client() {
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

  return { s3, BUCKET };
}

async function writeLocalOverride(parsed) {
  const body = JSON.stringify(parsed, null, 2) + "\n";
  const tsContent = `import type { SiteConfig } from "@/site.config";\n\nexport const siteConfig: SiteConfig = ${JSON.stringify(parsed, null, 2)};\n`;
  await writeFile(LOCAL_JSON_PATH, body, "utf8");
  await writeFile(LOCAL_TS_PATH, tsContent, "utf8");
  console.log(`saved  src/site.config.local.json (${Buffer.byteLength(body)} bytes)`);
  console.log(`saved  src/site.config.local.ts (${Buffer.byteLength(tsContent)} bytes)`);
}

async function pullFromR2() {
  const { s3, BUCKET } = createS3Client();
  console.log(`R2 pull config ← bucket=${BUCKET} key=${CONFIG_KEY}\n`);

  const response = await s3.send(
    new GetObjectCommand({
      Bucket: BUCKET,
      Key: CONFIG_KEY,
    })
  );

  if (!response.Body) {
    console.error(`Empty response body for ${CONFIG_KEY}`);
    process.exit(1);
  }

  const raw = await response.Body.transformToString();
  const parsed = JSON.parse(raw);

  if (DRY) {
    console.log(JSON.stringify(parsed, null, 2));
    return;
  }

  await writeLocalOverride(parsed);
}

async function pushToR2() {
  const useLocal = await fileExists(LOCAL_TS_PATH);
  const sourcePath = useLocal ? LOCAL_TS_PATH : DEFAULT_CONFIG_PATH;
  const sourceLabel = useLocal ? "src/site.config.local.ts" : "src/site.config.ts";

  const mod = await import(pathToFileURL(sourcePath).href);
  const siteConfig = mod.siteConfig;
  if (!siteConfig) {
    console.error(`Failed to load siteConfig from ${sourceLabel}`);
    process.exit(1);
  }

  const body = JSON.stringify(siteConfig, null, 2) + "\n";

  if (DRY) {
    console.log(
      `R2 migrate config (dry-run) from ${sourceLabel} → key=${CONFIG_KEY} (${Buffer.byteLength(body)} bytes)\n`
    );
    console.log(body);
    return;
  }

  const { s3, BUCKET } = createS3Client();
  console.log(`R2 migrate config (${sourceLabel}) → bucket=${BUCKET} key=${CONFIG_KEY}\n`);

  await s3.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: CONFIG_KEY,
      Body: body,
      ContentType: "application/json; charset=utf-8",
    })
  );

  // Keep the runtime JSON mirror in sync so local `next dev` can load it
  // without importing the TypeScript override when R2 is unavailable.
  await writeFile(LOCAL_JSON_PATH, body, "utf8");

  console.log(`up     ${CONFIG_KEY} (${Buffer.byteLength(body)} bytes)`);
  console.log(`saved  src/site.config.local.json (${Buffer.byteLength(body)} bytes)`);
}

async function main() {
  if (PULL) {
    await pullFromR2();
  } else {
    await pushToR2();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
