export const projects = [
  {
    title: "DeepFind.Me",
    description: "Deepfind.me is an educational OSINT platform offering tools and resources to help users understand and manage their digital footprint.",
    descriptionZh: "Deepfind.me 是一个教育型 OSINT 平台，提供工具和资源，帮助用户理解并管理自己的数字足迹。",
    github: null,
    demo: "https://deepfind.me",
    technologies: ["Next.Js", "NestJs", "PostgreSQL", "Docker", "AWS", "Web Crypto API", "OpenAI API"],
    status: "live" as const,
  },
  {
    title: "Bucket0",
    description: "Platform to store files and manage all your S3-compatible buckets in a single, powerful interface.",
    descriptionZh: "一个用于存储文件并统一管理所有 S3 兼容存储桶的强大平台。",
    github: null,
    demo: "https://bucket0.com",
    technologies: ["Next.Js", "TypeScript", "PostgreSQL", "Tailwind CSS"],
    status: "live" as const,
  },
  {
    title: "Clonvo",
    description: "Developer-centric SEO platform that evaluates site health across critical metrics and provides actionable fixes for optimization.",
    descriptionZh: "面向开发者的 SEO 平台，可基于关键指标评估站点健康度并提供可执行的优化建议。",
    github: null,
    demo: "https://clonvo.com",
    technologies: ["Next.Js", "TypeScript", "Tailwind CSS"],
    status: "live" as const,
  },
  {
    title: "OpenVScan",
    description: "OpenVScan is a web-based vulnerability scanner that integrates open-source tools with AI to deliver smarter, faster and more reliable pre-production security testing.",
    descriptionZh: "OpenVScan 是一款基于 Web 的漏洞扫描器，将开源工具与 AI 结合，提供更智能、更快速且更可靠的预生产安全测试。",
    github: "https://github.com/Buddhsen-tripathi/openvscan",
    demo: "https://www.openvscan.com",
    technologies: ["Next.Js", "NestJs", "TypeScript", "Tailwind CSS"],
    status: "building" as const,
  },
  {
    title: "openai-api-helper",
    description: "Straightforward npm package designed to simplify making calls to the OpenAI API for various text-based prompts and responses.",
    descriptionZh: "一个简洁的 npm 包，用于简化调用 OpenAI API 处理各类文本提示与响应。",
    github: "https://github.com/Buddhsen-tripathi/openai-api-helper",
    demo: "https://www.npmjs.com/package/openai-api-helper",
    technologies: ["JavaScript", "TypeScript"],
    status: "completed" as const,
  },
  {
    title: "SmartText Enhancer",
    description: "Productivity-focused Chrome extension that uses AI to summarize content and check spelling and grammar.",
    descriptionZh: "一款以效率为核心的 Chrome 扩展，利用 AI 进行内容摘要并检查拼写与语法。",
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
    descriptionZh: "输入 Twitter/X 用户名，使用 AI 分析其近期活动是否存在垃圾信息倾向。",
    github: null,
    demo: "https://www.buddhsentripathi.com/spam-or-not",
    technologies: [] as string[],
    path: "spam-or-not"
  },
  {
    title: "Code Runner",
    description: "A fast-paced game where you dodge bugs and climb the leaderboard. Sharpen your reflexes and aim for the top.",
    descriptionZh: "一款节奏紧凑的小游戏，你需要躲避 bug 并冲击排行榜，锻炼反应力并挑战更高分。",
    github: null,
    demo: "https://www.buddhsentripathi.com/code-runner",
    technologies: [] as string[],
    path: "code-runner"
  }
]
