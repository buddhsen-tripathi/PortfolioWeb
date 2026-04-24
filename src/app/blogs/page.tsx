import Layout from "@/components/layout/layout";
import BlogTabs from "./BlogTabs";
import { getAllBlogPosts } from "./utils";
import { twitterArticles } from "./articles";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/site.config";

export const metadata = buildMetadata({
  title: "Blogs",
  description:
    "Read the latest articles, tutorials, and personal thoughts on technology, programming, and more.",
  path: "/blogs",
  image: siteConfig.assets.blogOgImage,
});

export const revalidate = 3600;

export default async function BlogsPage() {
  const allPosts = await getAllBlogPosts();

  const technicalPosts = [
    ...allPosts.filter((post) => post.type !== "personal"),
    ...twitterArticles,
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const personalPosts = allPosts.filter((post) => post.type === "personal");

  return (
    <Layout
      showHeader
      title="Blogs"
      subtitle="Latest articles and tutorials"
    >
      <BlogTabs technical={technicalPosts} personal={personalPosts} />
    </Layout>
  );
}
