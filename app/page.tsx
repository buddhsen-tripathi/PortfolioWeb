import { HeroSection, Experience, FeaturedProjects, FeaturedPosts, SocialsConnect } from '@/components/landing'
import { NewsletterSubscription } from '@/components/common'
import { getAllBlogPosts } from '@/app/blogs/utils'

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
