import type { MetadataRoute } from "next";

import {
  buildAbsoluteUrl,
  getSeoLastModified,
  sitemapImagePaths,
} from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: buildAbsoluteUrl("/"),
      lastModified: getSeoLastModified(),
      changeFrequency: "weekly",
      priority: 1,
      images: sitemapImagePaths.map((imagePath) => buildAbsoluteUrl(imagePath)),
    },
  ];
}
