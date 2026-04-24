import Layout from "@/components/layout/layout";
import Timeline from "@/components/layout/timeline";
import { experiences } from "@/constants";


export const metadata = {
  title: "Experience",
  description:
    "Professional experience and career journey as a full stack developer working with modern web technologies.",
  alternates: {
    canonical: "https://buddhsentripathi.com/experience",
  },
  openGraph: {
    title: "Experience - Buddhsen Tripathi",
    description:
      "Professional experience and career journey as a full stack developer working with modern web technologies.",
    url: "https://buddhsentripathi.com/experience",
    images: [
      {
        url: "/default-image.webp",
        width: 1200,
        height: 630,
        alt: "Experience - Buddhsen Tripathi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Experience - Buddhsen Tripathi",
    description:
      "Professional experience and career journey as a full stack developer working with modern web technologies.",
    images: ["/default-image.webp"],
  },
};

const getExperienceYears = () => {
  const earliest = experiences
    .map((e) => new Date(e.year.split(" - ")[0]))
    .sort((a, b) => a.getTime() - b.getTime())[0];
  const years = (new Date().getTime() - earliest.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
  return Math.floor(years);
};

const Experience = () => {
  const totalYears = getExperienceYears();

  return (
    <Layout
      showHeader
      title="Experiences"
      subtitle={`My journey as a software developer over ${totalYears}+ years`}
    >
      <div>
        {[...experiences].reverse().map((experience, index) => (
          <Timeline {...experience} key={index} index={index} />
        ))}
      </div>
    </Layout>
  );
};

export default Experience;
