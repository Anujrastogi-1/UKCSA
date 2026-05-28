import MembershipExperience from "./MembershipExperience";
import { buildMetadata } from "../../lib/seo";
import "./membership.css";

export const metadata = buildMetadata({
  title: "Become a Member | CSA Uttarakhand Chapter",
  description:
    "Join the CSA Uttarakhand Chapter. Become a member as a student, professional, or board member and be part of Uttarakhand's growing cloud security and cybersecurity community.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <main className="plain-page">
      <MembershipExperience />
    </main>
  );
}
