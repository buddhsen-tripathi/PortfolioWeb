import PageHeader from "@/components/site/page-header";
import BlogIndex from "./BlogIndex";
import { getAllBlogPosts } from "./utils";
import { toIsoDate } from "@/lib/dates";
import { buildMetadata } from "@/lib/metadata";
import { getSiteConfig } from "@/lib/r2Client";

export async function generateMetadata() {
  const config = await getSiteConfig();
  return buildMetadata({
    title: config.pages.blogs.title,
    description: config.pages.blogs.description,
    path: "/blogs",
    image: config.assets.blogOgImage,
    config,
  });
}

export const revalidate = 3600;

export default async function BlogsPage() {
  const [allPosts, config] = await Promise.all([getAllBlogPosts(), getSiteConfig()]);
  const externalArticles = config.writing.external;

  const technicalPosts = [
    ...allPosts.filter((post) => post.type !== "personal"),
    ...externalArticles,
  ].sort((a, b) => {
    const aIso = toIsoDate(a.date) ?? "";
    const bIso = toIsoDate(b.date) ?? "";
    return bIso.localeCompare(aIso);
  });

  const personalPosts = allPosts.filter((post) => post.type === "personal");

  return (
    <>
      <PageHeader
        title={config.pages.blogs.title}
        description={config.pages.blogs.intro}
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
