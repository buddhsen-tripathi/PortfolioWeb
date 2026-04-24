import NewsletterSubscription from "@/components/common/newsletter-subscription";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Newsletter",
  description:
    "Subscribe to my newsletter for updates on web development, AI, and personal projects.",
  path: "/newsletter",
});

export default function NewsletterPage() {
  return (
    <div className="container max-w-2xl space-y-12">
      <Link
        href="/"
        className="group inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
        back
      </Link>

      <div className="space-y-8">
        <div className="space-y-4">
          <h1 className="font-serif text-2xl italic text-foreground md:text-3xl">
            newsletter
          </h1>
          <p className="leading-relaxed text-muted-foreground">
            Personal stories. Tech updates. No spam, just value.
          </p>
        </div>

        <NewsletterSubscription />

        <p className="text-sm text-muted-foreground">
          You can unsubscribe at any time. Your privacy is respected.
        </p>
      </div>
    </div>
  );
}
