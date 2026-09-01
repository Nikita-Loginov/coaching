import type { MetadataRoute } from "next";

import { SITE_CONFIG } from "@/shared/config/seo";

import { getPrograms } from "@/entities/program/model/program.queries";
import { getTeams } from "@/entities/team/model/team.queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_CONFIG.url.replace(/\/$/, "");

  const [programs, teams] = await Promise.all([getPrograms(), getTeams()]);

  const programUrls: MetadataRoute.Sitemap = programs.map((program) => ({
    url: `${baseUrl}/program/${program.id}`,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const teamUrls: MetadataRoute.Sitemap = teams.map((team) => ({
    url: `${baseUrl}/teams/${team.id}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      changeFrequency: "weekly",
      priority: 1,
    },

    ...programUrls,
    ...teamUrls,
  ];
}
