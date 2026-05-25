import type { Metadata } from "next";
import MembershipExperience from "./MembershipExperience";

export const metadata: Metadata = {
  title: "Become a Member — CSA Uttarakhand Chapter",
  description:
    "Join the CSA Uttarakhand Chapter. Become a member as a student, professional, or board member and be part of Uttarakhand's growing cloud security and cybersecurity community.",
  alternates: { canonical: "/contact" },
  openGraph: {
    url: "/contact",
    title: "Become a Member — CSA Uttarakhand Chapter",
    description:
      "Join Uttarakhand's growing cloud security community — as a student, professional, or board member.",
  },
};

export default function ContactPage() {
  return (
    <main className="plain-page">
      <MembershipExperience />
    </main>
  );
}
