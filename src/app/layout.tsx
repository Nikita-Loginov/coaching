import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Cormorant_Garamond } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";

import { ModalProvider } from "@/shared/providers/ModalProvider/ModalProvider";

import { ScrollTop } from "@/shared/ui";

import {
  personSchema,
  seoConfig,
  developerSchema,
  websiteSchema,
} from "@/shared/config/seo";

import "@styles/global.scss";


const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

const cormorantGaramondSans = Cormorant_Garamond({
  variable: "--font-garamond-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = seoConfig;

const combinedSchema = [personSchema, developerSchema, websiteSchema];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${interSans.variable} ${cormorantGaramondSans.variable}`}
    >
      <body>
        <ClerkProvider>
          <ModalProvider>
            <div className="wrapper">{children}</div>

            {/* <Suspense fallback={null}>
              <ScrollTop />
            </Suspense> */}

            <div id="modal-root"></div>
          </ModalProvider>

          <Toaster position="top-right" />

          <Script
            id="schema"
            type="application/ld+json"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(combinedSchema),
            }}
          />
        </ClerkProvider>
      </body>
    </html>
  );
}
