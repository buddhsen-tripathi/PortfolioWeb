import { getAllBlogPosts } from "../blogs/utils";
import { twitterArticles } from "../blogs/articles";

function parseDate(dateStr) {
  if (!dateStr) return new Date().toISOString();
  const parsed = new Date(dateStr);
  return isNaN(parsed.getTime()) ? new Date().toISOString() : parsed.toISOString();
}

export async function GET() {
  const baseUrl = "https://buddhsentripathi.com";

  const posts = await getAllBlogPosts();

  const pages = [
    { path: "", priority: "1.0", changefreq: "weekly" },
    { path: "/blogs", priority: "0.9", changefreq: "daily" },
    { path: "/projects", priority: "0.8", changefreq: "weekly" },
    { path: "/experience", priority: "0.7", changefreq: "monthly" },
    { path: "/hackathons", priority: "0.7", changefreq: "monthly" },
    { path: "/research", priority: "0.7", changefreq: "monthly" },
    { path: "/newsletter", priority: "0.5", changefreq: "monthly" },
  ].map(({ path, priority, changefreq }) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date().toISOString(),
    priority,
    changefreq,
  }));

  const externalSlugs = new Set(twitterArticles.map((a) => a.slug));
  const blogPosts = posts
    .filter((post) => !externalSlugs.has(post.slug))
    .map((post) => ({
      url: `${baseUrl}/blogs/${post.slug}`,
      lastModified: parseDate(post.date),
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
