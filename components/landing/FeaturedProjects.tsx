'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { ViewCounter, LinkText, useLanguage } from '@/components/common'
import { featuredProjectsContent } from '@/data/landingContent'
import { projects, funProjects } from '@/data/projects'

const parseProjectStatus = (
  status: 'live' | 'building' | 'completed',
  statusLabels: {
    live: string
    building: string
    completed: string
  },
): string => {
  switch (status) {
    case 'live':
      return statusLabels.live
    case 'building':
      return statusLabels.building
    case 'completed':
      return statusLabels.completed
    default:
      return ''
  }
}

export default function FeaturedProjects() {
  const pathname = usePathname()
  const { language } = useLanguage()
  const content = featuredProjectsContent[language]
  const isHomePage = pathname === '/'

  return (
    <section className="space-y-8 duration-1000 animate-in fade-in fill-mode-both animation-delay-900" id="projects">
      {isHomePage && (
        <h2 className="font-serif text-xl font-medium italic leading-snug text-primary">
          {content.sectionTitle}
        </h2>
      )}

      {/* Projects List */}
      <div className="space-y-6">
        {projects.slice(0, isHomePage ? 3 : projects.length).map((project) => (
          <div
            key={project.title}
            className="space-y-2 rounded-lg"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="font-normal capitalize text-primary">
                  {project.title}
                </h3>
                {project.status && (
                  <span className="text-xs text-muted-foreground opacity-70 hidden sm:inline">
                    [{parseProjectStatus(project.status, content.status)}]
                  </span>
                )}
              </div>
              <div className="flex flex-row items-center justify-start gap-3 text-sm">
                {project.demo && (
                  <LinkText href={project.demo} className="text-muted-foreground">
                    {content.liveLink}
                  </LinkText>
                )}
                {project.github && (
                  <LinkText href={project.github} className="text-muted-foreground">
                    github
                  </LinkText>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-sm font-normal text-muted-foreground leading-relaxed">
              {language === 'zh' ? (project.descriptionZh ?? project.description) : project.description}
            </p>

            {/* Technologies */}
            {project.technologies && project.technologies.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="text-xs text-muted-foreground opacity-70 hover:opacity-100 transition-opacity"
                  >
                    [{tech}]
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {isHomePage && (
        <Link
          href="/projects"
          className="group flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <span className="relative after:absolute after:-bottom-0.5 after:left-0 after:h-[1.5px] after:w-0 after:bg-primary after:transition-all after:duration-300 group-hover:after:w-full">
            {content.viewAll}
          </span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}

      {/* Fun X Projects Section */}
      {!isHomePage && (
        <div className="space-y-6 pt-8">
          <h2 className="font-serif text-xl font-medium italic leading-snug text-primary">
            {content.xSectionTitle}
          </h2>
          <p className="text-sm text-muted-foreground">
            {content.xSectionIntroPrefix}
            <a
              href="https://x.com/intent/follow?screen_name=btr1pathi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              @btr1pathi
            </a>
            {content.xSectionIntroSuffix}
          </p>

          <div className="space-y-6">
            {funProjects.map((project) => (
              <div
                key={project.title}
                className="space-y-2 rounded-lg"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-normal capitalize text-primary">
                    {project.title}
                  </h3>
                  <LinkText href={`/${project.path}`} className="text-muted-foreground">
                    {content.tryIt}
                  </LinkText>
                </div>

                <p className="text-sm font-normal text-muted-foreground leading-relaxed">
                  {language === 'zh' ? (project.descriptionZh ?? project.description) : project.description}
                </p>

                {project.path && (
                  <div className="text-xs text-muted-foreground opacity-60">
                    <ViewCounter slug={project.path} readOnly={true} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
