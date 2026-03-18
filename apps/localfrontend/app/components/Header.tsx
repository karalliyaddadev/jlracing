"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/listings", label: "In-House Listing" },
  { href: "/pre-listings", label: "Pre-Listing" },
  { href: "/blog", label: "Blog" },
  { href: "/gallery", label: "Gallery" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="header">
      {/* ── Announcement Bar ── */}
      <div className="header__announcement">
        <span>
          🏍️ New Arrivals Every Week &mdash; Premium Japanese Imports Now
          Available!
        </span>
      </div>

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
          <Link href="/listings" className="header__cta-btn">
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
