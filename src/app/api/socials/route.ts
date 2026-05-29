import { NextResponse } from "next/server";
import { siteConfig } from "@/site.config";

// Identity + handles are sourced from site.config.ts so a fork only edits that
// file. LinkedIn and Email have no public API and stay static (edit below).
const { socials, identity } = siteConfig;
const FALLBACK_AVATAR = `https://github.com/${socials.github.username}.png`;
const DEFAULT_LOCATION = "New York, USA";
const DEFAULT_BIO = `${identity.title} • ${identity.tagline}`;
const NAME = identity.name;

const REVALIDATE = { next: { revalidate: 3600 } } as const;
const UA = { headers: { "User-Agent": "Mozilla/5.0" } };

export async function GET() {
  try {
    const [githubRes, twitterRes, codeforcesRes, leetcodeProfileRes, leetcodeSolvedRes, tryhackmeRes] =
      await Promise.allSettled([
        fetch(`https://api.github.com/users/${socials.github.username}`, REVALIDATE).then((r) => r.json()),
        fetch(`https://api.fxtwitter.com/${socials.twitter.username}`, REVALIDATE).then((r) => r.json()),
        fetch(`https://codeforces.com/api/user.info?handles=${socials.codeforces.username}`, REVALIDATE).then((r) => r.json()),
        fetch(`https://alfa-leetcode-api.onrender.com/${socials.leetcode.username}/`, REVALIDATE).then((r) => r.json()).catch(() => ({})),
        fetch(`https://alfa-leetcode-api.onrender.com/${socials.leetcode.username}/solved`, REVALIDATE).then((r) => r.json()).catch(() => ({})),
        fetch(`https://tryhackme.com/api/v2/public-profile?username=${socials.tryhackme.username}`, { ...REVALIDATE, ...UA }).then((r) => r.json()).catch(() => ({})),
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

    return NextResponse.json({
      github: {
        name: githubData.name || githubData.login || NAME,
        username: githubData.login || socials.github.username,
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
        username: twitterData.screen_name || socials.twitter.username,
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
        username: socials.linkedin.username,
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
        username: leetcodeData.username || socials.leetcode.username,
        avatar: leetcodeData.avatar || FALLBACK_AVATAR,
        bio: leetcodeData.about || "Grinding problems between builds.",
        location: leetcodeData.country || DEFAULT_LOCATION,
        stats: [{ label: "Solved", value: leetcodeSolved.solvedProblem ?? 0 }],
      },
      tryhackme: {
        name: NAME,
        username: thmData.username || socials.tryhackme.username,
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
        username: cfData.handle || socials.codeforces.username,
        avatar: cfData.titlePhoto ? `https:${cfData.titlePhoto}`.replace("https:https:", "https:") : FALLBACK_AVATAR,
        bio: cfData.rank ? `${cfData.rank.charAt(0).toUpperCase()}${cfData.rank.slice(1)}` : "Competitive programmer",
        location: [cfData.city, cfData.country].filter(Boolean).join(", ") || DEFAULT_LOCATION,
        stats: [
          { label: "Rating", value: cfData.rating ?? "—" },
          { label: "Max", value: cfData.maxRating ?? "—" },
        ],
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
