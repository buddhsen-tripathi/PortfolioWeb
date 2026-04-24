"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, ArrowUpRight, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import ViewCounter from "@/components/blog/view-counter";
import { useViews } from "@/components/blog/views-context";

export default function BlogList({ blogPosts }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortType, setSortType] = useState("newest");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { prefetchViews } = useViews();

  useEffect(() => {
    const slugs = blogPosts
      .filter((post) => !post.url)
      .map((post) => post.slug);
    if (slugs.length > 0) prefetchViews(slugs);
  }, [blogPosts, prefetchViews]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const sortedPosts = [...blogPosts].sort((a, b) => {
    if (sortType === "oldest") {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    }
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const filteredPosts = sortedPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (post.excerpt || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 px-2 md:px-0">
      <div className="flex gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9 w-full rounded-sm border border-black/[0.08] bg-transparent px-3 pr-9 font-space-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-foreground/40 dark:border-white/[0.08]"
          />
          <Search className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        </div>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen((v) => !v)}
            className="flex h-9 cursor-pointer items-center gap-2 rounded-sm border border-black/[0.08] bg-transparent px-3 font-space-mono text-sm text-foreground transition-colors hover:bg-black/[0.03] focus:outline-none focus:ring-1 focus:ring-foreground/40 dark:border-white/[0.08] dark:hover:bg-white/[0.04]"
          >
            <Check className="h-3 w-3" />
            <span>{sortType}</span>
          </button>

          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 z-50 mt-1 w-32 overflow-hidden rounded-sm border border-black/[0.08] bg-background shadow-lg dark:border-white/[0.08]"
              >
                {["newest", "oldest"].map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setSortType(option);
                      setIsDropdownOpen(false);
                    }}
                    className={`flex w-full items-center justify-between px-3 py-2 text-left font-space-mono text-sm transition-colors hover:bg-black/[0.04] dark:hover:bg-white/[0.05] ${
                      sortType === option ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    <span>{option}</span>
                    {sortType === option && <Check className="h-3 w-3" />}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {filteredPosts.length > 0 ? (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <Link
                  href={post.url ?? `/blogs/${post.slug}`}
                  target={post.url ? "_blank" : undefined}
                  rel={post.url ? "noopener noreferrer" : undefined}
                  className="group block"
                >
                  <article className="space-y-1.5">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="font-doto text-base font-medium text-foreground transition-colors md:text-lg">
                          {post.title}
                        </h2>
                        {post.url && (
                          <span className="rounded-sm border border-black/[0.1] px-1.5 py-px text-[10px] leading-none text-muted-foreground dark:border-white/[0.1]">
                            𝕏 article
                          </span>
                        )}
                      </div>
                      <ArrowUpRight className="h-4 w-4 flex-shrink-0 text-muted-foreground opacity-0 transition-all group-hover:opacity-100" />
                    </div>

                    <div className="flex items-center gap-2 font-space-mono text-xs text-muted-foreground">
                      <time>{post.date}</time>
                      {!post.url && (
                        <>
                          <span>&middot;</span>
                          <ViewCounter slug={post.slug} readOnly />
                        </>
                      )}
                    </div>

                    <p className="font-space-mono text-xs leading-relaxed text-muted-foreground md:text-sm">
                      {post.excerpt && post.excerpt.length > 140
                        ? `${post.excerpt.substring(0, 140)}...`
                        : post.excerpt}
                    </p>
                  </article>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-8"
          >
            <p className="font-space-mono text-sm text-muted-foreground">
              No matching blog posts found. Try adjusting your search.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
