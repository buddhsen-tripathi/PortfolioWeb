"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "motion/react";
import { Star } from "lucide-react";
import GithubIcon from "@/components/icons/github";
import MoonIcon from "@/components/icons/moon";
import SunIcon from "@/components/icons/sun";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { vibrateLight } from "@/lib/haptics";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/site.config";

const links = siteConfig.nav;
const ease = [0.22, 1, 0.36, 1] as const;

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => {
        vibrateLight();
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
      }}
      className="size-8 text-muted-foreground hover:bg-muted/60 hover:text-foreground focus-visible:ring-ring relative flex items-center justify-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-1"
    >
      <SunIcon className="size-4 rotate-0 scale-100 transition-transform duration-500 dark:-rotate-90 dark:scale-0" />
      <MoonIcon className="size-4 absolute rotate-90 scale-0 transition-transform duration-500 dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}

/* Two bars that fold into an X. */
function MenuIcon({ open }: { open: boolean }) {
  const bar = "absolute left-0 h-[1.5px] w-full rounded-full bg-current";
  return (
    <span aria-hidden className="relative block h-3 w-4">
      <motion.span
        className={bar}
        initial={false}
        animate={open ? { top: "50%", y: "-50%", rotate: 45 } : { top: "15%", y: "0%", rotate: 0 }}
        transition={{ duration: 0.25, ease }}
      />
      <motion.span
        className={bar}
        initial={false}
        animate={
          open
            ? { top: "50%", y: "-50%", rotate: -45, width: "100%" }
            : { top: "70%", y: "0%", rotate: 0, width: "65%" }
        }
        transition={{ duration: 0.25, ease }}
      />
    </span>
  );
}

/* Link to this site's source, so visitors can star it or fork it for their own portfolio. */
function RepoButton({ stars }: { stars: number | null }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <a
          href={`https://github.com/${siteConfig.repo}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Source on GitHub${stars !== null ? `, ${stars} stars` : ""}`}
          className="border-border text-muted-foreground hover:text-foreground hover:bg-muted/60 focus-visible:ring-ring group flex h-7 items-center overflow-hidden rounded-md border text-xs transition-colors focus-visible:outline-none focus-visible:ring-1"
        >
          <span className="flex items-center gap-1.5 px-2">
            <GithubIcon className="size-3.5" />
            <span className="hidden sm:inline">Star</span>
          </span>
          {stars !== null && (
            <span className="border-border flex h-full items-center gap-1 border-l px-2 font-mono text-[11px] tabular-nums">
              <Star className="size-3 transition-colors group-hover:fill-amber-400 group-hover:text-amber-400" />
              {stars}
            </span>
          )}
        </a>
      </TooltipTrigger>
      <TooltipContent side="bottom" className="max-w-56 text-xs font-normal">
        Like the design? The code is on GitHub. Star it or fork it for your own portfolio.
      </TooltipContent>
    </Tooltip>
  );
}

export default function SiteHeader({ repoStars = null }: { repoStars?: number | null }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const isActive = (path: string) =>
    path === "/"
      ? pathname === "/"
      : pathname === path || pathname.startsWith(`${path}/`);

  return (
    <header
      ref={headerRef}
      className="border-border bg-surface/80 sticky top-0 z-40 border-b border-dashed backdrop-blur-md"
    >
      <div className="flex h-12 items-center justify-between px-6">
        <nav aria-label="Main" className="-ml-2.5 hidden items-center sm:flex">
          {links.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              aria-current={isActive(link.path) ? "page" : undefined}
              className={cn(
                "hover:text-foreground focus-visible:ring-ring rounded-md px-2.5 py-1 text-[13px] transition-colors focus-visible:outline-none focus-visible:ring-1",
                isActive(link.path) ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => {
            vibrateLight();
            setOpen((v) => !v);
          }}
          className="text-muted-foreground hover:text-foreground focus-visible:ring-ring -ml-2 flex size-8 items-center justify-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-1 sm:hidden"
        >
          <MenuIcon open={open} />
        </button>

        <div className="flex items-center gap-1.5">
          <RepoButton stars={repoStars} />
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile menu: expands the header itself, pushing the page down. */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.nav
            id="mobile-nav"
            aria-label="Main"
            key="mobile-nav"
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.32, ease }}
            className="overflow-hidden sm:hidden"
          >
            <motion.ul
              className="border-border flex flex-col border-t border-dashed px-6 py-3"
              initial="hidden"
              animate="shown"
              exit="hidden"
              variants={{
                shown: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } },
                hidden: { transition: { staggerChildren: 0.02, staggerDirection: -1 } },
              }}
            >
              {links.map((link) => (
                <motion.li
                  key={link.path}
                  variants={{
                    hidden: { opacity: 0, y: -6, filter: "blur(2px)" },
                    shown: { opacity: 1, y: 0, filter: "blur(0px)" },
                  }}
                  transition={{ duration: 0.22, ease }}
                >
                  <Link
                    href={link.path}
                    aria-current={isActive(link.path) ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center justify-between py-2.5 text-[15px] transition-colors",
                      isActive(link.path) ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {link.name}
                    {isActive(link.path) && <span className="bg-brand size-1.5 rounded-full" />}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
