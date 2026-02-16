import { HeroSection, Experience, FeaturedProjects, FeaturedPosts, SocialsConnect } from '@/components/landing'
import { NewsletterSubscription } from '@/components/common'
import { getAllBlogPosts } from '@/app/blogs/utils'
import { Metadata } from 'next'
import { cookies } from 'next/headers'
import { LANGUAGE_COOKIE, resolveLanguage } from '@/lib/i18n'
import { homeSeoContent } from '@/data/seoContent'

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies()
  const language = resolveLanguage(cookieStore.get(LANGUAGE_COOKIE)?.value)
  const content = homeSeoContent[language]
  const ogLocale = language === 'zh' ? 'zh_CN' : 'en_US'

  return {
    title: content.title,
    description: content.description,
    alternates: {
      canonical: 'https://buddhsentripathi.com',
    },
    openGraph: {
      type: 'website',
      locale: ogLocale,
      url: 'https://buddhsentripathi.com',
      title: content.title,
      description: content.description,
      siteName: 'Buddhsen Tripathi Portfolio',
      images: [
        {
          url: 'https://buddhsentripathi.com/default-image.webp',
          width: 1200,
          height: 630,
          alt: content.imageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: content.title,
      description: content.description,
      images: ['https://buddhsentripathi.com/default-image.webp'],
      creator: '@btr1pathi',
    },
  }
}

export default async function Home() {
  const blogPosts = await getAllBlogPosts()

  return (
    <main className="flex-1">
      <section className="space-y-16">
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
