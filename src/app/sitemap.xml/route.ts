import { getAllBlogPosts } from "../blogs/utils";
import { externalArticles } from "@/constants";
import { toIsoDate } from "@/lib/dates";
import { siteConfig } from "@/site.config";

export async function GET() {
  const baseUrl = siteConfig.contact.url;

  const posts = await getAllBlogPosts();

  const externalSlugs = new Set(externalArticles.map((a) => a.slug));
  const ownPosts = posts.filter((post) => !externalSlugs.has(post.slug));
  // Posts arrive newest first; the home page and blog index change when one is published.
  const latestPost = toIsoDate(ownPosts[0]?.date);

  const pages = [
    {
      path: "",
      priority: "1.0",
      changefreq: "weekly",
      lastModified: latestPost,
    },
    {
      path: "/blogs",
      priority: "0.9",
      changefreq: "daily",
      lastModified: latestPost,
    },
    { path: "/projects", priority: "0.8", changefreq: "weekly" },
    { path: "/experience", priority: "0.7", changefreq: "monthly" },
    { path: "/hackathons", priority: "0.7", changefreq: "monthly" },
    // /research is gated on having entries — only list it when populated
    ...(siteConfig.research.length > 0
      ? [{ path: "/research", priority: "0.7", changefreq: "monthly" }]
      : []),
    { path: "/newsletter", priority: "0.5", changefreq: "monthly" },
  ].map(
    ({
      path,
      priority,
      changefreq,
      lastModified,
    }: {
      path: string;
      priority: string;
      changefreq: string;
      lastModified?: string;
    }) => ({
      url: `${baseUrl}${path}`,
      // Omitted rather than faked: a lastmod that changes every build gets ignored.
      lastModified,
      priority,
      changefreq,
    }),
  );

  const blogPosts = ownPosts.map((post) => ({
    url: `${baseUrl}/blogs/${post.slug}`,
    lastModified: toIsoDate(post.date),
    priority: "0.8",
    changefreq: "weekly",
  }));

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${[...pages, ...blogPosts]
      .map(
        (page) => `
      <url>
        <loc>${page.url}</loc>
${page.lastModified ? `        <lastmod>${page.lastModified}</lastmod>\n` : ""}        <priority>${page.priority}</priority>
        <changefreq>${page.changefreq}</changefreq>
      </url>`,
      )
      .join("")}
  </urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
