import { SITE_URL, SITE_NAME, DEFAULT_DESCRIPTION, SOCIAL_PROFILES, absoluteUrl } from "./seo";

// ─────────────────────────────────────────────────────────────────────────────
// Structured-data (JSON-LD) builders.
//
// Pure functions that return schema.org objects. Rendered via the <JsonLd>
// component. Keeping them here (a) removes the duplicated inline objects that
// lived in layout.tsx and the event page, and (b) guarantees every schema uses
// the same canonical URLs and organization identity.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Convert a human display date ("Apr 24, 2026", "Sep 2017") to an ISO 8601 date
 * (YYYY-MM-DD). schema.org Event.startDate REQUIRES ISO 8601 — a display string
 * is invalid and Google silently drops the Event from rich results. Returns
 * undefined when the date can't be parsed so we omit the field instead of
 * emitting something invalid.
 */
export function toIsoDate(display: string): string | undefined {
  const d = new Date(display);
  return Number.isNaN(d.getTime()) ? undefined : d.toISOString().slice(0, 10);
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}#organization`,
    name: SITE_NAME,
    alternateName: "Cloud Security Alliance Uttarakhand",
    url: SITE_URL,
    logo: absoluteUrl("/assets/img/logo.png"),
    description: DEFAULT_DESCRIPTION,
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
    sameAs: SOCIAL_PROFILES,
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}#website`,
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "en-IN",
    publisher: { "@id": `${SITE_URL}#organization` },
  };
}

type EventSchemaInput = {
  title: string;
  place: string;
  date: string;
  image: string;
  photoCount: number;
};

export function eventSchema(e: EventSchemaInput) {
  const startDate = toIsoDate(e.date);
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: e.title,
    ...(startDate ? { startDate } : {}),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: e.place,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Dehradun",
        addressRegion: "Uttarakhand",
        addressCountry: "IN",
      },
    },
    image: [absoluteUrl(e.image)],
    description: `${e.title} hosted by the ${SITE_NAME}. ${e.photoCount} photos available.`,
    organizer: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

/** BreadcrumbList from an ordered list of { name, path } crumbs. */
export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
