import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import HeroCarousel from "./components/HeroCarousel";
import IntlVideoBanner from "./components/IntlVideoBanner";
import IntlFeaturesSection from "./components/IntlFeaturesSection";
import TrustedBrands from "./components/TrustedBrands";
import VehicleListings from "./components/VehicleListings";
import FadeIn from "./components/FadeIn";

export const metadata: Metadata = {
  title: "JLR International | Japanese Vehicle Exporter Worldwide",
  description:
    "JLR International exports quality Japanese vehicles worldwide, including automobiles, motorcycles, and heavy machinery with reliable sourcing and global shipping solutions.",
};

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
      <TrustedBrands />

      {/* ── Vehicle Listings ── */}
      <VehicleListings />

      {/* ── CTA Banner ── */}
      <section className="int-cta">
        <Image
          src="/images/cta-bg.webp"
          alt=""
          fill
          sizes="100vw"
          className="int-cta__bg"
          style={{ objectFit: "cover" }}
        />
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
