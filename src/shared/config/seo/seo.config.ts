import { Metadata } from "next";

import { DEVELOPER_CONFIG } from "../developer/developer.config";

export const SITE_CONFIG = {
  name: "Алексей Киселев",
  title: "ICF | Коуч",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://alexseycoach.vercel.app",
  locale: "ru_RU",
  developer: {
    name: DEVELOPER_CONFIG.name,
    url: DEVELOPER_CONFIG.url,
    telegram: DEVELOPER_CONFIG.telegram,
  },
} as const;

const isProduction = true;

export const HOME_DESCRIPTION =
  "Алексей Киселев — командный коуч ICF. Командный коучинг и развитие команд для руководителей и бизнеса. Более 10 лет опыта в коучинге и развитии команд.";

export const KEYWORDS = [
  "Алексей Киселев",
  "командный коуч",
  "командный коучинг",
  "коучинг команд",
  "коуч для команд",
  "коучинг для команд",
  "ICF коуч",
  "PCC коуч",
  "профессиональный коуч",
  "бизнес коуч",
  "бизнес коучинг",
  "коучинг руководителей",
  "коучинг для руководителей",
  "развитие команд",
  "развитие команд в бизнесе",
  "командообразование",
  "эффективность команды",
  "лидерство",
  "развитие лидерства",
  "управление изменениями",
  "эмоциональный интеллект",
  "стратегическое планирование",
  "коучинг онлайн",
  "коуч Москва",
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

  alternates: {
    canonical: SITE_CONFIG.url,
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
    // {
    //   name: SITE_CONFIG.developer.name,
    //   url: SITE_CONFIG.developer.url,
    // },
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
  description?: string,
  canonical?: string
): Metadata {
  return {
    title,
    description: description || HOME_DESCRIPTION,
    alternates: canonical
      ? {
          canonical,
        }
      : undefined,
    other: {
      developer: SITE_CONFIG.developer.name,
      "developer-url": SITE_CONFIG.developer.url,
    },
  };
}
