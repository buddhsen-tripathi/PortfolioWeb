import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import "highlight.js/styles/github-dark.css";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import remarkFrontmatter from "remark-frontmatter";
import Layout from "@/components/layout/layout";
import { mdxComponents } from "@/components/blog/mdx-components";
import TableOfContents from "@/components/blog/table-of-contents";
import ViewCounter from "@/components/blog/view-counter";
import { getBlogPostFromS3, getBlogSlugsFromS3 } from "@/lib/r2Client";
import { getReadingTime } from "../utils";

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getBlogSlugsFromS3();
  return slugs;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { data } = await getBlogPostFromS3(slug);

  return {
    title: data.title,
    description: data.excerpt,
    alternates: {
      canonical: `https://buddhsentripathi.com/blogs/${data.slug}`,
    },
    openGraph: {
      title: `${data.title} - Buddhsen Tripathi`,
      description: data.excerpt,
      url: `https://buddhsentripathi.com/blogs/${data.slug}`,
      type: "article",
      publishedTime: data.date,
      authors: ["Buddhsen Tripathi"],
      images: [
        {
          url: "https://buddhsentripathi.com/default-image-blogs.webp",
          width: 1200,
          height: 630,
          alt: data.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${data.title} - Buddhsen Tripathi`,
      description: data.excerpt,
      images: ["https://buddhsentripathi.com/default-image-blogs.webp"],
    },
  };
}

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const { content, data } = await getBlogPostFromS3(slug);

  return (
    <Layout>
      <article className="space-y-6 px-2 md:px-0">
        <Link
          href="/blogs"
          className="group inline-flex items-center gap-1.5 font-space-mono text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
          <span>back to blogs</span>
        </Link>

        <header className="space-y-3">
          <h1 className="font-doto text-2xl font-medium leading-tight text-foreground md:text-4xl">
            {data.title}
          </h1>
          <div className="flex flex-wrap items-center gap-2 font-space-mono text-xs text-muted-foreground">
            <span>{data.date}</span>
            {content && (
              <>
                <span>&middot;</span>
                <span>{getReadingTime(content)} min read</span>
                <span>&middot;</span>
                <ViewCounter slug={data.slug} />
              </>
            )}
          </div>
        </header>

        {content && <TableOfContents content={content} />}

        <div className="mdx-content pt-2">
          <MDXRemote
            source={content}
            options={{
              mdxOptions: {
                rehypePlugins: [rehypeHighlight],
                remarkPlugins: [remarkGfm, remarkFrontmatter],
              },
            }}
            components={mdxComponents}
          />
        </div>
      </article>
    </Layout>
  );
}
