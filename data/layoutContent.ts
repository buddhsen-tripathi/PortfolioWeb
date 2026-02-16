import { Language } from '@/lib/i18n'

type Localized<T> = Record<Language, T>

export const navbarContent: Localized<{
  home: string
  projects: string
  blogs: string
  languageToggle: string
}> = {
  en: {
    home: 'home',
    projects: 'projects',
    blogs: 'blogs',
    languageToggle: '中文',
  },
  zh: {
    home: '主页',
    projects: '项目',
    blogs: '博客',
    languageToggle: 'EN',
  },
}

export const footerContent: Localized<{
  ownerName: string
}> = {
  en: {
    ownerName: 'Buddhsen Tripathi',
  },
  zh: {
    ownerName: '布德森·特里帕蒂',
  },
}

export const projectsPageContent: Localized<{
  title: string
  subtitle: string
}> = {
  en: {
    title: 'projects.',
    subtitle: "Things I've built and worked on",
  },
  zh: {
    title: '项目。',
    subtitle: '我构建和参与过的项目',
  },
}
