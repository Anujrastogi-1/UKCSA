import { PageHero } from "../components";

export default function ContactPage() {
  return (
    <main className="plain-page">
      <PageHero title="Contact Us" />
      <section className="contact-section">
        <div className="container">
          <div className="contact-panel">
            <strong>Cloud Security Alliance Uttarakhand Chapter</strong>
            <h2>Send us a message</h2>
            <form className="contact-form">
              <div className="contact-form-row">
                <label>
                  <span>First Name</span>
                  <input type="text" aria-label="Your First Name" placeholder="e.g. Rahul" />
                </label>
                <label>
                  <span>Last Name</span>
                  <input type="text" aria-label="Your Last Name" placeholder="e.g. Sharma" />
                </label>
              </div>
              <div className="contact-form-row">
                <label>
                  <span>Email Address</span>
                  <input type="email" aria-label="Your Email Address" placeholder="you@example.com" />
                </label>
                <label>
                  <span>Phone <span style={{ fontWeight: 400, color: "#9ca3af" }}>(optional)</span></span>
                  <input type="tel" aria-label="Your Phone Number (optional)" placeholder="+91 98765 43210" />
                </label>
              </div>
              <label>
                <span>Subject</span>
                <input type="text" aria-label="Subject" placeholder="How can we help you?" />
              </label>
              <label>
                <span>Message</span>
                <textarea aria-label="Your Message" rows={6} placeholder="Tell us more about your inquiry..." />
              </label>
              <button type="button">Send Message</button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
