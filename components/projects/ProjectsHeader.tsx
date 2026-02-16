'use client'

import { useLanguage } from '@/components/common'
import { projectsPageContent } from '@/data/layoutContent'

export default function ProjectsHeader() {
  const { language } = useLanguage()
  const content = projectsPageContent[language]

  return (
    <header className="space-y-2">
      <h1 className="font-serif text-xl font-medium italic text-foreground">
        {content.title}
      </h1>
      <p className="text-sm text-muted-foreground">{content.subtitle}</p>
    </header>
  )
}
