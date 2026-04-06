"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { PRE_ORDER_BIKES } from "./data";
import Pagination from "../components/Pagination";

const MAX_PRICE = 3_000_000;

const ITEMS_PER_PAGE = 6;

const AVAILABILITY_OPTIONS = ["In Stock", "Pre Order"] as const;

function RangeSlider({
  min,
  max,
  value,
  onChange,
}: {
  min: number;
  max: number;
  value: [number, number];
  onChange: (v: [number, number]) => void;
}) {
  return (
    <div className="bikes-filter__group">
      <h4 className="bikes-filter__group-title po-filter__label">PRICE</h4>
      <div className="bikes-filter__range-track">
        <input
          type="range"
          min={min}
          max={max}
          value={value[0]}
          onChange={(e) => onChange([Number(e.target.value), value[1]])}
          className="bikes-filter__range bikes-filter__range--min"
        />
        <input
          type="range"
          min={min}
          max={max}
          value={value[1]}
          onChange={(e) => onChange([value[0], Number(e.target.value)])}
          className="bikes-filter__range bikes-filter__range--max"
        />
      </div>
      <div className="bikes-filter__range-labels">
        <span>{value[0].toLocaleString()}</span>
        <span>{value[1].toLocaleString()}</span>
      </div>
      <hr className="bikes-filter__divider" />
    </div>
  );
}

export default function PreOrdersPage() {
  const [priceRange, setPriceRange] = useState<[number, number]>([
    0,
    MAX_PRICE,
  ]);
  const [availability, setAvailability] = useState<string[]>([]);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, priceRange, availability]);

  const toggleAvailability = (opt: string) => {
    setAvailability((prev) =>
      prev.includes(opt) ? prev.filter((s) => s !== opt) : [...prev, opt],
    );
  };

  const q = search.toLowerCase();
  const filtered = PRE_ORDER_BIKES.filter((b) => {
    if (b.price < priceRange[0] || b.price > priceRange[1]) return false;
    if (availability.length && !availability.includes(b.status)) return false;
    if (q && !`${b.brand} ${b.model} ${b.year}`.toLowerCase().includes(q))
      return false;
    return true;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  return (
    <section className="po-page">
      {/* Mobile filter backdrop */}
      {filtersOpen && (
        <div
          className="po-filter-backdrop"
          onClick={() => setFiltersOpen(false)}
        />
      )}

      <div className="po-page__inner">
        {/* ── Page Header ── */}
        <div className="po-page__header">
          <div className="po-page__header-left">
            <h1 className="po-page__title">Pre Orders</h1>
            <p className="po-page__subtitle">
              Upcoming arrivals and pre-order opportunities. Reserve your dream
              bike before it hits the showroom floor.
            </p>
          </div>

          <div className="po-store-loc">
            <div className="page-searchbar">
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Search bikes…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="page-searchbar__input"
              />
              {search && (
                <button
                  className="page-searchbar__clear"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </div>
          </div>
        </div>

        <hr className="po-page__divider" />

        {/* Mobile filter toggle */}
        <button
          className="po-filter-toggle"
          onClick={() => setFiltersOpen(true)}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M22 3H2l8 9.46V19l4 2V12.46L22 3z" />
          </svg>
          Filters
        </button>

        <div className="po-page__body">
          {/* ── Sidebar Filters ── */}
          <aside className={`po-filter${filtersOpen ? " is-open" : ""}`}>
            {/* Close button – mobile only */}
            <div className="po-filter__mobile-header">
              <span className="po-filter__mobile-title">Filters</span>
              <button
                className="po-filter__close"
                onClick={() => setFiltersOpen(false)}
                aria-label="Close filters"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Price range */}
            <RangeSlider
              min={0}
              max={MAX_PRICE}
              value={priceRange}
              onChange={setPriceRange}
            />

            {/* Availability */}
            <div className="bikes-filter__group">
              <h4 className="bikes-filter__group-title po-filter__label">
                AVAILABILITY
              </h4>
              {AVAILABILITY_OPTIONS.map((opt) => (
                <label key={opt} className="bikes-filter__checkbox-label">
                  <input
                    type="checkbox"
                    checked={availability.includes(opt)}
                    onChange={() => toggleAvailability(opt)}
                    className="bikes-filter__checkbox"
                  />
                  {opt.toUpperCase()}
                </label>
              ))}
            </div>
          </aside>

          {/* ── Product Grid ── */}
          <div className="po-grid">
            {filtered.length === 0 ? (
              <p className="po-grid__empty">No bikes match your filters.</p>
            ) : (
              paginated.map((bike) => (
                <Link
                  key={bike.id}
                  href={`/pre-orders/${bike.id}`}
                  className="po-card"
                >
                  <div className="po-card__image">
                    <div className="po-card__placeholder">
                      <svg
                        width="56"
                        height="56"
                        viewBox="0 0 640 512"
                        fill="currentColor"
                      >
                        <path d="M280 32a80 80 0 1 1 0 160 80 80 0 1 1 0-160zM128 0c-44.2 0-80 35.8-80 80v16H32C14.3 96 0 110.3 0 128s14.3 32 32 32H48v16c0 17.7 14.3 32 32 32H96c17.7 0 32-14.3 32-32V160h5.4l34.9 104.7A96 96 0 1 0 344 352h48a96 96 0 1 0 192 0 96 96 0 1 0-183.2-40H336A96 96 0 0 0 193 192H96V80c0-44.2-35.8-80-80-80H128zM488 352a48 48 0 1 1-96 0 48 48 0 1 1 96 0zm-240 48a48 48 0 1 1 0-96 48 48 0 1 1 0 96z" />
                      </svg>
                    </div>
                    <span
                      className={`po-card__badge${
                        bike.status === "Pre Order"
                          ? " po-card__badge--preorder"
                          : ""
                      }`}
                    >
                      {bike.status}
                    </span>
                  </div>
                  <div className="po-card__body">
                    <h3 className="po-card__title">
                      {bike.brand} {bike.model} {bike.year}
                    </h3>
                    <div className="po-card__footer">
                      <span className="po-card__price">
                        Rs.&nbsp;{bike.price.toLocaleString("en-LK")}.00
                      </span>
                      <button
                        className="po-card__cart"
                        aria-label="Enquire about this bike"
                      >
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                          <line x1="3" y1="6" x2="21" y2="6" />
                          <path d="M16 10a4 4 0 01-8 0" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </section>
  );
}
