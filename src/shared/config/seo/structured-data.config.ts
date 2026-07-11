import { PERSON_CONFIG } from "../person/person.config";
import { DEVELOPER_CONFIG } from "../developer/developer.config";

export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: PERSON_CONFIG.name,
  jobTitle: PERSON_CONFIG.post,
  url: process.env.NEXT_PUBLIC_SITE_URL,
  sameAs: [
    PERSON_CONFIG.socials.telegram,
    PERSON_CONFIG.socials.vk,
    PERSON_CONFIG.socials.email
      ? `mailto:${PERSON_CONFIG.socials.email}`
      : undefined,
    PERSON_CONFIG.socials.phone
      ? `tel:${PERSON_CONFIG.socials.phone}`
      : undefined,
  ].filter(Boolean),
  knowsAbout: [
    "Коучинг",
    "Лидерство",
    "Управление изменениями",
    "Эмоциональный интеллект",
    "Командообразование",
    "Бизнес-стратегия",
  ],
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "ICF International Coaching Federation",
  },
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    name: "PCC ICF",
  },
  worksFor: {
    "@type": "Organization",
    name: "Алексей Киселев - Коучинг",
    url: process.env.NEXT_PUBLIC_SITE_URL,
  },
};

export const developerSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: DEVELOPER_CONFIG.name,
  jobTitle: "Frontend Developer",
  url: DEVELOPER_CONFIG.url,
  sameAs: [DEVELOPER_CONFIG.telegram],
  worksFor: {
    "@type": "Organization",
    name: "Алексей Киселев - Коучинг",
    url: process.env.NEXT_PUBLIC_SITE_URL,
  },
  role: "Developer",
};
