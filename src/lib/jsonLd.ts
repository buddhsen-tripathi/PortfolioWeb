import { siteConfig } from "@/site.config";

export function getPersonSchema() {
  const { identity, contact, assets, socials } = siteConfig;
  return {
    "@type": "Person",
    name: identity.name,
    url: contact.url,
    jobTitle: identity.title,
    description: identity.bio,
    image: `${contact.url}${assets.ogImage}`,
    sameAs: Object.values(socials).map((s) => s.url),
  };
}

export function getWebsiteSchema() {
  const { identity, contact, seo } = siteConfig;
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: identity.name,
    url: contact.url,
    description: seo.defaultDescription,
    author: getPersonSchema(),
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${contact.url}/blogs?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

interface BlogPostInput {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  image?: string;
}

export function getBlogPostingSchema(post: BlogPostInput) {
  const { contact, assets } = siteConfig;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: getPersonSchema(),
    url: `${contact.url}/blogs/${post.slug}`,
    image: post.image || `${contact.url}${assets.blogOgImage}`,
  };
}

export function getProfilePageSchema() {
  const { identity, contact } = siteConfig;
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: getPersonSchema(),
    dateCreated: "2024-01-01",
    dateModified: new Date().toISOString().split("T")[0],
    name: `${identity.name} - ${identity.title}`,
    description: identity.bio,
    url: contact.url,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: contact.url,
        },
      ],
    },
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
