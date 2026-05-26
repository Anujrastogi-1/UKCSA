import type { Metadata } from "next";

// ─────────────────────────────────────────────────────────────────────────────
// Central SEO configuration + metadata builder.
//
// Single source of truth for the canonical domain and site identity. Previously
// the URL was hardcoded (and WRONG — pointing at the Vercel preview domain) in
// four separate files: layout, robots, sitemap, and the event pages. A mismatched
// canonical splits Google's index between domains and triggers duplicate-content
// penalties. Centralizing here means the domain is set once and can be overridden
// per-environment via NEXT_PUBLIC_SITE_URL.
// ─────────────────────────────────────────────────────────────────────────────

/** Canonical production origin (no trailing slash). */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://uk.cloudsecurityalliance.in"
).replace(/\/$/, "");

export const SITE_NAME = "CSA Uttarakhand Chapter";

export const SITE_LOCALE = "en_IN";

export const DEFAULT_DESCRIPTION =
  "Cloud Security Alliance Uttarakhand Chapter — building a future-ready cybersecurity community in Uttarakhand through events, research, training, and collaboration on cloud security, AI security, and Zero Trust.";

/** 1200×630 social card used as the default OG/Twitter image. */
export const DEFAULT_OG_IMAGE = "/assets/img/Chapter-hero.jpg";

export const SOCIAL_PROFILES = [
  "https://www.linkedin.com/groups/8409109/",
  "https://www.facebook.com/CSA.Dehradun",
];

/** Resolve a site-relative path to an absolute, canonical URL. */
export function absoluteUrl(path = "/"): string {
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
}

type BuildMetadataInput = {
  /** Page title (the layout template appends " | CSA Uttarakhand Chapter"). */
  title: string;
  description: string;
  /** Site-relative path, e.g. "/about-us". Used for canonical + OG url. */
  path?: string;
  /** OG/Twitter image (site-relative or absolute). */
  image?: string;
  /** OpenGraph type — "website" for pages, "article" for event/blog content. */
  type?: "website" | "article";
  /** Set true for private/utility pages that must stay out of the index. */
  noindex?: boolean;
};

/**
 * Reusable, type-safe metadata builder. Every page calls this so canonical,
 * OpenGraph, and Twitter tags stay consistent and correct against the canonical
 * domain. Canonical is kept site-relative so it resolves against `metadataBase`.
 */
export function buildMetadata({
  title,
  description,
  path = "/",
  image = DEFAULT_OG_IMAGE,
  type = "website",
  noindex = false,
}: BuildMetadataInput): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    alternates: { canonical: path },
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      type,
      url,
      siteName: SITE_NAME,
      title,
      description,
      locale: SITE_LOCALE,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
