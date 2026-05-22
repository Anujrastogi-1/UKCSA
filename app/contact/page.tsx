import { PageHero } from "../components";
import { MembershipForm } from "./MembershipForm";

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
