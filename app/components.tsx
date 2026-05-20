"use client";

import { Facebook, Linkedin, Menu, Twitter, X, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
  { label: "About Us", href: "/about-us" },
  { label: "Board Members", href: "/board-of-directors" },
  { label: "Events", href: "/past-events" },
  { label: "Contact Us", href: "/contact" }
];

const footerLinks = [
  ["Home", "/"],
  ["About Us", "/about-us"],
  ["Membership", "/membership-info"],
  ["Events", "/past-events"],
  ["Contact Us", "/contact"]
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
            <Link className={isActive(item.href) ? "is-active" : ""} href={item.href} key={item.label} onClick={closeMenu}>
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
      <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">
        <div className="container mobile-nav-inner">
          {navItems.map((item) => (
            <Link href={item.href} key={item.label} onClick={closeMenu}>
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
      <div className="container footer-inner">
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
        <p>Copyright &copy; 2025 CSA Uttarakhand Chapter, All Rights Reserved</p>
      </div>
    </footer>
  );
}
