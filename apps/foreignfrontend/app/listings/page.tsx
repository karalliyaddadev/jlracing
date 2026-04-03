"use client";

import { useState } from "react";
import Image from "next/image";
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

const CATEGORY_DESCS: Record<VehicleCategory, string> = {
  "2-Wheelers":
    "Explore motorcycles and scooters ready for pre-order and export to destinations worldwide.",
  Automobiles:
    "Explore cars and passenger vehicles ready for pre-order and export to destinations worldwide.",
  "Heavy Machinery":
    "Explore excavators, loaders, and industrial machinery available for international export.",
};

const PER_PAGE = 6;

export default function ListingsPage() {
  const [active, setActive] = useState<VehicleCategory>("Automobiles");
  const [page, setPage] = useState(1);

  const filtered = vehicles.filter((v) => v.category === active);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const handleCategory = (cat: VehicleCategory) => {
    setActive(cat);
    setPage(1);
  };

  return (
    <>
      {/* ── Hero ── */}
      <section className="lst-hero">
        <div className="lst-hero__bg" />
        <div className="lst-hero__overlay" />
        <div className="lst-hero__content">
          <span className="lst-hero__label">Vehicles</span>
          <h1 className="lst-hero__heading">
            Browse vehicles available for <em>pre order and export</em>
          </h1>
        </div>
      </section>

      {/* ── Full Listings ── */}
      <section className="lst-full">
        <div className="lst-full__inner">
          {/* Top row: category info + tabs */}
          <div className="lst-full__top">
            <div className="lst-full__cat-info">
              <h2 className="lst-full__cat-name">{active}</h2>
              <p className="lst-full__cat-desc">{CATEGORY_DESCS[active]}</p>
            </div>
            <div className="int-listings__tabs">
              {CATEGORIES.map((cat) => {
                const isActive = active === cat;
                const icon = CATEGORY_ICONS[cat];
                return (
                  <button
                    key={cat}
                    onClick={() => handleCategory(cat)}
                    className={`int-listings__tab${isActive ? " int-listings__tab--active" : ""}`}
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
          </div>

          {/* Cards Grid */}
          <div className="int-listings__grid">
            {paginated.map((vehicle) => (
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

          {/* Footer: pagination */}
          <div className="lst-full__footer">
            {totalPages > 1 && (
              <div className="lst-pagination">
                <button
                  className="lst-pagination__btn lst-pagination__btn--arrow"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  aria-label="Previous"
                >
                  &lt;
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (n) => (
                    <button
                      key={n}
                      onClick={() => setPage(n)}
                      className={`lst-pagination__btn${page === n ? " lst-pagination__btn--active" : ""}`}
                    >
                      {n}
                    </button>
                  ),
                )}
                <button
                  className="lst-pagination__btn lst-pagination__btn--arrow"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  aria-label="Next"
                >
                  &gt;
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
