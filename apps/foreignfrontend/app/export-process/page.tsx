import {
  LuGavel,
  LuFileText,
  LuGlobe,
  LuShip,
  LuAnchor,
  LuMapPin,
  LuClock,
} from "react-icons/lu";

const STEP2_CARDS = [
  {
    title: "Sourcing",
    desc: "Vehicles come from top Japanese auctions, guaranteeing authenticity, competitive pricing, and reliable availability.",
  },
  {
    title: "Condition Grading",
    desc: "Detailed interior and exterior grades provide clear insights into each vehicle's condition.",
  },
  {
    title: "Mileage Verification",
    desc: "Accurate mileage and mechanical checks ensure vehicles meet international standards and expectations.",
  },
  {
    title: "Photography",
    desc: "High-resolution images allow importers to evaluate vehicles confidently before making decisions.",
  },
];

const STEP3_FEATURES = [
  {
    icon: null,
    reactIcon: <LuGavel size={32} color="#b8860b" />,
    title: "Auction Price",
    desc: "Listed clearly for importers to compare and evaluate affordability of selected vehicles.",
  },
  {
    icon: null,
    reactIcon: <LuGlobe size={32} color="#b8860b" />,
    title: "Dealer Commission",
    desc: "Fully disclosed, showing exact service charges for transparency and trust.",
  },
  {
    icon: null,
    reactIcon: <LuShip size={32} color="#b8860b" />,
    title: "Shipping Costs",
    desc: "Provided upfront to allow importers to plan budgets accurately and without surprises.",
  },
  {
    icon: null,
    reactIcon: <LuFileText size={32} color="#b8860b" />,
    title: "Documentation Fees",
    desc: "Fully explained to maintain transparency in all legal and export procedures.",
  },
];

const STEP5_FEATURES = [
  {
    reactIcon: <LuShip size={32} color="#b8860b" />,
    title: "Shipping Methods",
    desc: "Flexible RoRo or container options support FOB and CIF shipments for different importer needs.",
  },
  {
    reactIcon: <LuAnchor size={32} color="#b8860b" />,
    title: "Port Handling",
    desc: "Experienced staff ensures safe loading, transit, and delivery of all exported vehicles.",
  },
  {
    reactIcon: <LuMapPin size={32} color="#b8860b" />,
    title: "Tracking",
    desc: "Real-time updates provide importers with complete transparency and peace of mind throughout shipment.",
  },
  {
    reactIcon: <LuClock size={32} color="#b8860b" />,
    title: "Delivery Timeline",
    desc: "Estimated schedules allow precise planning and coordination of import operations from dispatch to arrival.",
  },
];

export default function ExportProcessPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="exp-hero">
        <div className="exp-hero__bg" />
        <div className="exp-hero__overlay" />
        <div className="exp-hero__content">
          <span className="exp-hero__label">Export Process</span>
          <h1 className="exp-hero__heading">
            Direct Auction Exporter,
            <br />
            <em>Trusted Japanese Vehicle Sourcing</em>
          </h1>
        </div>
      </section>

      {/* ── Step 1 – Entry Point ── */}
      <section className="exp-section exp-section--light">
        <div className="exp-section__inner">
          <span className="abt-grad-pill">
            <span className="abt-grad-pill__text">
              <span className="abt-grad-text">Step 1: Entry Point</span>
            </span>
          </span>
          <div className="exp-two-col">
            <div className="exp-two-col__text">
              <p className="exp-entry__body">
                We as <em>licensed Direct Auction Exporters</em> guide you from
                your first selection, providing verified vehicles directly from
                Japanese auctions with complete transparency, trust, and
                professional support.
              </p>
            </div>
            <div className="exp-two-col__img-box" />
          </div>
        </div>
      </section>

      {/* ── Step 2 – Select Your Vehicle ── */}
      <section className="exp-section exp-section--dark">
        <div className="exp-section__inner exp-section__inner--center">
          <span className="abt-grad-pill">
            <span className="abt-grad-pill__text">
              <span className="abt-grad-text">
                Step 2 – Select Your Vehicle
              </span>
            </span>
          </span>
          <h2 className="exp-dark-heading">
            Choose and verify vehicles with full inspection details
          </h2>
          <div className="exp-cards-grid">
            {STEP2_CARDS.map((card) => (
              <div key={card.title} className="exp-yard-card">
                <div className="exp-yard-card__bg" />
                <div className="exp-yard-card__overlay" />
                <div className="exp-yard-card__body">
                  <h3 className="exp-yard-card__title">{card.title}</h3>
                  <p className="exp-yard-card__desc">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Step 3 – Confirm Pricing ── */}
      <section className="exp-section exp-section--light">
        <div className="exp-section__inner exp-section__inner--center">
          <span className="abt-grad-pill">
            <span className="abt-grad-pill__text">
              <span className="abt-grad-text">Step 3 – Confirm Pricing</span>
            </span>
          </span>
          <h2 className="exp-light-heading">
            Clear cost breakdown with <em>no hidden or surprise fees.</em>
          </h2>
          <div className="exp-two-col exp-two-col--top">
            <div className="exp-two-col__img-box exp-two-col__img-box--tall" />
            <div className="exp-features-2x2">
              {STEP3_FEATURES.map((f) => (
                <div key={f.title} className="exp-feat">
                  {f.reactIcon ? (
                    <span className="exp-feat__icon">{f.reactIcon}</span>
                  ) : (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={f.icon!}
                      alt={f.title}
                      className="exp-feat__icon"
                    />
                  )}
                  <div>
                    <h3 className="exp-feat__title">{f.title}</h3>
                    <p className="exp-feat__desc">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Step 4 – Complete Payment ── */}
      <section className="exp-section exp-section--dark">
        <div className="exp-section__inner">
          <div className="exp-two-col exp-two-col--top">
            <div className="exp-step4-left">
              <div className="exp-step-pill exp-step-pill--dark exp-step-pill--inline">
                Step 4 – Complete Payment
              </div>
              <p className="exp-step4-body">
                Once you confirm your vehicle, we guide you through{" "}
                <em>secure payments including TT and bank-backed LC</em> while
                handling all export documentation for smooth processing and
                compliance.
              </p>
            </div>
            <div className="exp-two-img-row">
              <div className="exp-two-col__img-box" />
              <div className="exp-two-col__img-box" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Step 5 – Shipping & Delivery ── */}
      <section className="exp-section exp-section--light">
        <div className="exp-section__inner exp-section__inner--center">
          <span className="abt-grad-pill">
            <span className="abt-grad-pill__text">
              <span className="abt-grad-text">
                Step 5 – Shipping &amp; Delivery
              </span>
            </span>
          </span>
          <h2 className="exp-light-heading">
            Comprehensive shipment management and support until your vehicle
            reaches its destination
          </h2>
          <div className="exp-two-col exp-two-col--top">
            <div className="exp-two-col__img-box exp-two-col__img-box--tall" />
            <div className="exp-features-2x2">
              {STEP5_FEATURES.map((f) => (
                <div key={f.title} className="exp-feat">
                  <span className="exp-feat__icon">{f.reactIcon}</span>
                  <div>
                    <h3 className="exp-feat__title">{f.title}</h3>
                    <p className="exp-feat__desc">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
