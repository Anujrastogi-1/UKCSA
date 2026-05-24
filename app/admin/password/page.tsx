import type { Metadata } from "next";
import { PageHero } from "../../components";
import { PasswordChangeForm } from "./PasswordChangeForm";

export const metadata: Metadata = {
  title: "Change Password",
  robots: { index: false, follow: false }
};

export default function AdminPasswordPage() {
  return (
    <main className="plain-page">
      <PageHero title="Change Password" />
      <section className="contact-section">
        <div className="container">
          <div className="contact-panel">
            <strong>CSA Uttarakhand Admin</strong>
            <h2>Set a new password</h2>
            <p className="member-panel-lead">
              For security, please replace the seeded password before continuing to the dashboard.
            </p>
            <PasswordChangeForm />
          </div>
        </div>
      </section>
    </main>
  );
}
