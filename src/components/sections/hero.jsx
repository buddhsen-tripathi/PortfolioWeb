"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValue, useSpring } from "motion/react";
import XTwitterIcon from "@/components/icons/x-twitter";
import GithubIcon from "@/components/icons/github";
import LinkedinIcon from "@/components/icons/linkedin";
import { IoIosMail } from "react-icons/io";
import { SiLeetcode, SiCodeforces, SiTryhackme } from "react-icons/si";
import { FileText, Check, Calendar, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Link from "next/link";
import { GeistPixelSquare } from "geist/font/pixel";
import GitHubContributionGraph from "./contribution-graph";
import { CornerBrackets } from "@/components/ui/corner-brackets";
import { TechBadge } from "@/lib/tech-icons";
import { hackathons } from "@/constants";

const placementColor = {
  "1st Place": "text-amber-500 dark:text-amber-400",
  "2nd Place": "text-zinc-400",
  "3rd Place": "text-amber-700",
  "Bounty Winner": "text-emerald-500 dark:text-emerald-400",
  "Qualifier": "text-sky-500 dark:text-sky-400",
};

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import LocationIcon from "@/components/icons/location";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] },
});

const socialLinks = [
  {
    label: "Twitter",
    href: "https://x.com/btr1pathi",
    icon: <XTwitterIcon className="h-3.5 w-3.5" />,
    external: true,
    platform: "twitter",
    username: "btr1pathi",
  },
  {
    label: "Github",
    href: "https://github.com/buddhsen-tripathi",
    icon: <GithubIcon className="h-3.5 w-3.5" />,
    external: true,
    platform: "github",
    username: "buddhsen-tripathi",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/buddhsen-tripathi/",
    icon: <LinkedinIcon className="h-3.5 w-3.5" />,
    external: true,
    platform: "linkedin",
    username: "buddhsen-tripathi",
  },
  {
    label: "LeetCode",
    href: "https://leetcode.com/u/buddhsen",
    icon: <SiLeetcode className="h-3.5 w-3.5" />,
    external: true,
    platform: "leetcode",
    username: "buddhsen",
  },
  {
    label: "TryHackMe",
    href: "https://tryhackme.com/p/btripathi",
    icon: <SiTryhackme className="h-3.5 w-3.5" />,
    external: true,
    platform: "tryhackme",
    username: "btripathi",
  },
  {
    label: "Codeforces",
    href: "https://codeforces.com/profile/Buddhsen",
    icon: <SiCodeforces className="h-3.5 w-3.5" />,
    external: true,
    platform: "codeforces",
    username: "Buddhsen",
  },
];

const connectLinks = [
  {
    label: "schedule a meet",
    href: "https://cal.com/buddhsen",
    icon: <Calendar className="h-3.5 w-3.5" />,
    endIcon: <ArrowUpRight className="h-3 w-3" />,
    external: true,
  },
  {
    label: "Email",
    icon: <IoIosMail size="14px" />,
    copyText: "bt2609@nyu.edu",
  },
  {
    label: "Resume",
    href: "/Resume.pdf",
    icon: <FileText className="h-3.5 w-3.5" />,
    external: true,
  },
];

function SocialPreviewCard({ loading, data, platform, username }) {


  if (loading) {
    return (
      <div className="flex w-[320px] flex-col gap-4 font-space-mono animate-pulse">
        <div className="flex items-center gap-3">
          <div className="h-14 w-14 rounded-full bg-muted"></div>
          <div className="flex flex-col gap-2">
            <div className="h-4 w-32 rounded bg-muted"></div>
            <div className="h-3 w-20 rounded bg-muted"></div>
          </div>
        </div>
        <div className="h-10 w-full rounded bg-muted"></div>
        <div className="h-4 w-24 rounded bg-muted"></div>
        <div className="mt-2 flex gap-4">
          <div className="h-4 w-16 rounded bg-muted"></div>
          <div className="h-4 w-16 rounded bg-muted"></div>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="flex w-[320px] flex-col gap-2 font-space-mono text-left">
      {data.banner && (
        <div className="-mx-4 -mt-4 mb-2 h-20 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={data.banner} alt="Banner" className="h-full w-full object-cover" />
        </div>
      )}
      <div className={`flex gap-3 relative z-10 ${data.banner ? "flex-col items-start -mt-12" : "items-center"}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={data.avatar || "https://github.com/buddhsen-tripathi.png"}
          alt={data.name}
          className={`rounded-full object-cover bg-background ${data.banner ? "h-[68px] w-[68px] border-[3px] border-card" : "h-14 w-14 border border-border"}`}
        />
        <div className={`flex flex-col ${data.banner ? "-mt-1" : ""}`}>
          <span className="font-doto text-base font-bold text-foreground">
            {data.name}
          </span>
          <span className="text-sm text-muted-foreground">
            {data.username}
          </span>
        </div>
      </div>
      {data.bio && (
        <p className="text-sm text-foreground line-clamp-3">
          {data.bio}
        </p>
      )}
      {data.location && (
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <LocationIcon className="h-4 w-4 shrink-0" />
          <span className="line-clamp-1">{data.location}</span>
        </div>
      )}
      {data.stats && data.stats.length > 0 && (
        <div className="mt-2 flex gap-4 text-sm text-muted-foreground">
          {data.stats.map((stat, i) => (
            <span key={i}>
              <strong className="font-doto font-semibold text-foreground">
                {stat.value}
              </strong>{" "}
              {stat.label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function SocialButton({ label, href, icon, endIcon, external, platform, username, data, loading, copyText }) {
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e) => {
    x.set(e.clientX - 160);
    y.set(e.clientY + 12);
  };

  const handleMouseEnter = (e) => {
    // Jump the spring immediately to current cursor so it doesn't fly in from top-left
    x.set(e.clientX - 160);
    y.set(e.clientY + 12);
    springX.jump(e.clientX - 160);
    springY.jump(e.clientY + 12);
    setIsHovered(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(copyText);
    toast.success("Copied to clipboard", {
      description: copyText,
      icon: <Check className="h-4 w-4" />,
      classNames: { description: "font-space-mono" },
    });
  };

  const content = copyText ? (
    <CornerBrackets>
      <Button size="sm" variant="noShadow" onClick={handleCopy}>
        {icon}
        <span className="ml-1.5">{label}</span>
        {endIcon && <span className="ml-1.5">{endIcon}</span>}
      </Button>
    </CornerBrackets>
  ) : (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      <CornerBrackets>
        <Button size="sm" variant="noShadow">
          {icon}
          <span className="ml-1.5">{label}</span>
          {endIcon && <span className="ml-1.5">{endIcon}</span>}
        </Button>
      </CornerBrackets>
    </Link>
  );

  if (platform && username) {
    return (
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
        className="relative"
      >
        {content}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, x: -10, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="flex w-[320px] flex-col gap-3 rounded-xl overflow-hidden bg-background/30 backdrop-blur-2xl backdrop-saturate-150 p-4 shadow-2xl border border-white/20 dark:border-white/10"
              style={{
                position: "fixed",
                left: springX,
                top: springY,
                zIndex: 9999,
                pointerEvents: "none",
              }}
            >
              <SocialPreviewCard platform={platform} username={username} data={data} loading={loading} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return content;
}

const WaveEmoji = () => {
  const [phase, setPhase] = useState("idle");
  const [key, setKey] = useState(0);

  useEffect(() => {
    setPhase("waving");
    const timer = setTimeout(() => setPhase("grayscale"), 700);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseEnter = () => {
    setKey((k) => k + 1);
    setPhase("hover-wave");
  };

  const handleMouseLeave = () => {
    setPhase("grayscale");
  };

  const isWaving = phase === "waving" || phase === "hover-wave";
  const isGrayscale = phase === "grayscale";

  return (
    <span
      key={key}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`inline-block origin-[70%_70%] cursor-default transition-all duration-500 ${isWaving ? "animate-wave-slow" : ""} ${isGrayscale ? "grayscale" : ""}`}
    >
      👋🏻
    </span>
  );
};

const Hero = ({ contributionData = [], lifetimeTotal = 0 }) => {
  const [socialData, setSocialData] = useState(null);
  const [socialsLoading, setSocialsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetch("/api/socials")
      .then((res) => res.json())
      .then((data) => {
        if (mounted && !data.error) {
          setSocialData(data);
        }
        if (mounted) setSocialsLoading(false);
      })
      .catch(() => {
        if (mounted) setSocialsLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="mx-auto flex flex-col gap-10 md:max-w-4xl">
      <motion.div className="flex flex-col gap-3" {...fadeUp(0)}>
        <p className="font-doto text-xs text-muted-foreground md:text-sm">
          Hola I&apos;m <WaveEmoji />
        </p>

        <div className="flex flex-row items-center justify-between gap-4">
          <div className={`min-w-0 ${GeistPixelSquare.className}`}>
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h1 className="text-2xl font-bold uppercase tracking-tight md:text-4xl">
                Buddhsen Tripathi
              </h1>
            </div>

            <p className="mt-2 text-[11px] font-medium uppercase tracking-widest text-muted-foreground md:text-sm">
              Full-Stack Developer &bull; MS CS @ NYU
            </p>
          </div>

          <Image
            src="/profpic.jpg"
            alt="Buddhsen Tripathi"
            width={128}
            height={128}
            priority
            className="h-20 w-20 shrink-0 rounded-full border border-black/[0.08] object-cover dark:border-white/[0.08] md:h-28 md:w-28"
          />
        </div>
      </motion.div>

      <div className="space-y-8">
        <motion.div {...fadeUp(0.15)}>
          <h5 className="mb-4 font-doto text-2xl font-medium md:text-3xl">
            About Me
          </h5>
          <p className="text-xs font-space-mono md:text-base md:leading-relaxed text-muted-foreground">
            Hey there! I&apos;m a <strong className="font-semibold text-foreground">software professional</strong> passionate about building <strong className="font-semibold text-foreground">scalable, user-centric applications</strong> with expertise in <strong className="font-semibold text-foreground">cloud infrastructure and microservices architecture</strong>.
          </p>
          <p className="mt-4 text-xs font-space-mono md:text-base md:leading-relaxed text-muted-foreground">
            Currently pursuing my <strong className="font-semibold text-foreground"><a href="https://www.nyu.edu" target="_blank" className="underline">MS in Computer Science at NYU</a></strong> with <strong className="font-semibold text-foreground">2+ years</strong> of experience in full-stack development. Previously spent over two years at <strong className="font-semibold text-foreground"><a href="https://amadeus.com/en" target="_blank" className="underline">Amadeus</a></strong> working on <strong className="font-semibold text-foreground">Java, Spring Boot, Angular, and Azure-backed microservices</strong>. In my free time, I enjoy <strong className="font-semibold text-foreground">building projects</strong>, exploring <strong className="font-semibold text-foreground">cybersecurity</strong>, and contributing to <strong className="font-semibold text-foreground">open-source</strong>.
          </p>
        </motion.div>

        <motion.div {...fadeUp(0.25)}>
          <p className="mb-3 text-xs text-muted-foreground md:text-sm">
            My{" "}
            <span className="font-semibold text-foreground">social links</span>{" "}
            if you wish to connect with me
          </p>
          <div className="flex flex-wrap gap-2 p-1">
            {socialLinks.map(({ label, href, icon, external, platform, username, copyText }) => (
              <SocialButton
                key={label}
                label={label}
                href={href}
                icon={icon}
                external={external}
                platform={platform}
                username={username}
                copyText={copyText}
                data={socialData?.[platform]}
                loading={socialsLoading}
              />
            ))}
          </div>
        </motion.div>

        <motion.div {...fadeUp(0.35)}>
          <GitHubContributionGraph
            data={contributionData}
            lifetimeTotal={lifetimeTotal}
          />
        </motion.div>

        {hackathons.length > 0 && (
          <motion.div {...fadeUp(0.45)}>
            <h5 className="mb-4 font-doto text-2xl font-medium md:text-3xl">
              Hackathons
            </h5>
            <div className="space-y-6">
              {hackathons.map((hack) => (
                <article
                  key={hack.title}
                  className="border-l-2 border-black/[0.08] pl-4 dark:border-white/[0.08]"
                >
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <h3 className="font-doto text-base font-medium text-foreground md:text-lg">
                      {hack.event}
                    </h3>
                    <span
                      className={`font-doto text-xs md:text-sm ${
                        placementColor[hack.placement] ?? "text-muted-foreground"
                      }`}
                    >
                      [{hack.placement}]
                    </span>
                    {hack.link && (
                      <Link
                        href={hack.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-auto inline-flex items-center gap-0.5 font-space-mono text-xs text-muted-foreground transition-colors hover:text-foreground md:text-sm"
                      >
                        info
                        <ArrowUpRight className="h-3 w-3" />
                      </Link>
                    )}
                  </div>

                  <p className="mt-1.5 font-space-mono text-xs leading-relaxed text-muted-foreground md:text-sm">
                    {Array.isArray(hack.body)
                      ? hack.body.map((seg, i) =>
                          seg.bold ? (
                            <strong key={i} className="font-semibold text-foreground">
                              {seg.text}
                            </strong>
                          ) : (
                            <span key={i}>{seg.text}</span>
                          )
                        )
                      : hack.body}
                  </p>

                  <p className="mt-2 font-space-mono text-[10px] uppercase tracking-wider text-muted-foreground/70 md:text-xs">
                    {hack.college} &middot; {hack.year}
                  </p>

                  {hack.techstacks?.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {hack.techstacks.map((tech, i) => (
                        <TechBadge key={i} name={tech} />
                      ))}
                    </div>
                  )}
                </article>
              ))}
            </div>
          </motion.div>
        )}

        <motion.div {...fadeUp(0.55)}>
          <h5 className="mb-4 font-doto text-2xl font-medium md:text-3xl">
            Let&apos;s connect
          </h5>
          <p className="mb-4 font-space-mono text-xs leading-relaxed text-muted-foreground md:text-sm">
            Interested in working together? Feel free to schedule a meet!
          </p>
          <div className="flex flex-wrap gap-2 p-1">
            {connectLinks.map(({ label, href, icon, endIcon, external, copyText }) => (
              <SocialButton
                key={label}
                label={label}
                href={href}
                icon={icon}
                endIcon={endIcon}
                external={external}
                copyText={copyText}
              />
            ))}
          </div>
        </motion.div>
      </div>

    </div>
  );
};

export default Hero;
