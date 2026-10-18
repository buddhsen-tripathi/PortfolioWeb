import PageHeader from "@/components/site/page-header";
import BlogIndex from "./BlogIndex";
import { getAllBlogPosts } from "./utils";
import { externalArticles } from "@/constants";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/site.config";

export const metadata = buildMetadata({
  title: siteConfig.pages.blogs.title,
  description: siteConfig.pages.blogs.description,
  path: "/blogs",
  image: siteConfig.assets.blogOgImage,
});

export const revalidate = 3600;

export default async function BlogsPage() {
  const allPosts = await getAllBlogPosts();

  const technicalPosts = [
    ...allPosts.filter((post) => post.type !== "personal"),
    ...externalArticles,
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const personalPosts = allPosts.filter((post) => post.type === "personal");

  return (
    <>
      <PageHeader
        title={siteConfig.pages.blogs.title}
        description={siteConfig.pages.blogs.intro}
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
