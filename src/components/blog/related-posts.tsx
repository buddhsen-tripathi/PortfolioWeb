import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getAllBlogPostsFromS3 } from "@/lib/r2Client";

interface RelatedPostsProps {
  currentSlug: string;
  currentType?: string;
  limit?: number;
}

// Server component. Prefers posts of the same `type`, falls back to recency.
// Renders nothing if there are no other posts.
export default async function RelatedPosts({
  currentSlug,
  currentType,
  limit = 3,
}: RelatedPostsProps) {
  const all = await getAllBlogPostsFromS3();
  const others = all.filter((p: any) => p.slug !== currentSlug);
  if (others.length === 0) return null;

  const sameType = currentType
    ? others.filter((p: any) => p.type === currentType)
    : [];
  const rest = others.filter((p: any) => !sameType.includes(p));
  const picks = [...sameType, ...rest].slice(0, limit);

  if (picks.length === 0) return null;

  return (
    <section className="mt-12 border-b border-black/15 pb-12 dark:border-white/15">
      <h2 className="mb-4 font-doto text-xl font-medium md:text-2xl">
        More posts
      </h2>
      <ul className="space-y-3">
        {picks.map((post: any) => (
          <li key={post.slug}>
            <Link
              href={`/blogs/${post.slug}`}
              className="group flex items-start gap-3 rounded-md border border-black/6 bg-black/2 p-4 transition-colors hover:bg-black/4 dark:border-white/6 dark:bg-white/3 dark:hover:bg-white/5"
            >
              <div className="min-w-0 flex-1">
                <p className="font-doto text-sm font-medium md:text-base">
                  {post.title}
                </p>
                {post.excerpt && (
                  <p className="mt-1 line-clamp-2 font-space-mono text-xs text-muted-foreground md:text-sm">
                    {post.excerpt}
                  </p>
                )}
                <p className="mt-1.5 font-space-mono text-[10px] uppercase tracking-wide text-muted-foreground/60 md:text-xs">
                  {post.date}
                </p>
              </div>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
