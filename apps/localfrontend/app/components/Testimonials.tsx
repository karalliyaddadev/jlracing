"use client";

import { useState } from "react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  text: string;
  rating: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Kasun Perera",
    role: "Motorcycle Enthusiast",
    text: "JL Racing delivered my dream bike in perfect condition. The team was professional from start to finish. Highly recommend to anyone looking for genuine Japanese imports!",
    rating: 5,
  },
  {
    id: 2,
    name: "Dinesh Fernando",
    role: "Professional Rider",
    text: "As a professional rider, I need bikes I can trust. JL Racing's inspection process is top-notch. Every unit they sell is certified and road-ready. Outstanding service!",
    rating: 5,
  },
  {
    id: 3,
    name: "Amith Jayawardena",
    role: "Collector",
    text: "I've purchased three bikes through JL Racing and every experience has been exceptional. Their sourcing network gets access to rare models you won't find anywhere else in Sri Lanka.",
    rating: 5,
  },
  {
    id: 4,
    name: "Nuwan Silva",
    role: "First-time Buyer",
    text: "Best motorcycle buying experience I've ever had. The staff walked me through everything and helped me pick the perfect ride for my needs and budget. Great after-sales too!",
    rating: 5,
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);

  return (
    <section className="testimonials">
      <div className="testimonials__container">
        <div className="testimonials__header">
          <span className="testimonials__label">TESTIMONIALS</span>
          <h2 className="testimonials__title">What Our Customers Say</h2>
        </div>

        <div className="testimonials__grid">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.id}
              className={`testimonial-card ${i === active ? "testimonial-card--active" : ""}`}
              onMouseEnter={() => setActive(i)}
            >
              <div className="testimonial-card__stars">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <svg
                    key={j}
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <p className="testimonial-card__text">&ldquo;{t.text}&rdquo;</p>
              <div className="testimonial-card__author">
                <div className="testimonial-card__avatar">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="testimonial-card__name">{t.name}</div>
                  <div className="testimonial-card__role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
