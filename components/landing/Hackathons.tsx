'use client'

import { LinkText } from '@/components/common'

function prizeColor(prize: string): string {
  const lower = prize.toLowerCase()
  if (lower.includes('1st')) return 'text-amber-500'
  if (lower.includes('2nd')) return 'text-gray-400'
  if (lower.includes('3rd')) return 'text-amber-700'
  return 'text-muted-foreground opacity-70'
}

const hackathons = [
  {
    title: 'AI Blox',
    event: 'vibeFORWARD Hackathon',
    venue: 'Fordham Gabelli School of Business',
    date: 'Apr 2026',
    prize: '1st Place',
    description:
      'A visual, drag-and-drop AI engineering tool inspired by Scratch. Snap together 500+ building blocks for LoRA fine-tuning, RAG pipelines, and multi-agent orchestration, then generate production-ready code instantly.',
    link: 'https://devpost.com/software/ai-blox',
    technologies: ['Next.js', 'FastAPI', 'LangChain', 'Docker', 'TypeScript', 'Python'],
  },
]

export default function Hackathons() {
  return (
    <section className="space-y-6 duration-1000 animate-in fade-in fill-mode-both animation-delay-[1000ms]">
      <h2 className="font-serif text-xl font-medium italic leading-snug text-primary">
        hackathons.
      </h2>

      <div className="space-y-6">
        {hackathons.map((hack) => (
          <div key={hack.title} className="space-y-2 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="font-normal text-primary">{hack.event}</h3>
                <span className={`text-xs hidden sm:inline ${prizeColor(hack.prize)}`}>
                  [{hack.prize}]
                </span>
              </div>
              <LinkText href={hack.link} className="text-muted-foreground">
                info
              </LinkText>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              Built <span className="text-primary">{hack.title}</span>, {hack.description.charAt(0).toLowerCase() + hack.description.slice(1)}
            </p>

            <div className="text-xs text-muted-foreground opacity-70">
              {hack.venue} &bull; {hack.date}
            </div>

            {hack.technologies.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {hack.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="text-xs text-muted-foreground opacity-70 hover:opacity-100 transition-opacity"
                  >
                    [{tech}]
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
