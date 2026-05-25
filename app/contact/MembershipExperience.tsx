"use client";

import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import {
  Award,
  BadgeCheck,
  Briefcase,
  GraduationCap,
  Handshake,
  HeartHandshake,
  KeyRound,
  type LucideIcon,
  MessagesSquare,
  Mic,
  Network,
  Rocket,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { MembershipForm, type RoleId } from "./MembershipForm";

type Benefit = { icon: LucideIcon; title: string; text: string };

type RoleConfig = {
  id: RoleId;
  label: string;
  icon: LucideIcon;
  accent: "blue" | "orange" | "board";
  eyebrow: string;
  pitch: string;
  benefits: Benefit[];
};

const ROLES: RoleConfig[] = [
  {
    id: "students",
    label: "Students",
    icon: GraduationCap,
    accent: "blue",
    eyebrow: "For Students",
    pitch: "Kickstart your cybersecurity career.",
    benefits: [
      { icon: Sparkles, title: "Learn Industry Skills", text: "Hands-on exposure to cloud security concepts and modern practices." },
      { icon: Users, title: "Mentorship", text: "Connect with professionals and senior members." },
      { icon: Rocket, title: "Career Opportunities", text: "Internships, hackathons, workshops, and networking." },
      { icon: MessagesSquare, title: "Community Access", text: "Join security discussions and events." },
    ],
  },
  {
    id: "professionals",
    label: "Professionals",
    icon: Briefcase,
    accent: "orange",
    eyebrow: "For Professionals",
    pitch: "Grow your influence in cloud security.",
    benefits: [
      { icon: Network, title: "Industry Networking", text: "Meet cloud security leaders and practitioners." },
      { icon: Mic, title: "Speaking Opportunities", text: "Present at events and community sessions." },
      { icon: BadgeCheck, title: "Professional Branding", text: "Build visibility within the cybersecurity ecosystem." },
      { icon: Handshake, title: "Collaboration", text: "Work on chapter initiatives and research." },
    ],
  },
  {
    id: "board",
    label: "Board Members",
    icon: ShieldCheck,
    accent: "board",
    eyebrow: "For Board Members",
    pitch: "Shape the future of the chapter.",
    benefits: [
      { icon: Award, title: "Leadership Experience", text: "Lead strategic initiatives and chapter growth." },
      { icon: ShieldCheck, title: "Industry Recognition", text: "Represent CSA Uttarakhand publicly." },
      { icon: HeartHandshake, title: "Community Impact", text: "Help students and professionals grow." },
      { icon: KeyRound, title: "Exclusive Access", text: "Priority access to partnerships and events." },
    ],
  },
];

export default function MembershipExperience() {
  const reduce = useReducedMotion();
  const [role, setRole] = useState<RoleId>("students");
  const current = ROLES.find((r) => r.id === role) ?? ROLES[0];

  const fadeUp: Variants = {
    hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 22 },
    show: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.55, ease: [0.22, 0.61, 0.36, 1] } },
  };
  const viewport = { once: true, amount: 0.2 } as const;

  return (
    <div className="mx" data-role={role}>
      {/* ── Hero ─────────────────────────────────────────── */}
      {/* <section className="mx-hero">
        <div className="mx-hero-bg" aria-hidden="true" />
        <div className="container mx-hero-inner">
          <motion.div initial="hidden" animate="show" variants={fadeUp}>
            <span className="mx-tagline">Learn. Network. Lead.</span>
            <h1>Become a Member</h1>
            <p>Join Uttarakhand&apos;s growing cloud security community.</p>
          </motion.div>
        </div>
      </section> */}
    <section className="page-hero"><div className="container"><h1>Become a Member</h1></div></section>
      {/* ── Role selector + benefits + form ──────────────── */}
      <section className="mx-apply">
        <div className="container">
          <div className="mx-tabs-wrap">
            <div className="mx-tabs" role="tablist" aria-label="Choose membership type">
              {ROLES.map((r) => {
                const active = r.id === role;
                const Icon = r.icon;
                return (
                  <button
                    key={r.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    className={`mx-tab${active ? " is-active" : ""}`}
                    onClick={() => setRole(r.id)}
                  >
                    {active && (
                      <motion.span
                        layoutId="mx-tab-bg"
                        className="mx-tab-bg"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="mx-tab-label">
                      <Icon size={18} aria-hidden="true" />
                      {r.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Role section intro — sits below the tabs */}
          <AnimatePresence mode="wait">
            <motion.div
              className="mx-role-intro"
              key={role}
              initial={{ opacity: 0, y: reduce ? 0 : 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduce ? 0 : -10 }}
              transition={{ duration: reduce ? 0 : 0.4, ease: [0.22, 0.61, 0.36, 1] }}
            >
              <p className="mx-eyebrow">{current.eyebrow}</p>
              <h2>{current.pitch}</h2>
            </motion.div>
          </AnimatePresence>

          <div className="mx-split">
            {/* Dynamic benefits — clean icon + text list */}
            <div className="mx-benefits">
              <AnimatePresence mode="wait">
                <motion.ul
                  className="mx-benefit-list"
                  key={role}
                  initial={{ opacity: 0, y: reduce ? 0 : 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: reduce ? 0 : -10 }}
                  transition={{ duration: reduce ? 0 : 0.4, ease: [0.22, 0.61, 0.36, 1] }}
                >
                  {current.benefits.map((b, i) => {
                    const Icon = b.icon;
                    return (
                      <motion.li
                        key={b.title}
                        className="mx-benefit-item"
                        initial={{ opacity: 0, y: reduce ? 0 : 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: reduce ? 0 : 0.35, delay: reduce ? 0 : 0.05 * i }}
                      >
                        <span className="mx-benefit-icon" aria-hidden="true">
                          <Icon size={18} />
                        </span>
                        <div className="mx-benefit-text">
                          <h3>{b.title}</h3>
                          <p>{b.text}</p>
                        </div>
                      </motion.li>
                    );
                  })}
                </motion.ul>
              </AnimatePresence>
            </div>

            {/* Application form */}
            <motion.div
              className="mx-form-wrap"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={viewport}
            >
              <div className="mx-form-card">
                <h2 className="mx-form-title">Apply now</h2>
                <p className="mx-form-sub">
                  Tell us a bit about yourself — we&apos;ll get in touch with next steps.
                </p>
                <MembershipForm role={role} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
