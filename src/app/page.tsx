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
import { twitterArticles } from "@/app/blogs/articles";
import { fetchGitHubContributions } from "@/lib/github";
import { buildMetadata } from "@/lib/metadata";
import { PLATFORMS, socialHandle } from "@/lib/socials";

export const revalidate = 3600;

export const metadata = buildMetadata({ path: "/" });

const LATEST_POSTS = 3;

export default async function Home() {
  const githubHandle = socialHandle("github");
  const [{ contributions, lifetimeTotal }, blogPosts] = await Promise.all([
    githubHandle ? fetchGitHubContributions(githubHandle) : { contributions: [], lifetimeTotal: 0 },
    getAllBlogPosts(),
  ]);

  const posts = [...blogPosts, ...twitterArticles].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <>
      <Hero />
      <Socials />
      <Work />
      <Experience />
      <Hackathons />
      <Writing posts={posts.slice(0, LATEST_POSTS)} total={posts.length} />
      {contributions.length > 0 && (
        <Section
          id="activity"
          title="GitHub activity"
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
      <Contact />
      <SectionIndex
        items={[
          { id: "intro", label: "Intro" },
          { id: "socials", label: "Socials" },
          { id: "work", label: "Work" },
          { id: "experience", label: "Experience" },
          { id: "hackathons", label: "Hackathons" },
          { id: "writing", label: "Writing" },
          ...(contributions.length > 0 ? [{ id: "activity", label: "GitHub" }] : []),
          { id: "contact", label: "Contact" },
        ]}
      />
    </>
  );
}
