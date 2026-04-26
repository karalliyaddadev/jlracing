import HeroCarousel from "./components/HeroCarousel";
import VideoBanner from "./components/VideoBanner";
import BrandLogos from "./components/BrandLogos";
import WhatWeHave from "./components/WhatWeHave";
import ImageSlider from "./components/ImageSlider";
import ServiceOverview from "./components/ServiceOverview";
import Testimonials from "./components/Testimonials";
import Link from "next/link";
import FadeIn from "./components/FadeIn";

export default function HomePage() {
  return (
    <>
      {/* ── Hero — no animation (above the fold) ── */}
      <HeroCarousel />

      {/* ── Video Banner — no animation (media element) ── */}
      <VideoBanner />

      {/* ── Brand Logos ── */}
      <FadeIn style={{ width: "100%" }}>
        <BrandLogos />
      </FadeIn>

      {/* ── What We Have ── */}
      <FadeIn style={{ width: "100%" }}>
        <WhatWeHave />
      </FadeIn>

      {/* ── Featured Slider ── */}
      <FadeIn style={{ width: "100%" }}>
        <ImageSlider />
      </FadeIn>

      {/* ── Service Overview ── */}
      <FadeIn style={{ width: "100%" }}>
        <ServiceOverview />
      </FadeIn>

      {/* ── Testimonials ── */}
      <FadeIn style={{ width: "100%" }} delay={0.05}>
        <Testimonials />
      </FadeIn>

      {/* ── CTA Banner ── */}
      <section className="cta-banner">
        <FadeIn className="cta-banner__content">
          <h2 className="cta-banner__title">
            Ready to Find Your Perfect Ride?
          </h2>
          <p className="cta-banner__text">
            Browse our in-house stock or pre-order your dream motorcycle today.
          </p>
          <div className="cta-banner__buttons">
            <Link
              href="/bikes"
              className="cta-banner__btn cta-banner__btn--primary"
            >
              View Listings
            </Link>
            <Link
              href="/pre-orders"
              className="cta-banner__btn cta-banner__btn--secondary"
            >
              Pre-Order Now
            </Link>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
