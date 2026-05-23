import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { events } from "../events-data";
import GalleryView from "./gallery-view";

const siteUrl = "https://ukcsa.vercel.app";

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = events.find((e) => e.slug === slug);

  if (!event) {
    return {
      title: "Event not found",
      robots: { index: false, follow: false },
    };
  }

  const title = `${event.title} — Event Gallery`;
  const description = `${event.title} at ${event.place} on ${event.date}. View ${event.gallery.length} photos from this CSA Uttarakhand Chapter event.`;
  const url = `/past-events/${event.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title,
      description,
      images: [
        {
          url: event.image,
          alt: event.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [event.image],
    },
  };
}

export default async function EventGalleryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = events.find((e) => e.slug === slug);

  if (!event) {
    return (
      <main className="gallery-not-found">
        <div className="container">
          <h1>Event not found</h1>
          <Link href="/past-events" className="gallery-back-link">
            <ArrowLeft size={16} aria-hidden="true" /> Back to Events
          </Link>
        </div>
      </main>
    );
  }

  const eventJsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    startDate: event.date,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: event.place,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Dehradun",
        addressRegion: "Uttarakhand",
        addressCountry: "IN",
      },
    },
    image: [`${siteUrl}${event.image}`],
    description: `${event.title} hosted by the CSA Uttarakhand Chapter. ${event.gallery.length} photos available.`,
    organizer: {
      "@type": "Organization",
      name: "CSA Uttarakhand Chapter",
      url: siteUrl,
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Events",
        item: `${siteUrl}/past-events`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: event.title,
        item: `${siteUrl}/past-events/${event.slug}`,
      },
    ],
  };

  const galleryEvent = {
    image: event.image,
    alt: event.alt,
    title: event.title,
    place: event.place,
    date: event.date,
    gallery: event.gallery,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <GalleryView event={galleryEvent} />
    </>
  );
}
