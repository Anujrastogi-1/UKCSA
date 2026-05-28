import Image from "next/image";
import { PageHero } from "../components";
import { buildMetadata } from "../../lib/seo";
import PressGallery from "./press-gallery";

const pressItems = [
  {
    src: "/assets/img/press_release/UKCSA_Cloud_Security_Alliance_1.webp",
    alt: "Press clipping about CSA Uttarakhand Chapter activities",
    width: 944,
    height: 1108,
    title: "UKCSA XCON Cloud Security Alliance",
  },
  {
    src: "/assets/img/press_release/UKCSA_Cloud_Security_Alliance_2.jpeg",
    alt: "Newspaper article covering CSA Uttarakhand Chapter community work",
    width: 900,
    height: 1600,
    title: "UKCSA XCON Cloud Security Alliance",
  },
  {
    src: "/assets/img/press_release/UKCSA_Cloud_Security_Alliance_3.jpeg",
    alt: "Press coverage from a CSA Uttarakhand Chapter event",
    width: 1200,
    height: 824,
    title: "UKCSA XCON Cloud Security Alliance",
  },
  {
    src: "/assets/img/press_release/UKCSA_Cloud_Security_Alliance_4.jpeg",
    alt: "Newspaper feature about cybersecurity and CSA Uttarakhand Chapter",
    width: 1280,
    height: 1048,
    title: "UKCSA XCON Cloud Security Alliance",
  },
  {
    src: "/assets/img/press_release/UKCSA_Cloud_Security_Alliance_5.jpeg",
    alt: "Wide press clipping from CSA Uttarakhand Chapter coverage",
    width: 1352,
    height: 564,
    title: "UKCSA XCON Cloud Security Alliance",
  },
  {
    src: "/assets/img/press_release/UKCSA_Cloud_Security_Alliance_6.jpeg",
    alt: "Newspaper article on CSA Uttarakhand Chapter program",
    width: 1200,
    height: 1600,
    title: "UKCSA XCON Cloud Security Alliance",
  },
  {
    src: "/assets/img/press_release/UKCSA_Cloud_Security_Alliance_7.jpeg",
    alt: "Press clipping covering a CSA Uttarakhand Chapter milestone",
    width: 1410,
    height: 1600,
    title: "UKCSA XCON Cloud Security Alliance",
  },
  {
    src: "/assets/img/press_release/UKCSA_Cloud_Security_Alliance_8.jpeg",
    alt: "Media mention for CSA Uttarakhand Chapter",
    width: 1289,
    height: 1600,
    title: "UKCSA XCON Cloud Security Alliance",
  },
  {
    src: "/assets/img/press_release/UKCSA_Cloud_Security_Alliance_9.jpeg",
    alt: "Press article featuring CSA Uttarakhand Chapter",
    width: 1424,
    height: 1600,
    title: "UKCSA XCON Cloud Security Alliance",
  },
  {
    src: "/assets/img/press_release/UKCSA_Cloud_Security_Alliance_10.jpeg",
    alt: "Newspaper coverage of CSA Uttarakhand Chapter initiatives",
    width: 1587,
    height: 1292,
    title: "UKCSA XCON Cloud Security Alliance",
  },
  {
    src: "/assets/img/press_release/UKCSA_Cloud_Security_Alliance_11.jpeg",
    alt: "Press clipping about cloud security awareness in Uttarakhand",
    width: 1131,
    height: 1600,
    title: "UKCSA XCON Cloud Security Alliance",
  },
  {
    src: "/assets/img/press_release/UKCSA_Cloud_Security_Alliance_12.jpeg",
    alt: "Media article on CSA Uttarakhand Chapter collaboration",
    width: 1587,
    height: 1402,
    title: "UKCSA XCON Cloud Security Alliance",
  },
  {
    src: "/assets/img/press_release/UKCSA_Cloud_Security_Alliance_13.jpeg",
    alt: "Newspaper article featuring CSA Uttarakhand Chapter members",
    width: 1470,
    height: 1600,
    title: "UKCSA XCON Cloud Security Alliance",
  },
];

const pressLinks = [
  {
    title: "CSA XCON 2026 Brings Together Innovation, Ethical Hacking, and Next Gen Cyber Defence",
    source: "ThePrint",
    href: "https://theprint.in/ani-press-releases/csa-xcon-2026-brings-together-innovation-ethical-hacking-and-next-gen-cyber-defence/2885435/",
    image: "/assets/img/press_release/UKCSA_Cloud_Security_Alliance_The_Print.webp",
    imageAlt: "ThePrint press release page for CSA XCON 2026",
    summary:
      "ThePrint covered CSA XCON 2026 in Dehradun, highlighting the two-day cybersecurity conference, hands-on ethical hacking sessions, AI security discussions, and industry participation.",
  },
  {
    title: "CSA XCON 2026 Brings Together Innovation, Ethical Hacking, and Next Gen Cyber Defence",
    source: "The Tribune",
    href: "https://www.tribuneindia.com/news/business/csa-xcon-2026-brings-together-innovation-ethical-hacking-and-next-gen-cyber-defence/",
    image: "/assets/img/press_release/UKCSA_Cloud_Security_Alliance_Tribune.webp",
    imageAlt: "Tribune press release page for CSA XCON 2026",
    summary:
      "The Tribune published the CSA XCON 2026 press release, covering the event's focus on ethical hacking, next gen cyber defence, expert sessions, and community participation.",
  },
];

export const metadata = buildMetadata({
  title: "Press Release",
  description:
    "Press coverage of the Cloud Security Alliance Uttarakhand Chapter. Newspaper features, media mentions, and chapter milestones across Dehradun and Uttarakhand.",
  path: "/press-release",
});

export default function PressReleasePage() {
  return (
    <main className="press-release-page">
      <PageHero title="Press Release" />
      <section className="press-release-section">
        <div className="container">
          <div className="press-release-intro">
            {/* <p className="eyebrow">In the news</p> */}
            <h2>Media coverage and public milestones.</h2>
            <p>
              Press links and newspaper clippings covering CSA Uttarakhand Chapter&apos;s cloud
              security awareness, academic collaboration, and cybersecurity community building.
            </p>
          </div>

          <div className="press-link-grid" aria-label="Online press release links">
            {pressLinks.map((item) => (
              <article className="press-link-card" key={item.href}>
                <div className="press-link-image">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    width={1600}
                    height={1200}
                    sizes="(max-width: 920px) 100vw, 50vw"
                  />
                </div>
                <div className="press-link-overlay">
                  <h3>{item.title}</h3>
                  <p className="press-link-summary">{item.summary}</p>
                  <a href={item.href} target="_blank" rel="noopener noreferrer">
                    Read more
                  </a>
                </div>
              </article>
            ))}
          </div>

          <div className="press-gallery-panel">
            <div className="press-gallery-heading">
              <h3>Press clipping archive</h3>
            </div>

            <PressGallery items={pressItems} />
          </div>
        </div>
      </section>
    </main>
  );
}
