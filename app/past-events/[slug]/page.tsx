import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { events } from "../events-data";
import GalleryView from "./gallery-view";
import { JsonLd } from "../../JsonLd";
import { buildMetadata } from "../../../lib/seo";
import { eventSchema, breadcrumbSchema } from "../../../lib/structuredData";

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
    return buildMetadata({
      title: "Event not found",
      description: "This event could not be found.",
      path: `/past-events/${slug}`,
      noindex: true,
    });
  }

  return buildMetadata({
    title: `${event.title} | Event Gallery`,
    description: `${event.title} at ${event.place} on ${event.date}. View ${event.gallery.length} photos from this CSA Uttarakhand Chapter event.`,
    path: `/past-events/${event.slug}`,
    image: event.image,
    type: "article",
  });
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

  const eventJsonLd = eventSchema({
    title: event.title,
    place: event.place,
    date: event.date,
    image: event.image,
    photoCount: event.gallery.length,
  });

  const breadcrumbJsonLd = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Events", path: "/past-events" },
    { name: event.title, path: `/past-events/${event.slug}` },
  ]);

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
      <JsonLd data={eventJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <GalleryView event={galleryEvent} />
    </>
  );
}
