import NewsletterSubscription from "@/components/common/newsletter-subscription";
import Layout from "@/components/layout/layout";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Newsletter",
  description:
    "Subscribe to my newsletter for updates on web development, AI, and personal projects.",
  path: "/newsletter",
});

export default function NewsletterPage() {
  return (
    <Layout
      showHeader
      title="Newsletter"
      subtitle="Personal stories. Tech updates. No spam, just value."
    >
      <div className="max-w-xl space-y-4 px-2 md:px-0">
        <NewsletterSubscription />
        <p className="font-space-mono text-xs text-muted-foreground">
          You can unsubscribe at any time. Your privacy is respected.
        </p>
      </div>
    </Layout>
  );
}
