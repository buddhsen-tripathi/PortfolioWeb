import Layout from "@/components/layout/layout";
import Timeline from "@/components/layout/timeline";
import { experiences } from "@/constants";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Experience",
  description:
    "Professional experience and career journey as a full stack developer working with modern web technologies.",
  path: "/experience",
});

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
