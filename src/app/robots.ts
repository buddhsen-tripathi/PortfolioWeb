import type { MetadataRoute } from "next";
import { getSiteConfig } from "@/lib/r2Client";

/* Search engines and AI crawlers are welcome to everything except the API. */
export default async function robots(): Promise<MetadataRoute.Robots> {
  const config = await getSiteConfig();
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${config.contact.url}/sitemap.xml`,
  };
}
