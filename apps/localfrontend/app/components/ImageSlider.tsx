"use client";

import { useState } from "react";

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

// Card width (300px) + gap (24px = 1.5rem)
const CARD_STEP = 324;
const MAX_OFFSET = (ITEMS.length - 3) * CARD_STEP; // show ~3 at a time

export default function ImageSlider() {
  const [offset, setOffset] = useState(0);

  const scrollLeft = () => setOffset((o) => Math.max(o - CARD_STEP, 0));
  const scrollRight = () =>
    setOffset((o) => Math.min(o + CARD_STEP, MAX_OFFSET));

  return (
    <section className="slider-section">
      <div className="slider-section__header">
        <div>
          <span className="slider-section__label">FEATURED</span>
          <h2 className="slider-section__title">Latest Arrivals</h2>
        </div>
        <div className="slider-section__arrows">
          <button
            type="button"
            className="slider-section__arrow"
            onClick={scrollLeft}
            aria-label="Scroll left"
            disabled={offset === 0}
          >
            <svg
              width="20"
              height="20"
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
            className="slider-section__arrow"
            onClick={scrollRight}
            aria-label="Scroll right"
            disabled={offset >= MAX_OFFSET}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Viewport window — clips the sliding track */}
      <div className="slider-section__viewport">
        {/* Track slides via CSS transform — no scrollBy, no snap interference */}
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
                <div className="slider-card__info-row">
                  <div className="slider-card__info-col">
                    <span className="slider-card__label">Brand</span>
                    <span className="slider-card__value">{item.brand}</span>
                  </div>
                  <div className="slider-card__info-col">
                    <span className="slider-card__label">Model</span>
                    <span className="slider-card__value">{item.model}</span>
                  </div>
                  <div className="slider-card__info-col">
                    <span className="slider-card__label">Year</span>
                    <span className="slider-card__value">{item.year}</span>
                  </div>
                </div>
                <p className="slider-card__meta-text">{item.meta}</p>
                <span className="slider-card__price">{item.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
