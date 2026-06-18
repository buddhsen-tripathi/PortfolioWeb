"use client";

import { useEffect, useState } from "react";

// Fixed-top bar that tracks scroll progress through the current blog post.
// Mounted only on /blogs/[slug], so it's a per-page indicator, not site-wide.
export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;

    const update = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      const p = scrollable > 0 ? (doc.scrollTop / scrollable) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, p)));
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-1 bg-transparent"
      aria-hidden="true"
    >
      <div
        className="h-full bg-foreground/70 transition-[width] duration-100 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
