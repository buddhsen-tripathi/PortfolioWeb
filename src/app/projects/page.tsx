import PageHeader from "@/components/site/page-header";
import { fetchGitHubStars } from "@/lib/github";
import { buildMetadata } from "@/lib/metadata";
import { getSiteConfig } from "@/lib/r2Client";
import ProjectIndex from "./ProjectIndex";

export async function generateMetadata() {
  const config = await getSiteConfig();
  return buildMetadata({
    title: config.pages.projects.title,
    description: config.pages.projects.description,
    path: "/projects",
    config,
  });
}

export const revalidate = 3600;

export default async function ProjectsPage() {
  const config = await getSiteConfig();
  const projects = config.projects;

  const starEntries = await Promise.all(
    projects.map(
      async (p) =>
        [p.title, "github" in p && p.github ? await fetchGitHubStars(p.github) : null] as const
    )
  );
  const stars = Object.fromEntries(starEntries);
  const totalStars = starEntries.reduce<number>((sum, [, n]) => sum + (n ?? 0), 0);

  return (
    <>
      <PageHeader
        title={config.pages.projects.title}
        description={config.pages.projects.intro}
        meta={
          <>
            <span>{projects.length} projects</span>
            <span aria-hidden>·</span>
            <span>{totalStars} GitHub stars</span>
          </>
        }
      />
      <ProjectIndex projects={projects} stars={stars} />
    </>
  );
}
