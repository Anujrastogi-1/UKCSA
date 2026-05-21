import { BrainCircuit, Building2, GraduationCap, Handshake, Network, ShieldCheck, Target, Users } from "lucide-react";

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
            <p className="eyebrow">About CSA Uttarakhand Chapter</p>
            <h2>Building a future-ready cybersecurity community for Uttarakhand.</h2>
            <p>
              The CSA Uttarakhand Chapter serves as a platform where industry experts, academic institutions, startups,
              and security enthusiasts come together to explore emerging technologies, discuss evolving cyber threats,
              and create impactful solutions for a secure digital future.
            </p>
          </div>
          <div className="about-signal-panel" aria-label="Chapter focus summary">
            <div className="about-signal-orbit">
              <ShieldCheck size={46} />
            </div>
            <div>
              <span>Chapter focus</span>
              <strong>Cloud security, AI governance, Zero Trust, threat intelligence, and compliance</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="about-story">
        <div className="container about-story-grid">
          <article className="about-story-card about-story-card--dark">
            <Target size={28} />
            <h2>What we do</h2>
            <p>
              We focus on creating meaningful conversations and practical outcomes for every member through research,
              technical discussions, cybersecurity awareness, and community-led learning.
            </p>
          </article>
          <article className="about-story-card">
            <BrainCircuit size={28} />
            <h2>How we grow</h2>
            <p>
              Members contribute to research, participate in technical discussions, gain exposure to global
              cybersecurity trends, and build strong local networks across the region.
            </p>
          </article>
          <article className="about-story-card">
            <Users size={28} />
            <h2>Who belongs here</h2>
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
            <p className="eyebrow">Core areas</p>
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
            <p className="eyebrow">Community impact</p>
            <h2>Learning, collaboration, and action in one regional chapter.</h2>
          </div>
          <div className="about-impact-grid">
            {impactCards.map((card) => (
              <article className="about-impact-card" key={card.title}>
                <card.icon />
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-audience">
        <div className="container about-audience-grid">
          <div>
            <p className="eyebrow">Join the community</p>
            <h2>Open to people and organizations shaping secure digital transformation.</h2>
          </div>
          {audienceCards.map((card) => (
            <article className="about-audience-card" key={card.title}>
              <Building2 size={22} />
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
