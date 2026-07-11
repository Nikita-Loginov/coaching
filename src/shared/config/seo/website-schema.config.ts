import type { ProgramItem } from "@/entities/program/model/program.types";

import { DEVELOPER_CONFIG } from "../developer/developer.config";

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Алексей Киселев - Коучинг PCC ICF",
  url: process.env.NEXT_PUBLIC_SITE_URL,
  inLanguage: "ru-RU",

  potentialAction: {
    "@type": "SearchAction",
    target: `${process.env.NEXT_PUBLIC_SITE_URL}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },

  hasPart: [
    {
      "@type": "WebPage",
      name: "Главная",
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/`,
    },
    {
      "@type": "WebPage",
      name: "Программа коучинга",
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/programs/[id]`,
    },
    {
      "@type": "WebPage",
      name: "Команда",
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/team/[id]`,
    },
  ],
};

export const createProgramSchema = (program: ProgramItem) => ({
  "@context": "https://schema.org",
  "@type": "CreativeWork",

  name: program.name,

  headline: program.seo.title,

  description: program.seo.description,

  image: `${process.env.NEXT_PUBLIC_SITE_URL}/${program.seo.image}`,

  author: {
    "@type": "Person",
    name: DEVELOPER_CONFIG.name,
    url: DEVELOPER_CONFIG.url,
  },

  creator: {
    "@type": "Person",
    name: DEVELOPER_CONFIG.name,
  },

  url: `${process.env.NEXT_PUBLIC_SITE_URL}/program/${program.id}`,

  // dateModified: project.updatedAt,
});
