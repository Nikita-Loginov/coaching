import { SITE_CONFIG } from "@/shared/config/seo";

export default function sitemap() {
  const baseUrl = SITE_CONFIG.url;

  return [
    {
      url: baseUrl,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/teams`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/program`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];
}
