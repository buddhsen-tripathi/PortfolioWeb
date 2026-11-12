/**
 * ────────────────────────────────────────────────────────────────────────────
 *  SITE CONFIG — demo template & schema definition
 * ────────────────────────────────────────────────────────────────────────────
 *  This file defines the `SiteConfig` schema and provides clean demo defaults
 *  so a freshly cloned repo runs out of the box with zero setup.
 *
 *  How to customize:
 *    • Option A (Static / Fork): Edit this file directly.
 *    • Option B (Cloudflare R2 + git-ignored local override):
 *        1. Create `src/site.config.local.ts` (git-ignored) or pull from R2
 *           with `bun run migrate:config -- --pull`.
 *        2. Push updates to R2 anytime without redeploying via
 *           `bun run migrate:config`.
 * ────────────────────────────────────────────────────────────────────────────
 */

import type { SocialPlatform } from "@/lib/socials";

export type { SocialPlatform };

export type RichTextSegment = { text: string; bold?: boolean };

export type ExperienceEntry = {
  role: string;
  year: string;
  company: string;
  type: string;
  location?: string;
  logo?: string;
  responsibility: Array<RichTextSegment[] | string>;
  techstacks: string[];
};

export type ProjectEntry = {
  title: string;
  featured?: boolean;
  category: string;
  description: string;
  techstacks: string[];
  status: "acquired" | "live" | "building" | "research" | "active" | string;
  link: string;
  github?: string;
  preview?: string;
  previewDark?: string;
};

export type HackathonEntry = {
  title: string;
  event: string;
  year: string;
  placement: string;
  college?: string;
  body: RichTextSegment[] | string;
  techstacks: string[];
  link: string | string[];
};

export type ResearchEntry = {
  title: string;
  year: string;
  authors?: string[];
  venue?: string;
  link?: string;
  description?: string;
};

export type ExternalArticleEntry = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  type: "technical" | "personal" | string;
  url: string;
};

export interface SiteConfig {
  identity: {
    name: string;
    alternateName: string;
    affiliation: { name: string; url: string };
    title: string;
    tagline: string;
    bio: string;
    location: {
      label: string;
      timeZone: string;
    };
    photo: {
      light: string;
      dark: string;
    };
  };
  home: {
    greeting: string;
    headline: string;
    summary: string;
    contact: string;
    sections: {
      socials: { title: string };
      work: { title: string };
      experience: { title: string };
      hackathons: { title: string };
      writing: { title: string };
      github: { title: string; short: string };
      contact: { title: string; short: string };
    };
  };
  pages: {
    projects: { title: string; description: string; intro: string };
    experience: { title: string; description: string; intro: string };
    hackathons: { title: string; description: string; intro: string };
    blogs: { title: string; description: string; intro: string };
    newsletter: {
      title: string;
      description: string;
      intro: string;
      promises: string[];
    };
    research: { title: string; description: string; intro: string };
    notFound: { eyebrow: string; title: string; intro: string };
  };
  writing: {
    external: ExternalArticleEntry[];
  };
  integrations: {
    visitorCounter: string;
  };
  contact: {
    email: string;
    url: string;
    calUrl: string;
    resumeUrl: string;
  };
  repo: string;
  assetsUrl: string;
  assets: {
    ogImage: string;
    blogOgImage: string;
    favicon: string;
    footerQuote: string;
    footerArt: { light: string; dark: string; width: number; height: number } | null;
  };
  socials: Record<SocialPlatform, string>;
  socialPreviews: {
    linkedin: {
      headline: string;
      location: string;
      connections: string;
    };
  };
  seo: {
    titleTemplate: string;
    defaultTitle: string;
    defaultDescription: string;
    keywords: string[];
    twitterHandle: string;
    locale: string;
    themeColor: string;
  };
  nav: Array<{ path: string; name: string }>;
  experiences: ExperienceEntry[];
  projects: ProjectEntry[];
  hackathons: HackathonEntry[];
  research: ResearchEntry[];
}

export const siteConfig: SiteConfig = {
  // ── Identity ──────────────────────────────────────────────────────────────
  identity: {
    name: "Alex Rivera",
    alternateName: "Alex",
    affiliation: { name: "Example University", url: "https://example.edu" },
    title: "Software Engineer",
    tagline: "AI & Distributed Systems",
    bio: "Software engineer building developer tools, AI agents, and resilient web systems.",
    location: {
      label: "San Francisco, CA",
      timeZone: "America/Los_Angeles",
    },
    photo: {
      light: "/favicon.ico",
      dark: "/favicon.ico",
    },
  },

  // ── Home page copy ────────────────────────────────────────────────────────
  home: {
    greeting: "Hey, I'm Alex",
    headline: "Building thoughtful software and AI systems.",
    summary:
      "I design and ship developer tools, machine learning experiments, and full-stack products.",
    contact:
      "Working on something interesting, hiring, or putting a hackathon team together? Let's chat.",
    sections: {
      socials: { title: "Socials" },
      work: { title: "Work" },
      experience: { title: "Experience" },
      hackathons: { title: "Hackathons" },
      writing: { title: "Writing" },
      github: { title: "GitHub activity", short: "GitHub" },
      contact: { title: "Get in touch", short: "Contact" },
    },
  },

  // ── Pages ─────────────────────────────────────────────────────────────────
  pages: {
    projects: {
      title: "Projects",
      description: "Products, open-source tools, and machine learning research.",
      intro: "Products I've shipped, open source people use, and research along the way.",
    },
    experience: {
      title: "Experience",
      description: "Engineering roles and internships.",
      intro: "Where I've worked and what I built there.",
    },
    hackathons: {
      title: "Hackathons",
      description: "Hackathon wins and podium finishes.",
      intro: "Weekends spent building under pressure: what we built and how it placed.",
    },
    blogs: {
      title: "Blogs",
      description: "Writing on AI systems, distributed infrastructure, and product engineering.",
      intro: "Notes on AI systems, engineering, and building products.",
    },
    newsletter: {
      title: "Newsletter",
      description: "New posts sent straight to your inbox when they go up.",
      intro: "New posts on engineering and AI systems, sent to your inbox when published.",
      promises: [
        "Only when there's a new post",
        "No spam, no selling your email",
        "Unsubscribe in one click",
      ],
    },
    research: {
      title: "Research",
      description: "Academic research, publications, and experimental studies.",
      intro: "Academic research, publications, and experimental projects.",
    },
    notFound: {
      eyebrow: "404 · Page not found",
      title: "Nothing was committed here.",
      intro: "The link might be broken, or the page moved. One of these should get you back on track.",
    },
  },

  // ── Writing hosted elsewhere ──────────────────────────────────────────────
  writing: {
    external: [],
  },

  // ── Integrations ──────────────────────────────────────────────────────────
  integrations: {
    visitorCounter: "demo-portfolio-counter",
  },

  // ── Contact & URL ─────────────────────────────────────────────────────────
  contact: {
    email: "hello@example.com",
    url: "https://example.com",
    calUrl: "https://cal.com",
    resumeUrl: "/Resume.pdf",
  },

  repo: "buddhsen-tripathi/PortfolioWeb",

  // ── Assets ────────────────────────────────────────────────────────────────
  assetsUrl: "/assets",
  assets: {
    ogImage: "/favicon.ico",
    blogOgImage: "/favicon.ico",
    favicon: "/favicon.ico",
    footerQuote: "See you on the other side of the internet.",
    footerArt: null,
  },

  // ── Socials ───────────────────────────────────────────────────────────────
  socials: {
    twitter: "example",
    github: "octocat",
    linkedin: "example",
    leetcode: "",
    tryhackme: "",
    codeforces: "",
    instagram: "",
    youtube: "",
    threads: "",
    bluesky: "",
    mastodon: "",
    reddit: "",
    discord: "",
    telegram: "",
    facebook: "",
    tiktok: "",
    twitch: "",
    medium: "",
    devto: "",
    hashnode: "",
    substack: "",
    gitlab: "",
    stackoverflow: "",
    huggingface: "",
    kaggle: "",
    npm: "",
    producthunt: "",
    peerlist: "",
    dribbble: "",
    behance: "",
    codechef: "",
    hackerrank: "",
    geeksforgeeks: "",
    hackthebox: "",
  },

  socialPreviews: {
    linkedin: {
      headline: "Software Engineer | AI & Systems",
      location: "San Francisco, CA",
      connections: "500+",
    },
  },

  // ── SEO defaults ──────────────────────────────────────────────────────────
  seo: {
    titleTemplate: "%s | Alex Rivera",
    defaultTitle: "Alex Rivera — Software Engineer",
    defaultDescription:
      "Software engineer building AI systems, developer tools, and full-stack products.",
    keywords: ["Software Engineer", "Portfolio", "Next.js", "TypeScript", "AI Engineer"],
    twitterHandle: "@example",
    locale: "en_US",
    themeColor: "#0B0D0E",
  },

  // ── Navigation ────────────────────────────────────────────────────────────
  nav: [
    { path: "/", name: "Home" },
    { path: "/projects", name: "Projects" },
    { path: "/experience", name: "Experience" },
    { path: "/hackathons", name: "Hacks" },
    { path: "/blogs", name: "Blogs" },
  ],

  // ── Content: Experiences ──────────────────────────────────────────────────
  experiences: [
    {
      role: "Senior Software Engineer",
      year: "Jan 2025 - Present",
      company: "Acme Corp",
      type: "Full-Time",
      location: "San Francisco, Hybrid",
      responsibility: [
        [
          { text: "Architected " },
          { text: "distributed inference services", bold: true },
          { text: " in TypeScript, Python, and Go." },
        ],
      ],
      techstacks: ["TypeScript", "Python", "Next.js", "PostgreSQL", "Docker"],
    },
  ],

  // ── Content: Projects ─────────────────────────────────────────────────────
  projects: [
    {
      title: "Acme Cloud",
      featured: true,
      category: "SaaS · Developer Tools",
      description:
        "Zero-config deployment and observability platform for edge microservices.",
      techstacks: ["Next.js", "TypeScript", "PostgreSQL", "Docker"],
      status: "live",
      link: "https://example.com",
    },
    {
      title: "NanoTransformer",
      featured: true,
      category: "Machine Learning · Language Models",
      description:
        "Minimalist decoder-only Transformer trained from scratch with byte-level BPE.",
      techstacks: ["Python", "PyTorch", "NumPy"],
      status: "research",
      link: "https://github.com/octocat/Hello-World",
      github: "octocat/Hello-World",
    },
    {
      title: "SchemaKit",
      category: "Open Source · CLI",
      description:
        "Type-safe database migration and schema diffing toolkit for modern TypeScript teams.",
      techstacks: ["TypeScript", "Node.js"],
      status: "active",
      link: "https://github.com/octocat/Hello-World",
      github: "octocat/Hello-World",
    },
  ],

  // ── Content: Hackathons ───────────────────────────────────────────────────
  hackathons: [
    {
      title: "PulseAgent",
      event: "SF Systems Hackathon",
      year: "Oct 2026",
      placement: "1st Place",
      college: "San Francisco, CA",
      body: [
        { text: "Built an " },
        { text: "autonomous incident triage agent", bold: true },
        { text: " that correlates traces, logs, and recent deploys in real time." },
      ],
      techstacks: ["Next.js", "TypeScript", "FastAPI", "Python"],
      link: "https://github.com/octocat/Hello-World",
    },
  ],

  // ── Content: Research ─────────────────────────────────────────────────────
  research: [],
};
