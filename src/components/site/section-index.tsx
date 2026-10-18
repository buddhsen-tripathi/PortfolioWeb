"use client";

import { useEffect, useState } from "react";
import { useLenis } from "lenis/react";
import { cn } from "@/lib/utils";

export type IndexItem = { id: string; label: string };

/**
 * Table of contents pinned in the left gutter, just outside the frame.
 * Highlights the section currently in view and scrolls to a section on click.
 * Only shown from xl up, where the gutter has room for the labels.
 */
export default function SectionIndex({ items }: { items: IndexItem[] }) {
  const [active, setActive] = useState(items[0]?.id);
  const lenis = useLenis();

  useEffect(() => {
    const query = window.matchMedia("(min-width: 80rem)");
    let teardown: (() => void) | null = null;

    const start = () => {
      const visible = new Set<string>();
      const pick = () => {
        // At the very top the first item is active, even if the next
        // section already reaches the band (short heroes do).
        if (window.scrollY < 8) return setActive(items[0].id);
        // Otherwise the first item in page order that is inside the band wins.
        const next = items.find((item) => visible.has(item.id));
        if (next) setActive(next.id);
      };

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) visible.add(entry.target.id);
            else visible.delete(entry.target.id);
          }
          pick();
        },
        { rootMargin: "-35% 0px -60% 0px" }
      );
      for (const item of items) {
        const el = document.getElementById(item.id);
        if (el) observer.observe(el);
      }

      // The last section can be too short to ever reach the band.
      const onScroll = () => {
        const { scrollHeight } = document.documentElement;
        if (window.scrollY + window.innerHeight >= scrollHeight - 4) {
          setActive(items[items.length - 1].id);
        } else if (window.scrollY < 8) {
          setActive(items[0].id);
        }
      };
      window.addEventListener("scroll", onScroll, { passive: true });

      return () => {
        observer.disconnect();
        window.removeEventListener("scroll", onScroll);
      };
    };

    const sync = () => {
      if (query.matches && !teardown) teardown = start();
      if (!query.matches && teardown) {
        teardown();
        teardown = null;
      }
    };
    sync();
    query.addEventListener("change", sync);
    return () => {
      query.removeEventListener("change", sync);
      teardown?.();
    };
  }, [items]);

  const goTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    setActive(id);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (lenis) lenis.scrollTo(el, { offset: -48, immediate: reduced });
    else el.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
  };

  const index = Math.max(
    0,
    items.findIndex((item) => item.id === active)
  );

  return (
    <nav
      aria-label="Sections"
      className="fixed top-1/2 z-30 hidden -translate-y-1/2 flex-col items-end xl:flex"
      style={{ right: "calc(50% + var(--frame-width) / 2 + 2rem)" }}
    >
      <span className="mb-3 rounded bg-background px-1.5 py-0.5 font-mono text-[11px] tabular-nums text-muted-foreground">
        {String(index + 1).padStart(2, "0")}
        <span className="text-muted-foreground/40"> / {String(items.length).padStart(2, "0")}</span>
      </span>
      <ul className="flex flex-col items-end">
        {items.map((item) => {
          const isActive = item.id === active;
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => goTo(item.id)}
                aria-current={isActive ? "location" : undefined}
                className="group flex items-center gap-3 py-1 focus-visible:outline-none"
              >
                <span
                  className={cn(
                    "rounded bg-background px-1.5 py-0.5 text-xs transition-colors duration-300 group-focus-visible:underline",
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground/60 group-hover:text-foreground"
                  )}
                >
                  {item.label}
                </span>
                <span
                  aria-hidden
                  className={cn(
                    "h-px transition-all duration-300 ease-soft",
                    isActive
                      ? "w-6 bg-brand"
                      : "w-3 bg-muted-foreground/40 group-hover:w-4 group-hover:bg-foreground"
                  )}
                />
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
