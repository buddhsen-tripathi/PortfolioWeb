import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Section from "@/components/site/section";
import { getAllBlogPostsFromS3 } from "@/lib/r2Client";

interface RelatedPostsProps {
  currentSlug: string;
  currentType?: string;
  limit?: number;
}

type Post = { slug: string; title: string; date: string; excerpt?: string; type?: string };

// Server component. Prefers posts of the same `type`, falls back to recency.
// Renders nothing if there are no other posts.
export default async function RelatedPosts({ currentSlug, currentType, limit = 3 }: RelatedPostsProps) {
  const all: Post[] = await getAllBlogPostsFromS3();
  const others = all.filter((p) => p.slug !== currentSlug);
  const sameType = currentType ? others.filter((p) => p.type === currentType) : [];
  const picks = [...sameType, ...others.filter((p) => !sameType.includes(p))].slice(0, limit);

  if (picks.length === 0) return null;

  return (
    <Section id="more-posts" title="Keep reading" more={{ href: "/blogs", label: "All posts" }}>
      <ul className="py-2">
        {picks.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blogs/${post.slug}`}
              className="group relative flex items-start gap-4 px-6 py-3.5 outline-none focus-visible:bg-muted/30"
            >
              <span className="hatch pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="relative hidden w-20 shrink-0 pt-0.5 font-mono text-[11px] text-muted-foreground sm:block">
                {post.date}
              </span>
              <span className="relative flex min-w-0 flex-col gap-1">
                <span className="text-sm font-medium leading-snug">{post.title}</span>
                {post.excerpt && (
                  <span className="line-clamp-2 text-[13px] leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </span>
                )}
              </span>
              <ArrowRight className="relative ml-auto mt-0.5 size-3.5 shrink-0 text-muted-foreground/50 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-brand" />
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
