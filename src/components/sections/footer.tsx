"use client";

import { useEffect } from "react";
import Image from "next/image";
import IconTelescopeTripod from "@/components/icons/telescope-tripod";
import { useViews } from "@/components/blog/views-context";
import { siteConfig } from "@/site.config";

const SITE_VISITORS_SLUG = "_site_visitors";

const Footer = () => {
  const { getViews, incrementViews, prefetchViews } = useViews();
  const visitorCount = getViews(SITE_VISITORS_SLUG);

  useEffect(() => {
    // Prefetch so the count can render from GET even if the increment POST is slow
    // or a Strict Mode remount races the in-flight request.
    prefetchViews([SITE_VISITORS_SLUG]);
    incrementViews(SITE_VISITORS_SLUG);
  }, [incrementViews, prefetchViews]);

  const art = siteConfig.assets.footerArt;

  return (
    // -mt-px lets the top line sit on the previous section's bottom border
    // instead of doubling it; pages without one still get a line.
    <footer className="-mt-px">
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-y border-dashed border-border px-6 py-4 font-mono text-[11px] text-muted-foreground">
        {visitorCount !== null ? (
          <span className="flex items-center gap-1.5">
            <IconTelescopeTripod className="size-3" />
            {visitorCount.toLocaleString()} visitors
          </span>
        ) : (
          <span />
        )}
        <span>
          &copy; {new Date().getFullYear()} {siteConfig.identity.name}
        </span>
      </div>

      {siteConfig.assets.footerQuote && (
        <p className="text-muted-foreground px-6 pt-12 pb-8 text-center text-[15px] italic">
          {siteConfig.assets.footerQuote}
        </p>
      )}

      {art && (
        <div
          className="relative -mt-6 w-full [mask-image:linear-gradient(to_bottom,transparent,black_40%)]"
          style={{ aspectRatio: `${art.width} / ${art.height}` }}
        >
          <Image src={art.light} alt="" fill sizes="768px" className="object-cover dark:hidden" />
          <Image src={art.dark} alt="" fill sizes="768px" className="hidden object-cover dark:block" />
        </div>
      )}
    </footer>
  );
};

export default Footer;
