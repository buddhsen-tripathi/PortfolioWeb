export const navLinks = [
  {
    path: "/",
    name: "About",
  },
  {
    path: "/projects",
    name: "Projects",
  },
  {
    path: "/blogs",
    name: "Blogs",
  },
  {
    path: "/experience",
    name: "Experience",
  },
];

export const notableAchievements = [];

export const intros = [
  "Software Engineer",
  "Full-Stack Developer",
  "Problem Solver",
  "Tech Geek",
];

export const experiences = [
  {
    role: "Software Development Engineer Intern",
    year: "Jan 2023 - Jun 2023",
    company: "Amadeus",
    type: "Internship",
    location: "Bangalore, On-Site",
    logo: "/company/amadeus.jpg",
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
    logo: "/company/amadeus.jpg",
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
];

export const projects = [
  {
    title: "DeepFind.Me",
    category: "SaaS · OSINT Platform",
    description:
      "Educational OSINT platform offering tools and resources to help users understand and manage their digital footprint.",
    techstacks: ["Next.js", "NestJS", "PostgreSQL", "Docker", "AWS", "OpenAI API"],
    status: "live",
    link: "https://deepfind.me",
    preview: "/projects/deepfindme.png",
  },
  {
    title: "Bucket0",
    category: "SaaS · Storage",
    description:
      "Platform to store files and manage all your S3-compatible buckets in a single, powerful interface.",
    techstacks: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS"],
    status: "live",
    link: "https://bucket0.com",
    preview: "/projects/bucket0-light.png",
    previewDark: "/projects/bucket0-dark.png",
  },
  {
    title: "Nimu",
    category: "SaaS · AI Outreach",
    description:
      "Reputation-first AI outreach platform with automated domain authentication, multi-step drip campaigns, mailbox warm-up, and real-time deliverability monitoring.",
    techstacks: ["Next.js", "NestJS", "PostgreSQL", "Docker", "AWS", "Tailwind CSS"],
    status: "building",
    link: "https://nimu.app",
    preview: "/projects/nimu-light.png",
    previewDark: "/projects/nimu-dark.png",
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
    preview: "/projects/openvscan.png",
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
    preview: "/projects/npm.png",
  },
  {
    title: "SmartText Enhancer",
    category: "Chrome Extension · AI",
    description:
      "Productivity-focused Chrome extension that uses AI to summarize content and check spelling and grammar.",
    techstacks: ["JavaScript", "HTML", "CSS", "Express", "OpenAI API"],
    status: "active",
    link: "https://chromewebstore.google.com/detail/smarttext-enhancer/chmpfoicecijpgmgcpnfhakmeaofmipm",
    preview: "/projects/sme.png",
  },
];

export const hackathons = [
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
];

export const research = [];
