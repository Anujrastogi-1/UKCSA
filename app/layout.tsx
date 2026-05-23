import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Footer, Header } from "./components";
import "./globals.css";

const siteUrl = "https://ukcsa.vercel.app";
const siteName = "CSA Uttarakhand Chapter";
const defaultDescription =
  "Cloud Security Alliance Uttarakhand Chapter — building a future-ready cybersecurity community in Uttarakhand through events, research, training, and collaboration on cloud security, AI security, and Zero Trust.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} — Cloud Security, AI Security & Cybersecurity Community`,
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
    title: `${siteName} — Cloud Security & Cybersecurity Community`,
    description: defaultDescription,
    url: siteUrl,
    locale: "en_IN",
    images: [
      {
        url: "/assets/img/Chapter-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Cloud Security Alliance Uttarakhand Chapter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} — Cloud Security & Cybersecurity Community`,
    description: defaultDescription,
    images: ["/assets/img/Chapter-hero.jpg"],
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

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}#organization`,
  name: siteName,
  alternateName: "Cloud Security Alliance Uttarakhand",
  url: siteUrl,
  logo: `${siteUrl}/assets/img/logo.png`,
  description: defaultDescription,
  foundingLocation: {
    "@type": "Place",
    name: "Dehradun, Uttarakhand, India",
  },
  areaServed: {
    "@type": "AdministrativeArea",
    name: "Uttarakhand, India",
  },
  parentOrganization: {
    "@type": "Organization",
    name: "Cloud Security Alliance",
    url: "https://cloudsecurityalliance.org",
  },
  sameAs: [
    "https://www.linkedin.com/groups/8409109/",
    "https://www.facebook.com/CSA.Dehradun",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}#website`,
  name: siteName,
  url: siteUrl,
  inLanguage: "en-IN",
  publisher: { "@id": `${siteUrl}#organization` },
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteUrl}/?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <Header />
        <div id="main-content">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
