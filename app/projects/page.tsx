import { FeaturedProjects } from '@/components/landing'
import { getBreadcrumbSchema } from '@/lib/jsonLd'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects - Buddhsen Tripathi',
  description: 'Explore my latest projects, including web applications, open-source tools, and experiments in technology and programming.',
  alternates: {
    canonical: 'https://buddhsentripathi.com/projects',
  },
  openGraph: {
    title: 'Projects - Buddhsen Tripathi',
    description: 'Explore my latest projects, including web applications, open-source tools, and experiments in technology and programming.',
    url: 'https://buddhsentripathi.com/projects',
    siteName: 'Buddhsen Tripathi',
    images: [
      {
        url: 'https://buddhsentripathi.com/default-image-project.webp',
        width: 1200,
        height: 630,
        alt: 'Projects - Buddhsen Tripathi',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projects - Buddhsen Tripathi',
    description: 'Explore my latest projects, including web applications, open-source tools, and experiments in technology and programming.',
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
      <header className="space-y-2">
        <h1 className="font-serif text-xl font-medium italic text-foreground">projects.</h1>
        <p className="text-sm text-muted-foreground">Things I've built and worked on</p>
      </header>
      <FeaturedProjects />
    </div>
  )
}