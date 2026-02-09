'use client'

import Image from 'next/image'
import Link from 'next/link'
import { LinkText } from '@/components/common'

export default function Hero() {
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
            Buddhsen Tripathi
          </h1>
          <p className="mt-1 text-base font-normal leading-snug text-muted-foreground">
            Full-Stack Developer • MS CS @ NYU
          </p>
        </div>
      </div>

      {/* About Section */}
      <div className="space-y-4 animation-delay-300">
        <h2 className="font-serif text-xl font-medium italic leading-snug text-primary">
          about me.
        </h2>
        <div className="prose max-w-full text-sm font-normal leading-6 text-muted-foreground dark:prose-invert">
          <p>
            Hey there! I&apos;m a software professional passionate about building
            scalable, user-centric applications with expertise in cloud infrastructure
            and microservices architecture.
          </p>
          <p>
            Currently pursuing my{" "}
            <LinkText href="https://engineering.nyu.edu/academics/programs/computer-science-ms" className="font-medium">
              MS in Computer Science at NYU
            </LinkText>
            {" "}with 2+ years of experience in full-stack development. In my free time, I enjoy{" "}
            <Link href="#projects" className="text-primary hover:underline">
              building projects
            </Link>
            , exploring cybersecurity and contributing to open-source.
          </p>
        </div>
      </div>

    </section>
  )
}
