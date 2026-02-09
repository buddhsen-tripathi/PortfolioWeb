export const projects = [
  {
    title: "DeepFind.Me",
    description: "Deepfind.me is an educational OSINT platform offering tools and resources to help users understand and manage their digital footprint.",
    github: null,
    demo: "https://deepfind.me",
    technologies: ["Next.Js", "NestJs", "PostgreSQL", "Docker", "AWS", "Web Crypto API", "OpenAI API"],
    status: "live" as const,
  },
  {
    title: "Bucket0",
    description: "Platform to store files and manage all your S3-compatible buckets in a single, powerful interface.",
    github: null,
    demo: "https://bucket0.com",
    technologies: ["Next.Js", "TypeScript", "PostgreSQL", "Tailwind CSS"],
    status: "live" as const,
  },
  {
    title: "Clonvo",
    description: "Developer-centric SEO platform that evaluates site health across critical metrics and provides actionable fixes for optimization.",
    github: null,
    demo: "https://clonvo.com",
    technologies: ["Next.Js", "TypeScript", "Tailwind CSS"],
    status: "live" as const,
  },
  {
    title: "OpenVScan",
    description: "OpenVScan is a web-based vulnerability scanner that integrates open-source tools with AI to deliver smarter, faster and more reliable pre-production security testing.",
    github: "https://github.com/Buddhsen-tripathi/openvscan",
    demo: "https://www.openvscan.com",
    technologies: ["Next.Js", "NestJs", "TypeScript", "Tailwind CSS"],
    status: "building" as const,
  },
  {
    title: "openai-api-helper",
    description: "Straightforward npm package designed to simplify making calls to the OpenAI API for various text-based prompts and responses.",
    github: "https://github.com/Buddhsen-tripathi/openai-api-helper",
    demo: "https://www.npmjs.com/package/openai-api-helper",
    technologies: ["JavaScript", "TypeScript"],
    status: "completed" as const,
  },
  {
    title: "SmartText Enhancer",
    description: "Productivity-focused Chrome extension that uses AI to summarize content and check spelling and grammar.",
    github: null,
    demo: "https://chromewebstore.google.com/detail/smarttext-enhancer/chmpfoicecijpgmgcpnfhakmeaofmipm",
    technologies: ["JavaScript", "HTML", "CSS", "Express", "OpenAI API"],
    status: "completed" as const,
  }
]

export const funProjects = [
  {
    title: "Twitter/X Spam Check",
    description: "Enter a Twitter/X username to analyze their recent activity for potential spam-like behavior using AI.",
    github: null,
    demo: "https://www.buddhsentripathi.com/spam-or-not",
    technologies: [] as string[],
    path: "spam-or-not"
  },
  {
    title: "Code Runner",
    description: "A fast-paced game where you dodge bugs and climb the leaderboard. Sharpen your reflexes and aim for the top.",
    github: null,
    demo: "https://www.buddhsentripathi.com/code-runner",
    technologies: [] as string[],
    path: "code-runner"
  }
]
