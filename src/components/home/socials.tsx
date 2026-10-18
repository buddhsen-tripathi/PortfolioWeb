"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { toast } from "sonner";
import LocationIcon from "@/components/icons/location";
import { copyText } from "@/lib/copy";
import { vibrateLight } from "@/lib/haptics";
import { getSocials, type SocialLink, type SocialPlatform } from "@/lib/socials";
import { cn } from "@/lib/utils";
import Section from "@/components/site/section";

const socials = getSocials();

/* Platforms /api/socials returns profile data for; others get no hover card. */
const PREVIEWABLE = new Set<SocialPlatform>(["github", "twitter", "linkedin", "leetcode", "tryhackme", "codeforces"]);

type Profile = {
  name?: string;
  username?: string;
  avatar?: string;
  banner?: string;
  bio?: string;
  location?: string;
  stats?: { label: string; value: string | number }[];
};

function ProfileCard({ data, loading }: { data?: Profile; loading: boolean }) {
  if (loading) {
    return (
      <div className="flex animate-pulse items-center gap-3">
        <div className="size-12 rounded-full bg-muted" />
        <div className="flex flex-col gap-2">
          <div className="h-3.5 w-28 rounded-sm bg-muted" />
          <div className="h-3 w-20 rounded-sm bg-muted" />
        </div>
      </div>
    );
  }
  if (!data) return null;

  return (
    <div className="flex flex-col gap-2 text-left">
      {data.banner && (
        <div className="-mx-4 -mt-4 mb-1 h-20 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={data.banner} alt="" className="size-full object-cover" />
        </div>
      )}
      <div className={`relative flex gap-3 ${data.banner ? "-mt-10 flex-col items-start" : "items-center"}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={data.avatar || "https://github.com/buddhsen-tripathi.png"}
          alt=""
          className={`rounded-full bg-background object-cover ${data.banner ? "size-16 border-[3px] border-popover" : "size-12 border border-border"}`}
        />
        <div className="flex flex-col">
          <span className="text-sm font-semibold">{data.name}</span>
          <span className="font-mono text-xs text-muted-foreground">{data.username}</span>
        </div>
      </div>
      {data.bio && <p className="line-clamp-3 text-[13px] leading-snug">{data.bio}</p>}
      {data.location && (
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <LocationIcon className="size-3.5 shrink-0" />
          <span className="line-clamp-1">{data.location}</span>
        </span>
      )}
      {!!data.stats?.length && (
        <div className="mt-1 flex gap-4 text-xs text-muted-foreground">
          {data.stats.map((stat) => (
            <span key={stat.label}>
              <strong className="font-semibold text-foreground">{stat.value}</strong> {stat.label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function SocialCell({
  social,
  data,
  loading,
  wide = false,
}: {
  social: SocialLink;
  data?: Profile;
  loading: boolean;
  /** Spans both columns, so an odd last cell leaves no gap. */
  wide?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const spring = { damping: 26, stiffness: 170, mass: 0.5 };
  const sx = useSpring(x, spring);
  const sy = useSpring(y, spring);

  const place = (e: MouseEvent, jump = false) => {
    const nx = e.clientX + 16;
    const ny = e.clientY + 16;
    x.set(nx);
    y.set(ny);
    if (jump) {
      sx.jump(nx);
      sy.jump(ny);
    }
  };

  const [copied, setCopied] = useState(false);

  // Handles that can't be linked (e.g. a Discord username) are copied instead.
  const copyHandle = async () => {
    vibrateLight();
    if (!(await copyText(social.handle))) return;
    toast.success(`${social.label} username copied`, { description: social.handle });
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const shared = {
    onMouseEnter: (e: MouseEvent) => {
      place(e, true);
      setHovered(true);
    },
    onMouseMove: place,
    onMouseLeave: () => setHovered(false),
    className: cn(
      "group relative flex w-full items-center gap-3 border-b border-dashed border-border px-6 py-3.5 text-left outline-none transition-colors focus-visible:bg-muted/30",
      wide ? "sm:col-span-2" : "sm:odd:border-r"
    ),
  };

  const body = (
    <>
      <span className="hatch pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <span className="relative flex size-8 shrink-0 items-center justify-center rounded-md border border-border bg-background">
        {social.icon}
      </span>
      <span className="relative flex min-w-0 flex-col">
        <span className="text-sm font-medium leading-tight">{social.label}</span>
        <span className="truncate font-mono text-xs text-muted-foreground">{social.handle}</span>
      </span>
      {social.url ? (
        <ArrowUpRight className="relative ml-auto size-3.5 text-muted-foreground/50 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand" />
      ) : copied ? (
        <Check className="relative ml-auto size-3.5 text-brand" />
      ) : (
        <Copy className="relative ml-auto size-3.5 text-muted-foreground/50 transition-colors group-hover:text-foreground" />
      )}

      <AnimatePresence>
        {hovered && PREVIEWABLE.has(social.platform) && (loading || data) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            style={{ position: "fixed", left: sx, top: sy, zIndex: 60 }}
            className="pointer-events-none hidden w-80 overflow-hidden rounded-xl border border-border bg-popover/90 p-4 shadow-2xl backdrop-blur-xl md:block"
          >
            <ProfileCard data={data} loading={loading} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );

  return social.url ? (
    <a href={social.url} target="_blank" rel="noopener noreferrer" {...shared}>
      {body}
    </a>
  ) : (
    <button type="button" onClick={copyHandle} aria-label={`Copy ${social.label} username ${social.handle}`} {...shared}>
      {body}
    </button>
  );
}

export default function Socials() {
  const [profiles, setProfiles] = useState<Partial<Record<SocialPlatform, Profile>>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    fetch("/api/socials")
      .then((res) => res.json())
      .then((data) => {
        if (alive && !data.error) setProfiles(data);
      })
      .catch(() => {})
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, []);

  if (!socials.length) return null;

  return (
    <Section id="socials" title="Socials">
      <div className="grid sm:grid-cols-2">
        {socials.map((social, i) => (
          <SocialCell
            key={social.platform}
            social={social}
            data={profiles[social.platform]}
            loading={loading}
            wide={socials.length % 2 === 1 && i === socials.length - 1}
          />
        ))}
      </div>
    </Section>
  );
}
