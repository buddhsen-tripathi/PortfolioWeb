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

function monthsBetween(year: string) {
  const [startRaw, endRaw] = year.split(" - ").map((s) => s.trim());
  const end = endRaw || startRaw;
  const toDate = (s: string) => {
    const [mon, y] = s.split(" ");
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];
    return new Date(Number(y), months.indexOf(mon), 1);
  };
  const a = toDate(startRaw);
  const b = end.toLowerCase().includes("present") ? new Date() : toDate(end);
  return Math.max(
    1,
    (b.getFullYear() - a.getFullYear()) * 12 + (b.getMonth() - a.getMonth()) + 1
  );
}

/** Sum of actual role tenures — not calendar time since first start date. */
function experienceHeadline(totalMonths: number) {
  const years = Math.floor(totalMonths / 12);
  const extra = totalMonths % 12;
  if (years === 0) return `${totalMonths} months`;
  if (extra === 0) return `${years} year${years > 1 ? "s" : ""}`;
  return `${years}+ years`;
}

const Experience = () => {
  const totalMonths = experiences.reduce(
    (sum, e) => sum + monthsBetween(e.year),
    0
  );
  const items = [...experiences].reverse();

  return (
    <Layout
      showHeader
      title="Experiences"
      subtitle={`My journey as a software developer over ${experienceHeadline(totalMonths)}`}
    >
      <Timeline items={items} />
    </Layout>
  );
};

export default Experience;
