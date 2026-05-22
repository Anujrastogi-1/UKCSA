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
  BookOpen,
  type LucideIcon
} from "lucide-react";
import { BoardMemberGrid } from "./BoardMemberGrid";
import { boardMembers } from "./board-members-data";
import Image from "next/image";
import Link from "next/link";

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

type BenefitCard = {
  title: string;
  description: string;
  icon: LucideIcon;
  points?: string[];
};

const benefitCards: BenefitCard[] = [
  {
    title: "Global Community Access",
    description:
      "Become a part of the globally recognized Cloud Security Alliance network and connect with cybersecurity professionals, researchers, and industry leaders from around the world.",
    icon: Users
  },
  {
    title: "Learning & Skill Development",
    description: "Gain access to:",
    points: [
      "Cybersecurity workshops and webinars",
      "Expert-led training sessions",
      "Industry insights on cloud security, AI security, Zero Trust, and emerging technologies",
      "Hands-on learning opportunities and practical exposure"
    ],
    icon: GraduationCap
  },
  {
    title: "Networking Opportunities",
    description: "Build meaningful connections with:",
    points: [
      "Cybersecurity professionals",
      "Industry experts",
      "University faculty and researchers",
      "Students and tech communities"
    ],
    icon: Network
  },
  {
    title: "Access to Industry Knowledge",
    description: "Stay updated with:",
    points: [
      "Latest cybersecurity trends",
      "Cloud security best practices",
      "Threat intelligence and risk management strategies",
      "Security frameworks and compliance updates"
    ],
    icon: ShieldCheck
  },
  {
    title: "Participation in Events & Conferences",
    description: "Get opportunities to participate in:",
    points: [
      "Cybersecurity conferences",
      "Hackathons and Capture The Flag (CTF) competitions",
      "Community meetups",
      "Research discussions and panel sessions",
      "Awareness campaigns and technical events"
    ],
    icon: CalendarDays
  },
  {
    title: "Research & Collaboration Opportunities",
    description: "Collaborate on:",
    points: [
      "Security research initiatives",
      "Whitepapers and case studies",
      "Academic-industry projects",
      "Innovation and technology discussions"
    ],
    icon: Lightbulb
  },
  {
    title: "Career Growth & Professional Visibility",
    description: "Enhance your professional profile through:",
    points: [
      "Community leadership opportunities",
      "Speaking engagements",
      "Volunteer roles",
      "Industry exposure",
      "Internship and career networking opportunities"
    ],
    icon: Sparkles
  },
  {
    title: "Student-Focused Opportunities",
    description: "Students can benefit from:",
    points: [
      "Mentorship from industry experts",
      "Career guidance in cybersecurity",
      "Certification awareness",
      "Exposure to real-world cybersecurity domains",
      "Opportunities to build technical and leadership skills"
    ],
    icon: GraduationCap
  },
  {
    title: "Contribute to a Secure Digital Future",
    description:
      "Be part of initiatives that promote cybersecurity awareness, secure cloud adoption, and digital resilience across Uttarakhand and beyond.",
    icon: Building2
  }
];

const joinTypes = [
  {
    title: "Students",
    description: "Mentorship, career guidance, certification awareness, and exposure to real cybersecurity domains."
  },
  {
    title: "Cybersecurity Professionals",
    description: "Peer learning, speaking opportunities, community visibility, and collaboration with security leaders."
  },
  {
    title: "Researchers",
    description: "Research discussions, whitepapers, case studies, and academic-industry project opportunities."
  },
  {
    title: "Faculty Members",
    description: "Industry connections, awareness programs, student enablement, and curriculum-focused collaboration."
  },
  {
    title: "Cloud Architects",
    description: "Cloud governance, secure adoption patterns, Zero Trust conversations, and practical best practices."
  },
  {
    title: "IT Professionals",
    description: "Security awareness, risk management learning, compliance updates, and professional networking."
  },
  {
    title: "Technology Enthusiasts",
    description: "Community access, events, meetups, and a practical path into cybersecurity participation."
  },
  {
    title: "Board Members",
    description: "Leadership contribution, strategic guidance, and chapter-building opportunities."
  }
];

function Hero() {
  return (
    <section className="hero" aria-label="Cloud Security Alliance Uttarakhand Chapter Hero">
      <div className="container hero-inner">
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
        <div className="hero-visual" aria-hidden="true">
          <Image
            src="/assets/img/hero-bg.png"
            alt=""
            fill
            priority
            sizes="(max-width: 920px) 0px, 50vw"
            className="hero-bg-img"
          />
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
                Become a Member
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
          <h2 className="Focus-heading">Where the chapter creates momentum.</h2>
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
          <h2>Benefits of Joining the CSA Uttarakhand Chapter</h2>
          <p className="section-copy">
            Joining the CSA Uttarakhand Chapter opens the door to a dynamic cybersecurity community where learning,
            networking, and innovation come together. Whether you are a student, working professional, researcher, or
            organization, the chapter provides opportunities to grow in the rapidly evolving world of cybersecurity and
            cloud security.
          </p>
        </div>
        <div className="benefit-card-grid">
          {benefitCards.map((item) => (
            <article className="benefit-card" key={item.title}>
              <div className="benefit-card-head">
                <item.icon />
                <h3>{item.title}</h3>
              </div>
              <p>{item.description}</p>
              {item.points?.length ? (
                <ul>
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function JoinPathSection() {
  return (
    <section className="join-path-section">
      <div className="container">
        <div className="section-intro section-intro--center join-path-intro">
          <p className="eyebrow">Who can join?</p>
          <h2 style={{ margin: 'auto' }}>Anyone passionate about cybersecurity and secure digital transformation is welcome.</h2>
          <p>
            The chapter is open, practical, and built for people who want to learn, contribute, and grow with the
            cybersecurity community.
          </p>
        </div>
        <div className="join-audience-grid">
          {joinTypes.map((type) => (
            <article className="join-audience-card" key={type.title}>
              <span>{type.title}</span>
              <p>{type.description}</p>
            </article>
          ))}
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

// function BoardMembersSection() {
//   return (
//     <section className="leadership" id="chapters">
//       <div className="container">
//         <div className="section-intro section-intro--center">
//           <p className="eyebrow">Board Members</p>
//           <h2>Guided by industry veterans committed to fostering a secure digital ecosystem in Uttarakhand.</h2>
//         </div>
//         <BoardMemberGrid members={boardMembers} />
//       </div>
//     </section>
//   );
// }

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
            {/* <div className="community-pill">Stay Connected</div> */}
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
      {/* <BoardMembersSection /> */}
      <ResourcesSection />
    </main>
  );
}
