"use client";

import { useEffect, useState } from "react";
import LocationIcon from "@/components/icons/location";
import BoltIcon from "@/components/icons/bolt";
import CloudSunIcon from "@/components/icons/cloud-sun";
import SeikoWatchModal from "@/components/watch-modal";
import IconTelescopeTripod from "@/components/icons/telescope-tripod";
import { useViews } from "@/components/blog/views-context";

const SITE_VISITORS_SLUG = "_site_visitors";

const Footer = () => {
  const [time, setTime] = useState(null);
  const [battery, setBattery] = useState(null);
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const { getViews, incrementViews } = useViews();
  const visitorCount = getViews(SITE_VISITORS_SLUG);

  useEffect(() => {
    const tick = () => setTime(new Date());
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (navigator.getBattery) {
      navigator.getBattery().then((batt) => {
        const update = () => setBattery(Math.round(batt.level * 100));
        update();
        batt.addEventListener("levelchange", update);
      });
    }
  }, []);

  useEffect(() => {
    incrementViews(SITE_VISITORS_SLUG);
  }, [incrementViews]);

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

  const formattedDate = time
    ? time.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "";

  const formattedTime = time
    ? time.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    : "";

  return (
    <footer className="mx-auto mb-24 w-full max-w-4xl px-6 md:mb-6 md:px-0">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-1 font-cera text-xs text-muted-foreground/60">
          {time && (
            <SeikoWatchModal>
              <button
                type="button"
                className="w-fit cursor-pointer text-left transition-colors hover:text-foreground focus:outline-none focus-visible:text-foreground"
                aria-label="Open Seiko analog watch"
              >
                {formattedDate} &middot; {formattedTime}
              </button>
            </SeikoWatchModal>
          )}
          {location && (
            <span className="flex items-center gap-1">
              <LocationIcon className="h-3 w-3" />
              {location}
              {weather && (
                <>
                  <span>&middot;</span>
                  <CloudSunIcon className="h-3 w-3" />
                  {weather}
                </>
              )}
            </span>
          )}
          {(battery !== null || visitorCount !== null) && (
            <span className="flex items-center gap-3">
              {visitorCount !== null && (
                <span className="flex items-center gap-1">
                  <IconTelescopeTripod className="h-3 w-3" />
                  {visitorCount.toLocaleString()} visitors
                </span>
              )}
              {battery !== null && (
                <span className="flex items-center gap-1">
                  <BoltIcon className="h-3 w-3" />
                  {battery}%
                </span>
              )}
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground/60">
          &copy; {new Date().getFullYear()} Buddhsen Tripathi. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
