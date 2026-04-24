import RSS from "rss";
import { getAllBlogPosts } from "@/app/blogs/utils";
import { twitterArticles } from "@/app/blogs/articles";

function parseDate(dateStr) {
  if (!dateStr) return new Date();
  const parsed = new Date(dateStr);
  return isNaN(parsed.getTime()) ? new Date() : parsed;
}

export async function GET() {
  const feed = new RSS({
    title: "Buddhsen Tripathi's Blog",
    description: "Web development insights and tutorials",
    site_url: "https://buddhsentripathi.com",
    feed_url: "https://buddhsentripathi.com/feed.xml",
    language: "en",
    generator: "Next.js using RSS",
    pubDate: new Date(),
    copyright: `\u00A9 ${new Date().getFullYear()} Buddhsen Tripathi. All rights reserved.`,
    image_url: "https://buddhsentripathi.com/default-image.webp",
    webMaster: "Buddhsen Tripathi",
  });

  try {
    const allPosts = await getAllBlogPosts();
    const externalSlugs = new Set(twitterArticles.map((a) => a.slug));
    const blogPosts = allPosts.filter((post) => !externalSlugs.has(post.slug));

    blogPosts.forEach((post) => {
      feed.item({
        title: post.title,
        description: post.excerpt,
        url: `https://buddhsentripathi.com/blogs/${post.slug}`,
        date: parseDate(post.date),
        guid: post.slug,
        author: "Buddhsen Tripathi",
        categories: post.type ? [post.type] : [],
      });
    });

    return new Response(feed.xml({ indent: true }), {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "s-maxage=3600, stale-while-revalidate",
      },
    });
  } catch (error) {
    return new Response("Error generating feed", { status: 500 });
  }
}
