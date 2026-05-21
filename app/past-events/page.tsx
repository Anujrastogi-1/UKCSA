"use client";

import {
  Award,
  CheckCircle2,
  Download,
  MapPin,
  Users,
  type LucideIcon
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

type EventAction = [label: string, href: string, Icon: LucideIcon];

type EventItem = {
  image: string;
  alt: string;
  date: string;
  title: string;
  place: string;
  intro: ReactNode;
  badges: string[];
  highlightsTitle: string;
  highlights: string[];
  about?: string;
  actions: EventAction[];
};

const events: EventItem[] = [
  {
    image: "/assets/img/events/2017-CSA-28.png",
    alt: "Conference on Cloud Computing and Cyber Security CSA 2017 - Amrapali Group Dehradun",
    date: "Sept 16, 2017",
    title: "Conference on Cloud Computing & Cyber Security (CSA 2017)",
    place: "Amrapali Group of Institutes, Haldwani, Uttarakhand",
    intro: (
      <>
        FCSA, Amrapali Group of Institutes organized a landmark one-day conference on <strong>&ldquo;Cloud Security&rdquo;</strong> in
        collaboration with <strong>Cloud Security Alliance (CSA)</strong> and <strong>Open Web Application Security Project (OWASP)</strong>{" "}
        on 16th September, 2017. The conference featured expert sessions on cloud computing security, penetration testing,
        and cybersecurity awareness for BCA, MCA and B.Tech (CS) students.
      </>
    ),
    badges: ["Completed", "500+ Attendees"],
    highlightsTitle: "Key Highlights:",
    highlights: [
      "Cloud Security Best Practices Workshop",
      "OWASP Top 10 Vulnerabilities Session",
      "Live Hacking Demonstrations",
      "Networking with Industry Experts"
    ],
    actions: [
      ["Download Report", "https://uk.cloudsecurityalliance.in/assets/img/events/2016%20CSA.pdf", Download],
      ["Join Community", "https://www.linkedin.com/groups/8409109/", Users]
    ]
  },
  {
    image: "/assets/img/events/events-dit.webp",
    alt: "Cloud Security Alliance International Information Security Summit 2016 - Satyam Rastogi DIT University Dehradun",
    date: "April 10, 2016",
    title: "Cloud Security Alliance International Information Security Summit 2016",
    place: "DIT University, Dehradun, Uttarakhand, India",
    intro: (
      <>
        A <strong>historic milestone</strong> for cybersecurity in Uttarakhand! The{" "}
        <strong>Cloud Security Alliance International Information Security Summit 2016</strong> was organized by{" "}
        <strong>Mr. Satyam Rastogi</strong> in association with the Department of IT at DIT University on{" "}
        <strong>10th April 2016</strong> — marking the <strong>FIRST</strong> international-level cybersecurity summit ever held in
        Dehradun.
      </>
    ),
    badges: ["Flagship Event", "Historic Event", "First in Dehradun", "Organized by Satyam Rastogi"],
    highlightsTitle: "Summit Highlights:",
    highlights: [
      "First International Security Summit in Dehradun",
      "Keynote by Industry Leaders & CSA Experts",
      "Cloud Security Trends & Threat Landscape 2016",
      "Hands-on Workshops on Ethical Hacking",
      "Career Guidance in Cybersecurity"
    ],
    about:
      "Satyam Rastogi pioneered cloud security awareness in Uttarakhand by bringing this landmark event to DIT University, establishing the foundation for CSA Uttarakhand Chapter.",
    actions: [
      [
        "Official Coverage",
        "https://www.dituniversity.edu.in/workshop-conference-seminars/cloud-security-alliance-international-information-security-summit-2016-was-organized-by-the-department-of-it-",
        Award
      ],
      ["Meet Satyam Rastogi", "/board-of-directors", Users]
    ]
  }
];

// Duplicate cards so the infinite loop is seamless
const scrollerItems = [...events, ...events, ...events, ...events];

export default function PastEventsPage() {
  return (
    <main className="events-page">
      <section className="events-showcase">
        <div className="container events-shell">
          <div className="events-heading-row">
            <div>
              <h1>Recent Events</h1>
              <p>Ongoing awareness and specialized training sessions from the CSA Uttarakhand Chapter.</p>
            </div>
            <div className="event-slider-controls" aria-label="Jump to event">
              <a href="#event-0" className="event-year-btn" aria-label="CSA 2017">2017</a>
              <a href="#event-1" className="event-year-btn" aria-label="CSA 2016">2016</a>
            </div>
          </div>

          {/* Infinite horizontal auto-scroll */}
          <div className="events-scroller-wrap" aria-label="Event image gallery">
            <div className="events-scroller-track">
              {scrollerItems.map((event, i) => (
                <a
                  className="scroll-event-card"
                  href={`#event-${i % events.length}`}
                  key={`scroll-${i}`}
                  aria-label={event.title}
                >
                  <div className="scroll-event-media">
                    <Image
                      src={event.image}
                      alt={event.alt}
                      fill
                      sizes="300px"
                    />
                    <span className="scroll-event-badge">{event.date}</span>
                  </div>
                  <div className="scroll-event-copy">
                    <h3>{event.title}</h3>
                    <p>
                      <MapPin size={13} />
                      {event.place}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="major-conferences">
        <div className="container">
          <div className="major-heading">
            <h2>Major Conferences</h2>
          </div>

          {events.map((event, index) => (
            <article
              className={`conference-row${index % 2 === 1 ? " conference-row--reverse" : ""}`}
              id={`event-${index}`}
              key={event.title}
            >
              <div className="conference-media">
                <Image src={event.image} alt={event.alt} fill sizes="(max-width: 920px) 100vw, 45vw" />
                <span>{event.date}</span>
              </div>
              <div className="conference-content">
                <div className="event-badges">
                  {event.badges.map((badge) => (
                    <span key={badge}>{badge}</span>
                  ))}
                </div>
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
                {event.about ? (
                  <p className="event-about">
                    <strong>About the Organizer: </strong>
                    {event.about}
                  </p>
                ) : null}
                <div className="event-actions">
                  {event.actions.map(([label, href, Icon]) =>
                    href.startsWith("/") ? (
                      <Link href={href} key={label}>
                        <Icon size={16} />
                        {label}
                      </Link>
                    ) : (
                      <a href={href} key={label}>
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
    // adh
  );
}
