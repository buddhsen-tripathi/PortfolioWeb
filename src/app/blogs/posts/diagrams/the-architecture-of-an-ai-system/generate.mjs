#!/usr/bin/env node
// Generates editable Excalidraw scenes for "The Architecture of an AI System".
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const OUT = dirname(fileURLToPath(import.meta.url));

const INK = "#1e1e1e";
const C = {
  user: "#ffec99",
  app: "#a5d8ff",
  harness: "#eebefa",
  runtime: "#ffd8a8",
  serving: "#b2f2bb",
  gpu: "#ffc9c9",
  model: "#99e9f2",
  tool: "#ffd8a8",
  retrieval: "#b2f2bb",
  memory: "#ffc9c9",
  data: "#e9ecef",
  done: "#b2f2bb",
  store: "#d0ebff",
  pale: "#f8f9fa",
};

let n = 1;
const nid = () => `id${(n++).toString(36)}${Math.random().toString(36).slice(2, 6)}`;
const seed = () => n * 9973 + 17;

function el(partial) {
  return {
    angle: 0,
    strokeColor: INK,
    backgroundColor: "transparent",
    fillStyle: "solid",
    strokeWidth: 2,
    strokeStyle: "solid",
    roughness: 1,
    opacity: 100,
    groupIds: [],
    frameId: null,
    roundness: null,
    seed: seed(),
    version: 1,
    versionNonce: n++,
    isDeleted: false,
    boundElements: null,
    updated: 1726500000000,
    link: null,
    locked: false,
    ...partial,
  };
}

function measure(text, fontSize) {
  const lines = String(text).split("\n");
  return {
    width: Math.max(12, ...lines.map((l) => l.length * fontSize * 0.62)),
    height: Math.max(fontSize * 1.25, lines.length * fontSize * 1.35),
  };
}

class Scene {
  constructor() {
    this.elements = [];
  }

  box({ x, y, w, h, text, bg = C.pale, fontSize = 18, stroke = INK, dashed = false }) {
    const rid = nid();
    const tid = nid();
    const gid = nid();
    const rect = el({
      id: rid,
      type: "rectangle",
      x,
      y,
      width: w,
      height: h,
      backgroundColor: bg,
      strokeColor: stroke,
      strokeStyle: dashed ? "dashed" : "solid",
      roundness: { type: 3 },
      boundElements: [{ type: "text", id: tid }],
      groupIds: [gid],
    });
    const txt = el({
      id: tid,
      type: "text",
      x,
      y,
      width: w,
      height: h,
      text: String(text),
      originalText: String(text),
      fontSize,
      fontFamily: 2,
      textAlign: "center",
      verticalAlign: "middle",
      containerId: rid,
      lineHeight: 1.25,
      autoResize: true,
      groupIds: [gid],
      strokeWidth: 1,
      roughness: 0,
    });
    this.elements.push(rect, txt);
    return { id: rid, rect, x, y, w, h };
  }

  label(x, y, text, { fontSize = 14, align = "left", color = INK } = {}) {
    const { width, height } = measure(text, fontSize);
    const tx = align === "center" ? x - width / 2 : align === "right" ? x - width : x;
    const t = el({
      id: nid(),
      type: "text",
      x: tx,
      y,
      width,
      height,
      text: String(text),
      originalText: String(text),
      fontSize,
      fontFamily: 2,
      textAlign: align,
      verticalAlign: "top",
      containerId: null,
      lineHeight: 1.25,
      autoResize: true,
      strokeColor: color,
      strokeWidth: 1,
      roughness: 0,
    });
    this.elements.push(t);
    return t;
  }

  arrow(a, b, { from = "bottom", to = "top", label, points, dashed = false } = {}) {
    const anchor = (box, side) => {
      if (side === "bottom") return { x: box.x + box.w / 2, y: box.y + box.h };
      if (side === "top") return { x: box.x + box.w / 2, y: box.y };
      if (side === "right") return { x: box.x + box.w, y: box.y + box.h / 2 };
      if (side === "left") return { x: box.x, y: box.y + box.h / 2 };
      return { x: box.x + box.w / 2, y: box.y + box.h / 2 };
    };
    const s = anchor(a, from);
    const e = anchor(b, to);
    const rel = points
      ? points.map((p, i) => (i === 0 ? [0, 0] : [p[0] - points[0][0], p[1] - points[0][1]]))
      : [
          [0, 0],
          [e.x - s.x, e.y - s.y],
        ];
    const origin = points ? { x: points[0][0], y: points[0][1] } : s;
    const aid = nid();
    a.rect.boundElements = [...(a.rect.boundElements || []), { id: aid, type: "arrow" }];
    b.rect.boundElements = [...(b.rect.boundElements || []), { id: aid, type: "arrow" }];
    const minX = Math.min(...rel.map((p) => p[0]));
    const minY = Math.min(...rel.map((p) => p[1]));
    const maxX = Math.max(...rel.map((p) => p[0]));
    const maxY = Math.max(...rel.map((p) => p[1]));
    this.elements.push(
      el({
        id: aid,
        type: "arrow",
        x: origin.x,
        y: origin.y,
        width: maxX - minX,
        height: maxY - minY,
        points: rel,
        roundness: { type: 2 },
        startBinding: { elementId: a.id, focus: 0, gap: 4 },
        endBinding: { elementId: b.id, focus: 0, gap: 4 },
        startArrowhead: null,
        endArrowhead: "arrow",
        lastCommittedPoint: null,
        strokeStyle: dashed ? "dashed" : "solid",
      }),
    );
    if (label) {
      const mx = origin.x + (rel[0][0] + rel[rel.length - 1][0]) / 2;
      const my = origin.y + (rel[0][1] + rel[rel.length - 1][1]) / 2;
      this.label(mx, my - 18, label, { fontSize: 13, align: "center" });
    }
    return aid;
  }

  line(x1, y1, x2, y2, { dashed = false, arrow = false } = {}) {
    this.elements.push(
      el({
        id: nid(),
        type: arrow ? "arrow" : "line",
        x: x1,
        y: y1,
        width: Math.abs(x2 - x1),
        height: Math.abs(y2 - y1),
        points: [
          [0, 0],
          [x2 - x1, y2 - y1],
        ],
        roundness: { type: 2 },
        startBinding: null,
        endBinding: null,
        startArrowhead: null,
        endArrowhead: arrow ? "arrow" : null,
        lastCommittedPoint: null,
        strokeStyle: dashed ? "dashed" : "solid",
      }),
    );
  }

  polyline(pts, { arrow = true, dashed = false } = {}) {
    const [x, y] = pts[0];
    const rel = pts.map(([px, py]) => [px - x, py - y]);
    this.elements.push(
      el({
        id: nid(),
        type: arrow ? "arrow" : "line",
        x,
        y,
        width: Math.max(...rel.map((p) => p[0])) - Math.min(...rel.map((p) => p[0])),
        height: Math.max(...rel.map((p) => p[1])) - Math.min(...rel.map((p) => p[1])),
        points: rel,
        roundness: { type: 2 },
        startBinding: null,
        endBinding: null,
        startArrowhead: null,
        endArrowhead: arrow ? "arrow" : null,
        lastCommittedPoint: null,
        strokeStyle: dashed ? "dashed" : "solid",
      }),
    );
  }

  toJSON() {
    return {
      type: "excalidraw",
      version: 2,
      source: "https://excalidraw.com",
      elements: this.elements,
      appState: { gridSize: null, viewBackgroundColor: "#ffffff" },
      files: {},
    };
  }
}

function stack(scene, { x, y, w, h, gap, items, fontSize = 18 }) {
  const boxes = [];
  let cy = y;
  for (const item of items) {
    boxes.push(
      scene.box({
        x,
        y: cy,
        w,
        h: item.h ?? h,
        text: item.text,
        bg: item.bg,
        fontSize: item.fontSize ?? fontSize,
      }),
    );
    cy += (item.h ?? h) + gap;
  }
  for (let i = 0; i < boxes.length - 1; i++) scene.arrow(boxes[i], boxes[i + 1]);
  return boxes;
}

function save(name, scene) {
  const path = join(OUT, `${name}.excalidraw`);
  writeFileSync(path, JSON.stringify(scene.toJSON(), null, 2));
  console.log("wrote", path);
}

function naive() {
  const s = new Scene();
  const y = 80;
  const user = s.box({ x: 40, y, w: 200, h: 88, text: "User", bg: C.user, fontSize: 22 });
  const ai = s.box({ x: 340, y, w: 200, h: 88, text: "AI", bg: C.model, fontSize: 22 });
  const ans = s.box({ x: 640, y, w: 200, h: 88, text: "Answer", bg: C.serving, fontSize: 22 });
  s.arrow(user, ai, { from: "right", to: "left" });
  s.arrow(ai, ans, { from: "right", to: "left" });
  save("01-naive-ai-model", s);
}

function completeStack() {
  const s = new Scene();
  stack(s, {
    x: 220,
    y: 40,
    w: 320,
    h: 64,
    gap: 36,
    fontSize: 20,
    items: [
      { text: "User", bg: C.user },
      { text: "AI Application", bg: C.app },
      { text: "Agent / Harness", bg: C.harness },
      { text: "AI Runtime", bg: C.runtime },
      { text: "Model Serving", bg: C.serving },
      { text: "GPU Cluster", bg: C.gpu },
      { text: "Model", bg: C.model },
    ],
  });
  save("02-complete-ai-system", s);
}

function harness() {
  const s = new Scene();
  s.box({
    x: 40,
    y: 40,
    w: 920,
    h: 520,
    text: "",
    bg: "#f8f0ff",
    dashed: true,
  });
  s.label(500, 58, "HARNESS", { fontSize: 22, align: "center" });
  const cells = [
    ["Context management", C.app],
    ["Tool definitions", C.tool],
    ["Tool routing", C.tool],
    ["Agent loop", C.harness],
    ["State", C.memory],
    ["Memory", C.memory],
    ["Permissions", C.runtime],
    ["Compaction", C.serving],
    ["Error recovery", C.gpu],
  ];
  cells.forEach((cell, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    s.box({
      x: 80 + col * 290,
      y: 110 + row * 140,
      w: 260,
      h: 100,
      text: cell[0],
      bg: cell[1],
      fontSize: 18,
    });
  });
  save("03-harness", s);
}

function agentLoop() {
  const s = new Scene();
  const user = s.box({ x: 80, y: 40, w: 200, h: 64, text: "User", bg: C.user });
  const harnessBox = s.box({
    x: 80,
    y: 150,
    w: 200,
    h: 64,
    text: "Harness",
    bg: C.harness,
  });
  const model = s.box({ x: 80, y: 280, w: 200, h: 72, text: "Model", bg: C.model });
  const call = s.box({ x: 460, y: 280, w: 200, h: 72, text: "Tool call", bg: C.tool });
  const tool = s.box({ x: 460, y: 420, w: 200, h: 72, text: "Tool", bg: C.tool });
  const result = s.box({
    x: 460,
    y: 560,
    w: 200,
    h: 72,
    text: "Tool result",
    bg: C.store,
  });
  const done = s.box({
    x: 80,
    y: 560,
    w: 200,
    h: 72,
    text: "Final answer",
    bg: C.done,
  });
  s.arrow(user, harnessBox);
  s.arrow(harnessBox, model);
  s.arrow(model, call, { from: "right", to: "left", label: "needs a tool" });
  s.arrow(call, tool);
  s.arrow(tool, result);
  s.polyline(
    [
      [460, 596],
      [370, 596],
      [370, 340],
      [280, 340],
    ],
    { arrow: true },
  );
  s.label(400, 500, "loop", { fontSize: 14, align: "center" });
  s.arrow(model, done, { dashed: true });
  s.label(40, 430, "stop", { fontSize: 14, align: "center" });
  save("04-agent-loop", s);
}

function rag() {
  const s = new Scene();
  s.box({ x: 30, y: 30, w: 420, h: 640, text: "", bg: C.pale, dashed: true });
  s.box({ x: 490, y: 30, w: 500, h: 640, text: "", bg: C.pale, dashed: true });
  s.label(240, 50, "INGESTION", { fontSize: 20, align: "center" });
  s.label(740, 50, "QUERY TIME", { fontSize: 20, align: "center" });
  stack(s, {
    x: 80,
    y: 100,
    w: 320,
    h: 64,
    gap: 28,
    items: [
      { text: "Documents", bg: C.data },
      { text: "Chunking", bg: C.app },
      { text: "Embedding model", bg: C.model },
      { text: "Vectors", bg: C.retrieval },
      { text: "Vector database", bg: C.store },
    ],
  });
  stack(s, {
    x: 560,
    y: 90,
    w: 360,
    h: 52,
    gap: 20,
    fontSize: 16,
    items: [
      { text: "User question", bg: C.user },
      { text: "Embedding model", bg: C.model },
      { text: "Query vector", bg: C.retrieval },
      { text: "Vector search", bg: C.store },
      { text: "Top-K relevant chunks", bg: C.serving },
      { text: "Question + context", bg: C.app },
      { text: "LLM", bg: C.model },
      { text: "Answer", bg: C.done },
    ],
  });
  save("05-rag", s);
}

function contextConstruction() {
  const s = new Scene();
  const inputs = [
    { text: "System instructions", bg: C.app },
    { text: "Conversation history", bg: C.data },
    { text: "User message", bg: C.user },
    { text: "Retrieved context", bg: C.retrieval },
    { text: "Tool definitions", bg: C.tool },
    { text: "Relevant state", bg: C.memory },
  ];
  const boxes = inputs.map((item, i) =>
    s.box({
      x: 80,
      y: 40 + i * 78,
      w: 360,
      h: 60,
      text: item.text,
      bg: item.bg,
      fontSize: 18,
    }),
  );
  const input = s.box({
    x: 620,
    y: 200,
    w: 280,
    h: 88,
    text: "Model input",
    bg: C.harness,
    fontSize: 22,
  });
  const model = s.box({
    x: 620,
    y: 360,
    w: 280,
    h: 88,
    text: "Model",
    bg: C.model,
    fontSize: 22,
  });
  s.line(540, 70, 540, 460);
  for (const b of boxes) {
    const midY = b.y + b.h / 2;
    s.polyline(
      [
        [b.x + b.w, midY],
        [540, midY],
      ],
      { arrow: true },
    );
  }
  s.polyline(
    [
      [540, input.y + input.h / 2],
      [input.x, input.y + input.h / 2],
    ],
    { arrow: true },
  );
  s.arrow(input, model);
  save("06-context-construction", s);
}

function inferenceServing() {
  const s = new Scene();
  s.box({ x: 30, y: 30, w: 430, h: 720, text: "", bg: C.pale, dashed: true });
  s.box({ x: 500, y: 30, w: 470, h: 720, text: "", bg: C.pale, dashed: true });
  s.label(245, 50, "SERVING PATH", { fontSize: 18, align: "center" });
  s.label(735, 50, "PREFILL AND DECODE", { fontSize: 18, align: "center" });
  stack(s, {
    x: 80,
    y: 100,
    w: 330,
    h: 52,
    gap: 22,
    fontSize: 16,
    items: [
      { text: "Requests", bg: C.user },
      { text: "API / Gateway", bg: C.app },
      { text: "Router", bg: C.harness },
      { text: "Queue / Scheduler", bg: C.runtime },
      { text: "Batching", bg: C.serving },
      { text: "Inference engine", bg: C.model },
      { text: "GPU", bg: C.gpu },
      { text: "Generated tokens", bg: C.done },
    ],
  });
  const prompt = s.box({ x: 560, y: 120, w: 350, h: 64, text: "Prompt tokens", bg: C.user });
  const prefill = s.box({ x: 560, y: 230, w: 350, h: 64, text: "Prefill", bg: C.runtime });
  const kv = s.box({ x: 560, y: 340, w: 350, h: 64, text: "Model state / KV cache", bg: C.store });
  const decode = s.box({ x: 560, y: 450, w: 350, h: 64, text: "Decode", bg: C.serving });
  s.arrow(prompt, prefill);
  s.arrow(prefill, kv);
  s.arrow(kv, decode);
  ["Token 1", "Token 2", "Token 3", "Token …"].forEach((t, i) => {
    s.box({
      x: 590 + (i % 2) * 160,
      y: 560 + Math.floor(i / 2) * 70,
      w: 140,
      h: 52,
      text: t,
      bg: C.model,
      fontSize: 16,
    });
  });
  s.line(735, 514, 735, 552, { arrow: true });
  save("07-inference-serving", s);
}

function lifecycle() {
  const s = new Scene();
  const items = [
    ["Data", C.data],
    ["Training", C.app],
    ["Evaluation", C.harness],
    ["Post-training", C.runtime],
    ["Model release", C.serving],
    ["Deployment", C.model],
    ["Monitoring", C.gpu],
  ];
  const boxes = items.map((item, i) =>
    s.box({
      x: 280,
      y: 40 + i * 92,
      w: 280,
      h: 64,
      text: item[0],
      bg: item[1],
      fontSize: 20,
    }),
  );
  for (let i = 0; i < boxes.length - 1; i++) s.arrow(boxes[i], boxes[i + 1]);
  s.polyline(
    [
      [560, 664],
      [680, 664],
      [680, 72],
      [560, 72],
    ],
    { arrow: true, dashed: true },
  );
  s.label(740, 350, "Iteration", { fontSize: 18, align: "center" });
  save("08-model-lifecycle", s);
}

function completePicture() {
  const s = new Scene();
  const main = stack(s, {
    x: 80,
    y: 40,
    w: 280,
    h: 56,
    gap: 28,
    fontSize: 18,
    items: [
      { text: "User", bg: C.user },
      { text: "AI Application", bg: C.app },
      { text: "Agent / Harness", bg: C.harness },
      { text: "AI Runtime", bg: C.runtime },
      { text: "Model Serving", bg: C.serving },
      { text: "GPU Cluster", bg: C.gpu },
      { text: "Model", bg: C.model },
    ],
  });

  const retrieval = s.box({
    x: 500,
    y: 176,
    w: 200,
    h: 52,
    text: "Retrieval",
    bg: C.retrieval,
    fontSize: 16,
  });
  const vdb = s.box({
    x: 760,
    y: 176,
    w: 200,
    h: 52,
    text: "Vector DB",
    bg: C.store,
    fontSize: 16,
  });
  const tools = s.box({
    x: 500,
    y: 248,
    w: 200,
    h: 52,
    text: "Tools",
    bg: C.tool,
    fontSize: 16,
  });
  const env = s.box({
    x: 760,
    y: 248,
    w: 200,
    h: 52,
    text: "Files / APIs / DB",
    bg: C.data,
    fontSize: 16,
  });
  const memory = s.box({
    x: 500,
    y: 320,
    w: 200,
    h: 52,
    text: "Memory / State",
    bg: C.memory,
    fontSize: 16,
  });
  const storage = s.box({
    x: 760,
    y: 320,
    w: 200,
    h: 52,
    text: "Storage",
    bg: C.data,
    fontSize: 16,
  });

  s.arrow(main[2], retrieval, { from: "right", to: "left" });
  s.arrow(retrieval, vdb, { from: "right", to: "left" });
  s.arrow(main[2], tools, { from: "right", to: "left" });
  s.arrow(tools, env, { from: "right", to: "left" });
  s.arrow(main[2], memory, { from: "right", to: "left" });
  s.arrow(memory, storage, { from: "right", to: "left" });

  s.box({ x: 40, y: 680, w: 960, h: 210, text: "", bg: C.pale, dashed: true });
  s.label(520, 698, "MODEL LIFECYCLE", { fontSize: 16, align: "center" });
  const life = [
    ["Data", C.data],
    ["Training", C.app],
    ["Eval", C.harness],
    ["Post-train", C.runtime],
    ["Release", C.serving],
    ["Deploy", C.model],
    ["Monitor", C.gpu],
  ];
  const lb = life.map((item, i) =>
    s.box({
      x: 60 + i * 130,
      y: 740,
      w: 116,
      h: 56,
      text: item[0],
      bg: item[1],
      fontSize: 14,
    }),
  );
  for (let i = 0; i < lb.length - 1; i++) s.arrow(lb[i], lb[i + 1], { from: "right", to: "left" });
  s.polyline(
    [
      [916, 796],
      [916, 860],
      [118, 860],
      [118, 796],
    ],
    { arrow: true, dashed: true },
  );
  s.label(520, 868, "iteration → new version", { fontSize: 14, align: "center" });
  save("09-complete-picture", s);
}

naive();
completeStack();
harness();
agentLoop();
rag();
contextConstruction();
inferenceServing();
lifecycle();
completePicture();
