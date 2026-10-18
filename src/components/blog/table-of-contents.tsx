"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useLenis } from "lenis/react";
import { cn } from "@/lib/utils";

type Heading = { id: string; text: string; level: number };

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();

/* Reads h2/h3 headings out of the MDX source. Ids match mdx-components.tsx. */
function extractHeadings(content: string): Heading[] {
  const withoutCode = content.replace(/```[\s\S]*?```/g, "");
  const items: Heading[] = [];
  let match: RegExpExecArray | null;

  // Posts written with raw HTML headings carry their own ids.
  const html = /<h([23])[^>]*id="([^"]*)"[^>]*>([\s\S]*?)<\/h[23]>/gi;
  while ((match = html.exec(withoutCode)) !== null) {
    const text = match[3].replace(/<[^>]*>/g, "").trim();
    if (match[2] && text) items.push({ id: match[2], text, level: Number(match[1]) });
  }
  if (items.length) return items;

  const re = /^(#{2,3})\s+(.+)$/gm;
  while ((match = re.exec(withoutCode)) !== null) {
    const text = match[2].replace(/[*_`]/g, "").trim();
    items.push({ id: slugify(text), text, level: match[1].length });
  }
  return items;
}

export default function TableOfContents({ content }: { content: string }) {
  const headings = useMemo(() => extractHeadings(content), [content]);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    if (!headings.length) return;
    const onScroll = () => {
      let current = "";
      for (const h of headings) {
        const el = document.getElementById(h.id);
        if (el && el.getBoundingClientRect().top <= 120) current = h.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [headings]);

  if (headings.length < 2) return null;

  const goTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    setOpen(false);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (lenis) lenis.scrollTo(el, { offset: -64, immediate: reduced });
    else el.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
  };

  const item = (h: Heading, variant: "side" | "inline") => {
    const isActive = h.id === active;
    return (
      <li key={h.id}>
        <button
          type="button"
          onClick={() => goTo(h.id)}
          aria-current={isActive ? "location" : undefined}
          className={cn(
            "group flex w-full items-center gap-3 py-1 text-left text-xs transition-colors",
            variant === "side" && "justify-end",
            isActive ? "text-foreground" : "text-muted-foreground/70 hover:text-foreground",
            variant === "inline" && h.level === 3 && "pl-4"
          )}
        >
          <span
            className={cn(variant === "side" && "line-clamp-1 max-w-48 rounded bg-background px-1.5 py-0.5 text-right")}
          >
            {h.text}
          </span>
          {variant === "side" && (
            <span
              aria-hidden
              className={cn(
                "h-px shrink-0 transition-all duration-300 ease-soft",
                isActive ? "w-6 bg-brand" : h.level === 3 ? "w-2 bg-muted-foreground/30" : "w-3 bg-muted-foreground/40"
              )}
            />
          )}
        </button>
      </li>
    );
  };

  return (
    <>
      {/* Wide screens: pinned in the left gutter, outside the frame. */}
      <nav
        aria-label="On this page"
        className="fixed top-1/2 z-30 hidden max-h-[70vh] -translate-y-1/2 flex-col items-end overflow-y-auto xl:flex"
        style={{ right: "calc(50% + var(--frame-width) / 2 + 2rem)" }}
      >
        <span className="mb-3 rounded bg-background px-1.5 py-0.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          On this page
        </span>
        <ul className="flex flex-col items-end">{headings.map((h) => item(h, "side"))}</ul>
      </nav>

      {/* Below xl: a collapsible block at the top of the article. */}
      <div className="mx-6 mt-8 rounded-lg border border-border xl:hidden">
        <button
          type="button"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center justify-between px-4 py-3 text-[13px] font-medium"
        >
          On this page
          <ChevronDown className={cn("size-4 text-muted-foreground transition-transform", open && "rotate-180")} />
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.ul
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden border-t border-dashed border-border px-4 py-2"
            >
              {headings.map((h) => item(h, "inline"))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
