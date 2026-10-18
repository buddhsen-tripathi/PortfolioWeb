import Image from "next/image";
import PageHeader from "@/components/site/page-header";
import Section from "@/components/site/section";
import { experiences } from "@/constants";
import {
  formatTenure,
  groupByCompany,
  monthsBetween,
  parseYearRange,
} from "@/lib/experience";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/site.config";
import { TechBadge } from "@/lib/tech-icons";

export const metadata = buildMetadata({
  title: siteConfig.pages.experience.title,
  description: siteConfig.pages.experience.description,
  path: "/experience",
});

type Segment = { text: string; bold?: boolean };

function Line({ line }: { line: Segment[] | string }) {
  if (typeof line === "string") return <>{line}</>;
  return (
    <>
      {line.map((seg, i) =>
        seg.bold ? (
          <span key={i} className="text-foreground font-medium">
            {seg.text}
          </span>
        ) : (
          <span key={i}>{seg.text}</span>
        ),
      )}
    </>
  );
}

export default function ExperiencePage() {
  const companies = groupByCompany(experiences);

  return (
    <>
      <PageHeader
        title={siteConfig.pages.experience.title}
        description={siteConfig.pages.experience.intro}
        meta={
          <>
            <span>{companies.length} organizations</span>
            <span aria-hidden>·</span>
            <span>{experiences.length} roles</span>
          </>
        }
      />

      <Section id="timeline" title="Timeline">
        {companies.map(({ company, roles }, index) => {
          const newest = roles[0];
          const tenure = roles.reduce(
            (sum, r) => sum + monthsBetween(r.year),
            0,
          );
          const current = /present/i.test(parseYearRange(newest.year).end);
          const city = newest.location?.split(",")[0];

          return (
            <div
              key={company}
              id={company.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
              className={
                index > 0 ? "border-border border-t border-dashed" : undefined
              }
            >
              <div className="flex items-center gap-3 px-6 pt-6">
                {newest.logo && (
                  <span className="size-12 border-border bg-muted relative shrink-0 overflow-hidden rounded-lg border">
                    <Image
                      src={newest.logo}
                      alt={`${company} logo`}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </span>
                )}
                <div className="flex min-w-0 flex-col">
                  <span className="text-[15px] font-semibold tracking-tight">
                    {company}
                  </span>
                  <span className="text-muted-foreground font-mono text-[11px]">
                    {city && `${city} · `}
                    {formatTenure(tenure)}
                  </span>
                </div>
                {current && (
                  <span className="border-brand/30 bg-brand/10 text-brand ml-auto rounded border px-1.5 py-px font-mono text-[10px] uppercase tracking-wide">
                    Present
                  </span>
                )}
              </div>

              <ol className="border-border relative mb-6 ml-11 mr-6 mt-6 border-l border-dashed">
                {roles.map((role, i) => {
                  const ongoing = current && i === 0;
                  const mode = role.location?.split(",")[1]?.trim();
                  return (
                    <li
                      key={role.role}
                      className="relative pb-8 pl-6 last:pb-0"
                    >
                      <span
                        aria-hidden
                        className={`size-2 absolute -left-[4.5px] top-1.5 rounded-full border ${ongoing ? "border-brand bg-brand" : "border-muted-foreground/50 bg-surface"}`}
                      />
                      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                        <h3 className="text-[15px] font-medium">{role.role}</h3>
                        <span className="text-muted-foreground font-mono text-[11px]">
                          {role.year} · {formatTenure(monthsBetween(role.year))}
                        </span>
                      </div>
                      <p className="text-muted-foreground mt-1 font-mono text-[11px]">
                        {[role.type, mode].filter(Boolean).join(" · ")}
                      </p>

                      <ul className="mt-3 space-y-2">
                        {role.responsibility.map((line, j) => (
                          <li
                            key={j}
                            className="text-muted-foreground before:bg-muted-foreground/40 relative pl-4 text-[14px] leading-relaxed before:absolute before:left-0 before:top-[0.7em] before:h-px before:w-2"
                          >
                            <Line line={line} />
                          </li>
                        ))}
                      </ul>

                      {role.techstacks.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {role.techstacks.map((tech) => (
                            <TechBadge key={tech} name={tech} />
                          ))}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ol>
            </div>
          );
        })}
      </Section>
    </>
  );
}
