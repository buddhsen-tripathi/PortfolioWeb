import { HeroSection, Experience, FeaturedProjects, FeaturedPosts, SocialsConnect } from '@/components/landing'
import { NewsletterSubscription } from '@/components/common'
import { cookies } from 'next/headers'
import { LANGUAGE_COOKIE, resolveLanguage } from '@/lib/i18n'

export default async function Home() {
  const cookieStore = await cookies()
  const language = resolveLanguage(cookieStore.get(LANGUAGE_COOKIE)?.value)

  return (
    <main className="flex-1">
      <section className="space-y-16">
        <HeroSection language={language} />
        <Experience language={language} />
        <FeaturedProjects />
        <SocialsConnect language={language} />
        <FeaturedPosts language={language} />
        <NewsletterSubscription />
      </section>
    </main>
  )
}
