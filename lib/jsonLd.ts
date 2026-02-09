const SITE_URL = 'https://buddhsentripathi.com';

export function getPersonSchema() {
  return {
    '@type': 'Person',
    name: 'Buddhsen Tripathi',
    url: SITE_URL,
    jobTitle: 'Full Stack Developer',
    sameAs: [
      'https://github.com/buddhsentripathi',
      'https://linkedin.com/in/buddhsentripathi',
      'https://x.com/btr1pathi',
    ],
  };
}

export function getWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Buddhsen Tripathi',
    url: SITE_URL,
    description:
      'Full Stack Web developer portfolio showcasing projects and skills in Next.js, React, TypeScript, and full-stack development and technical blogs',
    author: getPersonSchema(),
  };
}

export function getBlogPostingSchema(post: {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: getPersonSchema(),
    url: `${SITE_URL}/blogs/${post.slug}`,
    image: post.image || `${SITE_URL}/default-image-blogs.webp`,
  };
}

export function getBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
