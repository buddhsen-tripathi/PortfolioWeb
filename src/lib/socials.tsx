import type { ComponentType, ReactNode } from "react";
import {
  SiBehance,
  SiBluesky,
  SiCodechef,
  SiDevdotto,
  SiDiscord,
  SiDribbble,
  SiFacebook,
  SiGeeksforgeeks,
  SiGitlab,
  SiHackerrank,
  SiHackthebox,
  SiHashnode,
  SiHuggingface,
  SiInstagram,
  SiKaggle,
  SiLeetcode,
  SiMastodon,
  SiMedium,
  SiNpm,
  SiPeerlist,
  SiProducthunt,
  SiReddit,
  SiStackoverflow,
  SiSubstack,
  SiTelegram,
  SiThreads,
  SiTiktok,
  SiTryhackme,
  SiTwitch,
  SiYoutube,
} from "react-icons/si";
import GithubIcon from "@/components/icons/github";
import LinkedinIcon from "@/components/icons/linkedin";
import XTwitterIcon from "@/components/icons/x-twitter";
import { siteConfig } from "@/site.config";

/* Codeforces' mark is three bars in its own colors, which react-icons can't render. */
function CodeforcesMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <rect x="1.5" y="9" width="6" height="12" rx="1.2" fill="#FFC107" />
      <rect x="9" y="3" width="6" height="18" rx="1.2" fill="#1E88E5" />
      <rect x="16.5" y="12" width="6" height="9" rx="1.2" fill="#E53935" />
    </svg>
  );
}

type Platform = {
  label: string;
  icon: ComponentType<{ className?: string }>;
  /** Tailwind text color for the icon; omit for monochrome brands. */
  color?: string;
  /** Profile URL for a bare handle. A full URL in the config skips this. */
  url: (handle: string) => string;
  /** How the handle reads under the label. Defaults to "@handle". */
  display?: (handle: string) => string;
  /** When false for a handle, the cell copies it instead of linking out. */
  linkable?: (handle: string) => boolean;
};

/**
 * Every platform the site knows how to show. Add a username for one in
 * site.config.ts to show it; leave it blank to hide it.
 */
export const PLATFORMS = {
  // Social
  twitter: { label: "Twitter", icon: XTwitterIcon, url: (h) => `https://x.com/${h}` },
  github: { label: "GitHub", icon: GithubIcon, url: (h) => `https://github.com/${h}` },
  linkedin: { label: "LinkedIn", icon: LinkedinIcon, color: "text-[#0A66C2]", url: (h) => `https://www.linkedin.com/in/${h}/` },
  instagram: { label: "Instagram", icon: SiInstagram, color: "text-[#E4405F]", url: (h) => `https://instagram.com/${h}` },
  youtube: { label: "YouTube", icon: SiYoutube, color: "text-[#FF0000]", url: (h) => `https://youtube.com/@${h}` },
  threads: { label: "Threads", icon: SiThreads, url: (h) => `https://www.threads.net/@${h}` },
  bluesky: { label: "Bluesky", icon: SiBluesky, color: "text-[#0085FF]", url: (h) => `https://bsky.app/profile/${h}` },
  mastodon: {
    label: "Mastodon",
    icon: SiMastodon,
    color: "text-[#6364FF]",
    // Accepts "@user@instance.social" as well as a full profile URL.
    url: (h) => {
      const [user, host] = h.replace(/^@/, "").split("@");
      return host ? `https://${host}/@${user}` : `https://mastodon.social/@${user}`;
    },
    display: (h) => (h.startsWith("@") ? h : `@${h}`),
  },
  reddit: { label: "Reddit", icon: SiReddit, color: "text-[#FF4500]", url: (h) => `https://reddit.com/user/${h}`, display: (h) => `u/${h}` },
  discord: {
    label: "Discord",
    icon: SiDiscord,
    color: "text-[#5865F2]",
    url: (h) => `https://discord.com/users/${h}`,
    // Profile links only work with the numeric user ID; a username gets copied.
    linkable: (h) => /^\d+$/.test(h),
    display: (h) => h,
  },
  telegram: { label: "Telegram", icon: SiTelegram, color: "text-[#26A5E4]", url: (h) => `https://t.me/${h}` },
  facebook: { label: "Facebook", icon: SiFacebook, color: "text-[#0866FF]", url: (h) => `https://facebook.com/${h}` },
  tiktok: { label: "TikTok", icon: SiTiktok, url: (h) => `https://tiktok.com/@${h}` },
  twitch: { label: "Twitch", icon: SiTwitch, color: "text-[#9146FF]", url: (h) => `https://twitch.tv/${h}` },

  // Writing
  medium: { label: "Medium", icon: SiMedium, url: (h) => `https://medium.com/@${h}` },
  devto: { label: "DEV", icon: SiDevdotto, url: (h) => `https://dev.to/${h}` },
  hashnode: { label: "Hashnode", icon: SiHashnode, color: "text-[#2962FF]", url: (h) => `https://hashnode.com/@${h}` },
  substack: { label: "Substack", icon: SiSubstack, color: "text-[#FF6719]", url: (h) => `https://${h}.substack.com`, display: (h) => `${h}.substack.com` },

  // Developer
  gitlab: { label: "GitLab", icon: SiGitlab, color: "text-[#FC6D26]", url: (h) => `https://gitlab.com/${h}` },
  stackoverflow: { label: "Stack Overflow", icon: SiStackoverflow, color: "text-[#F58025]", url: (h) => `https://stackoverflow.com/users/${h}` },
  huggingface: { label: "Hugging Face", icon: SiHuggingface, color: "text-[#FFD21E]", url: (h) => `https://huggingface.co/${h}` },
  kaggle: { label: "Kaggle", icon: SiKaggle, color: "text-[#20BEFF]", url: (h) => `https://kaggle.com/${h}` },
  npm: { label: "npm", icon: SiNpm, color: "text-[#CB3837]", url: (h) => `https://www.npmjs.com/~${h}`, display: (h) => `~${h}` },
  producthunt: { label: "Product Hunt", icon: SiProducthunt, color: "text-[#DA552F]", url: (h) => `https://www.producthunt.com/@${h}` },
  peerlist: { label: "Peerlist", icon: SiPeerlist, color: "text-[#00AA45]", url: (h) => `https://peerlist.io/${h}` },
  dribbble: { label: "Dribbble", icon: SiDribbble, color: "text-[#EA4C89]", url: (h) => `https://dribbble.com/${h}` },
  behance: { label: "Behance", icon: SiBehance, color: "text-[#1769FF]", url: (h) => `https://behance.net/${h}` },

  // Competitive programming
  leetcode: { label: "LeetCode", icon: SiLeetcode, color: "text-[#FFA116]", url: (h) => `https://leetcode.com/u/${h}` },
  codeforces: { label: "Codeforces", icon: CodeforcesMark, url: (h) => `https://codeforces.com/profile/${h}` },
  codechef: { label: "CodeChef", icon: SiCodechef, color: "text-[#5B4638] dark:text-[#C8A27C]", url: (h) => `https://www.codechef.com/users/${h}` },
  hackerrank: { label: "HackerRank", icon: SiHackerrank, color: "text-[#00EA64]", url: (h) => `https://www.hackerrank.com/profile/${h}` },
  geeksforgeeks: { label: "GeeksforGeeks", icon: SiGeeksforgeeks, color: "text-[#2F8D46]", url: (h) => `https://www.geeksforgeeks.org/user/${h}` },

  // Security
  tryhackme: { label: "TryHackMe", icon: SiTryhackme, color: "text-[#C11111] dark:text-[#E53E3E]", url: (h) => `https://tryhackme.com/p/${h}` },
  hackthebox: { label: "Hack The Box", icon: SiHackthebox, color: "text-[#9FEF00]", url: (h) => `https://app.hackthebox.com/profile/${h}` },
} satisfies Record<string, Platform>;

export type SocialPlatform = keyof typeof PLATFORMS;

export type SocialLink = {
  platform: SocialPlatform;
  label: string;
  handle: string;
  /** Profile URL, or null when the handle can only be copied (e.g. a Discord username). */
  url: string | null;
  icon: ReactNode;
};

const isUrl = (value: string) => /^https?:\/\//i.test(value);

/* For a full URL, show its last path segment as the handle. */
const handleFromUrl = (value: string) => {
  try {
    const parts = new URL(value).pathname.split("/").filter(Boolean);
    return parts.at(-1) ?? new URL(value).hostname;
  } catch {
    return value;
  }
};

/** The handle configured for a platform, or "" when it's hidden. */
export function socialHandle(platform: SocialPlatform): string {
  return (siteConfig.socials[platform] ?? "").trim();
}

/** Platforms with a handle filled in, in config order. Blank ones are left out. */
export function getSocials(iconClassName = "size-4"): SocialLink[] {
  return (Object.keys(siteConfig.socials) as SocialPlatform[]).flatMap((platform) => {
    const value = socialHandle(platform);
    const meta: Platform | undefined = PLATFORMS[platform];
    if (!value || !meta) return [];

    // Drop a typed leading "@" ("@name" and "name" both work), but keep
    // Mastodon-style "@user@instance" intact.
    const bare = value.replace(/^@(?!.*@)/, "");
    const handle = isUrl(value) ? handleFromUrl(value) : bare;
    const Icon = meta.icon;
    return [
      {
        platform,
        label: meta.label,
        handle: meta.display ? meta.display(handle) : `@${handle}`,
        url: isUrl(value) ? value : meta.linkable && !meta.linkable(bare) ? null : meta.url(bare),
        icon: <Icon className={`${iconClassName} ${meta.color ?? "text-foreground"}`} />,
      },
    ];
  });
}
