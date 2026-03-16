"use client";

import { useState } from "react";

const LOCAL_URL = process.env.NEXT_PUBLIC_LOCAL_URL ?? "http://localhost:3001";
const INTERNATIONAL_URL =
  process.env.NEXT_PUBLIC_INTERNATIONAL_URL ?? "http://localhost:3002";

type HoverSide = null | "local" | "international";

export default function Page() {
  const [hovered, setHovered] = useState<HoverSide>(null);

  return (
    <main className="landing">
      {/* ── Local / Colombo Side ── */}
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
          <span className="landing__label">ローカル</span>
          <h2 className="landing__title">Local Website</h2>
          <p className="landing__subtitle">Colombo, Sri Lanka</p>
          <div className="landing__cta">
            <span className="landing__arrow">→</span>
            <span>Enter</span>
          </div>
        </div>
      </a>

      {/* ── Divider ── */}
      <div className="landing__divider">
        <div className="landing__divider-line" />
        <div className="landing__divider-logo">JL</div>
        <div className="landing__divider-line" />
      </div>

      {/* ── International / Japan Side ── */}
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
          <span className="landing__label">インターナショナル</span>
          <h2 className="landing__title">International Website</h2>
          <p className="landing__subtitle">Japan</p>
          <div className="landing__cta">
            <span>Enter</span>
            <span className="landing__arrow">→</span>
          </div>
        </div>
      </a>
    </main>
  );
}
