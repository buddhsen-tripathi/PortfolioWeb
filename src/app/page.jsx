import Hero from "@/components/sections/hero";
import Layout from "@/components/layout/layout";
import { fetchGitHubContributions } from "@/lib/github";

export const revalidate = 3600;

export const metadata = {
  title: "Buddhsen Tripathi",
  description:
    "Full stack web developer portfolio showcasing projects and skills in Next.js, React, TypeScript, and full-stack development and technical blogs",
  openGraph: {
    title: "Buddhsen Tripathi - Full Stack Developer",
    description:
      "Full stack web developer portfolio showcasing projects and skills in Next.js, React, TypeScript, and full-stack development and technical blogs",
    url: "https://buddhsentripathi.com",
    images: [
      {
        url: "/default-image.webp",
        width: 1200,
        height: 630,
        alt: "Buddhsen Tripathi Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Buddhsen Tripathi - Full Stack Developer",
    description:
      "Full stack web developer portfolio showcasing projects and skills in Next.js, React, TypeScript, and full-stack development and technical blogs",
    images: ["/default-image.webp"],
  },
};

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
