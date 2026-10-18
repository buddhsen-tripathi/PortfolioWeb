import PageHeader from "@/components/site/page-header";
import BlogIndex from "./BlogIndex";
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
    <>
      <PageHeader
        title="Blogs"
        description="Writing on AI systems, security and building products, plus the occasional personal post."
        meta={
          <>
            <span>{technicalPosts.length + personalPosts.length} posts</span>
            <span aria-hidden>·</span>
            <a href="/feed.xml" className="transition-colors hover:text-foreground">
              RSS
            </a>
            <span aria-hidden>·</span>
            <a href="/newsletter" className="transition-colors hover:text-foreground">
              Newsletter
            </a>
          </>
        }
      />
      <BlogIndex technical={technicalPosts} personal={personalPosts} />
    </>
  );
}
