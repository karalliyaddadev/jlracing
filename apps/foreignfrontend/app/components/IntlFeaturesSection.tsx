"use client";

import { motion } from "framer-motion";

const FEATURE_CARDS = [
  {
    title: "Wide Vehicle Selection",
    desc: "From sedans to SUVs and motorcycles, we source the best vehicles worldwide.",
    image: "/images/wide-vehicle.webp",
  },
  {
    title: "Smooth Export Process",
    desc: "We handle sourcing, shipping, and delivery with complete reliability.",
    image: "/images/smooth-export.webp",
  },
  {
    title: "Global Delivery",
    desc: "Receive your vehicle anywhere with peace of mind and full support.",
    image: "/images/global-delivery.webp",
  },
];

export default function IntlFeaturesSection() {
  return (
    <section className="int-features">
      <div className="int-features__inner">
        {/* Left copy — slides in from left */}
        <motion.div
          className="int-features__copy"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span className="int-pill">
            <span className="int-pill__plain">Global Vehicle</span>
            <span className="int-pill__gold">Export</span>
          </span>
          <h2 className="int-features__heading">
            We help you find, order, and export vehicles to any country with a{" "}
            <em>simple and reliable process.</em>
          </h2>
        </motion.div>

        {/* Right cards — stagger fade up */}
        <div className="int-features__cards">
          {FEATURE_CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              className="int-feat-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: i * 0.15, ease: "easeOut" }}
            >
              <div className="int-feat-card__img-wrap">
                <img
                  src={card.image}
                  alt={card.title}
                  className="int-feat-card__img"
                />
                <div className="int-feat-card__overlay" />
                <div className="int-feat-card__text">
                  <h3 className="int-feat-card__title">{card.title}</h3>
                  <p className="int-feat-card__desc">{card.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
