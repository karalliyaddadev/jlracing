"use client";

import { useState } from "react";

interface SliderItem {
  id: number;
  image: string;
  title: string;
  category: string;
  price: string;
}

const ITEMS: SliderItem[] = [
  {
    id: 1,
    image: "/images/bike-1.jpg",
    title: "Kawasaki Ninja ZX-10R",
    category: "Sport",
    price: "Contact Us",
  },
  {
    id: 2,
    image: "/images/bike-2.jpg",
    title: "Yamaha MT-09",
    category: "Naked",
    price: "Contact Us",
  },
  {
    id: 3,
    image: "/images/bike-3.jpg",
    title: "Honda CBR 600RR",
    category: "Sport",
    price: "Contact Us",
  },
  {
    id: 4,
    image: "/images/bike-4.jpg",
    title: "Suzuki GSX-R1000",
    category: "Sport",
    price: "Contact Us",
  },
  {
    id: 5,
    image: "/images/bike-5.jpg",
    title: "Ducati Panigale V4",
    category: "Superbike",
    price: "Contact Us",
  },
  {
    id: 6,
    image: "/images/bike-6.jpg",
    title: "BMW S1000RR",
    category: "Sport",
    price: "Contact Us",
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
                <span className="slider-card__category">{item.category}</span>
              </div>
              <div className="slider-card__body">
                <h3 className="slider-card__title">{item.title}</h3>
                <span className="slider-card__price">{item.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
