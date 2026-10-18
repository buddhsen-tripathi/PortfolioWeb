"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Search } from "lucide-react";
import ViewCounter from "@/components/blog/view-counter";
import { useViews } from "@/components/blog/views-context";
import { cn } from "@/lib/utils";

type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  url?: string;
};

const TABS = [
  { id: "technical", label: "Technical" },
  { id: "personal", label: "Personal" },
] as const;

const SORTS = ["newest", "oldest", "most read"] as const;
type Sort = (typeof SORTS)[number];

const time = (p: Post) => new Date(p.date).getTime();

export default function BlogIndex({
  technical = [],
  personal = [],
}: {
  technical: Post[];
  personal: Post[];
}) {
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("technical");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>("newest");
  const { prefetchViews, getViews } = useViews();

  const lists = { technical, personal };
  const active = lists[tab];

  useEffect(() => {
    const slugs = [...technical, ...personal].filter((p) => !p.url).map((p) => p.slug);
    if (slugs.length) prefetchViews(slugs);
  }, [technical, personal, prefetchViews]);

  const posts = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q
      ? active.filter(
          (p) => p.title.toLowerCase().includes(q) || (p.excerpt ?? "").toLowerCase().includes(q)
        )
      : active;
    return [...filtered].sort((a, b) => {
      if (sort === "oldest") return time(a) - time(b);
      if (sort === "most read") {
        const va = a.url ? -1 : (getViews(a.slug) ?? 0);
        const vb = b.url ? -1 : (getViews(b.slug) ?? 0);
        if (vb !== va) return vb - va;
      }
      return time(b) - time(a);
    });
  }, [active, query, sort, getViews]);

  return (
    <section aria-label="Posts" className="pt-8">
      <div className="section-bar flex-wrap items-center gap-y-2 py-2">
        <div role="tablist" className="-ml-2 flex items-center">
          {TABS.map((t) => (
            <button
              key={t.id}
              role="tab"
              type="button"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                "flex items-center gap-1.5 rounded-md px-2 py-1 text-[14px] transition-colors",
                tab === t.id ? "font-medium text-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {t.label}
              <span className="font-mono text-[11px] text-muted-foreground">{lists[t.id].length}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <label className="relative">
            <span className="sr-only">Search posts</span>
            <Search className="pointer-events-none absolute left-2 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              className="h-7 w-36 rounded-md border border-border bg-background pl-7 pr-2 text-xs outline-none placeholder:text-muted-foreground focus:ring-1 focus:ring-ring sm:w-44"
            />
          </label>
          <label className="relative">
            <span className="sr-only">Sort posts</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="h-7 cursor-pointer appearance-none rounded-md border border-border bg-background px-2 pr-6 font-mono text-[11px] outline-none focus:ring-1 focus:ring-ring"
            >
              {SORTS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <span aria-hidden className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground">
              ▾
            </span>
          </label>
        </div>
      </div>

      {posts.length === 0 ? (
        <p className="px-6 py-10 text-[14px] text-muted-foreground">
          {query ? "No posts match that search." : "Nothing here yet."}
        </p>
      ) : (
        <ul>
          {posts.map((post) => {
            const external = Boolean(post.url);
            const Arrow = external ? ArrowUpRight : ArrowRight;
            return (
              <li key={post.slug} className="border-b border-dashed border-border last:border-b-0">
                <Link
                  href={post.url ?? `/blogs/${post.slug}`}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="group relative flex items-start gap-4 px-6 py-4 outline-none focus-visible:bg-muted/30"
                >
                  <span className="hatch pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <span className="relative hidden w-20 shrink-0 pt-0.5 font-mono text-[11px] text-muted-foreground sm:block">
                    {post.date}
                  </span>
                  <span className="relative flex min-w-0 flex-1 flex-col gap-1">
                    <span className="text-[15px] font-medium leading-snug">{post.title}</span>
                    {post.excerpt && (
                      <span className="line-clamp-2 text-[13px] leading-relaxed text-muted-foreground">
                        {post.excerpt}
                      </span>
                    )}
                    <span className="mt-0.5 flex items-center gap-2 font-mono text-[11px] text-muted-foreground">
                      <span className="sm:hidden">{post.date}</span>
                      <span className="sm:hidden" aria-hidden>
                        ·
                      </span>
                      {external ? (
                        <span>Article on 𝕏</span>
                      ) : (
                        <ViewCounter slug={post.slug} readOnly />
                      )}
                    </span>
                  </span>
                  <Arrow className="relative mt-1 size-3.5 shrink-0 text-muted-foreground/50 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-brand" />
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
