import type { MetadataRoute } from "next";
import { siteConfig } from "@/site.config";

/* Search engines and AI crawlers are welcome to everything except the API. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${siteConfig.contact.url}/sitemap.xml`,
  };
}
