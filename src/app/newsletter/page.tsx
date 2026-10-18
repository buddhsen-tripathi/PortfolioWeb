import NewsletterSubscription from "@/components/common/newsletter-subscription";
import PageHeader from "@/components/site/page-header";
import Section from "@/components/site/section";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/site.config";

export const metadata = buildMetadata({
  title: siteConfig.pages.newsletter.title,
  description: siteConfig.pages.newsletter.description,
  path: "/newsletter",
});

export default function NewsletterPage() {
  return (
    <>
      <PageHeader
        title={siteConfig.pages.newsletter.title}
        description={siteConfig.pages.newsletter.intro}
      />
      <Section id="subscribe" title="Subscribe" className="px-6 pb-2 pt-6">
        <NewsletterSubscription />
        <ul className="mt-4 space-y-1.5 font-mono text-[11px] text-muted-foreground">
          {siteConfig.pages.newsletter.promises.map((promise) => (
            <li key={promise}>{`· ${promise}`}</li>
          ))}
        </ul>
      </Section>
    </>
  );
}
