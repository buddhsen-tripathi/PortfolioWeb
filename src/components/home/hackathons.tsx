import { ArrowUpRight } from "lucide-react";
import { hackathons } from "@/constants";
import { cn } from "@/lib/utils";
import Section from "@/components/site/section";
import { siteConfig } from "@/site.config";

const SHOWN = 3;

const medal: Record<string, string> = {
  "1st Place": "border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-400",
  "2nd Place": "border-zinc-400/40 bg-zinc-400/10 text-zinc-600 dark:text-zinc-300",
  "3rd Place": "border-orange-700/40 bg-orange-700/10 text-orange-700 dark:text-orange-400",
};

const firstLink = (link: string | string[]) => (Array.isArray(link) ? link[0] : link);

const rank = (placement: string) => parseInt(placement, 10) || 99;

/* First places lead, then by placement; config order (newest first) breaks ties. */
const ordered = [...hackathons].sort((a, b) => rank(a.placement) - rank(b.placement));

export default function Hackathons() {
  const wins = hackathons.filter((h) => rank(h.placement) === 1).length;

  return (
    <Section
      id="hackathons"
      title={siteConfig.home.sections.hackathons.title}
      meta={`${hackathons.length} podiums · ${wins} wins`}
      more={
        hackathons.length > SHOWN
          ? { href: "/hackathons", label: `See all ${hackathons.length} hackathons` }
          : undefined
      }
    >
      <ul className="py-2">
        {ordered.slice(0, SHOWN).map((h) => (
          <li key={h.title}>
            <a
              href={firstLink(h.link)}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-3 px-6 py-3 outline-none focus-visible:bg-muted/30"
            >
              <span className="hatch pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span
                className={cn(
                  "relative w-11 shrink-0 rounded border py-0.5 text-center font-mono text-[11px] font-medium",
                  medal[h.placement]
                )}
              >
                {h.placement.split(" ")[0]}
              </span>
              <span className="relative flex min-w-0 flex-col">
                <span className="text-sm font-medium leading-tight">{h.title}</span>
                <span className="truncate text-[13px] text-muted-foreground">{h.event}</span>
              </span>
              <span className="relative ml-auto flex shrink-0 items-center gap-3">
                <span className="font-mono text-[11px] text-muted-foreground">{h.year}</span>
                <ArrowUpRight className="size-3.5 text-muted-foreground/50 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand" />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}
