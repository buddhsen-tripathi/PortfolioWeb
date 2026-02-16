import { FeaturedProjects } from '@/components/landing'
import ProjectsHeader from '@/components/projects/ProjectsHeader'
import { getBreadcrumbSchema } from '@/lib/jsonLd'
import { Metadata } from 'next'
import { cookies } from 'next/headers'
import { LANGUAGE_COOKIE, resolveLanguage } from '@/lib/i18n'
import { projectsSeoContent } from '@/data/seoContent'

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies()
  const language = resolveLanguage(cookieStore.get(LANGUAGE_COOKIE)?.value)
  const content = projectsSeoContent[language]
  const ogLocale = language === 'zh' ? 'zh_CN' : 'en_US'

  return {
    title: content.title,
    description: content.description,
    alternates: {
      canonical: 'https://buddhsentripathi.com/projects',
    },
    openGraph: {
      title: content.title,
      description: content.description,
      url: 'https://buddhsentripathi.com/projects',
      siteName: 'Buddhsen Tripathi',
      images: [
        {
          url: 'https://buddhsentripathi.com/default-image-project.webp',
          width: 1200,
          height: 630,
          alt: content.imageAlt,
        },
      ],
      locale: ogLocale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: content.title,
      description: content.description,
      images: ['https://buddhsentripathi.com/default-image-project.webp'],
    },
  }
}

const breadcrumbJsonLd = getBreadcrumbSchema([
  { name: 'Home', url: 'https://buddhsentripathi.com' },
  { name: 'Projects', url: 'https://buddhsentripathi.com/projects' },
])

export default function ProjectsPage() {
  return (
    <div className="space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ProjectsHeader />
      <FeaturedProjects />
    </div>
  )
}
