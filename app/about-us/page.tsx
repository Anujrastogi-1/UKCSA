import Link from "next/link";
import { BrainCircuit, Building2, GraduationCap, Handshake, Network, ShieldCheck, Target, Users } from "lucide-react";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "About CSA Uttarakhand Chapter",
  description:
    "Learn about the Cloud Security Alliance Uttarakhand Chapter, our mission, focus areas in cloud security, AI governance, Zero Trust, threat intelligence and how we build a future-ready cybersecurity community.",
  path: "/about-us",
});

const focusItems = [
  "Cloud Security",
  "AI Governance",
  "Zero Trust",
  "Threat Intelligence",
  "Compliance",
  "Research",
  "Workshops",
  "Community Programs"
];

const impactCards = [
  {
    title: "Industry and academia together",
    description:
      "We connect experts, academic institutions, startups, and security enthusiasts so ideas move from discussion into practical outcomes.",
    icon: Handshake
  },
  {
    title: "Talent development",
    description:
      "Through conferences, workshops, webinars, certifications, and hackathons, the chapter helps nurture cybersecurity talent across the region.",
    icon: GraduationCap
  },
  {
    title: "Global awareness, local action",
    description:
      "Members gain exposure to global cybersecurity trends while building strong local networks across Uttarakhand.",
    icon: Network
  }
];

const audienceCards = [
  { title: "Students", description: "Begin your cybersecurity journey with mentorship, events, and community learning." },
  { title: "Professionals", description: "Expand your network and participate in technical discussions with peers." },
  { title: "Organizations", description: "Find collaboration opportunities around secure digital transformation." }
];

export default function AboutPage() {
  return (
    <main className="about-page">
      <section className="about-hero">
        <div className="container about-hero-grid">
          <div className="about-hero-copy">
            <h1>About CSA Uttarakhand Chapter</h1>
            <p>
              The CSA Uttarakhand Chapter serves as a platform where industry experts, academic institutions, startups,
              and security enthusiasts come together to explore emerging technologies, discuss evolving cyber threats,
              and create impactful solutions for a secure digital future.
            </p>
            {/* <div className="about-hero-actions">
              <Link className="btn btn-primary" href="/contact">Become a Member</Link>
            </div> */}
          </div>
          <div className="about-signal-panel" aria-label="Chapter focus summary">
            <div className="about-signal-header">
              <div className="about-signal-orbit">
                <ShieldCheck size={28} />
              </div>
              <span>Chapter Focus</span>
            </div>
            <strong>Cloud security, AI governance, Zero Trust, threat intelligence, and compliance</strong>
          </div>
        </div>
      </section>

      <section className="about-story">
        <div className="container">
          <div className="section-intro">
            {/* <p className="eyebrow">How the chapter works</p> */}
            <h2>What we do, how we grow, and who belongs here.</h2>
          </div>
        </div>
        <div className="container about-story-grid">
          <article className="about-story-card about-story-card--dark">
            <div className="about-card-head">
              <Target size={28} />
              <h3>What we do</h3>
            </div>
            <p>
              We focus on creating meaningful conversations and practical outcomes for every member through research,
              technical discussions, cybersecurity awareness, and community-led learning.
            </p>
          </article>
          <article className="about-story-card">
            <div className="about-card-head">
              <BrainCircuit size={28} />
              <h3>How we grow</h3>
            </div>
            <p>
              Members contribute to research, participate in technical discussions, gain exposure to global
              cybersecurity trends, and build strong local networks across the region.
            </p>
          </article>
          <article className="about-story-card">
            <div className="about-card-head">
              <Users size={28} />
              <h3>Who belongs here</h3>
            </div>
            <p>
              Whether you are a student, professional, or organization seeking collaboration opportunities, the chapter
              welcomes you to help shape secure digital transformation.
            </p>
          </article>
        </div>
      </section>

      <section className="about-focus-band">
        <div className="container about-focus-inner">
          <div>
            {/* <p className="eyebrow">Core areas</p> */}
            <h2>Practical cybersecurity topics for a stronger digital ecosystem.</h2>
          </div>
          <div className="about-focus-list">
            {focusItems.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="about-impact">
        <div className="container">
          <div className="section-intro section-intro--center">
            {/* <p className="eyebrow">Community impact</p> */}
            <h2>Learning, collaboration, and action in one regional chapter.</h2>
          </div>
          <div className="about-impact-grid">
            {impactCards.map((card) => (
              <article className="about-impact-card" key={card.title}>
                <div className="about-card-head">
                  <card.icon size={28} />
                  <h3>{card.title}</h3>
                </div>
                <p>{card.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-audience">
        <div className="container about-audience-grid">
          <div>
            {/* <p className="eyebrow">Join the community</p> */}
            <h2>For people and teams building secure digital futures.</h2>
          </div>
          {audienceCards.map((card) => (
            <article className="about-audience-card" key={card.title}>
              <div className="about-card-head">
                <Building2 size={22} />
                <h3>{card.title}</h3>
              </div>
              <p>{card.description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
