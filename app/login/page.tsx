import Link from "next/link";
import { PageHero } from "../components";

export default function LoginPage() {
  return (
    <main className="plain-page">
      <PageHero title="Sign In" />
      <section className="contact-section">
        <div className="container">
          <div className="contact-panel">
            <strong>CSA Uttarakhand Chapter</strong>
            <h2>Welcome back</h2>
            <form className="contact-form">
              <label>
                <span>Email Address</span>
                <input type="email" aria-label="Email Address" required placeholder="you@example.com" />
              </label>
              <label>
                <span>Password</span>
                <input type="password" aria-label="Password" required placeholder="Enter your password" />
              </label>
              <div className="auth-form-meta">
                <Link href="/forgot-password" className="auth-forgot-link">Forgot password?</Link>
              </div>
              <button type="button">Sign In</button>
            </form>
            <div className="auth-divider">
              <span>or</span>
            </div>
            <p className="auth-switch">
              Don&apos;t have an account?{" "}
              <Link href="/signup">Create one</Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
