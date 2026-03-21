import type { MetadataRoute } from "next";

import { buildAbsoluteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/_next/static/", "/_next/image/"],
      disallow: ["/api/"],
    },
    sitemap: buildAbsoluteUrl("/sitemap.xml"),
  };
}
