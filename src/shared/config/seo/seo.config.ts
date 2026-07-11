import { Metadata } from "next";

import { DEVELOPER_CONFIG } from "../developer/developer.config";

export const SITE_CONFIG = {
  name: "Алексей Киселев",
  title: "PCC ICF | Коуч",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://kiselev-coach.ru",
  locale: "ru_RU",
  developer: {
    name: DEVELOPER_CONFIG.name,
    url: DEVELOPER_CONFIG.url,
    telegram: DEVELOPER_CONFIG.telegram,
  },
} as const;

const isProduction = process.env.NEXT_PUBLIC_IS_PRODUCTION === "true";

export const HOME_DESCRIPTION =
  "Алексей Киселев — сертифицированный коуч PCC ICF с опытом 10+ лет. Помогаю руководителям и предпринимателям достигать целей, развивать лидерские качества и управлять изменениями. Коучинг для бизнеса и жизни.";

export const KEYWORDS = [
  "коуч",
  "icf коуч",
  "pcc коуч",
  "коучинг",
  "бизнес коуч",
  "лидерство",
  "управление изменениями",
  "эмоциональный интеллект",
  "коуч москва",
  "коучинг руководителей",
  "Алексей Киселев",
  "профессиональный коуч",
  "коучинг для бизнеса",
  "развитие лидерства",
  "командообразование",
  "карьерный коучинг",
  "стратегическое планирование",
  "коуч icf",
  "найти коуча",
  "коучинг онлайн",
];

export const seoConfig: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),

  title: {
    default: `${SITE_CONFIG.name} - ${SITE_CONFIG.title}`,
    template: `%s | ${SITE_CONFIG.name}`,
  },

  description: HOME_DESCRIPTION,

  icons: {
    icon: [
      { url: "/images/favicon/favicon.ico" },
      {
        url: "/images/favicon/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/images/favicon/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/images/favicon/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/images/favicon/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],

    apple: [
      {
        url: "/images/favicon/apple-touch-icon.png",
      },
    ],

    other: [
      {
        rel: "manifest",
        url: "/images/favicon/site.webmanifest",
      },
    ],
  },

  openGraph: {
    title: `${SITE_CONFIG.name} - ${SITE_CONFIG.title}`,
    description: HOME_DESCRIPTION,
    url: SITE_CONFIG.url,
    siteName: `Коучинг ${SITE_CONFIG.name}`,
    locale: SITE_CONFIG.locale,
    type: "website",
    images: [
      {
        url: "/images/og/cover.webp",
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.name,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.name} - ${SITE_CONFIG.title}`,
    description: HOME_DESCRIPTION,
    creator: "@kiselev_coach",
    images: ["/images/og/cover.webp"],
  },

  authors: [
    {
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
    {
      name: SITE_CONFIG.developer.name,
      url: SITE_CONFIG.developer.url,
    },
  ],

  applicationName: SITE_CONFIG.name,

  keywords: KEYWORDS,

  category: "coaching",

  robots: isProduction
    ? {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      }
    : {
        index: false,
        follow: false,
        googleBot: {
          index: false,
          follow: false,
        },
      },

  creator: SITE_CONFIG.developer.name,
  publisher: SITE_CONFIG.name,

  other: {
    developer: SITE_CONFIG.developer.name,
    "developer-url": SITE_CONFIG.developer.url,
    "developer-telegram": SITE_CONFIG.developer.telegram,
  },
};

export function createPageMetadata(
  title: string,
  description?: string
): Metadata {
  return {
    title,
    description: description || HOME_DESCRIPTION,
    other: {
      developer: SITE_CONFIG.developer.name,
      "developer-url": SITE_CONFIG.developer.url,
    },
  };
}
