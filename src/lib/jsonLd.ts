import { toIsoDate } from "@/lib/dates";
import { getSocials } from "@/lib/socials";
import { siteConfig, type SiteConfig } from "@/site.config";

/* Short reference to the Person, for records that name an author or owner. */
const personRef = (config: SiteConfig) => ({
  "@type": "Person",
  "@id": `${config.contact.url}/#person`,
  name: config.identity.name,
  url: config.contact.url,
});

export function getPersonSchema(config: SiteConfig = siteConfig) {
  const { identity, contact, socials } = config;
  return {
    "@type": "Person",
    "@id": `${contact.url}/#person`,
    name: identity.name,
    alternateName: identity.alternateName,
    url: contact.url,
    image: identity.photo.light,
    jobTitle: identity.title,
    description: identity.bio,
    affiliation: {
      "@type": "CollegeOrUniversity",
      name: identity.affiliation.name,
      url: identity.affiliation.url,
    },
    homeLocation: { "@type": "Place", name: identity.location.label },
    sameAs: getSocials("size-4", socials).flatMap((s) => (s.url ? [s.url] : [])),
  };
}

export function getWebsiteSchema(config: SiteConfig = siteConfig) {
  const { identity, contact, seo } = config;
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${contact.url}/#website`,
    name: identity.name,
    url: contact.url,
    description: seo.defaultDescription,
    inLanguage: "en",
    author: personRef(config),
  };
}

interface BlogPostInput {
  title: string;
  excerpt: string;
  /** Display date as shown on the site, e.g. "17 Sep 2026". */
  date: string;
  /** Optional display date of the last edit. */
  updated?: string;
  slug: string;
  image?: string;
}

export function getBlogPostingSchema(post: BlogPostInput, config: SiteConfig = siteConfig) {
  const { contact, assets } = config;
  const url = `${contact.url}/blogs/${post.slug}`;
  const published = toIsoDate(post.date);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: published,
    dateModified: toIsoDate(post.updated) ?? published,
    author: personRef(config),
    publisher: personRef(config),
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    image: post.image || assets.blogOgImage,
    inLanguage: "en",
    isPartOf: { "@id": `${contact.url}/#website` },
  };
}

/* Home page only: says the page is about the Person. */
export function getProfilePageSchema(config: SiteConfig = siteConfig) {
  const { identity, contact } = config;
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: identity.name,
    url: contact.url,
    mainEntity: { "@id": `${contact.url}/#person` },
    isPartOf: { "@id": `${contact.url}/#website` },
  };
}

export function getBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
