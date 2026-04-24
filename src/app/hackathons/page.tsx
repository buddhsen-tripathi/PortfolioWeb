import HackathonList from "@/components/sections/hackathons";
import Layout from "@/components/layout/layout";
import { hackathons } from "@/constants";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Hackathons",
  description:
    "Hackathon participations, competitions, bounties, and builds under pressure.",
  path: "/hackathons",
});

const Hackathons = () => {
  return (
    <Layout
      showHeader
      title="Hackathons"
      subtitle="Competitions, bounties, and builds under pressure."
    >
      <HackathonList hackathons={hackathons} />
    </Layout>
  );
};

export default Hackathons;
