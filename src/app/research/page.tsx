import Layout from "@/components/layout/layout";
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
  return (
    <Layout
      showHeader
      title="Research"
      subtitle="Academic research, publications, and experimental projects"
    >
      <ResearchList research={research} />
    </Layout>
  );
};

export default Research;