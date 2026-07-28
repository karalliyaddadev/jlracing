"use client";

import { useState, useEffect, Fragment } from "react";
import Link from "next/link";
import Image from "next/image";

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
    fetch(`${CMS_API_URL}/api/hero/active?site=FOREIGN`)
      .then((res) => (res.ok ? res.json() : []))
      .then((data: HeroSlide[]) => {
        if (data.length > 0) setSlides(data);
      })
      .catch(() => {
        /* keep slides empty, nothing to show */
      });
  }, []);

  useEffect(() => {
    if (slides.length < 2) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  if (slides.length === 0) {
    return (
      <section className="hero">
        <div className="hero__overlay" />
        <div className="hero__content">
          <Link href="/listings" className="hero__cta">
            View Listings
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="hero">
      {/* Sliding image layers */}
      {slides.map((s, i) => (
        <Fragment key={s.id}>
          <Image
            src={`${CMS_API_URL}${s.desktopImage}`}
            alt=""
            fill
            priority={i === current}
            sizes="100vw"
            className="hero__slide hero__slide--desktop"
            style={{
              objectFit: "cover",
              transform: `translateX(${(i - current) * 100}%)`,
            }}
          />
          <Image
            src={`${CMS_API_URL}${s.mobileImage}`}
            alt=""
            fill
            priority={i === current}
            sizes="100vw"
            className="hero__slide hero__slide--mobile"
            style={{
              objectFit: "cover",
              transform: `translateX(${(i - current) * 100}%)`,
            }}
          />
        </Fragment>
      ))}

      {/* Overlay */}
      <div className="hero__overlay" />

      {/* CTA — uses the active slide's button link */}
      <div className="hero__content">
        <Link
          href={slides[current]?.buttonLink ?? "/listings"}
          className="hero__cta"
        >
          View Listings
        </Link>
      </div>
    </section>
  );
}
