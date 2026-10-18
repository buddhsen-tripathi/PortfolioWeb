import { notFound } from "next/navigation";
import PageHeader from "@/components/site/page-header";
import ResearchList from "@/components/sections/research-list";
import { research } from "@/constants";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Research",
  description:
    "Academic research, publications, and experimental projects in software engineering and technology.",
  path: "/research",
});

const Research = () => {
  // Disabled until there's research to show — re-enables automatically
  // once `research` in site.config.ts has entries.
  if (research.length === 0) notFound();

  return (
    <>
      <PageHeader title="Research" description="Academic research, publications, and experimental projects." />
      <div className="px-6 pt-8">
        <ResearchList research={research} />
      </div>
    </>
  );
};

export default Research;
