import type { Metadata } from "next";
import { PageHero } from "../components";
import { Dashboard } from "./Dashboard";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  robots: { index: false, follow: false }
};

export default function AdminPage() {
  return (
    <main className="plain-page">
      <PageHero title="Membership Submissions" />
      <section className="contact-section">
        <div className="container">
          <div className="contact-panel admin-panel">
            <Dashboard />
          </div>
        </div>
      </section>
    </main>
  );
}
