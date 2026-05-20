import {
  ChevronRight,
  ShieldCheck,
  Users,
  BookOpen,
  TrendingUp,
  Lock,
  MessageCircle
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const stats = [
  { value: "250+", label: "Active Members" },
  { value: "15+", label: "Annual Events" },
  { value: "40+", label: "Corporate Partners" },
  { value: "100%", label: "Knowledge Share" }
];

const benefits = [
  {
    icon: ShieldCheck,
    title: "Global Networking",
    description: "Connect with world-class security professionals and CISOs across the global CSA network."
  },
  {
    icon: BookOpen,
    title: "Expert Training",
    description: "Access exclusive workshops, certifications, and research papers on emerging cloud threats."
  },
  {
    icon: TrendingUp,
    title: "Lead Trends",
    description: "Participate in working groups and help define the future of secure cloud computing."
  }
];

const leadershipTeam = [
  { initials: "SR", name: "Satyam Rastogi", role: "Chapter Chair & Strategic Advisor" },
  { initials: "AS", name: "Ananya Sharma", role: "Vice Chair, Operations" },
  { initials: "VR", name: "Vikram Rawat", role: "Director of Research" },
  { initials: "DN", name: "Deepak Negi", role: "Treasurer & Membership Head" }
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
        className="hero-image"
      />
      <div className="container hero-content">
        <div className="hero-copy">
          <h1>
            Cloud Security Alliance
            <strong> Uttarakhand Chapter</strong>
          </h1>
          <p>
            Join Uttarakhand&apos;s premier hub for cybersecurity excellence. We bridge the gap between global cloud standards and local expertise.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-primary" href="/membership-info">
              Become a Member
            </Link>
            <Link className="btn btn-secondary" href="/past-events">
              View Events <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsBand() {
  return (
    <section className="stats-band">
      <div className="container stats-grid">
        {stats.map((item) => (
          <article className="stat-item" key={item.label}>
            <h2>{item.value}</h2>
            <p>{item.label}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function BenefitsSection() {
  return (
    <section className="join-benefits" id="membership">
      <div className="container">
        <div className="section-intro">
          <p className="eyebrow">Why join our chapter?</p>
          <h2>Elevate your career and contribute to the evolution of cloud security standards in the region.</h2>
          <p className="section-copy">
            We bring together practitioners, researchers, and decision makers to share knowledge, grow influence, and make cloud operations safer for Uttarakhand.
          </p>
        </div>
        <div className="feature-grid">
          {benefits.map((item) => (
            <article className="feature-card" key={item.title}>
              <item.icon />
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function LeadershipSection() {
  return (
    <section className="leadership" id="chapters">
      <div className="container">
        <div className="section-intro">
          <p className="eyebrow">Chapter Leadership</p>
          <h2>Guided by industry veterans committed to fostering a secure digital ecosystem in Uttarakhand.</h2>
        </div>
        <div className="leadership-grid">
          {leadershipTeam.map((member) => (
            <article className="leader-card" key={member.name}>
              <div className="leader-avatar">{member.initials}</div>
              <div>
                <h4>{member.name}</h4>
                <p>{member.role}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ResourcesSection() {
  return (
    <section className="resources">
      <div className="container resource-grid">
        <article className="resource-card resource-card--vault">
          <div className="resource-label">MEMBER-ONLY CONTENT</div>
          <h2>Exclusive Resource Vault</h2>
          <p>
            Access chapter-exclusive whitepapers, compliance templates, and full recordings of our monthly webinars.
          </p>
          <Link className="btn btn-primary" href="/contact">
            Login to Access
          </Link>
        </article>
        <article className="resource-card resource-card--community">
          <div className="community-top">
            <div className="community-pill">Stay Connected</div>
            <h2>Join Our Community</h2>
          </div>
          <p>
            Get real-time updates on local meetups, job opportunities, and breaking news in the cloud security domain.
          </p>
          <a className="btn btn-secondary" href="https://www.linkedin.com/groups/8409109/">
            Connect on LinkedIn
          </a>
        </article>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main>
      <Hero />
      <StatsBand />
      <BenefitsSection />
      <LeadershipSection />
      <ResourcesSection />
    </main>
  );
}
