"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const SLIDES = [
  {
    id: 1,
    image: "/images/hero-1.jpg",
    bg: "#3a0a0a",
    subtitle: "NEW ARRIVAL",
    title: "Unleash the\nBeast Within",
    description:
      "Discover our latest collection of high-performance Japanese imports. Built for speed, designed for perfection.",
    cta: "Explore Now",
    ctaLink: "/listings",
  },
  {
    id: 2,
    image: "/images/hero-2.jpg",
    bg: "#0a2a0a",
    subtitle: "PRE-ORDER",
    title: "Reserve Your\nDream Ride",
    description:
      "Get early access to upcoming models. Secure your spot before they hit the showroom.",
    cta: "Pre-Order",
    ctaLink: "/pre-listings",
  },
  {
    id: 3,
    image: "/images/hero-3.jpg",
    bg: "#0a0a3a",
    subtitle: "IN STOCK",
    title: "Premium\nIn-House Stock",
    description:
      "Hand-picked motorcycles ready for immediate delivery. Every unit inspected and certified.",
    cta: "View Stock",
    ctaLink: "/listings",
  },
];

const TOTAL = SLIDES.length;

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % TOTAL);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goPrev = () => setCurrent((c) => (c - 1 + TOTAL) % TOTAL);
  const goNext = () => setCurrent((c) => (c + 1) % TOTAL);

  const slide = SLIDES[current];

  return (
    <section className="hero" style={{ backgroundColor: slide.bg }}>
      {/* Image layers — pointer-events: none so they NEVER block clicks */}
      {SLIDES.map((s, i) => (
        <div
          key={s.id}
          className={`hero__slide${i === current ? " hero__slide--active" : ""}`}
          style={{ backgroundImage: `url(${s.image})` }}
        />
      ))}

      {/* Single overlay — also pointer-events: none */}
      <div className="hero__overlay" />

      {/* Content — key={current} forces remount → CSS animations replay on every slide */}
      <div className="hero__content" key={current}>
        <span className="hero__subtitle">{slide.subtitle}</span>
        <h1 className="hero__title">
          {slide.title.split("\n").map((line, i, arr) => (
            <span key={i}>
              {line}
              {i < arr.length - 1 && <br />}
            </span>
          ))}
        </h1>
        <p className="hero__description">{slide.description}</p>
        <Link href={slide.ctaLink} className="hero__cta">
          {slide.cta}
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* Arrows */}
      <button
        type="button"
        className="hero__arrow hero__arrow--prev"
        onClick={goPrev}
        aria-label="Previous slide"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      <button
        type="button"
        className="hero__arrow hero__arrow--next"
        onClick={goNext}
        aria-label="Next slide"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      {/* Dots */}
      <div className="hero__dots">
        {SLIDES.map((_, i) => (
          <button
            type="button"
            key={i}
            className={`hero__dot${i === current ? " hero__dot--active" : ""}`}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
          >
            <span className="hero__dot-fill" />
          </button>
        ))}
      </div>

      {/* Counter */}
      <div className="hero__counter">
        <span className="hero__counter-current">
          {String(current + 1).padStart(2, "0")}
        </span>
        <span className="hero__counter-sep">/</span>
        <span className="hero__counter-total">
          {String(TOTAL).padStart(2, "0")}
        </span>
      </div>
    </section>
  );
}
