import type { MetadataRoute } from "next";

import { brand } from "@/config/brand";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: brand.siteUrl, changeFrequency: "monthly", priority: 1 },
    {
      url: `${brand.siteUrl}/why-our-service`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    { url: `${brand.siteUrl}/privacy`, changeFrequency: "yearly", priority: 0.2 },
  ];
}
