"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

interface SliderItem {
  id: number;
  image: string;
  brand: string;
  model: string;
  year: string;
  meta: string;
  price: string;
}

const ITEMS: SliderItem[] = [
  {
    id: 1,
    image: "/images/bike-1.jpg",
    brand: "Kawasaki",
    model: "Ninja ZX-10R",
    year: "2020",
    meta: "998cc | Used | Japanese",
    price: "LKR 4,850,000",
  },
  {
    id: 2,
    image: "/images/bike-2.jpg",
    brand: "Yamaha",
    model: "MT-09",
    year: "2021",
    meta: "889cc | Used | Japanese",
    price: "LKR 4,200,000",
  },
  {
    id: 3,
    image: "/images/bike-3.jpg",
    brand: "Honda",
    model: "CBR 600RR",
    year: "2019",
    meta: "600cc | Used | Japanese",
    price: "LKR 3,600,000",
  },
  {
    id: 4,
    image: "/images/bike-4.jpg",
    brand: "Suzuki",
    model: "GSX-R1000",
    year: "2020",
    meta: "999cc | Used | Japanese",
    price: "LKR 4,700,000",
  },
  {
    id: 5,
    image: "/images/bike-5.jpg",
    brand: "Ducati",
    model: "Panigale V4",
    year: "2021",
    meta: "1103cc | Used | European",
    price: "LKR 9,800,000",
  },
  {
    id: 6,
    image: "/images/bike-6.jpg",
    brand: "BMW",
    model: "S1000RR",
    year: "2022",
    meta: "999cc | Used | European",
    price: "LKR 8,900,000",
  },
];

const CARD_STEP = 324;
const MAX_OFFSET = (ITEMS.length - 3) * CARD_STEP;

export default function ImageSlider() {
  const [offset, setOffset] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const offsetRef = useRef(0);

  const scrollLeft = () =>
    setOffset((o) => {
      const next = Math.max(o - CARD_STEP, 0);
      offsetRef.current = next;
      return next;
    });
  const scrollRight = () =>
    setOffset((o) => {
      const next = o >= MAX_OFFSET ? 0 : Math.min(o + CARD_STEP, MAX_OFFSET);
      offsetRef.current = next;
      return next;
    });

  useEffect(() => {
    const timer = setInterval(() => {
      setOffset((o) => {
        const next = o >= MAX_OFFSET ? 0 : o + CARD_STEP;
        offsetRef.current = next;
        return next;
      });
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      diff > 0 ? scrollRight() : scrollLeft();
    }
    touchStartX.current = null;
  };

  return (
    <section className="slider-section">
      <div className="slider-section__header">
        <div>
          <span className="slider-section__label">FEATURED</span>
          <h2 className="slider-section__title">Latest Arrivals</h2>
        </div>
      </div>

      <div
        className="slider-section__viewport"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="slider-section__track"
          style={{ transform: `translateX(-${offset}px)` }}
        >
          {ITEMS.map((item) => (
            <div key={item.id} className="slider-card">
              <div className="slider-card__image">
                <div
                  className="slider-card__bg"
                  style={{ backgroundImage: `url(${item.image})` }}
                />
              </div>
              <div className="slider-card__body">
                <p className="slider-card__title">
                  {item.brand} {item.model} {item.year}
                </p>
                <p className="slider-card__meta-text">{item.meta}</p>
                <span className="slider-card__price">{item.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="slider-section__cta">
        <Link href="/bikes" className="slider-section__cta-btn">
          View All Bikes
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
