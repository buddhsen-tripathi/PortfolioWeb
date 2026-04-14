'use client'

import { projectsPageContent } from '@/data/layoutContent'

export default function ProjectsHeader() {
  return (
    <header className="space-y-2">
      <h1 className="font-serif text-xl font-medium italic text-foreground">
        {projectsPageContent.title}
      </h1>
      <p className="text-sm text-muted-foreground">{projectsPageContent.subtitle}</p>
    </header>
  )
}
