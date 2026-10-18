import { ArrowUpRight } from "lucide-react";
import { SiDevpost } from "react-icons/si";
import GithubIcon from "@/components/icons/github";
import LinkedinIcon from "@/components/icons/linkedin";
import PageHeader from "@/components/site/page-header";
import Section from "@/components/site/section";
import { hackathons } from "@/constants";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/site.config";
import { TechBadge } from "@/lib/tech-icons";
import { cn } from "@/lib/utils";

export const metadata = buildMetadata({
  title: siteConfig.pages.hackathons.title,
  description: siteConfig.pages.hackathons.description,
  path: "/hackathons",
});

type Hackathon = (typeof hackathons)[number];
type Segment = { text: string; bold?: boolean };

const rank = (placement: string) => parseInt(placement, 10) || 99;

const medal: Record<number, string> = {
  1: "border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-400",
  2: "border-zinc-400/40 bg-zinc-400/10 text-zinc-600 dark:text-zinc-300",
  3: "border-orange-700/40 bg-orange-700/10 text-orange-700 dark:text-orange-400",
};

const groups = [
  { rank: 1, title: "First place" },
  { rank: 2, title: "Second place" },
  { rank: 3, title: "Third place" },
];

function linkMeta(url: string) {
  const host = (() => {
    try {
      return new URL(url).hostname.replace(/^www\./, "");
    } catch {
      return "";
    }
  })();
  if (host === "github.com")
    return { label: "Code", icon: <GithubIcon className="size-3.5" /> };
  if (host === "devpost.com")
    return { label: "Devpost", icon: <SiDevpost className="size-3.5" /> };
  if (host === "linkedin.com")
    return { label: "Post", icon: <LinkedinIcon className="size-3.5" /> };
  return { label: "Event", icon: <ArrowUpRight className="size-3.5" /> };
}

function Entry({ h }: { h: Hackathon }) {
  const links = Array.isArray(h.link) ? h.link : [h.link];
  const body = h.body as Segment[] | string;

  return (
    <article className="border-border border-b border-dashed px-6 py-6 last:border-b-0">
      <div className="flex items-start gap-3">
        <span
          className={cn(
            "mt-0.5 w-11 shrink-0 rounded border py-0.5 text-center font-mono text-[11px] font-medium",
            medal[rank(h.placement)],
          )}
        >
          {h.placement.split(" ")[0]}
        </span>
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4">
            <h3 className="text-[15px] font-semibold tracking-tight">
              {h.title}
            </h3>
            <span className="text-muted-foreground font-mono text-[11px]">
              {h.year}
            </span>
          </div>
          <p className="text-muted-foreground text-[13px]">
            {h.event}
            {h.college && (
              <span className="text-muted-foreground/70"> · {h.college}</span>
            )}
          </p>
        </div>
      </div>

      <p className="text-muted-foreground mt-4 text-[14px] leading-relaxed sm:pl-14">
        {Array.isArray(body)
          ? body.map((seg, i) =>
              seg.bold ? (
                <span key={i} className="text-foreground font-medium">
                  {seg.text}
                </span>
              ) : (
                <span key={i}>{seg.text}</span>
              ),
            )
          : body}
      </p>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 sm:pl-14">
        <div className="flex min-w-0 flex-wrap gap-1">
          {h.techstacks.map((tech) => (
            <TechBadge key={tech} name={tech} />
          ))}
        </div>
        <div className="flex items-center gap-1.5">
          {links.map((href) => {
            const { label, icon } = linkMeta(href);
            return (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="border-border text-muted-foreground hover:bg-muted/50 hover:text-foreground flex h-7 items-center gap-1.5 rounded-md border px-2 text-xs transition-colors"
              >
                {icon}
                {label}
              </a>
            );
          })}
        </div>
      </div>
    </article>
  );
}

export default function HackathonsPage() {
  const wins = hackathons.filter((h) => rank(h.placement) === 1).length;

  return (
    <>
      <PageHeader
        title={siteConfig.pages.hackathons.title}
        description={siteConfig.pages.hackathons.intro}
        meta={
          <>
            <span>{hackathons.length} podiums</span>
            <span aria-hidden>·</span>
            <span>{wins} wins</span>
          </>
        }
      />
      {groups.map(({ rank: r, title }) => {
        const items = hackathons.filter((h) => rank(h.placement) === r);
        if (!items.length) return null;
        return (
          <Section
            key={r}
            id={`place-${r}`}
            title={title}
            meta={`${items.length}`}
          >
            {items.map((h) => (
              <Entry key={h.title} h={h} />
            ))}
          </Section>
        );
      })}
    </>
  );
}
