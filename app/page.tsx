import { buildMetadata } from "../lib/seo";
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
  Users,
  BookOpen,
  type LucideIcon
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata = buildMetadata({
  title: "Cloud Security & Cybersecurity Community in Uttarakhand",
  description:
    "Join the Cloud Security Alliance Uttarakhand Chapter, a regional cybersecurity community in Dehradun for cloud security, AI security, Zero Trust, training, events, and research collaboration.",
  path: "/",
});

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
  icon: LucideIcon;
  points: string[];
};

const benefitCards: BenefitCard[] = [
  {
    title: "Global Community Access",
    icon: Users,
    points: [
      "Globally recognized Cloud Security Alliance network",
      "Connect with cybersecurity professionals worldwide",
      "Engage with researchers and industry leaders",
      "Be part of an international security community"
    ]
  },
  {
    title: "Learning & Skill Development",
    icon: GraduationCap,
    points: [
      "Cybersecurity workshops and webinars",
      "Expert-led training sessions",
      "Insights on cloud, AI security, and Zero Trust",
      "Hands-on learning and practical exposure"
    ]
  },
  {
    title: "Networking Opportunities",
    icon: Network,
    points: [
      "Cybersecurity professionals and security leaders",
      "Industry experts across cloud and AI",
      "University faculty and researchers",
      "Students and tech communities"
    ]
  },
  {
    title: "Access to Industry Knowledge",
    icon: ShieldCheck,
    points: [
      "Latest cybersecurity trends",
      "Cloud security best practices",
      "Threat intelligence and risk management",
      "Security frameworks and compliance updates"
    ]
  },
  {
    title: "Events & Conferences",
    icon: CalendarDays,
    points: [
      "Cybersecurity conferences and meetups",
      "Hackathons and CTF competitions",
      "Research panels and discussion sessions",
      "Awareness campaigns and technical events"
    ]
  },
  {
    title: "Research & Collaboration",
    icon: Lightbulb,
    points: [
      "Security research initiatives",
      "Whitepapers and case studies",
      "Academic-industry projects",
      "Innovation and technology discussions"
    ]
  },
  {
    title: "Career Growth & Visibility",
    icon: Sparkles,
    points: [
      "Community leadership opportunities",
      "Speaking engagements and panels",
      "Volunteer and ambassador roles",
      "Internship and career networking"
    ]
  },
  {
    title: "Student-Focused Opportunities",
    icon: BookOpen,
    points: [
      "Mentorship from industry experts",
      "Career guidance and certification awareness",
      "Real-world cybersecurity exposure",
      "Technical and leadership skill building"
    ]
  },
  {
    title: "Contribute to a Secure Digital Future",
    icon: Building2,
    points: [
      "Promote cybersecurity awareness",
      "Drive secure cloud adoption",
      "Strengthen digital resilience",
      "Empower Uttarakhand and beyond"
    ]
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
            <Link className="btn btn-primary" href="/contact">
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
            {/* <span>Our Vision</span> */}
            <h3>Our Vision</h3>
            <p>
              Uttarakhand as a cybersecurity growth hub to establish Uttarakhand as a growing hub for cybersecurity awareness, innovation, research, and talent
              development by building an inclusive and future-ready security community.
            </p>
          </article>
          <article className="mission-card">
            {/* <span>Our Mission</span> */}
            <h3>Our Mission</h3>
            <p>
              Practical skills for secure digital resilience to empower individuals and organizations with cybersecurity knowledge, practical skills, and collaborative
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
          <h2 className="Focus-heading">Our Focus Areas</h2>
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
        <div className="section-intro section-intro--center">
          {/* <p className="eyebrow">Benefits of joining</p> */}
          <h2>Benefits of Joining the CSAUttarakhand Chapter</h2>
        </div>
        <div className="benefit-card-grid">
          {benefitCards.map((item) => (
            <article className="benefit-card" key={item.title}>
              <div className="benefit-card-head">
                <span className="benefit-card-icon" aria-hidden="true">
                  <item.icon />
                </span>
                <h3>{item.title}</h3>
              </div>
              <ul className="benefit-card-list">
                {item.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
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
          {/* <p className="eyebrow">Who can join?</p> */}
          <h2 style={{ margin: 'auto' }}>Who can join?</h2>
          <p>
            Anyone passionate about cybersecurity and secure digital transformation is welcome.
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
          {/* <p className="eyebrow">Why join &amp; stay connected</p> */}
          <h2>Stay informed, connected, and future-ready.</h2>
          <p>
            The CSA Uttarakhand Chapter helps you become part of a collaborative community working toward a
            safer digital ecosystem, with real-time updates on local meetups, opportunities, and breaking
            news across the cloud security domain.
          </p>
        </div>
        <a className="btn btn-primary" href="https://www.linkedin.com/groups/8409109/">
          Connect on LinkedIn
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

// function EventsHighlightSection() {
//   return (
//     <section className="home-events">
//       <div className="container home-events-inner">
//         <div className="home-events-copy">
//           <p className="eyebrow">Events &amp; Conferences</p>
//           <h2>Where our community comes together.</h2>
//           <p>
//             From India&apos;s biggest cybersecurity &amp; AI conference to university MOU signings,
//             hands-on workshops, and meetups — our events bring students, professionals, and industry
//             leaders together across Uttarakhand.
//           </p>
//           <div className="hero-actions">
//             <Link className="btn btn-primary" href="/past-events">
//               View Events <ChevronRight size={18} />
//             </Link>
//           </div>
//         </div>
//         <div className="home-events-media">
//           <div className="home-events-img home-events-img--main">
//             <Image
//               src="/assets/img/CSAXCON/E89A6843.webp"
//               alt="CSA cybersecurity and AI conference at Graphic Era University, Dehradun"
//               fill
//               sizes="(max-width: 900px) 100vw, 520px"
//             />
//             <span className="home-events-tag">CSAXCON 2026</span>
//           </div>
//           <div className="home-events-img home-events-img--sub">
//             <Image
//               src="/assets/img/MOU_GEHU/IMG_0391.webp"
//               alt="MOU signing ceremony with Graphic Era Hill University"
//               fill
//               sizes="(max-width: 900px) 55vw, 230px"
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

export default function Home() {
  return (
    <main>
      <Hero />
      {/* <StatsBand /> */}
      <ChapterProgramSection />
      {/* <EventsHighlightSection /> */}
      <FocusSection />
      <BenefitCardsSection />
      <JoinPathSection />
      <WhyJoinBand />
      {/* <BoardMembersSection /> */}
    </main>
  );
}
