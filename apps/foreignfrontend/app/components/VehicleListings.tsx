"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { vehicles, VehicleCategory } from "../data/vehicles";

const CATEGORIES: VehicleCategory[] = [
  "2-Wheelers",
  "Automobiles",
  "Heavy Machinery",
];

const CATEGORY_ICONS: Record<
  VehicleCategory,
  { default: string; active: string }
> = {
  "2-Wheelers": {
    default: "/icons/2-wheelers-b.png",
    active: "/icons/2-wheelers.png",
  },
  Automobiles: {
    default: "/icons/automobiles-b.png",
    active: "/icons/automobiles.png",
  },
  "Heavy Machinery": {
    default: "/icons/heavy-machinery-b.png",
    active: "/icons/heavy-machinery.png",
  },
};

const DISPLAY_LIMIT = 3;

export default function VehicleListings() {
  const [active, setActive] = useState<VehicleCategory>("Automobiles");

  const filtered = vehicles
    .filter((v) => v.category === active)
    .slice(0, DISPLAY_LIMIT);

  return (
    <section className="int-listings">
      <div className="int-listings__inner">
        {/* Header */}
        <div className="int-listings__header">
          <span className="int-pill">
            <span className="int-pill__plain">Available</span>
            <span className="int-pill__gold">Vehicles</span>
          </span>
          <h2 className="int-listings__heading">
            Browse a range of vehicles ready for <em>pre-order and export.</em>
          </h2>
        </div>

        {/* Filter tabs */}
        <div className="int-listings__tabs">
          {CATEGORIES.map((cat) => {
            const isActive = active === cat;
            const icon = CATEGORY_ICONS[cat];
            return (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`int-listings__tab ${isActive ? "int-listings__tab--active" : ""}`}
              >
                <Image
                  src={isActive ? icon.active : icon.default}
                  alt={cat}
                  width={20}
                  height={20}
                  className="int-listings__tab-icon"
                />
                {cat}
              </button>
            );
          })}
        </div>

        {/* Cards grid */}
        <div className="int-listings__grid">
          {filtered.map((vehicle) => (
            <div key={vehicle.id} className="int-veh-card">
              <div className="int-veh-card__img-wrap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={vehicle.image}
                  alt={`${vehicle.name} ${vehicle.year}`}
                  className="int-veh-card__img"
                />
              </div>
              <div className="int-veh-card__body">
                <h3 className="int-veh-card__name">
                  {vehicle.name}&nbsp;&nbsp;{vehicle.year}
                </h3>
                <p className="int-veh-card__price">{vehicle.price}</p>
                <a
                  href={vehicle.pdfUrl ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="int-veh-card__cta"
                >
                  Explore More &gt;
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Footer row */}
        <div className="int-listings__footer">
          <p className="int-listings__note">
            <strong>Note :</strong>&nbsp; Explore more = Opens pdf in new tab
          </p>
          <Link href="/listings" className="int-btn int-btn--primary">
            View All Listings
          </Link>
        </div>
      </div>
    </section>
  );
}
