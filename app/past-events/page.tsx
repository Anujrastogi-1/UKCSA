import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import EventsSections from "./events-sections";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: "Cybersecurity Events & Conferences in Uttarakhand",
  description:
    "Browse past cybersecurity, cloud security, and AI security events, workshops, and conferences hosted by the CSA Uttarakhand Chapter across Dehradun and Uttarakhand.",
  alternates: { canonical: "/past-events" },
  openGraph: {
    url: "/past-events",
    title: "CSA Uttarakhand Chapter — Events & Conferences",
    description:
      "Past cybersecurity events, workshops, and conferences hosted by CSA Uttarakhand Chapter.",
  },
};

export default function PastEventsPage() {
  return (
    <main className={`events-page ${manrope.variable} ${inter.variable}`}>
      <EventsSections />
    </main>
  );
}
