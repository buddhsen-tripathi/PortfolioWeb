import Layout from "@/components/layout/layout";
import BlogTabs from "./BlogTabs";
import { getAllBlogPosts } from "./utils";
import { twitterArticles } from "./articles";

export const metadata = {
  title: "Blogs",
  description:
    "Read the latest articles, tutorials, and personal thoughts on technology, programming, and more.",
  alternates: {
    canonical: "https://buddhsentripathi.com/blogs",
  },
  openGraph: {
    title: "Blogs - Buddhsen Tripathi",
    description:
      "Read the latest articles, tutorials, and personal thoughts on technology, programming, and more.",
    url: "https://buddhsentripathi.com/blogs",
    siteName: "Buddhsen Tripathi Portfolio",
    images: [
      {
        url: "https://buddhsentripathi.com/default-image-blogs.webp",
        width: 1200,
        height: 630,
        alt: "Blogs - Buddhsen Tripathi",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blogs - Buddhsen Tripathi",
    description:
      "Read the latest articles, tutorials, and personal thoughts on technology, programming, and more.",
    images: ["https://buddhsentripathi.com/default-image-blogs.webp"],
  },
};

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
