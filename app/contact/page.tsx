import type { Metadata } from "next";
import { PageHero } from "../components";
import { MembershipForm } from "./MembershipForm";

export const metadata: Metadata = {
  title: "Become a Member — Contact CSA Uttarakhand Chapter",
  description:
    "Join the CSA Uttarakhand Chapter. Reach out to become a member, partner with the chapter, or participate in events, workshops, and the cybersecurity community in Dehradun, Uttarakhand.",
  alternates: { canonical: "/contact" },
  openGraph: {
    url: "/contact",
    title: "Become a Member — CSA Uttarakhand Chapter",
    description:
      "Get in touch with the CSA Uttarakhand Chapter to join the cybersecurity community in Uttarakhand.",
  },
};

export default function ContactPage() {
  return (
    <main className="plain-page">
      <PageHero title="Become a Member" />
      <section className="contact-section">
        <div className="container">
          <div className="contact-panel">
            <strong>Cloud Security Alliance Uttarakhand Chapter</strong>
            <h2>Join the chapter</h2>
            <p className="member-panel-lead">
              Choose your category below and tell us a bit about yourself — we'll get in touch with next steps.
            </p>
            <MembershipForm />
          </div>
        </div>
      </section>
    </main>
  );
}
