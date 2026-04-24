import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiPrisma,
  SiSupabase,
  SiOpenai,
  SiRedis,
  SiFirebase,
  SiGooglecloud,
  SiDocker,
  SiVercel,
  SiFramer,
  SiThreedotjs,
  SiLangchain,
  SiDrizzle,
  SiNodedotjs,
  SiMongodb,
  SiGooglemaps,
  SiPython,
  SiExpress,
  SiOpencv,
  SiSocketdotio,
  SiSolidity,
  SiEthereum,
  SiGooglegemini,
  SiNasa,
  SiVite,
  SiOpenjdk,
  SiSpringboot,
  SiCplusplus,
  SiAngular,
  SiMysql,
  SiGithubactions,
  SiNestjs,
  SiPostgresql,
  SiTypescript,
  SiJavascript,
  SiHtml5,
  SiCss,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import { VscAzure } from "react-icons/vsc";
import { Database, Sparkles, Brain, Boxes, Network, Activity, Code2, Flame, Cpu, Eye, Cloud, Link2, Rocket, Volume2, Plug, Workflow } from "lucide-react";

// adaptive => use currentColor (good for monochrome brands so they stay visible in dark/light)
const TECH_META = {
  ReactJS: { Icon: SiReact, color: "#61DAFB" },
  React: { Icon: SiReact, color: "#61DAFB" },
  NextJS: { Icon: SiNextdotjs, adaptive: true },
  "Next.js": { Icon: SiNextdotjs, adaptive: true },
  "Next.js 14": { Icon: SiNextdotjs, adaptive: true },
  Tailwindcss: { Icon: SiTailwindcss, color: "#06B6D4" },
  Prisma: { Icon: SiPrisma, adaptive: true },
  Supabase: { Icon: SiSupabase, color: "#3ECF8E" },
  OpenAI: { Icon: SiOpenai, adaptive: true },
  Redis: { Icon: SiRedis, color: "#DC382D" },
  Firebase: { Icon: SiFirebase, color: "#F57C00" },
  GCP: { Icon: SiGooglecloud, color: "#4285F4" },
  Docker: { Icon: SiDocker, color: "#2496ED" },
  "Vercel AI SDK": { Icon: SiVercel, adaptive: true },
  "Frame Motion": { Icon: SiFramer, color: "#3B82F6" },
  Motion: { Icon: SiFramer, color: "#3B82F6" },
  ThreeJS: { Icon: SiThreedotjs, adaptive: true },
  "Three.js": { Icon: SiThreedotjs, adaptive: true },
  Langchain: { Icon: SiLangchain, color: "#1C8A6B" },
  "Node.js": { Icon: SiNodedotjs, color: "#5FA04E" },
  NodeJS: { Icon: SiNodedotjs, color: "#5FA04E" },

  // fallbacks — no Simple Icons entry, pick a thematic lucide icon + brand-ish color
  Pinecone: { Icon: Database, color: "#6366F1" },
  RAG: { Icon: Sparkles, color: "#A855F7" },
  Mistral: { Icon: Brain, color: "#FA520F" },
  LlamaIndex: { Icon: Boxes, color: "#6E57E0" },
  XYFlow: { Icon: Network, color: "#FF0072" },
  Langfuse: { Icon: Activity, color: "#0EA5E9" },
  Unsloth: { Icon: Cpu, color: "#10B981" },
  Drizzle: { Icon: SiDrizzle, color: "#84CC16" },

  // hackathon-era stack
  "React JS": { Icon: SiReact, color: "#61DAFB" },
  "React Native": { Icon: SiReact, color: "#61DAFB" },
  MongoDB: { Icon: SiMongodb, color: "#47A248" },
  "Google Maps API": { Icon: SiGooglemaps, color: "#4285F4" },
  Python: { Icon: SiPython, color: "#3776AB" },
  Express: { Icon: SiExpress, adaptive: true },
  OpenCV: { Icon: SiOpencv, color: "#5C3EE8" },
  "Socket.IO": { Icon: SiSocketdotio, adaptive: true },
  Solidity: { Icon: SiSolidity, adaptive: true },
  Ethereum: { Icon: SiEthereum, adaptive: true },
  "Gemini 1.5 Pro": { Icon: SiGooglegemini, color: "#8B5CF6" },
  "NASA Open APIs": { Icon: SiNasa, color: "#E03C31" },
  Vite: { Icon: SiVite, color: "#646CFF" },

  // no Simple Icons entry
  YOLO: { Icon: Eye, color: "#00BFFF" },
  "Serverless Functions": { Icon: Cloud, color: "#F59E0B" },
  Hardhat: { Icon: Flame, color: "#F0B90B" },
  "Web3.js": { Icon: Link2, color: "#F16822" },
  "Web Audio API": { Icon: Volume2, color: "#8B5CF6" },

  // backend / enterprise stack
  Java: { Icon: SiOpenjdk, color: "#ED8B00" },
  "Spring Boot": { Icon: SiSpringboot, color: "#6DB33F" },
  "C++": { Icon: SiCplusplus, color: "#00599C" },
  Angular: { Icon: SiAngular, color: "#DD0031" },
  MySQL: { Icon: SiMysql, color: "#4479A1" },
  Azure: { Icon: VscAzure, color: "#0078D4" },
  "REST APIs": { Icon: Plug, color: "#0EA5E9" },
  Microservices: { Icon: Boxes, color: "#8B5CF6" },
  "CI/CD": { Icon: SiGithubactions, color: "#2088FF" },
  Workflow: { Icon: Workflow, color: "#6366F1" },

  // project stack
  NestJS: { Icon: SiNestjs, color: "#E0234E" },
  "Nest.js": { Icon: SiNestjs, color: "#E0234E" },
  PostgreSQL: { Icon: SiPostgresql, color: "#4169E1" },
  AWS: { Icon: FaAws, color: "#FF9900" },
  TypeScript: { Icon: SiTypescript, color: "#3178C6" },
  JavaScript: { Icon: SiJavascript, color: "#F7DF1E" },
  HTML: { Icon: SiHtml5, color: "#E34F26" },
  CSS: { Icon: SiCss, color: "#1572B6" },
  "Tailwind CSS": { Icon: SiTailwindcss, color: "#06B6D4" },
  "OpenAI API": { Icon: SiOpenai, adaptive: true },
};

const DEFAULT = { Icon: Code2, adaptive: true };

const hexToRgba = (hex, alpha) => {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const TechBadge = ({ name }) => {
  const meta = TECH_META[name] ?? DEFAULT;
  const { Icon, color, adaptive } = meta;

  if (adaptive) {
    return (
      <span className="inline-flex items-center gap-0.5 rounded border border-dashed border-black/[0.15] bg-black/[0.04] px-1 py-px text-[8px] text-foreground/80 dark:border-white/[0.18] dark:bg-white/[0.06] md:px-1.5 md:text-[9px]">
        <Icon className="h-2 w-2 md:h-2.5 md:w-2.5" />
        {name}
      </span>
    );
  }

  return (
    <span
      className="inline-flex items-center gap-0.5 rounded border border-dashed px-1 py-px text-[8px] font-medium md:px-1.5 md:text-[9px]"
      style={{
        backgroundColor: hexToRgba(color, 0.12),
        borderColor: hexToRgba(color, 0.35),
        color,
      }}
    >
      <Icon className="h-2 w-2 md:h-2.5 md:w-2.5" style={{ color }} />
      {name}
    </span>
  );
};
