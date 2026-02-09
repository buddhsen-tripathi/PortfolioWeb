import { HeroSection, Experience, FeaturedProjects, FeaturedPosts, SocialsConnect } from '@/components/landing'
import { NewsletterSubscription } from '@/components/common'

export default function Home() {
  return (
    <main className="flex-1">
      <section className="space-y-16">
        <HeroSection />
        <Experience />
        <FeaturedProjects />
        <SocialsConnect />
        <FeaturedPosts />
        <NewsletterSubscription />
      </section>
    </main>
  )
}