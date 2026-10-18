import type { MetadataRoute } from "next";
import { siteConfig } from "@/site.config";

export default function manifest(): MetadataRoute.Manifest {
  const { identity, seo, assets } = siteConfig;
  return {
    name: identity.name,
    short_name: identity.name.split(" ")[0],
    description: seo.defaultDescription,
    start_url: "/",
    display: "standalone",
    theme_color: seo.themeColor,
    background_color: seo.themeColor,
    icons: [{ src: assets.favicon, sizes: "48x48", type: "image/x-icon" }],
  };
}
