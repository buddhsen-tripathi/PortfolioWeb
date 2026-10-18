import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Section from "@/components/site/section";
import { siteConfig } from "@/site.config";

export type PostSummary = {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  url?: string;
};

export default function Writing({ posts, total }: { posts: PostSummary[]; total: number }) {
  if (!posts.length) return null;

  return (
    <Section
      id="writing"
      title={siteConfig.home.sections.writing.title}
      meta={`${total} posts`}
      more={{ href: "/blogs", label: "Read all posts" }}
    >
      <ul className="py-2">
        {posts.map((post) => {
          const external = Boolean(post.url);
          const Arrow = external ? ArrowUpRight : ArrowRight;
          return (
            <li key={post.slug}>
              <Link
                href={post.url ?? `/blogs/${post.slug}`}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
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
                  <span className="font-mono text-[11px] text-muted-foreground sm:hidden">{post.date}</span>
                </span>
                <Arrow className="relative ml-auto mt-0.5 size-3.5 shrink-0 text-muted-foreground/50 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-brand" />
              </Link>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
