import "server-only";
import { S3Client, GetObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import matter from "gray-matter";

const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function convertDateFormat(dateStr) {
  try {
    let date;

    if (dateStr.includes("-") && dateStr.split("-").length === 3) {
      const parts = dateStr.split("-");
      if (parts[0].length <= 2) {
        const [dd, mm, yyyy] = parts.map(Number);
        if (!isNaN(dd) && !isNaN(mm) && !isNaN(yyyy)) {
          date = new Date(yyyy, mm - 1, dd);
        } else {
          throw new Error("Invalid date parts");
        }
      } else {
        date = new Date(dateStr);
      }
    } else {
      date = new Date(dateStr);
    }

    if (isNaN(date.getTime())) {
      console.warn(`Invalid date format: ${dateStr}. Using current date.`);
      date = new Date();
    }

    const day = date.getDate();
    const month = MONTH_NAMES[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  } catch (error) {
    console.warn(`Error parsing date ${dateStr}:`, error);
    const today = new Date();
    return `${today.getDate()} ${MONTH_NAMES[today.getMonth()]} ${today.getFullYear()}`;
  }
}

const s3Client = new S3Client({
  region: "auto",
  endpoint:
    process.env.R2_ENDPOINT ||
    `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || "dummy",
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "dummy",
  },
  forcePathStyle: true,
});

const BUCKET_NAME = process.env.R2_BUCKET_NAME || "your-blog-bucket";
const BLOG_PREFIX = "blogs/";

function isR2Configured() {
  return !!(
    process.env.R2_ACCESS_KEY_ID &&
    process.env.R2_SECRET_ACCESS_KEY &&
    process.env.R2_BUCKET_NAME &&
    (process.env.R2_ENDPOINT || process.env.R2_ACCOUNT_ID)
  );
}

export async function getBlogPostFromS3(slug) {
  if (isR2Configured()) {
    try {
      const command = new GetObjectCommand({
        Bucket: BUCKET_NAME,
        Key: `${BLOG_PREFIX}${slug}.mdx`,
      });

      const response = await s3Client.send(command);

      if (response.Body) {
        const content = await response.Body.transformToString();
        const { content: mdxContent, data } = matter(content);
        const formattedDate = data.date
          ? convertDateFormat(data.date)
          : convertDateFormat(new Date().toISOString());
        return {
          content: mdxContent,
          data: { ...data, date: formattedDate, slug },
        };
      }
    } catch {
      console.warn("Post not found in R2, checking local files...");
    }
  }

  try {
    const fs = require("fs").promises;
    const path = require("path");
    const filePath = path.join(process.cwd(), "src", "app", "blogs", "posts", `${slug}.mdx`);
    const content = await fs.readFile(filePath, "utf8");
    const { content: mdxContent, data } = matter(content);
    const formattedDate = data.date
      ? convertDateFormat(data.date)
      : convertDateFormat(new Date().toISOString());

    return {
      content: mdxContent,
      data: { ...data, date: formattedDate, slug },
    };
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return {
      content: "",
      data: { title: "Post Not Found", date: "", excerpt: "", slug },
    };
  }
}

export async function getBlogSlugsFromS3() {
  if (!isR2Configured()) {
    console.warn("R2 not configured, returning empty slugs");
    return [];
  }

  try {
    const command = new ListObjectsV2Command({
      Bucket: BUCKET_NAME,
      Prefix: BLOG_PREFIX,
    });

    const response = await s3Client.send(command);

    if (!response.Contents) return [];

    return response.Contents
      .filter((obj) => obj.Key && (obj.Key.endsWith(".md") || obj.Key.endsWith(".mdx")))
      .map((obj) => ({
        slug: obj.Key.replace(BLOG_PREFIX, "").replace(/\.mdx?$/, ""),
      }));
  } catch (error) {
    console.error("Error fetching blog slugs from R2:", error);
    return [];
  }
}

async function getLocalBlogPosts() {
  try {
    const fs = require("fs").promises;
    const path = require("path");

    const postsDirectory = path.join(process.cwd(), "src", "app", "blogs", "posts");
    const files = await fs.readdir(postsDirectory);

    const posts = await Promise.all(
      files
        .filter((file) => file.endsWith(".mdx"))
        .map(async (file) => {
          const filePath = path.join(postsDirectory, file);
          const content = await fs.readFile(filePath, "utf8");
          const { data } = matter(content);
          const slug = file.replace(/\.mdx$/, "");

          return {
            title: data.title,
            excerpt: data.excerpt,
            date: convertDateFormat(data.date),
            slug,
            type: data.type,
          };
        })
    );

    return posts;
  } catch (error) {
    console.warn("Error reading local posts:", error);
    return [];
  }
}

export async function getAllBlogPostsFromS3() {
  let r2Posts = [];
  let localPosts = [];

  if (isR2Configured()) {
    try {
      const slugs = await getBlogSlugsFromS3();
      r2Posts = await Promise.all(
        slugs.map(async ({ slug }) => {
          const { data } = await getBlogPostFromS3(slug);
          return data;
        })
      );
      r2Posts = r2Posts.filter((post) => post.title !== "Post Not Found");
    } catch (error) {
      console.error("Error fetching R2 posts:", error);
    }
  }

  localPosts = await getLocalBlogPosts();

  const r2Slugs = new Set(r2Posts.map((post) => post.slug));
  const mergedPosts = [
    ...r2Posts,
    ...localPosts.filter((post) => !r2Slugs.has(post.slug)),
  ];

  return mergedPosts.sort((a, b) => {
    const dateA = new Date(a.date.replace(/(\d+) (\w+) (\d+)/, "$2 $1, $3"));
    const dateB = new Date(b.date.replace(/(\d+) (\w+) (\d+)/, "$2 $1, $3"));

    if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
      return b.date.localeCompare(a.date);
    }

    return dateB.getTime() - dateA.getTime();
  });
}
