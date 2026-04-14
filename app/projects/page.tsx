import { FeaturedProjects } from '@/components/landing'
import ProjectsHeader from '@/components/projects/ProjectsHeader'
import { getBreadcrumbSchema } from '@/lib/jsonLd'
import { Metadata } from 'next'
import { projectsSeoContent } from '@/data/seoContent'

export const metadata: Metadata = {
  title: projectsSeoContent.title,
  description: projectsSeoContent.description,
  alternates: {
    canonical: 'https://buddhsentripathi.com/projects',
  },
  openGraph: {
    title: projectsSeoContent.title,
    description: projectsSeoContent.description,
    url: 'https://buddhsentripathi.com/projects',
    siteName: 'Buddhsen Tripathi',
    images: [
      {
        url: 'https://buddhsentripathi.com/default-image-project.webp',
        width: 1200,
        height: 630,
        alt: projectsSeoContent.imageAlt,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: projectsSeoContent.title,
    description: projectsSeoContent.description,
    images: ['https://buddhsentripathi.com/default-image-project.webp'],
  },
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
