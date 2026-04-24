import RSS from "rss";
import { getAllBlogPosts } from "@/app/blogs/utils";
import { twitterArticles } from "@/app/blogs/articles";
import { siteConfig } from "@/site.config";

function parseDate(dateStr: string | undefined) {
  if (!dateStr) return new Date();
  const parsed = new Date(dateStr);
  return isNaN(parsed.getTime()) ? new Date() : parsed;
}

export async function GET() {
  const { identity, contact, assets } = siteConfig;
  const feed = new RSS({
    title: `${identity.name}'s Blog`,
    description: "Web development insights and tutorials",
    site_url: contact.url,
    feed_url: `${contact.url}/feed.xml`,
    language: "en",
    generator: "Next.js using RSS",
    pubDate: new Date(),
    copyright: `© ${new Date().getFullYear()} ${identity.name}. All rights reserved.`,
    image_url: `${contact.url}${assets.ogImage}`,
    webMaster: identity.name,
  });

  try {
    const allPosts = await getAllBlogPosts();
    const externalSlugs = new Set(twitterArticles.map((a) => a.slug));
    const blogPosts = allPosts.filter((post) => !externalSlugs.has(post.slug));

    blogPosts.forEach((post) => {
      feed.item({
        title: post.title,
        description: post.excerpt,
        url: `${contact.url}/blogs/${post.slug}`,
        date: parseDate(post.date),
        guid: post.slug,
        author: identity.name,
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
