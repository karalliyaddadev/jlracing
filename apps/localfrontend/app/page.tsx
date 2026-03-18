import HeroCarousel from "./components/HeroCarousel";
import ImageSlider from "./components/ImageSlider";
import VideoBanner from "./components/VideoBanner";
import BrandLogos from "./components/BrandLogos";
import Testimonials from "./components/Testimonials";
import ServiceOverview from "./components/ServiceOverview";
import ListingOverview from "./components/ListingOverview";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      {/* ── Hero Carousel ── */}
      <HeroCarousel />

      {/* ── Video / Credibility Banner ── */}
      <VideoBanner />

      {/* ── Brand Logos ── */}
      <BrandLogos />

      {/* ── Testimonials ── */}
      <Testimonials />

      {/* ── Service Overview ── */}
      <ServiceOverview />

      {/* ── Featured Slider ── */}
      <ImageSlider />

      {/* ── Listing Overview ── */}
      <ListingOverview />

      {/* ── CTA Banner ── */}
      <section className="cta-banner">
        <div className="cta-banner__content">
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
        </div>
      </section>
    </>
  );
}
