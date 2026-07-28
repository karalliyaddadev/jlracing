const LOCAL_URL = process.env.NEXT_PUBLIC_LOCAL_URL || "http://localhost:3001";
const FOREIGN_URL =
  process.env.NEXT_PUBLIC_FOREIGN_URL || "http://localhost:3000";

export default function LandingPage() {
  return (
    <main className="split-container">
      {/* ── Local Site Panel ── */}
      <a
        href={LOCAL_URL}
        className="split-panel split-panel--local"
        aria-label="Go to Local Website"
      >
        <div className="split-panel__bg" />
        <div className="split-panel__tint" />

        <div className="split-panel__content">
          <span className="split-panel__label">Sri Lanka</span>
          <h2 className="split-panel__title">
            Local
            <br />
            Website
          </h2>
          <p className="split-panel__sub">
            Browse our local listings, pre-orders, and bike gallery.
          </p>
          <span className="split-panel__cta">
            Enter Local Site
            <span className="split-panel__arrow">→</span>
          </span>
        </div>

        <span className="split-panel__badge"></span>
      </a>

      {/* ── Center Divider ── */}
      <div className="split-divider">
        <div className="split-divider__line" />
        <div className="split-divider__logo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="JL Racing"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </div>
        <div className="split-divider__line" />
      </div>

      {/* ── Foreign / International Site Panel ── */}
      <a
        href={FOREIGN_URL}
        className="split-panel split-panel--foreign"
        aria-label="Go to International Website"
      >
        <div className="split-panel__bg" />
        <div className="split-panel__tint" />

        <div className="split-panel__content">
          <span className="split-panel__label">International</span>
          <h2 className="split-panel__title">
            Global
            <br />
            Website
          </h2>
          <p className="split-panel__sub">
            Explore international listings, exports, and spare parts.
          </p>
          <span className="split-panel__cta">
            Enter Global Site
            <span className="split-panel__arrow">→</span>
          </span>
        </div>

        <span className="split-panel__badge"></span>
      </a>
    </main>
  );
}
