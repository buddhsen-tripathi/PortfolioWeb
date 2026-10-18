"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { GraduationCap, MapPin } from "lucide-react";
import SeikoWatchModal from "@/components/watch-modal";
import { siteConfig } from "@/site.config";

const { identity, home } = siteConfig;

const timeFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: identity.location.timeZone,
  hour: "numeric",
  minute: "2-digit",
  timeZoneName: "short",
});

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] as const },
});

function LocalTime() {
  const [now, setNow] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setNow(timeFormatter.format(new Date()));
    tick();
    const id = window.setInterval(tick, 15_000);
    return () => window.clearInterval(id);
  }, []);

  if (!now) return null;
  return (
    <>
      <span aria-hidden className="text-border">
        ·
      </span>
      <SeikoWatchModal>
        <button
          type="button"
          aria-label="Open the analog watch"
          className="hover:text-foreground cursor-pointer tabular-nums transition-colors"
        >
          {now}
        </button>
      </SeikoWatchModal>
    </>
  );
}

function Wave() {
  const [run, setRun] = useState(0);
  return (
    <span
      key={run}
      aria-hidden
      onMouseEnter={() => setRun((n) => n + 1)}
      className="animate-wave inline-block origin-[70%_70%] cursor-default"
    >
      👋
    </span>
  );
}

export default function Hero() {
  return (
    <section id="intro" className="scroll-mt-12 px-6 pt-12 pb-2 sm:pt-16">
      {/* Photo comes first so it sits above the text on phones; row-reverse puts it on the right from sm up. */}
      <div className="flex flex-col gap-6 sm:flex-row-reverse sm:items-start sm:justify-between sm:gap-10">
        <motion.div
          {...rise(0)}
          className="relative size-20 shrink-0 sm:mt-1 sm:size-28"
        >
          <Image
            src={identity.photo.light}
            alt={identity.name}
            fill
            priority
            sizes="112px"
            className="ring-border rounded-2xl object-cover ring-1 dark:hidden"
          />
          <Image
            src={identity.photo.dark}
            alt={identity.name}
            fill
            priority
            sizes="112px"
            className="ring-border hidden rounded-2xl object-cover ring-1 dark:block"
          />
        </motion.div>

        <div className="min-w-0">
          <motion.h1
            {...rise(0.06)}
            className="text-foreground text-[15px] font-medium"
          >
            {home.greeting} <Wave />
          </motion.h1>

          <motion.p
            {...rise(0.12)}
            className="mt-3 max-w-xl text-2xl leading-tight font-semibold tracking-tight text-balance sm:text-[28px]"
          >
            {home.headline}
          </motion.p>

          <motion.p
            {...rise(0.18)}
            className="text-muted-foreground mt-4 max-w-xl text-[15px] leading-relaxed text-balance"
          >
            {home.summary}
          </motion.p>

          <motion.div
            {...rise(0.24)}
            className="text-muted-foreground mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-[15px]"
          >
            <span className="flex items-center gap-1.5">
              <MapPin className="size-3.5" />
              {identity.location.label}
              <LocalTime />
            </span>
            <span className="flex items-center gap-1.5">
              <GraduationCap className="size-3.5" />
              {identity.tagline}
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
