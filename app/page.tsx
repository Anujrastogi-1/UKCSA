import {
  AlertCircle,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import { Footer, Header } from "./components";

const cards = [
  { title: "Exec Team", href: "/board-of-directors", icon: "/assets/img/icons/Coworker.png", alt: "Executive Team" },
  { title: "Events", href: "/past-events", icon: "/assets/img/icons/Calendar.png", alt: "Events" },
  { title: "Research", href: "https://cloudsecurityalliance.org/research", icon: "/assets/img/icons/Research.png", alt: "Research" },
  { title: "Members", href: "/membership-info", icon: "/assets/img/icons/Conversation.png", alt: "Members" }
];

const benefits = [
  "Network with peers and subject matter experts",
  "Gain valuable insight from industry professionals and peers",
  "Build cloud security awareness at the community level",
  "Join a membership meeting in Uttarakhand or speak at one of our local events",
  "Participate in cloud security education and training locally",
  "Participate in CSA research and development",
  "Discuss cloud vulnerabilities and brainstorm solutions",
  "Spread CSA and cloud security outreach in the community",
  "Be a leader in the cloud security field"
];

function Hero() {
  return (
    <section className="hero" aria-label="Cloud Security Alliance Uttarakhand Chapter Hero">
      <Image
        src="/assets/img/Chapters-hero.jpg"
        alt="Cloud Security Alliance Uttarakhand Chapter"
        fill
        priority
        sizes="100vw"
      />
      <div className="container hero-content">
        <h1>
          Cloud Security Alliance
          <strong>Uttarakhand Chapter</strong>
        </h1>
        <a className="primary-button" href="/membership-info">
          Become a Member
        </a>
      </div>
    </section>
  );
}

function FeatureCards() {
  return (
    <section className="feature-strip">
      <div className="container card-grid">
        {cards.map((card) => (
          <article className="feature-card" key={card.title}>
            <Image src={card.icon} alt={card.alt} width={76} height={76} />
            <h2>{card.title}</h2>
            <a href={card.href}>
              More <ChevronRight size={18} fill="currentColor" />
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

function MembershipSection() {
  return (
    <section className="membership">
      <div className="container membership-panel">
        <h3>Why join our chapter?</h3>
        <div className="membership-body">
          <div className="benefits">
            <p>CSA chapter membership allows opportunities for continued learning, security awareness, networking, and career growth.</p>
            <ul>
              {benefits.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="join-copy">
              <strong>Become a CSA Uttarakhand Chapter member by joining our </strong>
              <a href="https://www.linkedin.com/groups/8409109/">LinkedIn group</a>
            </p>
          </div>
          <Image
            className="chapter-badge"
            src="/assets/img/icons/CSA-Norway-Chapter-badge.png"
            alt="CSA Chapter Badge"
            width={216}
            height={216}
          />
        </div>
      </div>
    </section>
  );
}

function Updates() {
  return (
    <section className="updates">
      <div className="container">
        <h2>
          <span>Chapter Updates</span>
        </h2>
        <div className="auth-notice">
          <AlertCircle size={16} fill="currentColor" />
          <div>
            <strong>Log in to see this information</strong>
            <p>Either the content you're seeking doesn't exist or it requires proper authentication before viewing.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <FeatureCards />
        <MembershipSection />
        <Updates />
      </main>
      <Footer />
    </>
  );
}
