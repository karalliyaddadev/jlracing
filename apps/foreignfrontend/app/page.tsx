import Link from "next/link";
import HeroCarousel from "./components/HeroCarousel";
import IntlVideoBanner from "./components/IntlVideoBanner";
import TrustedBrands from "./components/TrustedBrands";
import VehicleListings from "./components/VehicleListings";

const FEATURE_CARDS = [
  {
    title: "Wide Vehicle Selection",
    desc: "From sedans to SUVs and motorcycles, we source the best vehicles worldwide.",
    image: "/images/wide-vehicle.webp",
  },
  {
    title: "Smooth Export Process",
    desc: "We handle sourcing, shipping, and delivery with complete reliability.",
    image: "/images/smooth-export.webp",
  },
  {
    title: "Global Delivery",
    desc: "Receive your vehicle anywhere with peace of mind and full support.",
    image: "/images/global-delivery.webp",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ── Hero ── */}
      <HeroCarousel />

      {/* ── Export Description ── */}
      <section className="int-export-desc">
        <div className="int-export-desc__inner">
          <span className="int-pill">
            <span className="int-pill__plain">Export Vehicles</span>
            <span className="int-pill__gold">Worldwide</span>
          </span>
          <p className="int-export-desc__text">
            Pre-order your vehicle through our Japanese licensed direct auction
            export service. We handle sourcing, bidding, and international
            delivery, ensuring your vehicle reaches any country with complete
            end-to-end support.
          </p>
        </div>
      </section>

      {/* ── Video / Ship Banner ── */}
      <IntlVideoBanner />

      {/* ── Features Section ── */}
      <section className="int-features">
        <div className="int-features__inner">
          {/* Left copy */}
          <div className="int-features__copy">
            <span className="int-pill">
              <span className="int-pill__plain">Global Vehicle</span>
              <span className="int-pill__gold">Export</span>
            </span>
            <h2 className="int-features__heading">
              We help you find, order, and export vehicles to any country with a{" "}
              <em>simple and reliable process.</em>
            </h2>
          </div>

          {/* Right cards */}
          <div className="int-features__cards">
            {FEATURE_CARDS.map((card) => (
              <div key={card.title} className="int-feat-card">
                <div className="int-feat-card__img-wrap">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="int-feat-card__img"
                  />
                  <div className="int-feat-card__overlay" />
                  <div className="int-feat-card__text">
                    <h3 className="int-feat-card__title">{card.title}</h3>
                    <p className="int-feat-card__desc">{card.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trusted Brands ── */}
      <TrustedBrands />

      {/* ── Vehicle Listings ── */}
      <VehicleListings />

      {/* ── CTA Banner ── */}
      <section className="int-cta">
        <div className="int-cta__bg" />
        <div className="int-cta__overlay" />
        <div className="int-cta__content">
          <span className="int-pill">
            <span className="int-pill__plain">Start Your</span>
            <span className="int-pill__gold">Order</span>
          </span>
          <h2 className="int-cta__heading">
            Choose a vehicle from our listings or contact us to{" "}
            <em>begin your export process.</em>
          </h2>
          <div className="int-cta__actions">
            <Link href="/listings" className="int-btn int-btn--primary">
              View All Listings
            </Link>
            <Link href="/contact" className="int-btn int-btn--outline">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
