import { NextResponse } from "next/server";
import { socialHandle, type SocialPlatform } from "@/lib/socials";
import { siteConfig } from "@/site.config";

// Identity + handles are sourced from site.config.ts so a fork only edits that
// file. LinkedIn and Email have no public API and stay static (edit below).
// Platforms left blank in the config are never fetched and never returned.
const { identity } = siteConfig;
const handles = {
  github: socialHandle("github"),
  twitter: socialHandle("twitter"),
  linkedin: socialHandle("linkedin"),
  leetcode: socialHandle("leetcode"),
  tryhackme: socialHandle("tryhackme"),
  codeforces: socialHandle("codeforces"),
} satisfies Partial<Record<SocialPlatform, string>>;
const FALLBACK_AVATAR = handles.github ? `https://github.com/${handles.github}.png` : identity.photo.dark;
const DEFAULT_LOCATION = "New York, USA";
const DEFAULT_BIO = `${identity.title} • ${identity.tagline}`;
const NAME = identity.name;

const REVALIDATE = { next: { revalidate: 3600 } } as const;
const UA = { headers: { "User-Agent": "Mozilla/5.0" } };

/*
 * Codeforces' API returns photos on userpic.codeforces.org, which currently
 * fails to load (503), while the same path served through codeforces.com
 * works. Rewrite to that form; it also covers protocol-relative "//userpic…".
 */
const codeforcesPhoto = (url: string) =>
  url.replace(/^(?:https?:)?\/\/userpic\.codeforces\.org\//, "https://codeforces.com/userpic.codeforces.org/");

/* Skips the request entirely when the platform is hidden. */
const ifSet = (handle: string, request: (h: string) => Promise<any>) =>
  handle ? request(handle) : Promise.resolve({});

export async function GET() {
  try {
    const [githubRes, twitterRes, codeforcesRes, leetcodeProfileRes, leetcodeSolvedRes, tryhackmeRes] =
      await Promise.allSettled([
        ifSet(handles.github, (h) => fetch(`https://api.github.com/users/${h}`, REVALIDATE).then((r) => r.json())),
        ifSet(handles.twitter, (h) => fetch(`https://api.fxtwitter.com/${h}`, REVALIDATE).then((r) => r.json())),
        ifSet(handles.codeforces, (h) => fetch(`https://codeforces.com/api/user.info?handles=${h}`, REVALIDATE).then((r) => r.json())),
        ifSet(handles.leetcode, (h) => fetch(`https://alfa-leetcode-api.onrender.com/${h}/`, REVALIDATE).then((r) => r.json()).catch(() => ({}))),
        ifSet(handles.leetcode, (h) => fetch(`https://alfa-leetcode-api.onrender.com/${h}/solved`, REVALIDATE).then((r) => r.json()).catch(() => ({}))),
        ifSet(handles.tryhackme, (h) => fetch(`https://tryhackme.com/api/v2/public-profile?username=${h}`, { ...REVALIDATE, ...UA }).then((r) => r.json()).catch(() => ({}))),
      ]);

    const githubData = githubRes.status === "fulfilled" ? githubRes.value : {};
    const twitterData = twitterRes.status === "fulfilled" ? twitterRes.value?.user || {} : {};
    const cfData =
      codeforcesRes.status === "fulfilled" && codeforcesRes.value?.status === "OK"
        ? codeforcesRes.value.result?.[0] ?? {}
        : {};
    const leetcodeData = leetcodeProfileRes.status === "fulfilled" ? leetcodeProfileRes.value || {} : {};
    const leetcodeSolved = leetcodeSolvedRes.status === "fulfilled" ? leetcodeSolvedRes.value || {} : {};
    const thmData = tryhackmeRes.status === "fulfilled" ? tryhackmeRes.value?.data || {} : {};

    const profiles = {
      github: {
        name: githubData.name || githubData.login || NAME,
        username: githubData.login || handles.github,
        avatar: githubData.avatar_url || FALLBACK_AVATAR,
        bio: githubData.bio || DEFAULT_BIO,
        location: githubData.location || DEFAULT_LOCATION,
        stats: [
          { label: "Repositories", value: githubData.public_repos ?? 0 },
          { label: "Followers", value: githubData.followers ?? 0 },
        ],
      },
      twitter: {
        name: twitterData.name || NAME,
        username: twitterData.screen_name || handles.twitter,
        avatar: twitterData.avatar_url?.replace("_normal", "") || FALLBACK_AVATAR,
        banner: twitterData.banner_url || null,
        bio: twitterData.description || DEFAULT_BIO,
        location: twitterData.location || DEFAULT_LOCATION,
        stats: [
          { label: "Following", value: twitterData.following ?? 0 },
          { label: "Followers", value: twitterData.followers ?? 0 },
        ],
      },
      linkedin: {
        name: NAME,
        username: handles.linkedin,
        avatar: FALLBACK_AVATAR,
        banner: null,
        bio: "MSCS @ NYU’27 | ex-Amadeus | Building DeepFind.Me, Bucket0.com | AI × Infra",
        location: "Brooklyn, New York, United States",
        stats: [{ label: "Connections", value: "500+" }],
      },
      email: {
        name: "Drop an Email",
        username: siteConfig.contact.email,
        avatar: FALLBACK_AVATAR,
        bio: "Whether you have a question, a project idea, or just want to say hi, feel free to reach out!",
        location: "Inbox",
        stats: [],
      },
      leetcode: {
        name: leetcodeData.name || NAME,
        username: leetcodeData.username || handles.leetcode,
        avatar: leetcodeData.avatar || FALLBACK_AVATAR,
        bio: leetcodeData.about || "Grinding problems between builds.",
        location: leetcodeData.country || DEFAULT_LOCATION,
        stats: [{ label: "Solved", value: leetcodeSolved.solvedProblem ?? 0 }],
      },
      tryhackme: {
        name: NAME,
        username: thmData.username || handles.tryhackme,
        avatar: thmData.avatar || FALLBACK_AVATAR,
        bio:
          thmData.about ||
          (typeof thmData.topPercentage === "number"
            ? `Top ${thmData.topPercentage}% on TryHackMe — offensive security, one room at a time.`
            : "Learning offensive security and defensive tooling, one room at a time."),
        location: DEFAULT_LOCATION,
        stats: [
          { label: "Rank", value: typeof thmData.rank === "number" ? thmData.rank.toLocaleString("en-US") : "—" },
          { label: "Rooms", value: thmData.completedRoomsNumber ?? 0 },
          { label: "Badges", value: thmData.badgesNumber ?? 0 },
        ],
      },
      codeforces: {
        name: cfData.firstName
          ? `${cfData.firstName} ${cfData.lastName ?? ""}`.trim()
          : NAME,
        username: cfData.handle || handles.codeforces,
        avatar: cfData.titlePhoto ? codeforcesPhoto(cfData.titlePhoto) : FALLBACK_AVATAR,
        bio: cfData.rank ? `${cfData.rank.charAt(0).toUpperCase()}${cfData.rank.slice(1)}` : "Competitive programmer",
        location: [cfData.city, cfData.country].filter(Boolean).join(", ") || DEFAULT_LOCATION,
        stats: [
          { label: "Rating", value: cfData.rating ?? "—" },
          { label: "Max", value: cfData.maxRating ?? "—" },
        ],
      },
    };

    // Email is always shown; everything else only when its handle is set.
    const visible = Object.fromEntries(
      Object.entries(profiles).filter(
        ([key]) => key === "email" || Boolean(handles[key as keyof typeof handles])
      )
    );
    return NextResponse.json(visible);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
