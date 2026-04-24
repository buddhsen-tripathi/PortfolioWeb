import HackathonList from "@/components/sections/hackathons";
import Layout from "@/components/layout/layout";
import { hackathons } from "@/constants";

export const metadata = {
  title: "Hacks",
};

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
