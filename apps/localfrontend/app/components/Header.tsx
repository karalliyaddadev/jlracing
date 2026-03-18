"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/bikes", label: "Bikes" },
  { href: "/spare-parts", label: "Spare Parts" },
  { href: "/pre-orders", label: "Pre Orders" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="header">
      {/* ── Main Nav ── */}
      <nav className="header__nav">
        <Link href="/" className="header__logo">
          <img
            src="/landing/logo.jpg"
            alt="JL Racing"
            className="header__logo-img"
          />
          <span className="header__logo-text">JL RACING</span>
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
          <button className="header__icon-btn" aria-label="Search">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </button>
          <Link href="/bikes" className="header__cta-btn">
            View Stock
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
      {/* ── Announcement Bar ── */}
      <div className="header__announcement">
        <span>
          New Arrivals Every Week &mdash; Premium Japanese Imports Now
          Available!
        </span>
      </div>

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
        </ul>
      </div>
    </header>
  );
}
