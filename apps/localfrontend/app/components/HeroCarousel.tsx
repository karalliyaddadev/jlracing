"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const CMS_API_URL =
  process.env.NEXT_PUBLIC_CMS_API_URL || "http://localhost:5001";

interface HeroSlide {
  id: number;
  desktopImage: string;
  mobileImage: string;
  buttonLink: string;
  order: number;
}

export default function HeroCarousel() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    fetch(`${CMS_API_URL}/api/hero/active?site=LOCAL`)
      .then((res) => res.json())
      .then((data: HeroSlide[]) => {
        if (Array.isArray(data) && data.length > 0) setSlides(data);
      })
      .catch(() => {
        // silently fall back to empty — page remains visible without slides
      });
  }, []);

  useEffect(() => {
    if (slides.length < 2) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  if (slides.length === 0) return null;

  return (
    <section className="hero">
      {/* Sliding image layers */}
      {slides.map((s, i) => (
        <div
          key={s.id}
          className="hero__slide"
          style={{
            backgroundImage: `url(${CMS_API_URL}${s.desktopImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
            transform: `translateX(${(i - current) * 100}%)`,
          }}
        />
      ))}

      {/* Overlay */}
      <div className="hero__overlay" />

      {/* CTA */}
      <div className="hero__content">
        <Link href={slides[current].buttonLink} className="hero__cta">
          View Stock
        </Link>
      </div>
    </section>
  );
}
