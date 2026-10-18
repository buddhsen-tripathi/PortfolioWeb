import { ProjectCard } from "@/components/projects/project-card";
import PageHeader from "@/components/site/page-header";
import Section from "@/components/site/section";
import { projects } from "@/constants";
import { fetchGitHubStars } from "@/lib/github";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Projects",
  description:
    "Explore my latest projects, including web applications, open-source tools, and experiments in technology and programming.",
  path: "/projects",
});

export const revalidate = 3600;

type Project = (typeof projects)[number];

function ProjectGrid({ items, stars }: { items: Project[]; stars: Map<string, number | null> }) {
  return (
    <div className="grid sm:grid-cols-2">
      {items.map((project, i) => (
        <ProjectCard
          key={project.title}
          project={project}
          stars={stars.get(project.title) ?? null}
          wide={items.length % 2 === 1 && i === items.length - 1}
        />
      ))}
    </div>
  );
}

export default async function ProjectsPage() {
  const stars = new Map(
    await Promise.all(
      projects.map(
        async (p) =>
          [p.title, "github" in p && p.github ? await fetchGitHubStars(p.github) : null] as const
      )
    )
  );

  const featured = projects.filter((p) => "featured" in p && p.featured);
  const rest = projects.filter((p) => !("featured" in p && p.featured));
  const totalStars = [...stars.values()].reduce<number>((sum, n) => sum + (n ?? 0), 0);

  return (
    <>
      <PageHeader
        title="Projects"
        description="Products I've shipped, open source people use, and research I've done along the way."
        meta={
          <>
            <span>{projects.length} projects</span>
            <span aria-hidden>·</span>
            <span>{totalStars} GitHub stars</span>
          </>
        }
      />
      <Section id="featured" title="Featured" meta={`${featured.length}`}>
        <ProjectGrid items={featured} stars={stars} />
      </Section>
      {rest.length > 0 && (
        <Section id="more" title="More projects" meta={`${rest.length}`}>
          <ProjectGrid items={rest} stars={stars} />
        </Section>
      )}
    </>
  );
}
