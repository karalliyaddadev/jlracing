"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const SLIDES = [
  { id: 1, image: "/images/hero-1.jpg" },
  { id: 2, image: "/images/hero-2.jpg" },
  { id: 3, image: "/images/hero-3.jpg" },
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

  return (
    <section className="hero">
      {/* Sliding image layers */}
      {SLIDES.map((s, i) => (
        <div
          key={s.id}
          className="hero__slide"
          style={{
            backgroundImage: `url(${s.image})`,
            transform: `translateX(${(i - current) * 100}%)`,
          }}
        />
      ))}

      {/* Overlay */}
      <div className="hero__overlay" />

      {/* CTA only */}
      <div className="hero__content">
        <Link href="/bikes" className="hero__cta">
          View Stock
        </Link>
      </div>
    </section>
  );
}
