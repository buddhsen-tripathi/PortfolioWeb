import Image from "next/image";
import { experiences } from "@/constants";
import { formatTenure, groupByCompany, monthsBetween, parseYearRange } from "@/lib/experience";
import Section from "@/components/site/section";
import { siteConfig } from "@/site.config";

export default function Experience() {
  const companies = groupByCompany(experiences);
  if (!companies.length) return null;

  return (
    <Section
      id="experience"
      title={siteConfig.home.sections.experience.title}
      more={{ href: "/experience", label: "Full experience" }}
    >
      {companies.map(({ company, roles }, index) => {
        const newest = roles[0];
        const tenure = roles.reduce((sum, r) => sum + monthsBetween(r.year), 0);
        const current = /present/i.test(parseYearRange(newest.year).end);
        const city = newest.location?.split(",")[0];

        return (
          <div
            key={company}
            className={`px-6 py-6 ${index > 0 ? "border-t border-dashed border-border" : ""}`}
          >
            <div className="flex items-center gap-3">
              {newest.logo && (
                <span className="relative size-10 shrink-0 overflow-hidden rounded-lg border border-border bg-muted">
                  <Image src={newest.logo} alt={`${company} logo`} fill sizes="40px" className="object-cover" />
                </span>
              )}
              <div className="flex min-w-0 flex-col">
                <h3 className="text-[15px] font-semibold tracking-tight">{company}</h3>
                <span className="font-mono text-[11px] text-muted-foreground">
                  {city && `${city} · `}
                  {formatTenure(tenure)}
                </span>
              </div>
              {current && (
                <span className="ml-auto rounded border border-brand/30 bg-brand/10 px-1.5 py-px font-mono text-[10px] uppercase tracking-wide text-brand">
                  Present
                </span>
              )}
            </div>

            <ol className="relative ml-5 mt-5 border-l border-dashed border-border">
              {roles.map((role, i) => (
                <li key={role.role} className="relative pb-4 pl-6 last:pb-0">
                  <span
                    aria-hidden
                    className={`absolute -left-[4.5px] top-1.5 size-2 rounded-full border ${current && i === 0 ? "border-brand bg-brand" : "border-muted-foreground/50 bg-surface"}`}
                  />
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
                    <h4 className="text-sm font-medium">{role.role}</h4>
                    <span className="font-mono text-[11px] text-muted-foreground">
                      {role.year} · {formatTenure(monthsBetween(role.year))}
                    </span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        );
      })}
    </Section>
  );
}
