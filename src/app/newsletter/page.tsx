import NewsletterSubscription from "@/components/common/newsletter-subscription";
import PageHeader from "@/components/site/page-header";
import Section from "@/components/site/section";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Newsletter",
  description:
    "Subscribe to my newsletter for updates on web development, AI, and personal projects.",
  path: "/newsletter",
});

export default function NewsletterPage() {
  return (
    <>
      <PageHeader
        title="Newsletter"
        description="New posts on AI systems, security and building products, plus the occasional personal story. Straight to your inbox when they're published."
      />
      <Section id="subscribe" title="Subscribe" className="px-6 pb-2 pt-6">
        <NewsletterSubscription />
        <ul className="mt-4 space-y-1.5 font-mono text-[11px] text-muted-foreground">
          <li>· Only when there&apos;s a new post</li>
          <li>· No spam, no selling your email</li>
          <li>· Unsubscribe in one click</li>
        </ul>
      </Section>
    </>
  );
}
