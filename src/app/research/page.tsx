import { notFound } from "next/navigation";
import PageHeader from "@/components/site/page-header";
import ResearchList from "@/components/sections/research-list";
import { buildMetadata } from "@/lib/metadata";
import { getSiteConfig } from "@/lib/r2Client";

export async function generateMetadata() {
  const config = await getSiteConfig();
  return buildMetadata({
    title: config.pages.research.title,
    description: config.pages.research.description,
    path: "/research",
    config,
  });
}

export const revalidate = 3600;

const Research = async () => {
  const config = await getSiteConfig();
  const research = config.research;
  // Disabled until there's research to show — re-enables automatically
  // once `research` in site.config.ts (or R2 config) has entries.
  if (research.length === 0) notFound();

  return (
    <>
      <PageHeader title={config.pages.research.title} description={config.pages.research.intro} />
      <div className="px-6 pt-8">
        <ResearchList research={research} />
      </div>
    </>
  );
};

export default Research;
