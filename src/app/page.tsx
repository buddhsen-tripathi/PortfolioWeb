import Hero from "@/components/sections/hero";
import Layout from "@/components/layout/layout";
import { fetchGitHubContributions } from "@/lib/github";
import { buildMetadata } from "@/lib/metadata";

export const revalidate = 3600;

export const metadata = buildMetadata({ path: "/" });

export default async function About() {
  const { contributions, lifetimeTotal } = await fetchGitHubContributions();

  return (
    <div className="overflow-x-hidden">
      <Layout>
        <Hero contributionData={contributions} lifetimeTotal={lifetimeTotal} />
      </Layout>
    </div>
  );
}
