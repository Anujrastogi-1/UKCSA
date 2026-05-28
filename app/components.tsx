"use client";

import { Facebook, Linkedin, Mail, MapPin, Menu, ShieldCheck, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
  { label: "About Us", href: "/about-us" },
  { label: "Board Members", href: "/board-of-directors" },
  { label: "Events", href: "/past-events" },
  { label: "Become a Member", href: "/contact" },
  { label: "Press Release", href: "/press-release" }
];

const footerLinks = [
  ["Home", "/"],
  ["About Us", "/about-us"],
  ["Board Members", "/board-of-directors"],
  ["Membership", "/membership-info"],
  ["Events", "/past-events"],
  ["Become a Member", "/contact"],
  ["Press Release", "/press-release"]
];

const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com/CSA.Dehradun", icon: Facebook },
  { label: "LinkedIn", href: "https://www.linkedin.com/groups/8409109/", icon: Linkedin }
];

export function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const closeMenu = () => setIsMenuOpen(false);
  const isActive = (href: string) => pathname === href;

  return (
    <header className={`site-header${isMenuOpen ? " is-menu-open" : ""}`}>
      <div className="container nav-row">
        <Link className="brand" href="/" aria-label="Cloud Security Alliance Uttarakhand Chapter Logo - CSA Dehradun" onClick={closeMenu}>
          <Image
            src="/assets/img/logo.png"
            alt="Cloud Security Alliance Uttarakhand Chapter Logo - CSA Dehradun"
            width={207}
            height={75}
            priority
          />
        </Link>
        <nav className="main-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link
              className={isActive(item.href) ? "is-active" : ""}
              href={item.href}
              key={item.label}
              onClick={closeMenu}
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        <Link className="nav-cta" href="/membership-info" onClick={closeMenu}>
          Join Now
        </Link>
        <button
          className="menu-button"
          type="button"
          aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
          aria-controls="mobile-navigation"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>
      <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation" aria-hidden={!isMenuOpen}>
        <div className="container mobile-nav-inner">
          {navItems.map((item) => (
            <Link
              href={item.href}
              key={item.label}
              onClick={closeMenu}
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
          <Link className="mobile-nav-cta" href="/membership-info" onClick={closeMenu}>
            Join Now
          </Link>
        </div>
      </nav>
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
      <div className="footer-glow footer-glow--left" aria-hidden="true" />
      <div className="footer-glow footer-glow--right" aria-hidden="true" />
      <div className="container footer-shell">
        <div className="footer-brand-panel">
          <Link className="footer-brand" href="/" aria-label="CSA Uttarakhand Chapter home">
            <Image
              src="/assets/img/logo.png"
              alt="Cloud Security Alliance Uttarakhand Chapter Logo"
              width={207}
              height={75}
            />
          </Link>
          <p>
            Advancing cloud security awareness, research, and community collaboration across Uttarakhand.
          </p>
          <p className="footer-cert">
            <ShieldCheck size={14} />
            Cloud Security Community Chapter
          </p>
        </div>

        <div className="footer-column">
          <h2>Quick Links</h2>
          <nav className="footer-links" aria-label="Footer navigation">
            {footerLinks.map(([label, href]) =>
              href.startsWith("/") ? (
                <Link key={label} href={href}>
                  {label}
                </Link>
              ) : (
                <a key={label} href={href}>
                  {label}
                </a>
              )
            )}
          </nav>
        </div>

        <div className="footer-column">
          <h2>Contact</h2>
          <address className="footer-contact">
            <Link href="/contact">
              <Mail size={17} aria-hidden="true" />
              Become a Member
            </Link>
            <a
              href="https://www.linkedin.com/groups/8409109/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin size={17} aria-hidden="true" />
              LinkedIn community
            </a>
            <span>
              <MapPin size={17} aria-hidden="true" />
              Dehradun, Uttarakhand, India
            </span>
          </address>
        </div>

        <div className="footer-column footer-community">
          <h2>Join the Community</h2>
          <p>Get event updates, security discussions, and chapter opportunities through our professional network.</p>
          <ul className="social-links" aria-label="Social links">
            {socialLinks.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  aria-label={`${item.label} (opens in new tab)`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <item.icon size={20} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>Copyright &copy; 2026 CSA Uttarakhand Chapter. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
