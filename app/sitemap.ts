import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://billymrx.com";
  // Update when page content meaningfully changes; a per-request timestamp
  // makes Google distrust the sitemap's freshness signal.
  const lastContentUpdate = new Date("2026-07-05");

  return [
    {
      url: baseUrl,
      lastModified: lastContentUpdate,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
