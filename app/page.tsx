"use client";

import {
  BrainCircuit,
  Building2,
  CalendarDays,
  ChevronRight,
  GraduationCap,
  Handshake,
  Lightbulb,
  Network,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  BookOpen
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const stats = [
  { value: "250+", label: "Active Members" },
  { value: "15+", label: "Annual Events" },
  { value: "40+", label: "Corporate Partners" },
  { value: "100%", label: "Knowledge Share" }
];

const focusAreas = [
  { title: "Cloud Security & Governance", icon: ShieldCheck },
  { title: "AI Security & Responsible AI", icon: BrainCircuit },
  { title: "Cybersecurity Awareness & Education", icon: GraduationCap },
  { title: "Research & Innovation", icon: Lightbulb },
  { title: "Industry-Academia Collaboration", icon: Handshake },
  { title: "Professional Networking & Community Building", icon: Network },
  { title: "Security Training, Certifications & Events", icon: CalendarDays }
];

const benefitCards = [
  {
    title: "Global Community Access",
    description:
      "Become part of the globally recognized Cloud Security Alliance network and connect with cybersecurity professionals, researchers, and industry leaders around the world.",
    icon: Users
  },
  {
    title: "Learning & Skill Development",
    description:
      "Access cybersecurity workshops, webinars, expert-led training, cloud security insights, AI security discussions, and hands-on learning opportunities.",
    icon: GraduationCap
  },
  {
    title: "Networking Opportunities",
    description:
      "Build meaningful connections with cybersecurity professionals, industry experts, university faculty, researchers, students, and tech communities.",
    icon: Network
  },
  {
    title: "Access to Industry Knowledge",
    description:
      "Stay updated with cybersecurity trends, cloud security best practices, threat intelligence, risk management, security frameworks, and compliance updates.",
    icon: ShieldCheck
  },
  {
    title: "Events & Conferences",
    description:
      "Participate in cybersecurity conferences, hackathons, CTF competitions, meetups, panel sessions, awareness campaigns, and technical events.",
    icon: CalendarDays
  },
  {
    title: "Research & Collaboration",
    description:
      "Collaborate on security research initiatives, whitepapers, case studies, academic-industry projects, innovation, and technology discussions.",
    icon: Lightbulb
  },
  {
    title: "Career Growth & Visibility",
    description:
      "Enhance your profile through leadership opportunities, speaking engagements, volunteer roles, industry exposure, internships, and career networking.",
    icon: Sparkles
  },
  {
    title: "Student-Focused Opportunities",
    description:
      "Students can access mentorship, career guidance, certification awareness, real-world cybersecurity exposure, and technical leadership opportunities.",
    icon: GraduationCap
  },
  {
    title: "Secure Digital Future",
    description:
      "Be part of initiatives that promote cybersecurity awareness, secure cloud adoption, and digital resilience across Uttarakhand and beyond.",
    icon: Building2
  }
];

const joinTypes = [
  "Students",
  "Cybersecurity Professionals",
  "Researchers",
  "Faculty Members",
  "Cloud Architects",
  "IT Professionals",
  "Technology Enthusiasts",
  "Board Members"
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
            Join Uttarakhand&apos;s premier hub for cybersecurity excellence.
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

function ChapterProgramSection() {
  return (
    <section className="chapter-program">
      <div className="container">
        <div className="program-hero">
          <div>
            <p className="eyebrow">CSA Uttarakhand Chapter</p>
            <h2>Build skills, connections, and visibility in a future-ready security community.</h2>
            <p>
              Joining the CSA Uttarakhand Chapter opens the door to a dynamic cybersecurity community where learning,
              networking, and innovation come together for students, professionals, researchers, and organizations.
            </p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="https://www.linkedin.com/groups/8409109/">
                Join LinkedIn Group
              </a>
              <Link className="btn btn-secondary dark-btn" href="/contact">
                Contact Us
              </Link>
            </div>
          </div>
          <div className="program-metrics" aria-label="Chapter impact">
            {stats.slice(0, 3).map((item) => (
              <article key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </article>
            ))}
          </div>
        </div>

        <div className="mission-grid">
          <article className="mission-card mission-card--dark">
            <span>Vision</span>
            <h3>Uttarakhand as a cybersecurity growth hub.</h3>
            <p>
              To establish Uttarakhand as a growing hub for cybersecurity awareness, innovation, research, and talent
              development by building an inclusive and future-ready security community.
            </p>
          </article>
          <article className="mission-card">
            <span>Mission</span>
            <h3>Practical skills for secure digital resilience.</h3>
            <p>
              To empower individuals and organizations with cybersecurity knowledge, practical skills, and collaborative
              opportunities that promote secure cloud adoption and digital resilience.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}

function FocusSection() {
  return (
    <section className="focus-section">
      <div className="container">
        <div className="section-intro section-intro--center">
          <p className="eyebrow">Our focus areas</p>
          <h2>Where the chapter creates momentum.</h2>
        </div>
        <div className="focus-grid">
          {focusAreas.map((item) => (
            <article className="focus-card" key={item.title}>
              <item.icon />
              <h3>{item.title}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function BenefitCardsSection() {
  return (
    <section className="benefit-section">
      <div className="container">
        <div className="section-intro">
          <p className="eyebrow">Benefits of joining</p>
          <h2>Learning, networking, events, research, and career growth in one chapter.</h2>
        </div>
        <div className="benefit-card-grid">
          {benefitCards.map((item) => (
            <article className="benefit-card" key={item.title}>
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

function JoinPathSection() {
  const [selectedType, setSelectedType] = useState(joinTypes[0]);

  return (
    <section className="join-path-section">
      <div className="container join-path-grid">
        <div>
          <p className="eyebrow">Who can join?</p>
          <h2>Anyone passionate about cybersecurity and secure digital transformation is welcome.</h2>
          <p>
            Select a member type to see how the chapter can help you get involved. The community is open, practical, and
            built for people who want to learn and contribute.
          </p>
        </div>
        <div className="join-type-panel">
          <div className="join-type-list" role="tablist" aria-label="Membership audiences">
            {joinTypes.map((type) => (
              <button
                type="button"
                role="tab"
                aria-selected={selectedType === type}
                className={selectedType === type ? "is-active" : ""}
                key={type}
                onClick={() => setSelectedType(type)}
              >
                {type}
              </button>
            ))}
          </div>
          <div className="join-type-detail">
            <span>Selected path</span>
            <h3>{selectedType}</h3>
            <p>
              Join chapter discussions, attend events, build practical cybersecurity awareness, and connect with people
              working toward a safer digital ecosystem in Uttarakhand.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyJoinBand() {
  return (
    <section className="why-join-band">
      <div className="container why-join-inner">
        <div>
          <p className="eyebrow">Why join?</p>
          <h2>Stay informed, connected, and future-ready.</h2>
          <p>
            Cybersecurity is evolving faster than a browser tab explosion at a hacker conference. The CSA Uttarakhand
            Chapter helps you become part of a collaborative community working toward a safer digital ecosystem.
          </p>
        </div>
        <a className="btn btn-primary" href="https://www.linkedin.com/groups/8409109/">
          Join the Community
        </a>
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
          <p>Access chapter-exclusive whitepapers, compliance templates, and full recordings of our monthly webinars.</p>
          <Link className="btn btn-primary" href="/contact">
            Login to Access
          </Link>
        </article>
        <article className="resource-card resource-card--community">
          <div className="community-top">
            <div className="community-pill">Stay Connected</div>
            <h2>Join Our Community</h2>
          </div>
          <p>Get real-time updates on local meetups, job opportunities, and breaking news in the cloud security domain.</p>
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
      {/* <StatsBand /> */}
      <ChapterProgramSection />
      <FocusSection />
      <BenefitCardsSection />
      <JoinPathSection />
      <WhyJoinBand />
      <LeadershipSection />
      <ResourcesSection />
    </main>
  );
}
