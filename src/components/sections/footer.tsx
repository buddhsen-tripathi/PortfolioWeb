"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import LocationIcon from "@/components/icons/location";
import BoltIcon from "@/components/icons/bolt";
import CloudSunIcon from "@/components/icons/cloud-sun";
import IconTelescopeTripod from "@/components/icons/telescope-tripod";
import { useViews } from "@/components/blog/views-context";
import { siteConfig } from "@/site.config";

const SITE_VISITORS_SLUG = "_site_visitors";

const Footer = () => {
  const [battery, setBattery] = useState<number | null>(null);
  const [location, setLocation] = useState<string | null>(null);
  const [weather, setWeather] = useState<string | null>(null);
  const { getViews, incrementViews, prefetchViews } = useViews();
  const visitorCount = getViews(SITE_VISITORS_SLUG);

  useEffect(() => {
    const nav = navigator as Navigator & { getBattery?: () => Promise<any> };
    if (nav.getBattery) {
      nav.getBattery().then((batt: any) => {
        const update = () => setBattery(Math.round(batt.level * 100));
        update();
        batt.addEventListener("levelchange", update);
      });
    }
  }, []);

  useEffect(() => {
    // Prefetch so the count can render from GET even if the increment POST is slow
    // or a Strict Mode remount races the in-flight request.
    prefetchViews([SITE_VISITORS_SLUG]);
    incrementViews(SITE_VISITORS_SLUG);
  }, [incrementViews, prefetchViews]);

  useEffect(() => {
    fetch("/api/location")
      .then((res) => res.json())
      .then((data) => {
        const city = data.city || "";
        const country = data.country || "";
        if (city && country) {
          setLocation(`${city}, ${country}`);
        } else {
          setLocation(city || country || null);
        }
        if (data.weather) {
          setWeather(`${data.weather.temperature}${data.weather.unit}`);
        }
      })
      .catch(() => setLocation(null));
  }, []);

  const art = siteConfig.assets.footerArt;
  const meta = "flex items-center gap-1.5";

  return (
    // -mt-px lets the top line sit on the previous section's bottom border
    // instead of doubling it; pages without one still get a line.
    <footer className="-mt-px">
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-y border-dashed border-border px-6 py-4 font-mono text-[11px] text-muted-foreground">
        <span className="flex items-center gap-3">
          {location && (
            <span className={meta}>
              <LocationIcon className="size-3" />
              {location}
              {weather && (
                <>
                  <span>&middot;</span>
                  <CloudSunIcon className="size-3" />
                  {weather}
                </>
              )}
            </span>
          )}
          {visitorCount !== null && (
            <span className={meta}>
              <IconTelescopeTripod className="size-3" />
              {visitorCount.toLocaleString()} visitors
            </span>
          )}
          {battery !== null && (
            <span className={meta}>
              <BoltIcon className="size-3" />
              {battery}%
            </span>
          )}
        </span>
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
