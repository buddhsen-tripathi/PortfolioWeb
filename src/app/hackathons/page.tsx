import HackathonList from "@/components/sections/hackathons";
import Layout from "@/components/layout/layout";
import { hackathons } from "@/constants";

export const metadata = {
  title: "Hackathons",
  description:
    "Hackathon participations, competitions, bounties, and builds under pressure.",
  alternates: {
    canonical: "https://buddhsentripathi.com/hackathons",
  },
  openGraph: {
    title: "Hackathons - Buddhsen Tripathi",
    description:
      "Hackathon participations, competitions, bounties, and builds under pressure.",
    url: "https://buddhsentripathi.com/hackathons",
    images: [
      {
        url: "/default-image.webp",
        width: 1200,
        height: 630,
        alt: "Hackathons - Buddhsen Tripathi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hackathons - Buddhsen Tripathi",
    description:
      "Hackathon participations, competitions, bounties, and builds under pressure.",
    images: ["/default-image.webp"],
  },
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
