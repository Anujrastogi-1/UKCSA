import { redirect } from "next/navigation";

// Public member self-registration is disabled for now — there is no member
// account backend yet, only admin accounts. Visitors are routed to sign-in.
// The original signup form is preserved in the block comment below for when
// membership accounts ship.
export default function SignupPage() {
  redirect("/login");
}

/* --- Original signup form (re-enable when membership accounts are added) ----
import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "../components";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Create an account on the CSA Uttarakhand Chapter member portal.",
  alternates: { canonical: "/signup" },
  robots: { index: false, follow: false },
};

export default function SignupPage() {
  return (
    <main className="plain-page">
      <PageHero title="Create Account" />
      <section className="contact-section">
        <div className="container">
          <div className="contact-panel auth-panel--wide">
            <strong>CSA Uttarakhand Chapter</strong>
            <h2>Join the community</h2>
            <form className="contact-form">
              <div className="contact-form-row">
                <label>
                  <span>First Name</span>
                  <input type="text" aria-label="First Name" required placeholder="First Name" />
                </label>
                <label>
                  <span>Last Name</span>
                  <input type="text" aria-label="Last Name" placeholder="Last Name" />
                </label>
              </div>
              <label>
                <span>Email Address</span>
                <input type="email" aria-label="Email Address" required placeholder="you@example.com" />
              </label>
              <label>
                <span>Phone</span>
                <input type="tel" aria-label="Phone Number (optional)" placeholder="+91 XXXXX XXXXX" />
              </label>
              <div className="contact-form-row">
                <label>
                  <span>Password</span>
                  <input type="password" aria-label="Password" required placeholder="Create a password" />
                </label>
                <label>
                  <span>Confirm Password</span>
                  <input type="password" aria-label="Confirm Password" required placeholder="Repeat password" />
                </label>
              </div>
              <button type="button">Create Account</button>
            </form>
            <div className="auth-divider">
              <span>or</span>
            </div>
            <p className="auth-switch">
              Already have an account? <Link href="/login">Sign in</Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
---------------------------------------------------------------------------- */
