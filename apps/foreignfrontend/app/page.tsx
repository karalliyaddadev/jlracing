import Link from "next/link";
import HeroCarousel from "./components/HeroCarousel";
import IntlVideoBanner from "./components/IntlVideoBanner";
import IntlFeaturesSection from "./components/IntlFeaturesSection";
import TrustedBrands from "./components/TrustedBrands";
import VehicleListings from "./components/VehicleListings";
import FadeIn from "./components/FadeIn";

export default function HomePage() {
  return (
    <>
      {/* ── Hero — no animation (above the fold) ── */}
      <HeroCarousel />

      {/* ── Export Description ── */}
      <section className="int-export-desc">
        <FadeIn className="int-export-desc__inner">
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
        </FadeIn>
      </section>

      {/* ── Video Banner — no animation (media element) ── */}
      <IntlVideoBanner />

      {/* ── Features — staggered left copy + cards ── */}
      <IntlFeaturesSection />

      {/* ── Trusted Brands ── */}
      <FadeIn style={{ width: "100%" }}>
        <TrustedBrands />
      </FadeIn>

      {/* ── Vehicle Listings ── */}
      <FadeIn style={{ width: "100%" }}>
        <VehicleListings />
      </FadeIn>

      {/* ── CTA Banner ── */}
      <section className="int-cta">
        <div className="int-cta__bg" />
        <div className="int-cta__overlay" />
        <FadeIn className="int-cta__content">
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
        </FadeIn>
      </section>
    </>
  );
}
