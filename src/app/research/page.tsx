import { notFound } from "next/navigation";
import PageHeader from "@/components/site/page-header";
import ResearchList from "@/components/sections/research-list";
import { research } from "@/constants";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/site.config";

export const metadata = buildMetadata({
  title: siteConfig.pages.research.title,
  description: siteConfig.pages.research.description,
  path: "/research",
});

const Research = () => {
  // Disabled until there's research to show — re-enables automatically
  // once `research` in site.config.ts has entries.
  if (research.length === 0) notFound();

  return (
    <>
      <PageHeader title={siteConfig.pages.research.title} description={siteConfig.pages.research.intro} />
      <div className="px-6 pt-8">
        <ResearchList research={research} />
      </div>
    </>
  );
};

export default Research;
