import { PageHero } from "../components";
import { ContactForm } from "./ContactForm";

export default function ContactPage() {
  return (
    <main className="plain-page">
      <PageHero title="Contact Us" />
      <section className="contact-section">
        <div className="container">
          <div className="contact-panel">
            <strong>Cloud Security Alliance Uttarakhand Chapter</strong>
            <h2>Send us a message</h2>
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
