import { PageHero } from "../components";

export default function AboutPage() {
  return (
    <main>
      <PageHero title="About Us" />
      <section className="about-copy">
        <div className="container">
          <p>
            The CSA Uttarakhand Chapter serves as a platform where industry experts, academic institutions, startups,
            and security enthusiasts come together to explore emerging technologies, discuss evolving cyber threats,
            and create impactful solutions for a secure digital future. From cloud security and AI governance to Zero
            Trust, threat intelligence, and compliance — we focus on creating meaningful conversations and practical
            outcomes for every member.
          </p>
          <p>
            Through conferences, workshops, research initiatives, certifications, webinars, hackathons, and community
            programs, we are committed to nurturing cybersecurity talent across the region. Our chapter encourages
            members to contribute to research, participate in technical discussions, and gain exposure to global
            cybersecurity trends while building strong local networks.
          </p>
          <p>
            Whether you are a student beginning your cybersecurity journey, a professional looking to expand your
            network, or an organization seeking collaboration opportunities, the CSA Uttarakhand Chapter welcomes you
            to be part of a growing community shaping the future of secure digital transformation.
          </p>
        </div>
      </section>
    </main>
  );
}
