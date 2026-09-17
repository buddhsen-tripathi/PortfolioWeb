#!/usr/bin/env node
import { readFileSync, writeFileSync, readdirSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const DIR = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = join(DIR, "../../../../../../public/blog-images/the-architecture-of-an-ai-system");
mkdirSync(PUBLIC_DIR, { recursive: true });

function bbox(elements) {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const el of elements) {
    if (el.isDeleted) continue;
    const xs = [el.x];
    const ys = [el.y];
    if (el.points) {
      for (const [px, py] of el.points) {
        xs.push(el.x + px);
        ys.push(el.y + py);
      }
    } else {
      xs.push(el.x + (el.width || 0));
      ys.push(el.y + (el.height || 0));
    }
    minX = Math.min(minX, ...xs);
    minY = Math.min(minY, ...ys);
    maxX = Math.max(maxX, ...xs);
    maxY = Math.max(maxY, ...ys);
  }
  return { minX, minY, maxX, maxY };
}

function esc(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function dash(el) {
  if (el.strokeStyle === "dashed") return `stroke-dasharray="10 8"`;
  if (el.strokeStyle === "dotted") return `stroke-dasharray="2 6"`;
  return "";
}

function render(scene) {
  const elements = scene.elements.filter((el) => !el.isDeleted);
  const { minX, minY, maxX, maxY } = bbox(elements);
  const pad = 48;
  const w = Math.ceil(maxX - minX + pad * 2);
  const h = Math.ceil(maxY - minY + pad * 2);
  const ox = -minX + pad;
  const oy = -minY + pad;

  const parts = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">`,
    `<rect width="100%" height="100%" fill="#ffffff"/>`,
    `<defs>`,
    `<marker id="arrow" viewBox="0 0 12 12" refX="10" refY="6" markerWidth="10" markerHeight="10" orient="auto">`,
    `<path d="M 0 1 L 11 6 L 0 11 z" fill="#1e1e1e"/>`,
    `</marker>`,
    `</defs>`,
  ];

  for (const el of elements) {
    if (el.type === "rectangle") {
      const rx = 10;
      parts.push(
        `<rect x="${el.x + ox}" y="${el.y + oy}" width="${el.width}" height="${el.height}" rx="${rx}" ry="${rx}" fill="${el.backgroundColor || "none"}" stroke="${el.strokeColor}" stroke-width="${el.strokeWidth}" ${dash(el)} />`,
      );
    } else if (el.type === "text") {
      const lines = String(el.text || "").split("\n");
      const fs = el.fontSize || 18;
      const lh = fs * (el.lineHeight || 1.25);
      const startY =
        el.verticalAlign === "middle"
          ? el.y + oy + el.height / 2 - ((lines.length - 1) * lh) / 2
          : el.y + oy + fs;
      const anchor =
        el.textAlign === "center" ? "middle" : el.textAlign === "right" ? "end" : "start";
      const tx =
        el.textAlign === "center"
          ? el.x + ox + el.width / 2
          : el.textAlign === "right"
            ? el.x + ox + el.width
            : el.x + ox;
      const tspans = lines
        .map((line, i) => {
          const dy = i === 0 ? 0 : lh;
          return `<tspan x="${tx}" dy="${dy}">${esc(line)}</tspan>`;
        })
        .join("");
      parts.push(
        `<text x="${tx}" y="${startY}" text-anchor="${anchor}" dominant-baseline="middle" font-family="ui-sans-serif, -apple-system, Helvetica, Arial, sans-serif" font-size="${fs}" font-weight="600" fill="${el.strokeColor}">${tspans}</text>`,
      );
    } else if (el.type === "arrow" || el.type === "line") {
      const pts = (el.points || [[0, 0]]).map(([px, py]) => `${el.x + ox + px},${el.y + oy + py}`);
      const marker = el.type === "arrow" || el.endArrowhead === "arrow" ? `marker-end="url(#arrow)"` : "";
      parts.push(
        `<polyline points="${pts.join(" ")}" fill="none" stroke="${el.strokeColor}" stroke-width="${el.strokeWidth}" stroke-linecap="round" stroke-linejoin="round" ${marker} ${dash(el)} />`,
      );
    }
  }

  parts.push(`</svg>`);
  return { svg: parts.join("\n"), w, h };
}

const files = readdirSync(DIR).filter((f) => f.endsWith(".excalidraw")).sort();
const pages = [];
for (const file of files) {
  const scene = JSON.parse(readFileSync(join(DIR, file), "utf8"));
  const { svg, w, h } = render(scene);
  const base = file.replace(".excalidraw", "");
  const svgPath = join(DIR, `${base}.svg`);
  writeFileSync(svgPath, svg);
  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    html, body { margin: 0; padding: 0; background: #fff; }
    svg { display: block; }
  </style>
</head>
<body>${svg.replace(/^<\?xml[^>]*>\s*/, "")}</body>
</html>`;
  writeFileSync(join(DIR, `${base}.html`), html);
  pages.push({ base, w, h });
  console.log("svg", base, `${w}x${h}`);
}
writeFileSync(join(DIR, "manifest.json"), JSON.stringify(pages, null, 2));
