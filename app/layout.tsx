import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Footer, Header } from "./components";
import { JsonLd } from "./JsonLd";
import { SITE_URL, SITE_NAME, SITE_LOCALE, DEFAULT_DESCRIPTION, DEFAULT_OG_IMAGE } from "../lib/seo";
import { organizationSchema, websiteSchema } from "../lib/structuredData";
import "./globals.css";

const siteUrl = SITE_URL;
const siteName = SITE_NAME;
const defaultDescription = DEFAULT_DESCRIPTION;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | Cloud Security, AI Security & Cybersecurity Community`,
    template: `%s | ${siteName}`,
  },
  description: defaultDescription,
  applicationName: siteName,
  authors: [{ name: siteName, url: siteUrl }],
  generator: "Next.js",
  keywords: [
    "Cloud Security Alliance Uttarakhand",
    "CSA Uttarakhand",
    "CSA Dehradun",
    "cybersecurity community Uttarakhand",
    "cloud security Dehradun",
    "AI security",
    "Zero Trust",
    "OWASP Uttarakhand",
    "cybersecurity events Dehradun",
    "cloud security training India",
  ],
  category: "technology",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName,
    title: `${siteName} | Cloud Security & Cybersecurity Community`,
    description: defaultDescription,
    url: siteUrl,
    locale: SITE_LOCALE,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Cloud Security Alliance Uttarakhand Chapter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} | Cloud Security & Cybersecurity Community`,
    description: defaultDescription,
    images: [DEFAULT_OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/assets/img/logo.png", type: "image/png", sizes: "207x75" },
    ],
    shortcut: "/assets/img/logo.png",
    apple: "/assets/img/logo.png",
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#075896" },
    { media: "(prefers-color-scheme: dark)", color: "#061631" },
  ],
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/assets/fonts/Calibri.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/assets/fonts/Calibri-Bold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />
        {/* Without JS, scroll-reveal elements must still be visible. */}
        <noscript>
          <style>{".reveal{opacity:1 !important;transform:none !important}"}</style>
        </noscript>
      </head>
      <body>
        <Header />
        <div id="main-content">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
