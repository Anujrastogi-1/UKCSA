import type { Metadata } from "next";
import { PageHero } from "../components";
import { LoginForm } from "../admin/login/LoginForm";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to the CSA Uttarakhand Chapter admin panel.",
  alternates: { canonical: "/login" },
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <main className="plain-page">
      <PageHero title="Sign In" />
      <section className="contact-section">
        <div className="container">
          <div className="contact-panel">
            <strong>CSA Uttarakhand Chapter</strong>
            <h2>Welcome back</h2>
            {/* Reuses the admin auth flow: on success it redirects to the
                admin panel (or the force-password-change page on first login). */}
            <LoginForm />
          </div>
        </div>
      </section>
    </main>
  );
}
