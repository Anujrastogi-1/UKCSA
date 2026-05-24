import type { Metadata } from "next";
import { PageHero } from "../../components";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Admin Sign In",
  robots: { index: false, follow: false }
};

export default function AdminLoginPage() {
  return (
    <main className="plain-page">
      <PageHero title="Admin Sign In" />
      <section className="contact-section">
        <div className="container">
          <div className="contact-panel">
            <strong>CSA Uttarakhand Chapter</strong>
            <h2>Restricted access</h2>
            <p className="member-panel-lead">Authorized administrators only.</p>
            <LoginForm />
          </div>
        </div>
      </section>
    </main>
  );
}
