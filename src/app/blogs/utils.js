import { getAllBlogPostsFromS3 } from "@/lib/r2Client";

export async function getAllBlogPosts() {
  const blogPosts = await getAllBlogPostsFromS3();

  return blogPosts.map((post) => ({
    slug: post.slug,
    title: post.title,
    date: post.date,
    excerpt: post.excerpt,
    type: post.type,
    url: post.url,
  }));
}

export function getReadingTime(content) {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}
