import { ArrowRight, Images, MapPin, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { events } from "./events-data";
import { Reveal } from "../Reveal";

const mouItems = events.filter((e) => e.category === "event");
const conferenceItems = events.filter((e) => e.category === "conference");

// 4× duplication for a seamless, gapless infinite loop (track translates -50%).
const scrollerItems = [...mouItems, ...mouItems, ...mouItems, ...mouItems];

// Weave the highlight phrases into a single readable sentence. Lower-cases the
// leading character for natural prose, but leaves acronyms (e.g. "OWASP") intact.
function joinHighlights(items: string[]): string {
  const phrases = items.map((s) => {
    const firstWord = s.split(" ", 1)[0];
    if (firstWord.length > 1 && firstWord === firstWord.toUpperCase()) return s;
    return s.charAt(0).toLowerCase() + s.slice(1);
  });
  if (phrases.length <= 1) return phrases.join("");
  return `${phrases.slice(0, -1).join(", ")}, and ${phrases[phrases.length - 1]}`;
}

export default function EventsSections() {
  return (
    <>
      {/* ── MOU showcase (auto-scroll marquee) ─────────────── */}
      <section className="page-hero"><div className="container"><h1>Events</h1></div></section>
      <section className="events-showcase">
        <div className="container">
          <Reveal className="events-heading-row">
            <div className="section-intro-block">
              <h2>Recent MOUs</h2>
              <p>Strengthening ties with academic institutions across Uttarakhand.</p>
            </div>
          </Reveal>

          <Reveal className="events-scroller-wrap" variant="fade" aria-label="MOU ceremony gallery">
            <div className="events-scroller-track">
              {scrollerItems.map((event, i) => (
              <Link
                className="scroll-event-card"
                href={`/past-events/${event.slug}`}
                key={`scroll-${i}`}
                aria-label={`View ${event.gallery.length} photos — ${event.title}`}
              >
                <div className="scroll-event-media">
                  <Image src={event.image} alt={event.alt} fill sizes="400px" loading="eager" />
                  <span className="scroll-event-badge">{event.date}</span>
                </div>
                <div className="scroll-event-copy">
                  <h3>{event.title}</h3>
                  <p className="scroll-event-loc">
                    <MapPin size={15} />
                    <span>{event.place}</span>
                  </p>
                  <div className="scroll-event-foot">
                    <span className="scroll-event-photos">
                      <Images size={16} />
                      {event.gallery.length} Photos
                    </span>
                    <ArrowRight size={18} aria-hidden="true" />
                  </div>
                </div>
              </Link>
            ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Conferences (featured cards) ───────────────────── */}
      <section className="major-conferences">
        <div className="container">
          <Reveal className="major-heading">
            <h2>Conferences</h2>
            <p>Landmark summits that put Uttarakhand on the national cybersecurity map.</p>
          </Reveal>

          {conferenceItems.map((event, index) => (
            <Reveal as="article" className="conf-card" key={event.slug}>
              <div className="conf-media">
                <Image
                  src={event.image}
                  alt={event.alt}
                  fill
                  sizes="(max-width: 920px) 100vw, 50vw"
                />
                <div className="conf-hero-scrim" aria-hidden="true" />
                <div className="conf-hero-badges">
                  {index === 0 && (
                    <span className="conf-badge conf-badge--feature">Featured Event</span>
                  )}
                  <span className="conf-badge conf-badge--date">{event.date}</span>
                </div>
              </div>

              <div className="conf-content">
                <h3 className="conf-title">{event.title}</h3>
                <p className="conf-loc">
                  <MapPin size={18} />
                  {event.place}
                </p>
                <div className="conf-lead">
                  <p>
                    {event.intro}
                    {event.highlights.length > 0 && (
                      <> Highlights include {joinHighlights(event.highlights)}.</>
                    )}
                  </p>
                </div>
                <div className="conf-actions">
                  <Link href={`/past-events/${event.slug}`} className="conf-btn conf-btn--primary">
                    <Images size={18} />
                    View {event.gallery.length} Photos
                  </Link>
                  {event.actions.map(([label, href, Icon]) =>
                    href.startsWith("/") ? (
                      <Link href={href} key={label} className="conf-btn conf-btn--navy">
                        <Icon size={18} />
                        {label}
                      </Link>
                    ) : (
                      <a
                        href={href}
                        key={label}
                        className="conf-btn conf-btn--navy"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Icon size={18} />
                        {label}
                      </a>
                    )
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────── */}
      <section className="event-cta">
        <div className="container">
          <Reveal>
            <h2>Don&apos;t Miss Our Next Event!</h2>
            <p>Join 500+ cybersecurity professionals at our upcoming cloud security events in Uttarakhand.</p>
            <div className="event-actions centered">
              <a href="https://www.linkedin.com/groups/8409109/">
                <Users size={16} />
                Follow on LinkedIn
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
