import { Language } from '@/lib/i18n'

type Localized<T> = Record<Language, T>

export const homeSeoContent: Localized<{
  title: string
  description: string
  imageAlt: string
}> = {
  en: {
    title: 'Buddhsen Tripathi',
    description: 'Full stack web developer portfolio showcasing projects and skills in Next.js, React, TypeScript, and full-stack development and technical blogs',
    imageAlt: 'Buddhsen Tripathi Portfolio',
  },
  zh: {
    title: '布德森·特里帕蒂',
    description: '全栈开发者作品集，展示 Next.js、React、TypeScript 相关项目、工程能力与技术博客内容。',
    imageAlt: '布德森·特里帕蒂作品集',
  },
}

export const projectsSeoContent: Localized<{
  title: string
  description: string
  imageAlt: string
}> = {
  en: {
    title: 'Projects - Buddhsen Tripathi',
    description: 'Explore my latest projects, including web applications, open-source tools, and experiments in technology and programming.',
    imageAlt: 'Projects - Buddhsen Tripathi',
  },
  zh: {
    title: '项目 - 布德森·特里帕蒂',
    description: '查看我近期的项目，包括 Web 应用、开源工具以及技术实验。',
    imageAlt: '项目 - 布德森·特里帕蒂',
  },
}
