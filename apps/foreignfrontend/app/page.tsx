"use client";

import { useState } from "react";

const LOCAL_URL = process.env.NEXT_PUBLIC_LOCAL_URL ?? "https://local.jlracingshop.karalliyaddaone.tech";
const INTERNATIONAL_URL =
  process.env.NEXT_PUBLIC_INTERNATIONAL_URL ?? "https://international.jlracingshop.karalliyaddaone.tech";

type HoverSide = null | "local" | "international";

export default function Page() {
  const [hovered, setHovered] = useState<HoverSide>(null);

  return (
    <main className="landing">
      {/* ── Local / Sri Lanka Side ── */}
      <a
        href={LOCAL_URL}
        className={`landing__side landing__side--local ${
          hovered === "local" ? "is-active" : ""
        } ${hovered === "international" ? "is-inactive" : ""}`}
        onMouseEnter={() => setHovered("local")}
        onMouseLeave={() => setHovered(null)}
      >
        <div className="landing__bg" />
        <div className="landing__overlay" />
        <div className="landing__content">
          <span className="landing__label">
            <span className="landing__flag">🇱🇰</span> SRI LANKA
          </span>
          <h2 className="landing__title">
            Browse
            <br />
            Local
            <br />
            Stock
          </h2>
          <h3 className="landing__heading">For Sri Lankan Riders</h3>
          <p className="landing__subtitle">
            Shop bikes, spare parts, and pre-orders from our Sri Lanka showroom.
          </p>
          <div className="landing__cta">
            <span>Go to Bike Store</span>
            <span className="landing__arrow">→</span>
          </div>
        </div>
      </a>

      {/* ── Divider ── */}
      <div className="landing__divider">
        <div className="landing__divider-line" />
        <img
          src="/landing/logo.jpg"
          alt="JL Racing"
          className="landing__divider-logo"
        />
        <div className="landing__divider-line" />
      </div>

      {/* ── International Side ── */}
      <a
        href={INTERNATIONAL_URL}
        className={`landing__side landing__side--intl ${
          hovered === "international" ? "is-active" : ""
        } ${hovered === "local" ? "is-inactive" : ""}`}
        onMouseEnter={() => setHovered("international")}
        onMouseLeave={() => setHovered(null)}
      >
        <div className="landing__bg" />
        <div className="landing__overlay" />
        <div className="landing__content">
          <span className="landing__label">INTERNATIONAL</span>
          <h2 className="landing__title">
            Explore
            <br />
            Export
            <br />
            Catalogue
          </h2>
          <h3 className="landing__heading">For International Buyers</h3>
          <p className="landing__subtitle">
            Export motorcycles and vehicles worldwide through our professional export service.
          </p>
          <div className="landing__cta">
            <span>Go to Export Site</span>
            <span className="landing__arrow">→</span>
          </div>
        </div>
      </a>

      {/* ── Bottom Geo Bar ── */}
      <div className="landing__geobar">
        <span>
          We detected you&apos;re in Sri Lanka &mdash;{" "}
          <a href={LOCAL_URL} className="landing__geobar-link">
            Go to Local Site
          </a>
        </span>
      </div>
    </main>
  );
}
