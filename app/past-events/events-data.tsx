import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Download, Users } from "lucide-react";

export type EventAction = [label: string, href: string, Icon: LucideIcon];
export type GalleryImage = { src: string; alt: string };

export type EventCategory = "event" | "conference";

export type EventItem = {
  slug: string;
  category: EventCategory;
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
    slug: "Mou-Tulas",
    category: "event",
    image: "/assets/img/MOU_Tulas/IMG_0076.webp",
    alt: "MOU Signing Ceremony at Tula's Institute",
    date: "Apr 24, 2026",
    title: "MOU Signing Ceremony at Tula's Institute",
    place: "Tulas Institute Dhoolkot, Chakrata Rd, PO, Selakui, Dehradun, Uttarakhand",
    intro: (
      <>
        FCSA, Tula's Institute organized a landmark one-day conference on{" "}
        <strong>&ldquo;Cloud Security&rdquo;</strong> in collaboration with{" "}
        <strong>Cloud Security Alliance (CSA)</strong> and{" "}
        <strong>Open Web Application Security Project (OWASP)</strong> on 24th April, 2026.
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
      { src: "/assets/img/MOU_Tulas/Lamp Lightning.jpg",              alt: "CSA 2026 — Conference main hall" },
      { src: "/assets/img/MOU_Tulas/IMG_0003.webp",               alt: "CSA 2026 — Opening ceremony" },
      { src: "/assets/img/MOU_Tulas/IMG_0076.webp",               alt: "CSA 2017 — Closing session" },

      { src: "/assets/img/MOU_Tulas/IMG_0061.webp",   alt: "CSA 2026 — Security workshop" },
      { src: "/assets/img/MOU_Tulas/IMG_0071.webp",       alt: "CSA 2026 — Panel discussion" },
      { src: "/assets/img/MOU_Tulas/IMG_0028.webp",alt: "CSA 2026 — Keynote speaker" },
      { src: "/assets/img/MOU_Tulas/IMG_0171.webp",      alt: "CSA 2017 — Networking" },
      { src: "/assets/img/MOU_Tulas/IMG_0126.webp",         alt: "CSA 2026 — Workshop session" },
      { src: "/assets/img/MOU_Tulas/IMG_0146.webp",         alt: "CSA 2017 — OWASP session" },
    ],
  },

{
    slug: "Mou-GEHU",
    category: "event",
    image: "/assets/img/MOU_GEHU/IMG_0253.webp",
    alt: "MOU Signing Ceremony - Graphic Era Hill University",
    date: "Apr 30, 2026",
    title: "MOU Signing Ceremony - Graphic Era Hill University",
    place: "Graphic Era Hill University, Bell Road, Society Area, Clement Town, Dehradun, Uttarakhand",
    intro: (
      <>
        The <strong>Cloud Security Alliance (CSA) Uttarakhand Chapter</strong> signed a{" "}
        <strong>Memorandum of Understanding</strong> with{" "}
        <strong>Graphic Era Hill University</strong> to strengthen collaboration in cloud security,
        cybersecurity awareness, and skill development. The partnership focuses on joint workshops,
        training programs, research initiatives, and hands-on learning opportunities for students and faculty.
      </>
    ),
    badges: [],
    highlightsTitle: "",
    highlights: [
      // "OWASP Top 10 Vulnerabilities Session",
      // "Live Hacking Demonstrations",
      // "Networking with Industry Experts",
    ],
    actions: [
      // ["Download Report", "https://uk.cloudsecurityalliance.in/assets/img/events/2016%20CSA.pdf", Download],
      // ["Join Community", "https://www.linkedin.com/groups/8409109/", Users],
    ],
    gallery: [
      { src: "/assets/img/MOU_GEHU/IMG_0253.webp",               alt: "CSA 2026 — Opening ceremony" },
      { src: "/assets/img/MOU_GEHU/IMG_0407.webp",      alt: "CSA 2026 - Greeting" },
      { src: "/assets/img/MOU_GEHU/IMG_0391.webp",      alt: "CSA 2026 — MOU Signing" },
      { src: "/assets/img/MOU_GEHU/IMG_0371.webp",       alt: "CSA 2026 — Panel discussion" },
      { src: "/assets/img/MOU_GEHU/IMG_0290.webp",alt: "CSA 2026 - Discussion" },
      { src: "/assets/img/MOU_GEHU/IMG_0348.webp",   alt: "CSA 2026 — Discussion" },
      { src: "/assets/img/MOU_GEHU/IMG_0428.webp",              alt: "CSA 2026 — Conference main hall" },
      { src: "/assets/img/MOU_GEHU/IMG_0400.webp",         alt: "CSA 2026" },
      { src: "/assets/img/MOU_GEHU/IMG_0477.webp",               alt: "CSA 2026 — Closing session" },
    ],
  },

  {
    slug: "Mou-UPES",
    category: "event",
    image: "/assets/img/MOU_UPES/Group_Photo.jpg",
    alt: "MOU Signing Ceremony - University of Petroleum and Energy Studies (UPES)",
    date: "Feb 2022",
    title: "MOU Signing Ceremony - UPES",
    place: "University of Petroleum and Energy Studies (UPES), Bidholi, Dehradun, Uttarakhand",
    intro: (
      <>
        The <strong>Cloud Security Alliance (CSA) Uttarakhand Chapter</strong> signed a{" "}
        <strong>Memorandum of Understanding</strong> with the{" "}
        <strong>University of Petroleum and Energy Studies (UPES)</strong> to advance collaboration
        in cloud security, cybersecurity awareness, and skill development. The partnership focuses on
        joint workshops, training programs, research initiatives, and hands-on learning opportunities
        for students and faculty.
      </>
    ),
    badges: [],
    highlightsTitle: "",
    highlights: [],
    actions: [],
    gallery: [
      { src: "/assets/img/MOU_UPES/Group_Photo.jpg",            alt: "CSA × UPES — Group photo" },
      { src: "/assets/img/MOU_UPES/Entrance.jpg",               alt: "CSA × UPES — Event entrance" },
      { src: "/assets/img/MOU_UPES/Light Lampning.jpg",         alt: "CSA × UPES — Lamp lighting ceremony" },
      { src: "/assets/img/MOU_UPES/hands_raising.jpg",          alt: "CSA × UPES — Pledge moment" },
      { src: "/assets/img/MOU_UPES/Batch.jpg",                  alt: "CSA × UPES — Participants" },
      { src: "/assets/img/MOU_UPES/Certificates&Trophies.jpg",  alt: "CSA × UPES — Certificates and trophies" },
      { src: "/assets/img/MOU_UPES/Newspaper_Cutting.jpg",      alt: "CSA × UPES — Press coverage" },
      { src: "/assets/img/MOU_UPES/image.jpg",                  alt: "CSA × UPES — Ceremony highlights" },
    ],
  },

    {

    slug: "CSAXCON-2026",
    category: "conference",
    image: "/assets/img/CSAXCON/E89A6843.webp",
    alt: "India's Biggest Cybersecurity and AI Conference 2026",
    date: "March 14, 2026",
    title: "India's Biggest Cybersecurity and AI Conference 2026",
    place: "Graphic Era (Deemed to be University), Dehradun, Uttarakhand",
    intro: (
      <>
        The <strong>CSA International Information Security Summit 2026</strong>, held at
        Graphic Era (Deemed to be University), was the largest cybersecurity summit
        ever hosted in Dehradun.
      </>
    ),
    badges: [],
    highlightsTitle: "Summit Highlights",
    highlights: [
      "First international security summit in Dehradun",
      "Keynotes by industry leaders & CSA experts",
      "Cloud security trends & 2026 threat landscape",
      "Hands-on ethical hacking workshops",
    ],
    about:
      "Pioneered by Mr. Satyam Rastogi, the summit laid the foundation for the CSA Uttarakhand Chapter.",
    actions: [
      ["Meet Satyam Rastogi", "/board-of-directors", Users],
    ],
    gallery: [
      { src: "/assets/img/CSAXCON/E89A6701.webp", alt: "CSAXCON 2026 — Opening session" },
      { src: "/assets/img/CSAXCON/E89A6719.webp", alt: "CSAXCON 2026 — Inaugural address" },
      { src: "/assets/img/CSAXCON/E89A6726.webp", alt: "CSAXCON 2026 — Welcome ceremony" },
      { src: "/assets/img/CSAXCON/E89A6751.webp", alt: "CSAXCON 2026 — Keynote talk" },
      { src: "/assets/img/CSAXCON/E89A6754.webp", alt: "CSAXCON 2026 — Industry leaders" },
      { src: "/assets/img/CSAXCON/E89A6786.webp", alt: "CSAXCON 2026 — Expert panel" },
      { src: "/assets/img/CSAXCON/E89A6789.webp", alt: "CSAXCON 2026 — Cloud security session" },
      { src: "/assets/img/CSAXCON/E89A6802.webp", alt: "CSAXCON 2026 — Hands-on workshop" },
      { src: "/assets/img/CSAXCON/E89A6807.webp", alt: "CSAXCON 2026 — Ethical hacking demo" },
      { src: "/assets/img/CSAXCON/E89A6816.webp", alt: "CSAXCON 2026 — Audience interaction" },
      { src: "/assets/img/CSAXCON/E89A6817.webp", alt: "CSAXCON 2026 — Threat landscape talk" },
      { src: "/assets/img/CSAXCON/E89A6826.webp", alt: "CSAXCON 2026 — Speaker spotlight" },
      { src: "/assets/img/CSAXCON/E89A6837.webp", alt: "CSAXCON 2026 — Career guidance session" },
      { src: "/assets/img/CSAXCON/E89A6843.webp", alt: "CSAXCON 2026 — Q&A discussion" },
      { src: "/assets/img/CSAXCON/E89A6849.webp", alt: "CSAXCON 2026 — Networking break" },
      { src: "/assets/img/CSAXCON/E89A6856.webp", alt: "CSAXCON 2026 — Conference hall" },
      { src: "/assets/img/CSAXCON/E89A6858.webp", alt: "CSAXCON 2026 — Delegates" },
      { src: "/assets/img/CSAXCON/E89A6869.webp", alt: "CSAXCON 2026 — Group photo" },
      { src: "/assets/img/CSAXCON/E89A6883.webp" ,alt: "CSAXCON 2026 — Felicitation" },
      { src: "/assets/img/CSAXCON/E89A6891.webp", alt: "CSAXCON 2026 — Closing remarks" },
      { src: "/assets/img/CSAXCON/E89A7020.webp", alt: "CSAXCON 2026 — Group memento" },
      { src: "/assets/img/CSAXCON/DSC06854.webp", alt: "CSAXCON 2026 — Venue moments" },
      { src: "/assets/img/CSAXCON/DSC06873.webp", alt: "CSAXCON 2026 — Event highlights" },
      { src: "/assets/img/CSAXCON/DSC06894.webp", alt: "CSAXCON 2026 — Final shots" },
    ],
  },

  {
    slug: "CSA-2017",
    category: "conference",
    image: "/assets/img/events/2017-CSA-28.png",
    alt: "Conference on Cloud Computing & Cyber Security (CSA 2017) — Amrapali Group of Institutes",
    date: "Sept 16, 2017",
    title: "Conference on Cloud Computing & Cyber Security (CSA 2017)",
    place: "Amrapali Group of Institutes, Haldwani, Uttarakhand",
    intro: (
      <>
        <strong>Amrapali Group of Institutes</strong> organized a landmark one-day conference on
        &ldquo;Cloud Security&rdquo; in collaboration with Cloud Security Alliance (CSA) and the
        Open Web Application Security Project (OWASP) on 16th September 2017 — featuring expert
        sessions on cloud security, penetration testing, and cybersecurity awareness for BCA, MCA,
        and B.Tech (CS) students.
      </>
    ),
    badges: ["Completed", "500+ Attendees"],
    highlightsTitle: "Key Highlights",
    highlights: [
      "Cloud security best practices workshop",
      "OWASP Top 10 vulnerabilities session",
      "Live hacking demonstrations",
      "Networking with industry experts",
    ],
    actions: [
      ["Download Report", "https://uk.cloudsecurityalliance.in/assets/img/events/2016%20CSA.pdf", Download],
      ["Join Community", "https://www.linkedin.com/groups/8409109/", Users],
    ],
    gallery: [
      {
        src: "/assets/img/events/2017-CSA-28.png",
        alt: "Conference on Cloud Computing & Cyber Security (CSA 2017) — Amrapali Group of Institutes",
      },
    ],
  },

];
