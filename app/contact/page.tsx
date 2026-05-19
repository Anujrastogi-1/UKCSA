import { Footer, Header, PageHero } from "../components";

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="plain-page">
        <PageHero title="Contact Us" />
        <section className="contact-section">
          <div className="container contact-panel">
            <strong>Cloud Security Alliance Uttarakhand Chapter</strong>
            <h2>Send us a message</h2>
            <form className="contact-form">
              <label>
                <span>Your First Name</span>
                <input type="text" aria-label="Your First Name" />
              </label>
              <label>
                <span>Your Last Name</span>
                <input type="text" aria-label="Your Last Name" />
              </label>
              <label>
                <span>Your Email Address</span>
                <input type="email" aria-label="Your Email Address" />
              </label>
              <label>
                <span>Your Phone Number (optional)</span>
                <input type="tel" aria-label="Your Phone Number (optional)" />
              </label>
              <label>
                <span>Subject</span>
                <input type="text" aria-label="Subject" />
              </label>
              <label>
                <span>Message</span>
                <textarea aria-label="Your Message" rows={7} />
              </label>
              <button type="submit">Send</button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
