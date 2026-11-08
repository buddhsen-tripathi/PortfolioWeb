"use client";

import { useEffect, useRef } from "react";
import { useLenis } from "lenis/react";

// Fixed-top bar that tracks scroll progress through the current blog post.
// Uses direct DOM transform updates (scaleX) and cached scrollable height to avoid forced reflows.
export default function ReadingProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const scrollableRef = useRef(0);

  const updateBar = (scrollY?: number, limit?: number) => {
    const bar = barRef.current;
    if (!bar) return;
    const scrollable = limit ?? scrollableRef.current;
    const current = scrollY ?? window.scrollY;
    const ratio = scrollable > 0 ? Math.min(1, Math.max(0, current / scrollable)) : 0;
    bar.style.transform = `scaleX(${ratio})`;
  };

  useLenis(({ scroll, limit }) => {
    updateBar(scroll, limit);
  });

  useEffect(() => {
    const measure = () => {
      const doc = document.documentElement;
      scrollableRef.current = Math.max(0, doc.scrollHeight - window.innerHeight);
      updateBar();
    };
    const onScroll = () => updateBar();

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure, { passive: true });

    const ro = new ResizeObserver(measure);
    ro.observe(document.documentElement);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      ro.disconnect();
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-0.5 bg-transparent"
      aria-hidden="true"
    >
      <div
        ref={barRef}
        className="h-full w-full origin-left bg-brand will-change-transform"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
