import Layout from "@/components/layout/layout";
import ResearchList from "@/components/sections/research-list";
import { research } from "@/constants";

export const metadata = {
  title: "Research",
  description:
    "Academic research, publications, and experimental projects in software engineering and technology.",
  alternates: {
    canonical: "https://buddhsentripathi.com/research",
  },
  openGraph: {
    title: "Research - Buddhsen Tripathi",
    description:
      "Academic research, publications, and experimental projects in software engineering and technology.",
    url: "https://buddhsentripathi.com/research",
    images: [
      {
        url: "/default-image.webp",
        width: 1200,
        height: 630,
        alt: "Research - Buddhsen Tripathi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Research - Buddhsen Tripathi",
    description:
      "Academic research, publications, and experimental projects in software engineering and technology.",
    images: ["/default-image.webp"],
  },
};

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