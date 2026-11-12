"use client";

import { useMemo, useState } from "react";
import { ProjectCard, type Project } from "@/components/projects/project-card";
import Section from "@/components/site/section";
import { cn } from "@/lib/utils";

type GroupId = "saas" | "ml" | "open-source";

type GroupMeta = {
  id: GroupId;
  tabLabel: string;
  sectionTitle: string;
};

const GROUPS: GroupMeta[] = [
  { id: "saas", tabLabel: "SaaS", sectionTitle: "SaaS & Products" },
  { id: "ml", tabLabel: "ML & Research", sectionTitle: "Machine Learning & Research" },
  { id: "open-source", tabLabel: "Open Source & Tools", sectionTitle: "Open Source & Tools" },
];

function classifyProject(project: Project): GroupId {
  const prefix = project.category.split(" · ")[0].toLowerCase();
  if (prefix.includes("machine learning") || prefix.includes("research") || project.status === "research") {
    return "ml";
  }
  if (prefix.includes("saas") || prefix.includes("product")) {
    return "saas";
  }
  return "open-source";
}

function ProjectGrid({ items, stars }: { items: Project[]; stars: Record<string, number | null> }) {
  return (
    <div className="grid sm:grid-cols-2">
      {items.map((project, i) => (
        <ProjectCard
          key={project.title}
          project={project}
          stars={stars[project.title] ?? null}
          wide={items.length % 2 === 1 && i === items.length - 1}
        />
      ))}
    </div>
  );
}

export default function ProjectIndex({
  projects,
  stars,
}: {
  projects: Project[];
  stars: Record<string, number | null>;
}) {
  const [tab, setTab] = useState<"all" | "featured" | GroupId>("all");

  const featured = useMemo(
    () => projects.filter((p) => "featured" in p && p.featured),
    [projects]
  );

  const byGroup = useMemo(() => {
    const map: Record<GroupId, Project[]> = {
      saas: [],
      ml: [],
      "open-source": [],
    };
    for (const p of projects) {
      map[classifyProject(p)].push(p);
    }
    return map;
  }, [projects]);

  const nonFeaturedByGroup = useMemo(() => {
    const map: Record<GroupId, Project[]> = {
      saas: [],
      ml: [],
      "open-source": [],
    };
    for (const p of projects) {
      if ("featured" in p && p.featured) continue;
      map[classifyProject(p)].push(p);
    }
    return map;
  }, [projects]);

  const tabs = [
    { id: "all" as const, label: "All", count: projects.length },
    { id: "featured" as const, label: "Featured", count: featured.length },
    ...GROUPS.map((g) => ({
      id: g.id,
      label: g.tabLabel,
      count: byGroup[g.id].length,
    })).filter((g) => g.count > 0),
  ];

  const activeGroup = GROUPS.find((g) => g.id === tab);

  return (
    <>
      <div className="pt-8">
        <div className="section-bar flex-wrap items-center gap-y-2 py-2">
          <div role="tablist" aria-label="Filter projects by category" className="-ml-2 flex flex-wrap items-center">
            {tabs.map((t) => (
              <button
                key={t.id}
                role="tab"
                type="button"
                aria-selected={tab === t.id}
                onClick={() => setTab(t.id)}
                className={cn(
                  "flex items-center gap-1.5 rounded-md px-2 py-1 text-[14px] transition-colors",
                  tab === t.id ? "font-medium text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {t.label}
                <span className="font-mono text-[11px] text-muted-foreground">{t.count}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {tab === "all" && (
        <>
          {featured.length > 0 && (
            <Section id="featured" title="Featured" meta={`${featured.length}`} className="pt-6">
              <ProjectGrid items={featured} stars={stars} />
            </Section>
          )}
          {GROUPS.map((g) => {
            const items = nonFeaturedByGroup[g.id];
            if (!items.length) return null;
            return (
              <Section key={g.id} id={g.id} title={g.sectionTitle} meta={`${items.length}`}>
                <ProjectGrid items={items} stars={stars} />
              </Section>
            );
          })}
        </>
      )}

      {tab === "featured" && (
        <Section id="featured" title="Featured" meta={`${featured.length}`} className="pt-6">
          <ProjectGrid items={featured} stars={stars} />
        </Section>
      )}

      {activeGroup && (
        <Section
          id={activeGroup.id}
          title={activeGroup.sectionTitle}
          meta={`${byGroup[activeGroup.id].length}`}
          className="pt-6"
        >
          <ProjectGrid items={byGroup[activeGroup.id]} stars={stars} />
        </Section>
      )}
    </>
  );
}
