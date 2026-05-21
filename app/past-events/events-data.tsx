import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Award, Download, Users } from "lucide-react";

export type EventAction = [label: string, href: string, Icon: LucideIcon];
export type GalleryImage = { src: string; alt: string };

export type EventItem = {
  slug: string;
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
  gallery: GalleryImage[];
};

export const events: EventItem[] = [
  {
    slug: "csa-2017",
    image: "/assets/img/events/2017-CSA-28.png",
    alt: "Conference on Cloud Computing and Cyber Security CSA 2017 - Amrapali Group",
    date: "Sept 16, 2017",
    title: "Conference on Cloud Computing & Cyber Security (CSA 2017)",
    place: "Amrapali Group of Institutes, Haldwani, Uttarakhand",
    intro: (
      <>
        FCSA, Amrapali Group of Institutes organized a landmark one-day conference on{" "}
        <strong>&ldquo;Cloud Security&rdquo;</strong> in collaboration with{" "}
        <strong>Cloud Security Alliance (CSA)</strong> and{" "}
        <strong>Open Web Application Security Project (OWASP)</strong> on 16th September, 2017.
        The conference featured expert sessions on cloud computing security, penetration testing,
        and cybersecurity awareness for BCA, MCA and B.Tech (CS) students.
      </>
    ),
    badges: ["Completed", "500+ Attendees"],
    highlightsTitle: "Key Highlights:",
    highlights: [
      "Cloud Security Best Practices Workshop",
      "OWASP Top 10 Vulnerabilities Session",
      "Live Hacking Demonstrations",
      "Networking with Industry Experts",
    ],
    actions: [
      ["Download Report", "https://uk.cloudsecurityalliance.in/assets/img/events/2016%20CSA.pdf", Download],
      ["Join Community", "https://www.linkedin.com/groups/8409109/", Users],
    ],
    gallery: [
      { src: "/assets/img/events/2017-CSA-28.png",              alt: "CSA 2017 — Conference main hall" },
      { src: "/assets/img/Chapter-hero.jpg",                     alt: "CSA 2017 — Opening ceremony" },
      { src: "/assets/img/board-of-directors/SatyamRastogi.jpeg",alt: "CSA 2017 — Keynote speaker" },
      { src: "/assets/img/board-of-directors/Ankit_Giri.png",   alt: "CSA 2017 — Security workshop" },
      { src: "/assets/img/board-of-directors/Devjeet.jpg",       alt: "CSA 2017 — Panel discussion" },
      { src: "/assets/img/board-of-directors/kush_kaushik.jpg",  alt: "CSA 2017 — Workshop session" },
      { src: "/assets/img/board-of-directors/naveen_pal.png",    alt: "CSA 2017 — OWASP session" },
      { src: "/assets/img/board-of-directors/female_dummy.png",  alt: "CSA 2017 — Networking" },
      { src: "/assets/img/hero-bg.png",                          alt: "CSA 2017 — Event venue" },
      { src: "/assets/img/events/events-dit.webp",               alt: "CSA 2017 — Closing session" },
    ],
  },
  {
    slug: "csa-2016",
    image: "/assets/img/events/events-dit.webp",
    alt: "Cloud Security Alliance International Information Security Summit 2016 - DIT University Dehradun",
    date: "April 10, 2016",
    title: "Cloud Security Alliance International Information Security Summit 2016",
    place: "DIT University, Dehradun, Uttarakhand, India",
    intro: (
      <>
        A <strong>historic milestone</strong> for cybersecurity in Uttarakhand! The{" "}
        <strong>Cloud Security Alliance International Information Security Summit 2016</strong> was
        organized by <strong>Mr. Satyam Rastogi</strong> in association with the Department of IT
        at DIT University on <strong>10th April 2016</strong> — marking the <strong>FIRST</strong>{" "}
        international-level cybersecurity summit ever held in Dehradun.
      </>
    ),
    badges: ["Flagship Event", "Historic Event", "First in Dehradun", "Organized by Satyam Rastogi"],
    highlightsTitle: "Summit Highlights:",
    highlights: [
      "First International Security Summit in Dehradun",
      "Keynote by Industry Leaders & CSA Experts",
      "Cloud Security Trends & Threat Landscape 2016",
      "Hands-on Workshops on Ethical Hacking",
      "Career Guidance in Cybersecurity",
    ],
    about:
      "Satyam Rastogi pioneered cloud security awareness in Uttarakhand by bringing this landmark event to DIT University, establishing the foundation for CSA Uttarakhand Chapter.",
    actions: [
      [
        "Official Coverage",
        "https://www.dituniversity.edu.in/workshop-conference-seminars/cloud-security-alliance-international-information-security-summit-2016-was-organized-by-the-department-of-it-",
        Award,
      ],
      ["Meet Satyam Rastogi", "/board-of-directors", Users],
    ],
    gallery: [
      { src: "/assets/img/events/events-dit.webp",               alt: "Summit 2016 — DIT University main stage" },
      { src: "/assets/img/board-of-directors/SatyamRastogi.jpeg",alt: "Summit 2016 — Satyam Rastogi keynote" },
      { src: "/assets/img/Chapter-hero.jpg",                     alt: "Summit 2016 — Opening ceremony" },
      { src: "/assets/img/board-of-directors/Devjeet.jpg",       alt: "Summit 2016 — Cloud security talk" },
      { src: "/assets/img/board-of-directors/kush_kaushik.jpg",  alt: "Summit 2016 — Ethical hacking workshop" },
      { src: "/assets/img/board-of-directors/naveen_pal.png",    alt: "Summit 2016 — Expert panel" },
      { src: "/assets/img/board-of-directors/Ankit_Giri.png",    alt: "Summit 2016 — Threat landscape session" },
      { src: "/assets/img/board-of-directors/female_dummy.png",  alt: "Summit 2016 — Networking session" },
      { src: "/assets/img/home-bg.png",                          alt: "Summit 2016 — Event venue" },
      { src: "/assets/img/events/2017-CSA-28.png",               alt: "Summit 2016 — Group photo" },
    ],
  },
];
