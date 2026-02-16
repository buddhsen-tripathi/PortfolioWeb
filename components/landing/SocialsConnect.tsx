import Link from 'next/link'
import { ArrowUpRight, Calendar } from 'lucide-react'
import { socialLinks } from '@/data/socials'
import { socialsConnectContent } from '@/data/landingContent'
import { Language } from '@/lib/i18n'

type SocialsConnectProps = {
  language: Language
}

export default function SocialsConnect({ language }: SocialsConnectProps) {
  const content = socialsConnectContent[language]

  return (
    <section className="space-y-6 duration-1000 animate-in fade-in fill-mode-both">
      {/* Socials */}
      <div className="space-y-4">
        <h2 className="font-serif text-xl font-medium italic leading-snug text-primary">
          {content.sectionTitle}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {socialLinks.map(({ href, icon: Icon, label, display }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm text-muted-foreground transition-all hover:text-primary group"
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span className="relative after:absolute after:-bottom-0.5 after:left-0 after:h-[1.5px] after:w-0 after:bg-primary after:transition-all after:duration-300 group-hover:after:w-full">
                {display}
              </span>
              <ArrowUpRight className="h-3.5 w-3.5 opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
            </a>
          ))}
        </div>
      </div>

      {/* Connect */}
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          {content.connectText}
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <a
            href="https://cal.com/buddhsen"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-sm text-primary-foreground bg-primary hover:bg-primary/90 transition-all duration-300"
          >
            <Calendar size={14} />
            {content.scheduleMeet}
            <ArrowUpRight size={12} />
          </a>
          <Link
            href="/Resume.pdf"
            target="_blank"
            className="relative inline-flex items-center gap-0.5 text-sm font-normal text-muted-foreground transition-all after:absolute after:-bottom-0.5 after:left-0 after:h-[1.5px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:gap-1 hover:text-primary hover:after:w-full"
          >
            <span>{content.resume}</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
