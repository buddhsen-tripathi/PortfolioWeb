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

import type { SocialPlatform } from "@/lib/socials";

export type { SocialPlatform };

export const siteConfig = {
  // ── Identity ──────────────────────────────────────────────────────────────
  identity: {
    name: "Buddhsen Tripathi",
    // What people call you; used in structured data so searches for it match.
    alternateName: "Sen",
    // Current school or employer, for structured data.
    affiliation: { name: "New York University", url: "https://www.nyu.edu" },
    title: "AI Engineer",
    tagline: "MS CS @ NYU",
    bio: "Software engineer in New York building AI agents and products. MS CS student at NYU, previously a software engineer at Amadeus.",
    location: {
      label: "New York, NY",
      timeZone: "America/New_York",
    },
    photo: {
      light: "https://cdn.buddhsentripathi.com/assets/profpic2.jpg",
      dark: "https://cdn.buddhsentripathi.com/assets/profpic.jpg",
    },
  },

  // ── Home page copy ────────────────────────────────────────────────────────
  home: {
    greeting: "Hola, I'm Buddhsen (Sen)",
    headline: "Just figuring things out as I go.",
    summary: "Mostly AI stuff. I live in New York, love hackathons, and build things that catch my interest.",
    contact:
      "Working on something interesting, hiring, or putting a hackathon team together? I'm happy to talk.",
    // Heading of each home section. `short` is the label in the side index.
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
  //  For each page: `title` (heading and browser tab), `description` (search
  //  results and link previews) and `intro` (the line under the heading).
  pages: {
    projects: {
      title: "Projects",
      description:
        "Products, open source, and research by Buddhsen Tripathi, from an acquired OSINT platform to an AI outreach tool and machine learning experiments.",
      intro: "Products I've shipped, open source people use, and research I've done along the way.",
    },
    experience: {
      title: "Experience",
      description:
        "Course assistant at NYU and former software engineer at Amadeus, where I built microservices in Java, Spring Boot, and C++ on Azure.",
      intro: "Where I've worked and what I did there.",
    },
    hackathons: {
      title: "Hackathons",
      description: "Hackathon wins and podiums: what I built, with whom, and how it placed.",
      intro: "Weekends spent building under pressure, mostly in New York. What I built, and how it placed.",
    },
    blogs: {
      title: "Blogs",
      description:
        "Posts on AI systems, agents, security, and building products, plus the occasional personal update.",
      intro: "Writing on AI systems, security and building products, plus the occasional personal post.",
    },
    newsletter: {
      title: "Newsletter",
      description:
        "New posts on AI systems, security, and building products, sent to your inbox when they go up. No spam, unsubscribe any time.",
      intro:
        "New posts on AI systems, security and building products, plus the occasional personal story. Straight to your inbox when they're published.",
      promises: ["Only when there's a new post", "No spam, no selling your email", "Unsubscribe in one click"],
    },
    research: {
      title: "Research",
      description:
        "Academic research, publications, and experimental projects in software engineering and technology.",
      intro: "Academic research, publications, and experimental projects.",
    },
    notFound: {
      eyebrow: "404 · Page not found",
      title: "Nothing was committed here.",
      intro: "The link might be broken, or the page moved. One of these should get you back on track.",
    },
  },

  // ── Writing hosted elsewhere ──────────────────────────────────────────────
  //  Posts published on other sites (e.g. X articles). They appear in the blog
  //  list and the home Writing section, linking out. Blog posts themselves
  //  live on R2 or in src/app/blogs/posts.
  writing: {
    external: [
      {
        slug: "language-models-prompts-and-the-illusion-of-understanding",
        title: "Language Models, Prompts, and the Illusion of Understanding",
        excerpt:
          "Prompts do not just ask questions. They define constraints. When outputs feel misaligned, the model is not misunderstanding intent. It is resolving ambiguity through probability. The gap is often ours.",
        date: "20 Feb 2026",
        type: "technical",
        url: "https://x.com/senbuilds/status/2024753374772564029",
      },
      {
        slug: "honest-take-on-coding-in-2026",
        title: "This is my honest take on coding in 2026",
        excerpt:
          "An honest reflection on AI-assisted development, the illusion of productivity, fading syntax fluency and what an interview revealed about modern coding.",
        date: "16 Feb 2026",
        type: "technical",
        url: "https://x.com/senbuilds/status/2023280893071179782",
      },
    ],
  },

  // ── Integrations ──────────────────────────────────────────────────────────
  integrations: {
    // Namespace for the footer visitor count on counterapi.dev. Pick any
    // unique string; a new one starts counting from zero.
    visitorCounter: "buddhsen-tripathi-portfolio",
  },
  
  // ── Contact & URL ─────────────────────────────────────────────────────────
  contact: {
    email: "bt2609@nyu.edu",
    // Primary domain (Vercel serves www; the bare domain redirects here).
    url: "https://www.buddhsentripathi.com",
    calUrl: "https://cal.com/buddhsen",
    resumeUrl: "https://cdn.buddhsentripathi.com/assets/Resume.pdf",
  },

  // Source of this site, shown with its star count in the header.
  repo: "buddhsen-tripathi/PortfolioWeb",

  // ── Assets (R2-backed CDN at cdn.buddhsentripathi.com/assets) ─────────────
  // Tiny site-chrome files (favicon, manifest, robots) stay in /public;
  // everything else is uploaded via scripts/migrate-assets-to-r2.mjs.
  assetsUrl: "https://cdn.buddhsentripathi.com/assets",
  assets: {
    ogImage: "https://cdn.buddhsentripathi.com/assets/default-image.webp",
    blogOgImage: "https://cdn.buddhsentripathi.com/assets/default-image-blogs.webp",
    favicon: "/favicon.ico",
    // Wide illustration strip shown at the bottom of every page. Null hides it.
    // Sign-off line shown above the footer illustration. "" hides it.
    footerQuote: "See you on the other side of the internet.",
    footerArt: {
      light: "https://cdn.buddhsentripathi.com/assets/footer/footer-nyc-day.webp?v=20261018",
      dark: "https://cdn.buddhsentripathi.com/assets/footer/footer-nyc-night.webp?v=20261018",
      width: 1568,
      height: 672,
    } as { light: string; dark: string; width: number; height: number } | null,
  },

  // ── Socials ───────────────────────────────────────────────────────────────
  //  One handle per platform; leave it blank ("") to hide that platform
  //  everywhere. A full profile URL works too (handy for Mastodon instances
  //  or Stack Overflow's numeric profile links). Order here is display order.
  //  Icons, colors and URL patterns live in src/lib/socials.tsx.
  socials: {
    twitter: "senbuilds",
    github: "buddhsen-tripathi",
    linkedin: "buddhsen-tripathi",
    leetcode: "buddhsen",
    tryhackme: "btripathi",
    codeforces: "Buddhsen",
    instagram: "",
    youtube: "",
    threads: "",
    bluesky: "",
    mastodon: "",
    reddit: "",
    discord: "btr1pathi",
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
    huggingface: "Buddhsen",
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
  } satisfies Record<SocialPlatform, string>,

  // Hover-card details for platforms without a public profile API.
  socialPreviews: {
    linkedin: {
      headline: "MSCS @ NYU’27 | ex-Amadeus | Building DeepFind.Me, Bucket0.com | AI × Infra",
      location: "Brooklyn, New York, United States",
      connections: "500+",
    },
  },

  // ── SEO defaults ──────────────────────────────────────────────────────────
  seo: {
    titleTemplate: "%s | Buddhsen Tripathi",
    defaultTitle: "Buddhsen Tripathi, software engineer in New York",
    defaultDescription:
      "Software engineer in New York building AI agents and products. MS CS at NYU, previously at Amadeus. Projects, hackathon wins, and writing.",
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
    { path: "/", name: "Home" },
    { path: "/projects", name: "Projects" },
    { path: "/experience", name: "Experience" },
    { path: "/hackathons", name: "Hacks" },
    { path: "/blogs", name: "Blogs" },
  ],

  // ── Content: Experiences ──────────────────────────────────────────────────
  experiences: [
    {
      role: "Course Assistant",
      year: "Sep 2026 - Present",
      company: "New York University",
      type: "Part-time",
      location: "Brooklyn, On-Site",
      logo: "https://cdn.buddhsentripathi.com/assets/company/nyu.jpg?v=20261018",
      responsibility: [
        [
          { text: "Course Assistant for " },
          { text: "Software Engineering I (CS-GY-6063)", bold: true },
          { text: " at NYU Tandon School of Engineering." },
        ],
      ],
      techstacks: [] as string[],
    },
    {
      role: "Software Development Intern",
      year: "Jan 2023 - Jun 2023",
      company: "Amadeus",
      type: "Internship",
      location: "Bengaluru, On-Site",
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
      location: "Bengaluru, Hybrid",
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
      featured: true,
      category: "SaaS · OSINT Platform",
      description:
        "Educational OSINT platform offering tools and resources to help users understand and manage their digital footprint.",
      techstacks: ["Next.js", "NestJS", "FastAPI", "PostgreSQL", "Docker", "AWS", "OpenAI API"],
      status: "acquired",
      link: "https://deepfind.me",
      preview: "https://cdn.buddhsentripathi.com/assets/projects/deepfindme.png",
    },
    {
      title: "Nimu",
      featured: true,
      category: "SaaS · AI Outreach",
      description:
        "AI outreach platform with automated domain authentication, multi-step campaigns, mailbox warm-up, and real-time deliverability monitoring.",
      techstacks: ["TanStack Start", "Hono", "Drizzle ORM", "Supabase", "Cloudflare Queues", "Better Auth", "AWS", "Docker"],
      status: "live",
      link: "https://nimu.app",
      preview: "https://cdn.buddhsentripathi.com/assets/projects/nimu-light.png?v=20260729",
      previewDark: "https://cdn.buddhsentripathi.com/assets/projects/nimu-dark.png?v=20260729",
    },
    {
      title: "OSINT Kit",
      featured: true,
      category: "Open Source · Security",
      description:
        "Curated directory of OSINT tools for researchers and security folks, from breach search and metadata analysis to geolocation and social media intelligence.",
      techstacks: ["Astro", "TypeScript"],
      status: "live",
      link: "https://buddhsen-tripathi.github.io/OSINT-Kit/",
      github: "buddhsen-tripathi/OSINT-Kit",
      preview: "https://cdn.buddhsentripathi.com/assets/projects/osint-kit-light.webp?v=20261018",
      previewDark: "https://cdn.buddhsentripathi.com/assets/projects/osint-kit-dark.webp?v=20261018",
    },
    {
      title: "Music Scaling Laws",
      featured: true,
      category: "Research · Machine Learning",
      description:
        "Scaling-law study of Transformers vs LSTMs on symbolic music: trained 1M to 100M parameter models on Lakh MIDI converted to ABC notation and fit loss against model size. Transformers scale more than twice as steeply (α 0.60 vs 0.27).",
      techstacks: ["Python", "PyTorch", "NumPy", "SciPy", "music21"],
      status: "research",
      link: "https://github.com/buddhsen-tripathi/music-scaling-laws",
      github: "buddhsen-tripathi/music-scaling-laws",
      preview: "https://cdn.buddhsentripathi.com/assets/projects/music-scaling-laws.webp?v=20261018",
    },
    {
      title: "Bucket0",
      category: "SaaS · Storage",
      description:
        "Platform to store files and manage all your S3-compatible buckets in a single, powerful interface - now with a native mobile app.",
      techstacks: ["Next.js", "TypeScript", "PostgreSQL", "S3 API", "Expo"],
      status: "live",
      link: "https://bucket0.com",
      preview: "https://cdn.buddhsentripathi.com/assets/projects/bucket0-light.png",
      previewDark: "https://cdn.buddhsentripathi.com/assets/projects/bucket0-dark.png",
    },
    {
      title: "OpenVScan",
      category: "Open Source · Security",
      description:
        "Web-based vulnerability scanner that integrates open-source tools with AI to deliver smarter, faster and more reliable pre-production security testing.",
      techstacks: ["TanStack Start", "Drizzle ORM", "Cloudflare Workers", "Cloudflare D1", "Cloudflare R2", "Cloudflare Queues"],
      status: "live",
      link: "https://www.openvscan.com",
      github: "buddhsen-tripathi/openvscan",
      preview: "https://cdn.buddhsentripathi.com/assets/projects/openvscan-light.png",
      previewDark: "https://cdn.buddhsentripathi.com/assets/projects/openvscan-dark.png",
    },
    {
      title: "openai-api-helper",
      category: "Open Source · npm Package",
      description:
        "Straightforward npm package designed to simplify making calls to the OpenAI API for various text-based prompts and responses.",
      techstacks: ["JavaScript", "TypeScript"],
      status: "active",
      link: "https://www.npmjs.com/package/openai-api-helper",
      github: "buddhsen-tripathi/openai-api-helper",
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
      title: "Live Futures Ranking",
      event: "Everesteer Hedge Fund Hackathon",
      year: "Sep 2026",
      placement: "2nd Place",
      college: "Monk HQ, NYC",
      body: [
        { text: "Placed 2nd in a " },
        { text: "live money-on-the-line prediction tournament", bold: true },
        { text: ", turning " },
        { text: "50 into ~86 USDC (+72%)", bold: true },
        { text: " across " },
        { text: "4 live rounds", bold: true },
        { text: ". Ranked ~90 anonymized futures by 20-day returns and ran the full pipeline: walk-forward tests, model training, staking scripts, and live execution. Gains came from " },
        { text: "targets, not algorithms", bold: true },
        { text: ": a 3-variant LightGBM blend with the benchmark, an Azurki auxiliary-target hedge, plus a distill and MLP for diversity. Cut live underperformers and moved stake onto the core models once they beat the benchmark." },
      ],
      techstacks: ["Python", "LightGBM", "XGBoost", "CatBoost", "Pandas"],
      link: [
        "https://luma.com/sdnfy9kp",
        "https://www.linkedin.com/feed/update/urn:li:activity:7509037352930033664/",
      ],
    },
    {
      title: "AI Security Analyst",
      event: "AI × Finance Hackathon — Money Talks",
      year: "Sep 2026",
      placement: "2nd Place",
      college: "New York, NY",
      body: [
        { text: "Built " },
        { text: "AI Security Analyst", bold: true },
        { text: ", an " },
        { text: "evidence-first vendor-security questionnaire agent", bold: true },
        { text: " for the Regodit track. It parsed policies, SOC 2 reports, and access reviews into sourced claims, filled a " },
        { text: "66-question buyer workbook", bold: true },
        { text: " without inventing answers, then applied the " },
        { text: "buyer's own risk tables", bold: true },
        { text: " so the vendor sees predicted rating, escalations, and a fix-first list before sending." },
      ],
      techstacks: ["React", "Vite", "Tailwind CSS", "FastAPI", "Python", "OpenRouter", "Neon Postgres", "PRISM"],
      link: [
        "https://github.com/Alred-79/AI-x-Finance-Wall-street-Hackathon",
        "https://builderbase.com/event/ai-x-finance-hackathon-money-talks-bjl2",
      ],
    },
    {
      title: "ClaimAid",
      event: "Pulse Foundry AI NYC × ABI Frameworks",
      year: "Jun 2026",
      placement: "2nd Place",
      college: "Soma Capital, NYC",
      body: [
        { text: "Built " },
        { text: "ClaimAid", bold: true },
        { text: ", an " },
        { text: "AI-powered wound-care billing triage", bold: true },
        { text: " tool for post-acute care facilities. Ingested " },
        { text: "300 synthetic patients", bold: true },
        { text: " from a rate-limited PointClickCare API, extracted wound fields from SOAP, prose, multi-wound, and narrative notes, then routed each case through a " },
        { text: "three-gate triage engine", bold: true },
        { text: " into auto-accept, flag-for-review, or reject, cutting the biller queue by " },
        { text: "66%", bold: true },
        { text: "." },
      ],
      techstacks: ["Next.js", "React", "TypeScript", "Tailwind CSS", "FastAPI", "Python", "PostgreSQL", "Pandas"],
      link: [
        "https://github.com/buddhsen-tripathi/ab1-hackathon",
        "https://pulsefoundry.ai/hackathons/6a2622ee4bf99f7110ff33eb/projects/6a4185ef4da84c75d82607e4",
      ],
    },
    {
      title: "FRTC",
      event: "vibeFORWARD: M2 - Agents",
      year: "Jun 2026",
      placement: "1st Place",
      college: "Fordham Gabelli School of Business",
      body: [
        { text: "Built " },
        { text: "FRTC", bold: true },
        { text: ", an " },
        { text: "autonomous fraud-ring investigator", bold: true },
        { text: " for bank analysts. It analyzes " },
        { text: "90 days of transactions", bold: true },
        { text: ", coordinates six specialist agents plus a Skeptic through a shared Cognee memory graph, and streams the investigation live to a graph UI." }
      ],
      techstacks: ["Next.js", "FastAPI", "Gemini", "Cognee", "Kuzu", "React", "TypeScript", "Python"],
      link: ["https://github.com/ht-epistolist/67hack", "https://devpost.com/software/frtc-g2izs8?ref_content=my-projects-tab&ref_feature=my_projects"],
    },
    {
      title: "Denial Rescue: RossMD",
      event: "Agentic Engineering Hack",
      year: "May 2026",
      placement: "2nd Place",
      college: "Datadog HQ, NYC",
      body: [
        { text: "Built " },
        { text: "Denial Rescue: RossMD", bold: true },
        { text: ", a " },
        { text: "seven-agent healthcare-regulatory legal team", bold: true },
        { text: " in software. Feed it a payer denial, a HIPAA breach, or an OIG subpoena and it issue-spots the exposure, researches it against a " },
        { text: "~1,900-authority corpus", bold: true },
        { text: " of federal health law, war-games the opposing side, and drafts cited attorney work product — supervised and streamed live in " },
        { text: "~90 seconds", bold: true },
        { text: "." },
      ],
      techstacks: ["Next.js", "FastAPI", "OpenRouter", "Gemini", "ClickHouse", "Datadog"],
      link: ["https://github.com/buddhsen-tripathi/rossMD", "https://devpost.com/software/denial-rescue-rossmd"],
    },
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
    {
      title: "NYU Pal",
      event: "LLUS NYU x Pulse NYC Hackathon",
      year: "Apr 2026",
      placement: "3rd Place",
      college: "NYU Kimmel Center",
      body: [
        { text: "Built " },
        { text: "NYU Pal", bold: true },
        { text: ", an " },
        { text: "agentic AI platform", bold: true },
        { text: " unifying a dozen scattered NYU student tools around three primitives — " },
        { text: "Space, Items, and Knowledge", bold: true },
        { text: ". Ships eight features in one MVP: study-space finder, marketplace exchange, peer mentoring with resume matching, live printer tracker, activity-partner matcher, community notes, sublet listings, and an AI professor lookup — all routed through " },
        { text: "Claude Sonnet 4.6 with tool calling", bold: true },
        { text: "." },
      ],
      techstacks: ["Next.js", "TypeScript", "Tailwind CSS", "Drizzle ORM", "Neon Postgres", "Claude API", "Vercel AI SDK", "Leaflet"],
      link: "https://github.com/buddhsen-tripathi/nyu-maxxxxing",
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