import { CheckCircle2, Images, MapPin, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { events } from "./events-data";

const eventItems = events.filter((e) => e.category === "event");
const conferenceItems = events.filter((e) => e.category === "conference");

// 4× duplication for seamless infinite loop
const scrollerItems = [...eventItems, ...eventItems, ...eventItems, ...eventItems];

export default function PastEventsPage() {
  return (
    <main className="events-page">

      {/* ── Showcase / scroller ───────────────────────── */}
      <section className="events-showcase">
        <div className="container events-shell">
          <div className="events-heading-row">
            <div>
              <h1>Events</h1>
              <p>Ongoing awareness and specialized training sessions from the CSA Uttarakhand Chapter.</p>
            </div>
          </div>

          <div className="events-scroller-wrap" aria-label="Event image gallery">
            <div className="events-scroller-track">
              {scrollerItems.map((event, i) => (
                <Link
                  className="scroll-event-card"
                  href={`/past-events/${event.slug}`}
                  key={`scroll-${i}`}
                  aria-label={`View ${event.gallery.length} photos — ${event.title}`}
                >
                  <div className="scroll-event-media">
                    <Image src={event.image} alt={event.alt} fill sizes="300px" />
                    <span className="scroll-event-badge">{event.date}</span>
                  </div>
                  <div className="scroll-event-copy">
                    <h3>{event.title}</h3>
                    <p>
                      <MapPin size={13} />
                      {event.place}
                    </p>
                  </div>
                  <div className="scroll-card-gallery-hint" aria-hidden="true">
                    <Images size={13} />
                    {event.gallery.length} photos
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Conference detail rows ────────────────────── */}
      <section className="major-conferences">
        <div className="container">
          <div className="major-heading">
            <h2>Conferences</h2>
          </div>

          {conferenceItems.map((event, index) => (
            <article
              className={`conference-row${index % 2 === 1 ? " conference-row--reverse" : ""}`}
              id={`event-${index}`}
              key={event.slug}
            >
              <div className="conference-media">
                <Image
                  src={event.image}
                  alt={event.alt}
                  fill
                  sizes="(max-width: 920px) 100vw, 45vw"
                />
                <span>{event.date}</span>
              </div>
              <div className="conference-content">
                <h3>{event.title}</h3>
                <p className="event-place">
                  <MapPin size={16} />
                  {event.place}
                </p>
                <p>{event.intro}</p>
                <strong>{event.highlightsTitle}</strong>
                <ul className="check-list">
                  {event.highlights.map((highlight) => (
                    <li key={highlight}>
                      <CheckCircle2 size={16} />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
                {event.about && (
                  <p className="event-about">
                    <strong>About the Organizer: </strong>
                    {event.about}
                  </p>
                )}
                <div className="event-actions">
                  <Link
                    href={`/past-events/${event.slug}`}
                    className="gallery-open-btn"
                  >
                    <Images size={15} />
                    View {event.gallery.length} Photos
                  </Link>
                  {event.actions.map(([label, href, Icon]) =>
                    href.startsWith("/") ? (
                      <Link href={href} key={label}>
                        <Icon size={16} />
                        {label}
                      </Link>
                    ) : (
                      <a href={href} key={label} target="_blank" rel="noopener noreferrer">
                        <Icon size={16} />
                        {label}
                      </a>
                    )
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────── */}
      <section className="event-cta">
        <div className="container">
          <h2>Don&apos;t Miss Our Next Event!</h2>
          <p>Join 500+ cybersecurity professionals at our upcoming cloud security events in Uttarakhand.</p>
          <div className="event-actions centered">
            <a href="https://www.linkedin.com/groups/8409109/">
              <Users size={16} />
              Follow on LinkedIn
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
