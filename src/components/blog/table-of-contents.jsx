"use client";

import { useState, useEffect } from "react";
import { ChevronRight, List } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const generateId = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();

function extractHeadings(content) {
  const items = [];

  const htmlHeadingRegex = /<h([1-6])[^>]*id="([^"]*)"[^>]*>([\s\S]*?)<\/h[1-6]>/gi;
  let match;
  while ((match = htmlHeadingRegex.exec(content)) !== null) {
    const level = parseInt(match[1], 10);
    const id = match[2];
    const text = match[3].replace(/<[^>]*>/g, "").trim();
    if (id && text) items.push({ id, text, level });
  }

  if (items.length === 0) {
    const markdownHeadingRegex = /^(#{1,6})\s+(.+)$/gm;
    while ((match = markdownHeadingRegex.exec(content)) !== null) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = generateId(text);
      items.push({ id, text, level });
    }
  }

  return items;
}

export default function TableOfContents({ content }) {
  const [tocItems, setTocItems] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    setTocItems(extractHeadings(content));
  }, [content]);

  useEffect(() => {
    const handleScroll = () => {
      const headings = tocItems
        .map((item) => document.getElementById(item.id))
        .filter(Boolean);
      let current = "";
      for (const heading of headings) {
        if (heading.getBoundingClientRect().top <= 100) {
          current = heading.id;
        }
      }
      setActiveId(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [tocItems]);

  const scrollToHeading = (id) => {
    const element = document.getElementById(id);
    if (!element) return;
    const y =
      element.getBoundingClientRect().top + window.pageYOffset - 80;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  if (tocItems.length === 0) return null;

  return (
    <div className="sticky top-20 z-10 rounded-sm border border-black/[0.08] bg-background/60 p-4 backdrop-blur-sm dark:border-white/[0.08]">
      <button
        type="button"
        onClick={() => setIsCollapsed((v) => !v)}
        className="flex w-full items-center justify-between text-left transition-colors hover:text-foreground"
      >
        <div className="flex items-center gap-2">
          <List size={14} className="text-muted-foreground" />
          <span className="font-doto text-sm font-medium text-foreground">
            Table of Contents
          </span>
        </div>
        <motion.div
          animate={{ rotate: isCollapsed ? 0 : 90 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronRight size={14} className="text-muted-foreground" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {!isCollapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <nav className="mt-3 space-y-0.5">
              {tocItems.map((item, index) => {
                const isActive = activeId === item.id;
                const depth = Math.max(0, item.level - 2);
                const marker = depth === 0 ? "" : depth === 1 ? "›" : "··";
                return (
                  <motion.button
                    key={`${item.id}-${index}`}
                    type="button"
                    initial={{ x: -6, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.03 }}
                    onClick={() => scrollToHeading(item.id)}
                    style={{ paddingLeft: `${depth * 14 + 10}px` }}
                    className={`block w-full rounded-sm py-1.5 pr-2 text-left font-space-mono text-xs transition-colors ${
                      isActive
                        ? "border-l-2 border-foreground bg-black/[0.04] text-foreground dark:bg-white/[0.05]"
                        : `border-l-2 border-transparent hover:bg-black/[0.03] hover:text-foreground dark:hover:bg-white/[0.04] ${
                            depth === 0
                              ? "text-muted-foreground"
                              : "text-muted-foreground/70"
                          }`
                    }`}
                  >
                    <span className="flex items-center gap-1.5 truncate">
                      {marker && (
                        <span
                          aria-hidden="true"
                          className="shrink-0 text-muted-foreground/50"
                        >
                          {marker}
                        </span>
                      )}
                      <span className="truncate">{item.text}</span>
                    </span>
                  </motion.button>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
