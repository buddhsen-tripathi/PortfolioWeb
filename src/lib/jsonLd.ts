import { toIsoDate } from "@/lib/dates";
import { getSocials } from "@/lib/socials";
import { siteConfig } from "@/site.config";

const PERSON_ID = `${siteConfig.contact.url}/#person`;
const WEBSITE_ID = `${siteConfig.contact.url}/#website`;

/* Short reference to the Person, for records that name an author or owner. */
const personRef = () => ({
  "@type": "Person",
  "@id": PERSON_ID,
  name: siteConfig.identity.name,
  url: siteConfig.contact.url,
});

export function getPersonSchema() {
  const { identity, contact } = siteConfig;
  return {
    "@type": "Person",
    "@id": PERSON_ID,
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
    sameAs: getSocials().flatMap((s) => (s.url ? [s.url] : [])),
  };
}

export function getWebsiteSchema() {
  const { identity, contact, seo } = siteConfig;
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: identity.name,
    url: contact.url,
    description: seo.defaultDescription,
    inLanguage: "en",
    author: personRef(),
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

export function getBlogPostingSchema(post: BlogPostInput) {
  const { contact, assets } = siteConfig;
  const url = `${contact.url}/blogs/${post.slug}`;
  const published = toIsoDate(post.date);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: published,
    dateModified: toIsoDate(post.updated) ?? published,
    author: personRef(),
    publisher: personRef(),
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    image: post.image || assets.blogOgImage,
    inLanguage: "en",
    isPartOf: { "@id": WEBSITE_ID },
  };
}

/* Home page only: says the page is about the Person. */
export function getProfilePageSchema() {
  const { identity, contact } = siteConfig;
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: identity.name,
    url: contact.url,
    mainEntity: { "@id": PERSON_ID },
    isPartOf: { "@id": WEBSITE_ID },
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
