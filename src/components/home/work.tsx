import { fetchGitHubStars } from "@/lib/github";
import { getSiteConfig } from "@/lib/r2Client";
import { ProjectCard } from "@/components/projects/project-card";
import Section from "@/components/site/section";

export default async function Work() {
  const config = await getSiteConfig();
  const projects = config.projects;
  /* Hand-picked in the config with `featured`; everything else stays on /projects. */
  const featured = projects.filter((p) => "featured" in p && p.featured);

  const stars = await Promise.all(
    featured.map((p) => ("github" in p && p.github ? fetchGitHubStars(p.github) : null))
  );

  return (
    <Section
      id="work"
      title={config.home.sections.work.title}
      meta={`${featured.length} of ${projects.length} projects`}
      more={{ href: "/projects", label: `See all ${projects.length} projects` }}
    >
      <div className="grid sm:grid-cols-2">
        {featured.map((project, i) => (
          <ProjectCard
            key={project.title}
            project={project}
            stars={stars[i]}
            wide={featured.length % 2 === 1 && i === featured.length - 1}
          />
        ))}
      </div>
    </Section>
  );
}
