import GitHubContributionGraph from "@/components/sections/contribution-graph";
import Contact from "@/components/home/contact";
import Experience from "@/components/home/experience";
import Hackathons from "@/components/home/hackathons";
import Hero from "@/components/home/hero";
import Section from "@/components/site/section";
import Socials from "@/components/home/socials";
import Work from "@/components/home/work";
import Writing from "@/components/home/writing";
import SectionIndex from "@/components/site/section-index";
import { getAllBlogPosts } from "@/app/blogs/utils";
import { fetchGitHubContributions } from "@/lib/github";
import { getProfilePageSchema } from "@/lib/jsonLd";
import { buildMetadata } from "@/lib/metadata";
import { getSiteConfig } from "@/lib/r2Client";
import { PLATFORMS, socialHandle } from "@/lib/socials";

export const revalidate = 3600;

export async function generateMetadata() {
  const config = await getSiteConfig();
  return buildMetadata({ path: "/", config });
}

const LATEST_POSTS = 3;

export default async function Home() {
  const config = await getSiteConfig();
  const { sections } = config.home;
  const externalArticles = config.writing.external;
  const githubHandle = socialHandle("github", config.socials);
  const [{ contributions, lifetimeTotal }, blogPosts] = await Promise.all([
    githubHandle ? fetchGitHubContributions(githubHandle) : { contributions: [], lifetimeTotal: 0 },
    getAllBlogPosts(),
  ]);

  const posts = [...blogPosts, ...externalArticles].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getProfilePageSchema(config)) }}
      />
      <Hero identity={config.identity} home={config.home} />
      <Socials
        socialsMap={config.socials}
        title={sections.socials.title}
        fallbackAvatar={config.identity.photo.dark}
      />
      <Work />
      <Experience />
      <Hackathons />
      <Writing
        posts={posts.slice(0, LATEST_POSTS)}
        total={posts.length}
        title={sections.writing.title}
      />
      {contributions.length > 0 && (
        <Section
          id="activity"
          title={sections.github.title}
          meta={
            <a
              href={PLATFORMS.github.url(githubHandle)}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              @{githubHandle}
            </a>
          }
          className="px-6 py-5"
        >
          <GitHubContributionGraph data={contributions} lifetimeTotal={lifetimeTotal} />
        </Section>
      )}
      <Contact
        contact={config.contact}
        title={sections.contact.title}
        copy={config.home.contact}
      />
      <SectionIndex
        items={[
          { id: "intro", label: "Intro" },
          { id: "socials", label: sections.socials.title },
          { id: "work", label: sections.work.title },
          { id: "experience", label: sections.experience.title },
          { id: "hackathons", label: sections.hackathons.title },
          { id: "writing", label: sections.writing.title },
          ...(contributions.length > 0 ? [{ id: "activity", label: sections.github.short }] : []),
          { id: "contact", label: sections.contact.short },
        ]}
      />
    </>
  );
}
