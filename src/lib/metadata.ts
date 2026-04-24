import type { Metadata } from "next";
import { siteConfig } from "@/site.config";

interface BuildMetadataInput {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
}

/**
 * Builds a Next.js Metadata object for a page, inheriting site defaults.
 * Pass only what differs per page; everything else falls back to siteConfig.seo.
 */
export function buildMetadata({
  title,
  description,
  path = "",
  image,
}: BuildMetadataInput = {}): Metadata {
  const { contact, seo, assets, identity } = siteConfig;
  const url = `${contact.url}${path}`;
  const pageTitle = title ?? seo.defaultTitle;
  const fullTitle = title ? `${title} - ${identity.name}` : seo.defaultTitle;
  const pageDescription = description ?? seo.defaultDescription;
  const pageImage = image ?? assets.ogImage;

  return {
    title: pageTitle,
    description: pageDescription,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: seo.locale,
      url,
      title: fullTitle,
      description: pageDescription,
      siteName: identity.name,
      images: [
        {
          url: pageImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: pageDescription,
      images: [pageImage],
      creator: seo.twitterHandle,
    },
  };
}
