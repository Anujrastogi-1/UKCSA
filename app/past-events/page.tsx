import { Inter, Manrope } from "next/font/google";
import EventsSections from "./events-sections";
import { buildMetadata } from "../../lib/seo";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata = buildMetadata({
  title: "Cybersecurity Events & Conferences in Uttarakhand",
  description:
    "Browse past cybersecurity, cloud security, and AI security events, workshops, and conferences hosted by the CSA Uttarakhand Chapter across Dehradun and Uttarakhand.",
  path: "/past-events",
});

export default function PastEventsPage() {
  return (
    <main className={`events-page ${manrope.variable} ${inter.variable}`}>
      <EventsSections />
    </main>
  );
}
