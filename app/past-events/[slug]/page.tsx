"use client";

import {
  ArrowLeft,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Expand,
  MapPin,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { use, useCallback, useEffect, useState } from "react";
import { events, type EventItem, type GalleryImage } from "../events-data";

const BATCH = 8;

export default function EventGalleryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const event = events.find((e) => e.slug === slug);

  if (!event) {
    return (
      <main className="gallery-not-found">
        <div className="container">
          <h1>Event not found</h1>
          <Link href="/past-events" className="gallery-back-link">
            <ArrowLeft size={16} /> Back to Events
          </Link>
        </div>
      </main>
    );
  }

  return <GalleryView event={event} />;
}

/* ── Gallery view ─────────────────────────────────────────── */

function GalleryView({ event }: { event: EventItem }) {
  const [visible, setVisible] = useState(BATCH);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const shown = event.gallery.slice(0, visible);
  const hasMore = visible < event.gallery.length;
  const remaining = event.gallery.length - visible;

  const closeLightbox = useCallback(() => setLightbox(null), []);

  useEffect(() => {
    if (lightbox === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setLightbox(null);
      } else if (e.key === "ArrowLeft") {
        setLightbox((i) => (i !== null ? Math.max(0, i - 1) : null));
      } else if (e.key === "ArrowRight") {
        setLightbox((i) =>
          i !== null ? Math.min(shown.length - 1, i + 1) : null
        );
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, shown.length]);

  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  return (
    <main className="ev-gallery-page">

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="ev-gallery-hero">
        <div className="ev-gallery-hero-img">
          <Image
            src={event.image}
            alt={event.alt}
            fill
            priority
            sizes="100vw"
            className="ev-gallery-hero-photo"
          />
          <div className="ev-gallery-hero-overlay" />
        </div>

        <div className="container ev-gallery-hero-body">
          <Link className="ev-gallery-back" href="/past-events">
            <ArrowLeft size={15} />
            All Events
          </Link>

          <div className="ev-gallery-hero-foot">
            <h1>{event.title}</h1>
            <div className="ev-gallery-hero-meta">
              <span>
                <MapPin size={14} />
                {event.place}
              </span>
              <span>
                <Calendar size={14} />
                {event.date}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Photo grid ───────────────────────────────────── */}
      <section className="ev-gallery-body">
        <div className="container">

          {/* Header row */}
          <div className="ev-gallery-header-row">
            <div>
              <h2>Photos</h2>
              <p>{event.gallery.length} photos from this event</p>
            </div>
          </div>

          {/* Masonry grid */}
          <div className="ev-photo-grid">
            {shown.map((img, i) => (
              <PhotoCard key={i} img={img} index={i} onClick={() => setLightbox(i)} />
            ))}
          </div>

          {/* Load more */}
          {hasMore ? (
            <div className="ev-gallery-load-row">
              <button
                className="ev-load-more-btn"
                onClick={() => setVisible((v) => v + BATCH)}
              >
                Load {Math.min(BATCH, remaining)} more
                <span className="ev-load-remaining">· {remaining} remaining</span>
              </button>
            </div>
          ) : (
            <div className="ev-gallery-end-note">
              <span>All {event.gallery.length} photos loaded</span>
            </div>
          )}

        </div>
      </section>

      {/* ── Lightbox ─────────────────────────────────────── */}
      {lightbox !== null && (
        <Lightbox
          images={shown}
          index={lightbox}
          onClose={closeLightbox}
          onPrev={() => setLightbox((i) => (i !== null ? Math.max(0, i - 1) : null))}
          onNext={() =>
            setLightbox((i) =>
              i !== null ? Math.min(shown.length - 1, i + 1) : null
            )
          }
        />
      )}
    </main>
  );
}

/* ── Photo card ──────────────────────────────────────────── */

function PhotoCard({
  img,
  index,
  onClick,
}: {
  img: GalleryImage;
  index: number;
  onClick: () => void;
}) {
  return (
    <button
      className="ev-photo-card"
      onClick={onClick}
      aria-label={`View photo: ${img.alt}`}
      style={{ animationDelay: `${(index % BATCH) * 40}ms` }}
    >
      <Image
        src={img.src}
        alt={img.alt}
        fill
        sizes="(max-width: 600px) 50vw, (max-width: 960px) 33vw, 25vw"
        loading={index < BATCH ? "eager" : "lazy"}
      />
      <div className="ev-photo-card-overlay" aria-hidden="true">
        <div className="ev-photo-card-icon">
          <Expand size={18} />
        </div>
      </div>
    </button>
  );
}

/* ── Lightbox ────────────────────────────────────────────── */

function Lightbox({
  images,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const img = images[index];
  const isFirst = index === 0;
  const isLast = index === images.length - 1;

  return (
    <div
      className="ev-lightbox"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
    >
      {/* Top bar */}
      <div className="ev-lightbox-topbar" onClick={(e) => e.stopPropagation()}>
        <span className="ev-lightbox-counter">
          {index + 1} / {images.length}
        </span>
        <button className="ev-lightbox-close" onClick={onClose} aria-label="Close">
          <X size={20} />
        </button>
      </div>

      {/* Image */}
      <div className="ev-lightbox-stage" onClick={(e) => e.stopPropagation()}>
        <Image
          key={index}
          src={img.src}
          alt={img.alt}
          fill
          sizes="100vw"
          className="ev-lightbox-img"
          priority
        />
      </div>

      {/* Nav arrows */}
      <button
        className="ev-lightbox-nav ev-lightbox-nav--prev"
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        disabled={isFirst}
        aria-label="Previous photo"
      >
        <ChevronLeft size={26} />
      </button>
      <button
        className="ev-lightbox-nav ev-lightbox-nav--next"
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        disabled={isLast}
        aria-label="Next photo"
      >
        <ChevronRight size={26} />
      </button>

      {/* Caption */}
      <div className="ev-lightbox-caption" onClick={(e) => e.stopPropagation()}>
        {img.alt}
      </div>
    </div>
  );
}
