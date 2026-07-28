import Image from "next/image";

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
        <Image
          src="/Bike.png"
          alt=""
          fill
          priority
          sizes="50vw"
          className="split-panel__bg"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
        <div className="split-panel__tint" />

        <div className="split-panel__content">
          <span className="split-panel__label">
            Sri Lanka Performance Division
          </span>
          <h2 className="split-panel__title">
            Sri Lanka Motorcycle Listings, Pre-Orders &amp; Spare Parts
          </h2>
          <p className="split-panel__sub">
            Explore in-house motorcycle listings, exclusive bike pre-orders,
            performance spare parts, and enthusiast gallery videos tailored
            for Sri Lankan riders.
          </p>
          <span className="split-panel__cta">
            Enter Sri Lanka Bike Hub
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
        <Image
          src="/Car.png"
          alt=""
          fill
          priority
          sizes="50vw"
          className="split-panel__bg"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
        <div className="split-panel__tint" />

        <div className="split-panel__content">
          <span className="split-panel__label">Global Export Division</span>
          <h2 className="split-panel__title">
            Worldwide Vehicle Imports &amp; Global Sourcing
          </h2>
          <p className="split-panel__sub">
            Browse international vehicle listings, verified global export
            processes, and ready-to-ship inventory.
          </p>
          <span className="split-panel__cta">
            Enter Global Import Hub
            <span className="split-panel__arrow">→</span>
          </span>
        </div>

        <span className="split-panel__badge"></span>
      </a>
    </main>
  );
}
