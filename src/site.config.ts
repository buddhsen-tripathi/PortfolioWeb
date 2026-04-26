/**
 * ────────────────────────────────────────────────────────────────────────────
 *  SITE CONFIG — single source of truth
 * ────────────────────────────────────────────────────────────────────────────
 *  Edit this file to make the portfolio your own. Every identity, link,
 *  SEO string, nav entry, and content list is read from here.
 *
 *  After cloning:
 *    1. Update `identity`, `contact`, `assets`, and `socials` below.
 *    2. Edit `seo` defaults and `nav` items.
 *    3. Replace `experiences`, `projects`, `hackathons`, `research`.
 *
 *  Runtime-only values (API keys, etc.) still live in `.env.local`.
 * ────────────────────────────────────────────────────────────────────────────
 */

export type SocialPlatform =
  | "twitter"
  | "github"
  | "linkedin"
  | "leetcode"
  | "tryhackme"
  | "codeforces";

export const siteConfig = {
  // ── Identity ──────────────────────────────────────────────────────────────
  identity: {
    name: "Buddhsen Tripathi",
    firstName: "Buddhsen",
    title: "Full Stack Developer",
    tagline: "MS CS @ NYU",
    bio: "Full stack web developer building scalable, user-centric applications with expertise in cloud infrastructure and microservices architecture.",
    intros: [
      "Software Engineer",
      "Full-Stack Developer",
      "Problem Solver",
      "Tech Geek",
    ],
  },

  // ── Contact & URL ─────────────────────────────────────────────────────────
  contact: {
    email: "bt2609@nyu.edu",
    url: "https://buddhsentripathi.com",
    calUrl: "https://cal.com/buddhsen",
    resumeUrl: "https://cdn.buddhsentripathi.com/assets/Resume.pdf",
  },

  // ── Assets (R2-backed CDN at cdn.buddhsentripathi.com/assets) ─────────────
  // Tiny site-chrome files (favicon, manifest, robots, oneko) stay in /public;
  // everything else is uploaded via scripts/migrate-assets-to-r2.mjs.
  assetsUrl: "https://cdn.buddhsentripathi.com/assets",
  assets: {
    ogImage: "https://cdn.buddhsentripathi.com/assets/default-image.webp",
    blogOgImage: "https://cdn.buddhsentripathi.com/assets/default-image-blogs.webp",
    favicon: "/favicon.ico",
  },

  // ── Socials (platform → username + url) ───────────────────────────────────
  //  Adding/removing entries here updates the hero social buttons automatically.
  socials: {
    twitter: {
      label: "Twitter",
      username: "senbuilds",
      url: "https://x.com/senbuilds",
    },
    github: {
      label: "Github",
      username: "buddhsen-tripathi",
      url: "https://github.com/buddhsen-tripathi",
    },
    linkedin: {
      label: "LinkedIn",
      username: "buddhsen-tripathi",
      url: "https://www.linkedin.com/in/buddhsen-tripathi/",
    },
    leetcode: {
      label: "LeetCode",
      username: "buddhsen",
      url: "https://leetcode.com/u/buddhsen",
    },
    tryhackme: {
      label: "TryHackMe",
      username: "btripathi",
      url: "https://tryhackme.com/p/btripathi",
    },
    codeforces: {
      label: "Codeforces",
      username: "Buddhsen",
      url: "https://codeforces.com/profile/Buddhsen",
    },
  } satisfies Record<SocialPlatform, { label: string; username: string; url: string }>,

  // ── SEO defaults ──────────────────────────────────────────────────────────
  seo: {
    titleTemplate: "%s | Buddhsen Tripathi",
    defaultTitle: "Buddhsen Tripathi",
    defaultDescription:
      "Full stack web developer portfolio showcasing projects and skills in Next.js, React, TypeScript, and full-stack development and technical blogs",
    keywords: [
      "Buddhsen Tripathi",
      "Full Stack Developer",
      "React",
      "Next.js",
      "JavaScript",
      "TypeScript",
      "Node.js",
      "Web Development",
      "Portfolio",
      "Software Engineer",
    ],
    twitterHandle: "@senbuilds",
    locale: "en_US",
    themeColor: "#0B0D0E",
  },

  // ── Navigation ────────────────────────────────────────────────────────────
  nav: [
    { path: "/", name: "About" },
    { path: "/projects", name: "Projects" },
    { path: "/blogs", name: "Blogs" },
    { path: "/experience", name: "Experience" },
  ],

  // ── Content: Experiences ──────────────────────────────────────────────────
  experiences: [
    {
      role: "Software Development Engineer Intern",
      year: "Jan 2023 - Jun 2023",
      company: "Amadeus",
      type: "Internship",
      location: "Bangalore, On-Site",
      logo: "https://cdn.buddhsentripathi.com/assets/company/amadeus.jpg",
      responsibility: [
        [
          { text: "Contributed to " },
          { text: "Java / Spring Boot", bold: true },
          { text: " services backing internal travel-industry tooling." },
        ],
        [
          { text: "Built " },
          { text: "Angular", bold: true },
          { text: " UI features against " },
          { text: "REST APIs", bold: true },
          { text: " over a " },
          { text: "MySQL", bold: true },
          { text: " data layer." },
        ],
      ],
      techstacks: ["Java", "Spring Boot", "Angular", "MySQL", "REST APIs"],
    },
    {
      role: "Software Development Engineer 1",
      year: "Jul 2023 - Aug 2025",
      company: "Amadeus",
      type: "Full-Time",
      location: "Bangalore, On-Site",
      logo: "https://cdn.buddhsentripathi.com/assets/company/amadeus.jpg",
      responsibility: [
        [
          { text: "Built and maintained " },
          { text: "microservices", bold: true },
          { text: " in " },
          { text: "Java, Spring Boot, and C++", bold: true },
          { text: " backing travel-industry platforms." },
        ],
        [
          { text: "Shipped " },
          { text: "Angular", bold: true },
          { text: " UIs wired to " },
          { text: "REST APIs", bold: true },
          { text: " with " },
          { text: "MySQL and MongoDB", bold: true },
          { text: " data layers." },
        ],
        [
          { text: "Deployed services on " },
          { text: "Azure", bold: true },
          { text: " using " },
          { text: "Docker", bold: true },
          { text: " with end-to-end " },
          { text: "CI/CD", bold: true },
          { text: " pipelines." },
        ],
        [
          { text: "Hardened the codebase with " },
          { text: "application security tooling", bold: true },
          { text: " including " },
          { text: "Fortify and Black Duck", bold: true },
          { text: " to catch vulnerabilities pre-release." },
        ],
      ],
      techstacks: [
        "Java",
        "Spring Boot",
        "C++",
        "Angular",
        "REST APIs",
        "MySQL",
        "MongoDB",
        "Docker",
        "Azure",
        "Microservices",
        "CI/CD",
      ],
    },
  ],

  // ── Content: Projects ─────────────────────────────────────────────────────
  projects: [
    {
      title: "DeepFind.Me",
      category: "SaaS · OSINT Platform",
      description:
        "Educational OSINT platform offering tools and resources to help users understand and manage their digital footprint.",
      techstacks: ["Next.js", "NestJS", "PostgreSQL", "Docker", "AWS", "OpenAI API"],
      status: "live",
      link: "https://deepfind.me",
      preview: "https://cdn.buddhsentripathi.com/assets/projects/deepfindme.png",
    },
    {
      title: "Bucket0",
      category: "SaaS · Storage",
      description:
        "Platform to store files and manage all your S3-compatible buckets in a single, powerful interface.",
      techstacks: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS"],
      status: "live",
      link: "https://bucket0.com",
      preview: "https://cdn.buddhsentripathi.com/assets/projects/bucket0-light.png",
      previewDark: "https://cdn.buddhsentripathi.com/assets/projects/bucket0-dark.png",
    },
    {
      title: "Nimu",
      category: "SaaS · AI Outreach",
      description:
        "Reputation-first AI outreach platform with automated domain authentication, multi-step drip campaigns, mailbox warm-up, and real-time deliverability monitoring.",
      techstacks: ["Next.js", "NestJS", "PostgreSQL", "Docker", "AWS", "Tailwind CSS"],
      status: "building",
      link: "https://nimu.app",
      preview: "https://cdn.buddhsentripathi.com/assets/projects/nimu-light.png",
      previewDark: "https://cdn.buddhsentripathi.com/assets/projects/nimu-dark.png",
    },
    {
      title: "OpenVScan",
      category: "Open Source · Security",
      description:
        "Web-based vulnerability scanner that integrates open-source tools with AI to deliver smarter, faster and more reliable pre-production security testing.",
      techstacks: ["Next.js", "NestJS", "TypeScript", "Tailwind CSS"],
      status: "building",
      link: "https://www.openvscan.com",
      github: "Buddhsen-tripathi/openvscan",
      preview: "https://cdn.buddhsentripathi.com/assets/projects/openvscan.png",
    },
    {
      title: "openai-api-helper",
      category: "Open Source · npm",
      description:
        "Straightforward npm package designed to simplify making calls to the OpenAI API for various text-based prompts and responses.",
      techstacks: ["JavaScript", "TypeScript"],
      status: "active",
      link: "https://www.npmjs.com/package/openai-api-helper",
      github: "Buddhsen-tripathi/openai-api-helper",
      preview: "https://cdn.buddhsentripathi.com/assets/projects/npm.png",
    },
    {
      title: "SmartText Enhancer",
      category: "Chrome Extension · AI",
      description:
        "Productivity-focused Chrome extension that uses AI to summarize content and check spelling and grammar.",
      techstacks: ["JavaScript", "HTML", "CSS", "Express", "OpenAI API"],
      status: "active",
      link: "https://chromewebstore.google.com/detail/smarttext-enhancer/chmpfoicecijpgmgcpnfhakmeaofmipm",
      preview: "https://cdn.buddhsentripathi.com/assets/projects/sme.png",
    },
  ],

  // ── Content: Hackathons ───────────────────────────────────────────────────
  hackathons: [
    {
      title: "AI Blox",
      event: "vibeFORWARD Hackathon",
      year: "Apr 2026",
      placement: "1st Place",
      college: "Fordham Gabelli School of Business",
      body: [
        { text: "Built " },
        { text: "AI Blox", bold: true },
        {
          text: ", a visual, drag-and-drop AI engineering tool inspired by Scratch. Snap together ",
        },
        { text: "500+ building blocks", bold: true },
        { text: " for " },
        { text: "LoRA fine-tuning, RAG pipelines, and multi-agent orchestration", bold: true },
        { text: ", then generate production-ready code instantly." },
      ],
      techstacks: ["Next.js", "FastAPI", "Langchain", "Docker", "TypeScript", "Python"],
      link: "https://devpost.com/software/ai-blox",
    },
  ],

  // ── Content: Research ─────────────────────────────────────────────────────
  research: [] as Array<{
    title: string;
    year: string;
    authors?: string[];
    venue?: string;
    link?: string;
    description?: string;
  }>,
};

export type SiteConfig = typeof siteConfig;
