import { Language } from '@/lib/i18n'

type Localized<T> = Record<Language, T>

export const heroContent: Localized<{
  role: string
  aboutTitle: string
  intro: string
  educationPrefix: string
  educationLinkText: string
  educationSuffix: string
  projectsLinkText: string
  closing: string
}> = {
  en: {
    role: 'Full-Stack Developer • MS CS @ NYU',
    aboutTitle: 'about me.',
    intro: "Hey there! I'm a software professional passionate about building scalable, user-centric applications with expertise in cloud infrastructure and microservices architecture.",
    educationPrefix: 'Currently pursuing my ',
    educationLinkText: 'MS in Computer Science at NYU',
    educationSuffix: ' with 2+ years of experience in full-stack development. In my free time, I enjoy ',
    projectsLinkText: 'building projects',
    closing: ', exploring cybersecurity and contributing to open-source.',
  },
  zh: {
    role: '全栈开发者 • 纽约大学计算机科学硕士',
    aboutTitle: '关于我。',
    intro: '你好！我是一名软件工程师，专注于构建可扩展、以用户为中心的应用，在云基础设施和微服务架构方面有丰富经验。',
    educationPrefix: '目前正在攻读',
    educationLinkText: '纽约大学计算机科学硕士',
    educationSuffix: '，并拥有 2 年以上全栈开发经验。业余时间我喜欢',
    projectsLinkText: '做项目',
    closing: '、研究网络安全并参与开源社区。',
  },
}

export const experienceContent: Localized<{
  sectionTitle: string
  companyPrefix: string
}> = {
  en: {
    sectionTitle: 'experience.',
    companyPrefix: 'at ',
  },
  zh: {
    sectionTitle: '经历。',
    companyPrefix: '在 ',
  },
}

export const featuredProjectsContent: Localized<{
  sectionTitle: string
  liveLink: string
  viewAll: string
  xSectionTitle: string
  xSectionIntroPrefix: string
  xSectionIntroSuffix: string
  tryIt: string
  status: {
    live: string
    building: string
    completed: string
  }
}> = {
  en: {
    sectionTitle: 'projects.',
    liveLink: 'live',
    viewAll: 'view all projects',
    xSectionTitle: '𝕏 projects.',
    xSectionIntroPrefix: 'Small projects to engage my 𝕏 community (',
    xSectionIntroSuffix: ')',
    tryIt: 'try it',
    status: {
      live: 'Live',
      building: 'Building',
      completed: 'Completed',
    },
  },
  zh: {
    sectionTitle: '项目。',
    liveLink: '在线',
    viewAll: '查看全部项目',
    xSectionTitle: '𝕏 项目。',
    xSectionIntroPrefix: '与我的 𝕏 社区互动的小项目（',
    xSectionIntroSuffix: '）',
    tryIt: '试一试',
    status: {
      live: '已上线',
      building: '开发中',
      completed: '已完成',
    },
  },
}

export const featuredPostsContent: Localized<{
  sectionTitle: string
  viewAll: string
}> = {
  en: {
    sectionTitle: 'recent blogs.',
    viewAll: 'view all blogs',
  },
  zh: {
    sectionTitle: '最近博客。',
    viewAll: '查看全部博客',
  },
}

export const socialsConnectContent: Localized<{
  sectionTitle: string
  connectText: string
  scheduleMeet: string
  resume: string
}> = {
  en: {
    sectionTitle: 'socials.',
    connectText: 'Interested in working together? Feel free to schedule a meet!',
    scheduleMeet: 'schedule a meet',
    resume: 'Resume',
  },
  zh: {
    sectionTitle: '社交。',
    connectText: '如果你有合作想法，欢迎随时预约交流！',
    scheduleMeet: '预约交流',
    resume: '简历',
  },
}
