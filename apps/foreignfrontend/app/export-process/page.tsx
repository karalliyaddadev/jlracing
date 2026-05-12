import {
  LuGavel,
  LuFileText,
  LuGlobe,
  LuShip,
  LuAnchor,
  LuMapPin,
  LuClock,
} from "react-icons/lu";
import FadeIn from "../components/FadeIn";

const STEP2_CARDS = [
  {
    title: "Sourcing",
    desc: "Vehicles come from top Japanese auctions, guaranteeing authenticity, competitive pricing, and reliable availability.",
    bgImage: "/export/step-2-sourcing.png",
  },
  {
    title: "Condition Grading",
    desc: "Detailed interior and exterior grades provide clear insights into each vehicle's condition.",
    bgImage: "/export/step-2-condition-grading.png",
  },
  {
    title: "Mileage Verification",
    desc: "Accurate mileage and mechanical checks ensure vehicles meet international standards and expectations.",
    bgImage: "/export/step-2-mileage-verification.png",
  },
  {
    title: "Photography",
    desc: "High-resolution images allow importers to evaluate vehicles confidently before making decisions.",
    bgImage: "/export/step-2-photography.png",
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
      {/* ── Hero — no animation (above the fold) ── */}
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
          <FadeIn>
            <span className="abt-grad-pill">
              <span className="abt-grad-pill__text">
                <span className="abt-grad-text">Step 1: Entry Point</span>
              </span>
            </span>
          </FadeIn>
          <div className="exp-two-col">
            <FadeIn className="exp-two-col__text" direction="left" delay={0.1}>
              <p className="exp-entry__body">
                We as <em>licensed Direct Auction Exporters</em> guide you from
                your first selection, providing verified vehicles directly from
                Japanese auctions with complete transparency, trust, and
                professional support.
              </p>
            </FadeIn>
            <FadeIn
              className="exp-two-col__img-box"
              direction="right"
              delay={0.2}
              style={{ overflow: "hidden", padding: 0 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/export/step-1-entry-point.png"
                alt="Step 1 Entry Point"
                style={{
                  width: "100%",
                  height: "100%",
                  minHeight: "260px",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Step 2 – Select Your Vehicle ── */}
      <section className="exp-section exp-section--dark">
        <div className="exp-section__inner exp-section__inner--center">
          <FadeIn>
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
          </FadeIn>
          <div className="exp-cards-grid">
            {STEP2_CARDS.map((card, i) => (
              <FadeIn key={card.title} className="exp-yard-card" delay={i * 0.1}>
                <div
                  className="exp-yard-card__bg"
                  style={{
                    backgroundImage: `url('${card.bgImage}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                />
                <div className="exp-yard-card__overlay" />
                <div className="exp-yard-card__body">
                  <h3 className="exp-yard-card__title">{card.title}</h3>
                  <p className="exp-yard-card__desc">{card.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Step 3 – Confirm Pricing ── */}
      <section className="exp-section exp-section--light">
        <div className="exp-section__inner exp-section__inner--center">
          <FadeIn>
            <span className="abt-grad-pill">
              <span className="abt-grad-pill__text">
                <span className="abt-grad-text">Step 3 – Confirm Pricing</span>
              </span>
            </span>
            <h2 className="exp-light-heading">
              Clear cost breakdown with no hidden or surprise fees.
            </h2>
          </FadeIn>
          <div className="exp-two-col exp-two-col--top">
            <FadeIn
              className="exp-two-col__img-box exp-two-col__img-box--tall"
              direction="left"
              delay={0.1}
              style={{ overflow: "hidden", padding: 0 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/export/step-3-confirm pricing.png"
                alt="Step 3 Confirm Pricing"
                style={{
                  width: "100%",
                  height: "100%",
                  minHeight: "340px",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </FadeIn>
            <div className="exp-features-2x2">
              {STEP3_FEATURES.map((f, i) => (
                <FadeIn key={f.title} className="exp-feat" direction="right" delay={0.15 + i * 0.08}>
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
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Step 4 – Complete Payment ── */}
      <section className="exp-section exp-section--dark">
        <div className="exp-section__inner">
          <div className="exp-two-col exp-two-col--top">
            <FadeIn className="exp-step4-left" direction="left">
              <div className="exp-step-pill exp-step-pill--dark exp-step-pill--inline">
                Step 4 – Complete Payment
              </div>
              <p className="exp-step4-body">
                Once you confirm your vehicle, we guide you through secure
                payments including TT and bank-backed LC while handling all
                export documentation for smooth processing and compliance.
              </p>
            </FadeIn>
            <FadeIn className="exp-two-img-row" direction="right" delay={0.2}>
              <div
                className="exp-two-col__img-box"
                style={{ overflow: "hidden", padding: 0 }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/export/complete-payment-2.png"
                  alt="Complete Payment"
                  style={{
                    width: "100%",
                    height: "100%",
                    minHeight: "260px",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>
              <div
                className="exp-two-col__img-box"
                style={{ overflow: "hidden", padding: 0 }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/export/yard.jpg"
                  alt="Export Yard"
                  style={{
                    width: "100%",
                    height: "100%",
                    minHeight: "260px",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Step 5 – Shipping & Delivery ── */}
      <section className="exp-section exp-section--light">
        <div className="exp-section__inner exp-section__inner--center">
          <FadeIn>
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
          </FadeIn>
          <div className="exp-two-col exp-two-col--top">
            <FadeIn
              className="exp-two-col__img-box exp-two-col__img-box--tall"
              direction="left"
              delay={0.1}
              style={{ overflow: "hidden", padding: 0 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/export/step-5-shipping-and-delivery.png"
                alt="Step 5 Shipping and Delivery"
                style={{
                  width: "100%",
                  height: "100%",
                  minHeight: "340px",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </FadeIn>
            <div className="exp-features-2x2">
              {STEP5_FEATURES.map((f, i) => (
                <FadeIn key={f.title} className="exp-feat" direction="right" delay={0.15 + i * 0.08}>
                  <span className="exp-feat__icon">{f.reactIcon}</span>
                  <div>
                    <h3 className="exp-feat__title">{f.title}</h3>
                    <p className="exp-feat__desc">{f.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
