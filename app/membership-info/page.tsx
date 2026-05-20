import { BookOpen, ShieldCheck, TrendingUp } from "lucide-react";
import Link from "next/link";
import { PageHero } from "../components";

const benefits = [
  {
    icon: ShieldCheck,
    title: "Security Community",
    description: "Meet cloud security professionals, students, researchers, and organizations across Uttarakhand."
  },
  {
    icon: BookOpen,
    title: "Learning Access",
    description: "Join workshops, webinars, certifications, and local discussions connected to global CSA research."
  },
  {
    icon: TrendingUp,
    title: "Professional Growth",
    description: "Build visibility, contribute to chapter initiatives, and stay close to emerging cybersecurity trends."
  }
];

export default function MembershipPage() {
  return (
    <main>
      <PageHero title="Membership" />
      <section className="join-benefits">
        <div className="container">
          <div className="section-intro">
            <p className="eyebrow">Join the chapter</p>
            <h2>Become part of a local community shaping safer cloud adoption.</h2>
            <p className="section-copy">
              CSA Uttarakhand Chapter membership gives you a place to learn, network, collaborate, and contribute to cloud
              security awareness in the region.
            </p>
          </div>
          <div className="feature-grid">
            {benefits.map((item) => (
              <article className="feature-card" key={item.title}>
                <item.icon />
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
          <div className="hero-actions membership-actions">
            <a className="btn btn-primary" href="https://www.linkedin.com/groups/8409109/">
              Join LinkedIn Group
            </a>
            <Link className="btn btn-secondary" href="/contact">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
