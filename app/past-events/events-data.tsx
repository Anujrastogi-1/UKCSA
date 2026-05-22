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
    slug: "Mou-Tulas",
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
//   {
//     slug: "MOU-GEHU",
//     image: "/assets/img/events/events-dit.webp",
//     alt: "Cloud Security Alliance International Information Security Summit 2016 - DIT University Dehradun",
//     date: "April 10, 2016",
//     title: "Cloud Security Alliance International Information Security Summit 2016",
//     place: "DIT University, Dehradun, Uttarakhand, India",
//     intro: (
//       <>
//         A <strong>historic milestone</strong> for cybersecurity in Uttarakhand! The{" "}
//         <strong>Cloud Security Alliance International Information Security Summit 2016</strong> was
//         organized by <strong>Mr. Satyam Rastogi</strong> in association with the Department of IT
//         at DIT University on <strong>10th April 2016</strong> — marking the <strong>FIRST</strong>{" "}
//         international-level cybersecurity summit ever held in Dehradun.
//       </>
//     ),
//     badges: ["Flagship Event", "Historic Event", "First in Dehradun", "Organized by Satyam Rastogi"],
//     highlightsTitle: "Summit Highlights:",
//     highlights: [
//       "First International Security Summit in Dehradun",
//       "Keynote by Industry Leaders & CSA Experts",
//       "Cloud Security Trends & Threat Landscape 2016",
//       "Hands-on Workshops on Ethical Hacking",
//       "Career Guidance in Cybersecurity",
//     ],
//     about:
//       "Satyam Rastogi pioneered cloud security awareness in Uttarakhand by bringing this landmark event to DIT University, establishing the foundation for CSA Uttarakhand Chapter.",
//     actions: [
//       [
//         "Official Coverage",
//         "https://www.dituniversity.edu.in/workshop-conference-seminars/cloud-security-alliance-international-information-security-summit-2016-was-organized-by-the-department-of-it-",
//         Award,
//       ],
//       ["Meet Satyam Rastogi", "/board-of-directors", Users],
//     ],
//     gallery: [
//       { src: "/assets/img/events/events-dit.webp",               alt: "Summit 2016 — DIT University main stage" },
//       { src: "/assets/img/board-of-directors/SatyamRastogi.jpeg",alt: "Summit 2016 — Satyam Rastogi keynote" },
//       { src: "/assets/img/Chapter-hero.jpg",                     alt: "Summit 2016 — Opening ceremony" },
//       { src: "/assets/img/board-of-directors/Devjeet.jpg",       alt: "Summit 2016 — Cloud security talk" },
//       { src: "/assets/img/board-of-directors/kush_kaushik.jpg",  alt: "Summit 2016 — Ethical hacking workshop" },
//       { src: "/assets/img/board-of-directors/naveen_pal.png",    alt: "Summit 2016 — Expert panel" },
//       { src: "/assets/img/board-of-directors/Ankit_Giri.png",    alt: "Summit 2016 — Threat landscape session" },
//       { src: "/assets/img/board-of-directors/female_dummy.png",  alt: "Summit 2016 — Networking session" },
//       { src: "/assets/img/home-bg.png",                          alt: "Summit 2016 — Event venue" },
//       { src: "/assets/img/events/2017-CSA-28.png",               alt: "Summit 2016 — Group photo" },
//     ],
//   },
{
    slug: "Mou-GEHU",
    image: "/assets/img/MOU_GEHU/IMG_0253.webp",
    alt: "MOU Signing Ceremony - Graphic Era Hill University",
    date: "Apr 30, 2026",
    title: "MOU Signing Ceremony - Graphic Era Hill University",
    place: "Graphic Era Hill University, Bell Road, Society Area, Clement Town, Dehradun, Uttarakhand",
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
    badges: [],
    highlightsTitle: "",
    highlights: [
      // "Cloud Security Best Practices Workshop",
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
];
