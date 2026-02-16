'use client'

import Image from 'next/image'
import Link from 'next/link'
import { LinkText, useLanguage } from '@/components/common'
import { heroContent } from '@/data/landingContent'

export default function Hero() {
  const { language } = useLanguage()
  const content = heroContent[language]

  return (
    <section className="space-y-8 duration-1000 animate-in fade-in fill-mode-both">
      {/* Header Section */}
      <div className="flex flex-row items-center justify-start gap-4 pb-2">
        <div className="relative h-fit w-fit flex-shrink-0">
          <Image
            src="/profpic.jpg"
            alt="Buddhsen Tripathi"
            width={64}
            height={64}
            className="rounded-full transition-all"
            priority
          />
        </div>
        <div>
          <h1 className="text-2xl font-semibold leading-snug tracking-tighter text-primary">
            {content.displayName}
          </h1>
          <p className="mt-1 text-base font-normal leading-snug text-muted-foreground">
            {content.role}
          </p>
        </div>
      </div>

      {/* About Section */}
      <div className="space-y-4 animation-delay-300">
        <h2 className="font-serif text-xl font-medium italic leading-snug text-primary">
          {content.aboutTitle}
        </h2>
        <div className="prose max-w-full text-sm font-normal leading-6 text-muted-foreground dark:prose-invert">
          <p>
            {content.intro}
          </p>
          <p>
            {content.educationPrefix}
            <LinkText href="https://engineering.nyu.edu/academics/programs/computer-science-ms" className="font-medium">
              {content.educationLinkText}
            </LinkText>
            {content.educationSuffix}
            <Link href="#projects" className="text-primary hover:underline">
              {content.projectsLinkText}
            </Link>
            {content.closing}
          </p>
        </div>
      </div>

    </section>
  )
}
