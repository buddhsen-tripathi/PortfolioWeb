import { projects } from "@/constants";
import { fetchGitHubStars } from "@/lib/github";
import { ProjectCard } from "@/components/projects/project-card";
import Section from "@/components/site/section";
import { siteConfig } from "@/site.config";

/* Hand-picked in the config with `featured`; everything else stays on /projects. */
const featured = projects.filter((p) => "featured" in p && p.featured);

export default async function Work() {
  const stars = await Promise.all(
    featured.map((p) => ("github" in p && p.github ? fetchGitHubStars(p.github) : null))
  );

  return (
    <Section
      id="work"
      title={siteConfig.home.sections.work.title}
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
