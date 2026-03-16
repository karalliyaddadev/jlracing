"use client";

import { useState } from "react";

interface PortalCard {
  key: string;
  title: string;
  features: string[];
  signInUrl: string;
  available: boolean;
}

const cards: PortalCard[] = [
  {
    key: "pos",
    title: "POS",
    features: ["Bike Inventory", "Spare Parts"],
    signInUrl: "/pos/sign-in",
    available: true,
  },
  {
    key: "local",
    title: "Local Website",
    features: [
      "Home Page- Hero Banner",
      "Home Page- Video (16:9)",
      "Pre-Listing",
      "Blog",
      "Gallery Videos",
    ],
    signInUrl: "/local/sign-in",
    available: true,
  },
  {
    key: "international",
    title: "International Website",
    features: [
      "Home Page- Downloadable pdf",
      "Home Page- Video (16:9)",
      "Bike Inventory",
      "Spare Parts",
    ],
    signInUrl: "/international/sign-in",
    available: true,
  },
  {
    key: "employee",
    title: "Employee Management",
    features: ["Will be Available soon"],
    signInUrl: "#",
    available: false,
  },
];

export default function Page() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <main className="admin">
      <div className="admin__bg" />
      <div className="admin__overlay" />

      <div className="admin__container">
        <header className="admin__header">
          <div className="admin__logo">JL</div>
          <h1 className="admin__title">Admin Portal</h1>
          <p className="admin__subtitle">管理ポータル</p>
        </header>

        <div className="admin__grid">
          {cards.map((card) => (
            <div
              key={card.key}
              className={`admin__card ${
                hoveredCard === card.key ? "is-hovered" : ""
              } ${!card.available ? "is-disabled" : ""}`}
              onMouseEnter={() => setHoveredCard(card.key)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <h2 className="admin__card-title">{card.title}</h2>

              <ul className="admin__card-features">
                {card.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>

              <div className="admin__card-footer">
                {card.available ? (
                  <a href={card.signInUrl} className="admin__card-btn">
                    Sign In
                  </a>
                ) : (
                  <span className="admin__card-btn admin__card-btn--disabled">
                    Sign In
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
