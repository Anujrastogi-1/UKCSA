import { ChevronDown, Facebook, Linkedin, Menu, Twitter, Youtube } from "lucide-react";
import Image from "next/image";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/board-of-directors", dropdown: true },
  { label: "Board Members", href: "/board-of-directors" },
  { label: "Membership", href: "/membership-info" },
  { label: "Events", href: "/past-events", dropdown: true },
  { label: "Contact Us", href: "/contact" }
];

const footerLinks = [
  ["Home", "/"],
  ["About Us", "/board-of-directors"],
  ["Board Members", "/board-of-directors"],
  ["Membership", "/membership-info"],
  ["Events", "/past-events"],
  ["Contact Us", "/contact"]
];

export function Header() {
  return (
    <header className="site-header">
      <div className="container nav-row">
        <a className="brand" href="/" aria-label="Cloud Security Alliance Uttarakhand Chapter Logo - CSA Dehradun">
          <Image
            src="/assets/img/logo.png"
            alt="Cloud Security Alliance Uttarakhand Chapter Logo - CSA Dehradun"
            width={207}
            height={75}
            priority
          />
        </a>
        <nav className="main-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <a href={item.href} key={item.label}>
              <span>{item.label}</span>
              {item.dropdown ? <ChevronDown size={14} strokeWidth={1.8} /> : null}
            </a>
          ))}
        </nav>
        <button className="menu-button" aria-label="Open navigation">
          <Menu size={26} />
        </button>
      </div>
    </header>
  );
}

export function PageHero({ title }: { title: string }) {
  return (
    <section className="page-hero">
      <div className="container">
        <h1>{title}</h1>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <nav className="footer-links" aria-label="Footer navigation">
          {footerLinks.map(([label, href]) => (
            <a key={label} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <div className="social-links" aria-label="Social links">
          <a href="https://www.facebook.com/CSA.Dehradun" aria-label="Facebook">
            <Facebook size={32} fill="currentColor" />
          </a>
          <a href="#" aria-label="Twitter">
            <Twitter size={32} fill="currentColor" />
          </a>
          <a href="https://www.linkedin.com/groups/8409109/" aria-label="LinkedIn">
            <Linkedin size={32} fill="currentColor" />
          </a>
          <a href="#" aria-label="YouTube">
            <Youtube size={34} fill="currentColor" />
          </a>
        </div>
        <p>Copyright © 2025 CSA Uttarakhand Chapter, All Rights Reserved</p>
      </div>
    </footer>
  );
}
