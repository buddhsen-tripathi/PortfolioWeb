import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import remarkFrontmatter from "remark-frontmatter";
import PageHeader from "@/components/site/page-header";
import Section from "@/components/site/section";
import { createMdxComponents } from "@/components/blog/mdx-components";
import TableOfContents from "@/components/blog/table-of-contents";
import ViewCounter from "@/components/blog/view-counter";
import ReadingProgress from "@/components/blog/reading-progress";
import RelatedPosts from "@/components/blog/related-posts";
import NewsletterSubscription from "@/components/common/newsletter-subscription";
import { getBlogPostFromS3, getBlogSlugsFromS3, getSiteConfig } from "@/lib/r2Client";
import { getReadingTime } from "../utils";
import { getBlogPostingSchema, getBreadcrumbSchema } from "@/lib/jsonLd";
import { toIsoDate } from "@/lib/dates";
import { buildMetadata } from "@/lib/metadata";

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getBlogSlugsFromS3();
  return slugs;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const [{ data }, config] = await Promise.all([getBlogPostFromS3(slug), getSiteConfig()]);

  const meta = buildMetadata({
    title: data.title,
    description: data.excerpt,
    path: `/blogs/${data.slug}`,
    image: config.assets.blogOgImage,
    config,
  });

  return {
    ...meta,
    openGraph: {
      ...meta.openGraph,
      type: "article",
      publishedTime: toIsoDate(data.date),
      authors: [config.identity.name],
    },
  };
}

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const [{ content, data }, config] = await Promise.all([getBlogPostFromS3(slug), getSiteConfig()]);

  const blogPostJsonLd = getBlogPostingSchema(
    {
      title: data.title,
      excerpt: data.excerpt,
      date: data.date,
      updated: (data as { updated?: string }).updated,
      slug: data.slug,
    },
    config
  );

  const breadcrumbJsonLd = getBreadcrumbSchema([
    { name: "Home", url: config.contact.url },
    { name: "Blogs", url: `${config.contact.url}/blogs` },
    {
      name: data.title,
      url: `${config.contact.url}/blogs/${data.slug}`,
    },
  ]);

  return (
    <>
      <ReadingProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <article>
        <PageHeader
          back={{ href: "/blogs", label: "All posts" }}
          title={data.title}
          meta={
            <>
              <time>{data.date}</time>
              {content && (
                <>
                  <span aria-hidden>·</span>
                  <span>{getReadingTime(content)} min read</span>
                  <span aria-hidden>·</span>
                  <ViewCounter slug={data.slug} />
                </>
              )}
            </>
          }
        />

        {content && <TableOfContents content={content} />}

        <div className="mdx-content px-6 pb-4 pt-8">
          <MDXRemote
            source={content}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm, remarkFrontmatter],
              },
            }}
            components={createMdxComponents(config.assetsUrl)}
          />
        </div>
      </article>

      <RelatedPosts currentSlug={data.slug} currentType={(data as { type?: string }).type} />

      <Section id="newsletter" title="Newsletter" className="px-6 pb-2 pt-5">
        <p className="mb-4 text-[14px] leading-relaxed text-muted-foreground">
          Get the next post in your inbox. No spam, unsubscribe any time.
        </p>
        <NewsletterSubscription />
      </Section>
    </>
  );
}
