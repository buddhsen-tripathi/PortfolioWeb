import { HeroSection, Experience, FeaturedProjects, FeaturedPosts, SocialsConnect } from '@/components/landing'
import { NewsletterSubscription } from '@/components/common'
import { getAllBlogPosts } from '@/app/blogs/utils'
import { Metadata } from 'next'
import { homeSeoContent } from '@/data/seoContent'

export const metadata: Metadata = {
  title: homeSeoContent.title,
  description: homeSeoContent.description,
  alternates: {
    canonical: 'https://buddhsentripathi.com',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://buddhsentripathi.com',
    title: homeSeoContent.title,
    description: homeSeoContent.description,
    siteName: 'Buddhsen Tripathi Portfolio',
    images: [
      {
        url: 'https://buddhsentripathi.com/default-image.webp',
        width: 1200,
        height: 630,
        alt: homeSeoContent.imageAlt,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: homeSeoContent.title,
    description: homeSeoContent.description,
    images: ['https://buddhsentripathi.com/default-image.webp'],
    creator: '@btr1pathi',
  },
}

export default async function Home() {
  const blogPosts = await getAllBlogPosts()

  return (
    <main className="flex-1">
      <section className="space-y-12">
        <HeroSection />
        <Experience />
        <FeaturedProjects />
        <SocialsConnect />
        <FeaturedPosts posts={blogPosts} />
        <NewsletterSubscription />
      </section>
    </main>
  )
}
