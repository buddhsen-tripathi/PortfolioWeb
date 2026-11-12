#!/usr/bin/env node
// Uploads src/site.config.ts as JSON to Cloudflare R2 under `config/site.config.json`
// (or R2_CONFIG_KEY) so the live site can read updated config values without redeploying.
// Use --dry to preview the JSON payload without uploading.

import { config } from "dotenv";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

config({ path: ".env.local" });

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, "..");
const CONFIG_PATH = path.join(PROJECT_ROOT, "src", "site.config.ts");
const CONFIG_KEY = process.env.R2_CONFIG_KEY || "config/site.config.json";

const args = new Set(process.argv.slice(2));
const DRY = args.has("--dry");

function requireEnv(name) {
  const v = process.env[name];
  if (!v) {
    console.error(`Missing required env: ${name} (load .env.local first)`);
    process.exit(1);
  }
  return v;
}

async function main() {
  const mod = await import(pathToFileURL(CONFIG_PATH).href);
  const siteConfig = mod.siteConfig;
  if (!siteConfig) {
    console.error("Failed to load siteConfig from src/site.config.ts");
    process.exit(1);
  }

  const body = JSON.stringify(siteConfig, null, 2) + "\n";

  if (DRY) {
    console.log(
      `R2 migrate config (dry-run) → key=${CONFIG_KEY} (${Buffer.byteLength(body)} bytes)\n`
    );
    console.log(body);
    return;
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

  console.log(`R2 migrate config → bucket=${BUCKET} key=${CONFIG_KEY}\n`);

  await s3.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: CONFIG_KEY,
      Body: body,
      ContentType: "application/json; charset=utf-8",
    })
  );

  console.log(`up     ${CONFIG_KEY} (${Buffer.byteLength(body)} bytes)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
