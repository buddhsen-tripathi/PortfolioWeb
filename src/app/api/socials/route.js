import { NextResponse } from "next/server";

const FALLBACK_AVATAR = "https://github.com/buddhsen-tripathi.png";

export async function GET() {
  try {
    const [githubRes, twitterRes, codeforcesRes, leetcodeProfileRes, leetcodeSolvedRes] = await Promise.allSettled([
      fetch(`https://api.github.com/users/buddhsen-tripathi`, { next: { revalidate: 3600 } }).then((r) => r.json()),
      fetch(`https://api.fxtwitter.com/senbuilds`, { next: { revalidate: 3600 } }).then((r) => r.json()),
      fetch(`https://codeforces.com/api/user.info?handles=Buddhsen`, { next: { revalidate: 3600 } }).then((r) => r.json()),
      fetch(`https://alfa-leetcode-api.onrender.com/buddhsen/`, { next: { revalidate: 3600 } }).then((r) => r.json()).catch(() => ({})),
      fetch(`https://alfa-leetcode-api.onrender.com/buddhsen/solved`, { next: { revalidate: 3600 } }).then((r) => r.json()).catch(() => ({})),
    ]);

    const githubData = githubRes.status === "fulfilled" ? githubRes.value : {};
    const twitterData = twitterRes.status === "fulfilled" ? twitterRes.value?.user || {} : {};
    const cfData =
      codeforcesRes.status === "fulfilled" && codeforcesRes.value?.status === "OK"
        ? codeforcesRes.value.result?.[0] ?? {}
        : {};
    const leetcodeData = leetcodeProfileRes.status === "fulfilled" ? leetcodeProfileRes.value || {} : {};
    const leetcodeSolved = leetcodeSolvedRes.status === "fulfilled" ? leetcodeSolvedRes.value || {} : {};

    return NextResponse.json({
      github: {
        name: githubData.name || githubData.login || "Buddhsen Tripathi",
        username: githubData.login || "buddhsen-tripathi",
        avatar: githubData.avatar_url || FALLBACK_AVATAR,
        bio: githubData.bio || "Full-Stack Developer • MS CS @ NYU",
        location: githubData.location || "New York, USA",
        stats: [
          { label: "Repositories", value: githubData.public_repos ?? 0 },
          { label: "Followers", value: githubData.followers ?? 0 },
        ],
      },
      twitter: {
        name: twitterData.name || "Buddhsen Tripathi",
        username: twitterData.screen_name || "senbuilds",
        avatar: twitterData.avatar_url?.replace("_normal", "") || FALLBACK_AVATAR,
        banner: twitterData.banner_url || null,
        bio: twitterData.description || "Full-Stack Developer • MS CS @ NYU",
        location: twitterData.location || "New York, USA",
        stats: [
          { label: "Following", value: twitterData.following ?? 0 },
          { label: "Followers", value: twitterData.followers ?? 0 },
        ],
      },
      linkedin: {
        name: "Buddhsen Tripathi",
        username: "buddhsen-tripathi",
        avatar: FALLBACK_AVATAR,
        banner: null,
        bio: "MSCS @ NYU’27 | ex-Amadeus | Building DeepFind.Me, Bucket0.com | AI × Infra",
        location: "New York, USA",
        stats: [],
      },
      email: {
        name: "Drop an Email",
        username: "bt2609@nyu.edu",
        avatar: FALLBACK_AVATAR,
        bio: "Whether you have a question, a project idea, or just want to say hi, feel free to reach out!",
        location: "Inbox",
        stats: [],
      },
      leetcode: {
        name: leetcodeData.name || "Buddhsen Tripathi",
        username: leetcodeData.username || "buddhsen",
        avatar: leetcodeData.avatar || FALLBACK_AVATAR,
        bio: leetcodeData.about || "Grinding problems between builds.",
        location: leetcodeData.country || "New York, USA",
        stats: [
          { label: "Solved", value: leetcodeSolved.solvedProblem ?? 0 }
        ],
      },
      tryhackme: {
        name: "Buddhsen Tripathi",
        username: "btripathi",
        avatar: FALLBACK_AVATAR,
        bio: "Learning offensive security and defensive tooling, one room at a time.",
        location: "New York, USA",
        stats: [],
      },
      codeforces: {
        name: cfData.firstName
          ? `${cfData.firstName} ${cfData.lastName ?? ""}`.trim()
          : "Buddhsen Tripathi",
        username: cfData.handle || "Buddhsen",
        avatar: cfData.titlePhoto ? `https:${cfData.titlePhoto}`.replace("https:https:", "https:") : FALLBACK_AVATAR,
        bio: cfData.rank ? `${cfData.rank.charAt(0).toUpperCase()}${cfData.rank.slice(1)}` : "Competitive programmer",
        location: [cfData.city, cfData.country].filter(Boolean).join(", ") || "New York, USA",
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
