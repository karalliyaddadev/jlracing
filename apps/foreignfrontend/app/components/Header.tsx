"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/export-process", label: "Export Process" },
  { href: "/listings", label: "Listings" },
  { href: "/gallery", label: "Gallery" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`header${scrolled ? " header--scrolled" : ""}`}>
      <nav className="header__nav">
        <Link href="/" className="header__logo">
          <img
            src="/images/international-logo.jpeg"
            alt="JL Racing"
            className="header__logo-img"
          />
        </Link>

        {/* Desktop Links */}
        <ul className="header__links">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`header__link ${
                  pathname === link.href ? "header__link--active" : ""
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Actions */}
        <div className="header__actions">
          <Link
            href="/contact"
            className={`header__contact-btn ${
              pathname === "/contact" ? "header__contact-btn--active" : ""
            }`}
          >
            Contact
          </Link>

          {/* Mobile Hamburger */}
          <button
            className={`header__hamburger ${mobileOpen ? "is-open" : ""}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`header__mobile-menu ${mobileOpen ? "is-open" : ""}`}>
        <ul className="header__mobile-links">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`header__mobile-link ${
                  pathname === link.href ? "header__mobile-link--active" : ""
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/contact"
              className={`header__mobile-link ${
                pathname === "/contact" ? "header__mobile-link--active" : ""
              }`}
              onClick={() => setMobileOpen(false)}
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
