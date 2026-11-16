import NewsletterSubscription from "@/components/common/newsletter-subscription";
import PageHeader from "@/components/site/page-header";
import Section from "@/components/site/section";
import { buildMetadata } from "@/lib/metadata";
import { getSiteConfig } from "@/lib/r2Client";

export const revalidate = 3600;

export async function generateMetadata() {
  const config = await getSiteConfig();
  return buildMetadata({
    title: config.pages.newsletter.title,
    description: config.pages.newsletter.description,
    path: "/newsletter",
    config,
  });
}

export default async function NewsletterPage() {
  const config = await getSiteConfig();

  return (
    <>
      <PageHeader
        title={config.pages.newsletter.title}
        description={config.pages.newsletter.intro}
      />
      <Section id="subscribe" title="Subscribe" className="px-6 pb-2 pt-6">
        <NewsletterSubscription />
        <ul className="mt-4 space-y-1.5 font-mono text-[11px] text-muted-foreground">
          {config.pages.newsletter.promises.map((promise) => (
            <li key={promise}>{`· ${promise}`}</li>
          ))}
        </ul>
      </Section>
    </>
  );
}
