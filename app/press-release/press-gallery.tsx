"use client";

import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

export type PressItem = {
  src: string;
  alt: string;
  width: number;
  height: number;
  title: string;
};

export default function PressGallery({ items }: { items: PressItem[] }) {
  const [lightbox, setLightbox] = useState<number | null>(null);

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
          i !== null ? Math.min(items.length - 1, i + 1) : null
        );
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, items.length]);

  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  return (
    <>
      <div className="press-gallery" aria-label="Press release image gallery">
        {items.map((item, i) => (
          <button
            type="button"
            className="press-card"
            key={item.src}
            onClick={() => setLightbox(i)}
            aria-label={`View press clipping: ${item.alt}`}
          >
            <figure>
              <Image
                src={item.src}
                alt={item.alt}
                width={item.width}
                height={item.height}
                sizes="(max-width: 620px) 100vw, (max-width: 1060px) 50vw, 33vw"
              />
            </figure>
            <span className="press-card-zoom" aria-hidden="true">
              <Expand size={16} />
            </span>
          </button>
        ))}
      </div>

      {lightbox !== null && (
        <PressLightbox
          items={items}
          index={lightbox}
          onClose={closeLightbox}
          onPrev={() => setLightbox((i) => (i !== null ? Math.max(0, i - 1) : null))}
          onNext={() =>
            setLightbox((i) =>
              i !== null ? Math.min(items.length - 1, i + 1) : null
            )
          }
        />
      )}
    </>
  );
}

function PressLightbox({
  items,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  items: PressItem[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const item = items[index];
  const isFirst = index === 0;
  const isLast = index === items.length - 1;

  return (
    <div
      className="ev-lightbox"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Press clipping viewer"
    >
      <div className="ev-lightbox-topbar" onClick={(e) => e.stopPropagation()}>
        <span className="ev-lightbox-counter">
          {index + 1} / {items.length}
        </span>
        <button
          className="ev-lightbox-close"
          onClick={onClose}
          aria-label="Close"
          type="button"
        >
          <X size={20} />
        </button>
      </div>

      <div className="ev-lightbox-stage" onClick={(e) => e.stopPropagation()}>
        <Image
          key={index}
          src={item.src}
          alt={item.alt}
          fill
          sizes="100vw"
          className="ev-lightbox-img"
          priority
        />
      </div>

      <button
        className="ev-lightbox-nav ev-lightbox-nav--prev"
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        disabled={isFirst}
        type="button"
        aria-label="Previous clipping"
      >
        <ChevronLeft size={26} />
      </button>
      <button
        className="ev-lightbox-nav ev-lightbox-nav--next"
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        disabled={isLast}
        type="button"
        aria-label="Next clipping"
      >
        <ChevronRight size={26} />
      </button>

      <div className="ev-lightbox-caption" onClick={(e) => e.stopPropagation()}>
        {item.title}
      </div>
    </div>
  );
}
