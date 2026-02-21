import { getAllBlogPosts } from "../blogs/utils";
import { twitterArticles } from "../blogs/articles";
import { parseDate } from "@/lib/utils";

export async function GET(): Promise<Response> {
  const baseUrl = "https://buddhsentripathi.com";

  const posts = getAllBlogPosts();

  const pages = [
    { path: "", priority: "1.0", changefreq: "weekly" },
    { path: "/blogs", priority: "0.9", changefreq: "daily" },
    { path: "/projects", priority: "0.8", changefreq: "weekly" },
    { path: "/newsletter", priority: "0.5", changefreq: "monthly" },
    { path: "/spam-or-not", priority: "0.5", changefreq: "monthly" },
    { path: "/code-runner", priority: "0.5", changefreq: "monthly" },
  ].map(({ path, priority, changefreq }) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date().toISOString(),
    priority,
    changefreq,
  }));

  const externalSlugs = new Set(twitterArticles.map(a => a.slug));
  const blogPosts = (await posts).filter(post => !externalSlugs.has(post.slug)).map((post) => ({
    url: `${baseUrl}/blogs/${post.slug}`,
    lastModified: parseDate(post.date),
    priority: "0.8",
    changefreq: "weekly",
  }));

  // Generate XML format
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${[...pages, ...blogPosts]
      .map(
        (page) => `
      <url>
        <loc>${page.url}</loc>
        <lastmod>${page.lastModified}</lastmod>
        <priority>${page.priority}</priority>
        <changefreq>${page.changefreq}</changefreq>
      </url>`
      )
      .join("")}
  </urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
