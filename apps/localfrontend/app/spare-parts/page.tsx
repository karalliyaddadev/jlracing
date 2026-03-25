"use client";

import { useState } from "react";
import Link from "next/link";
import {
  SPARE_PARTS,
  PART_CATEGORIES,
  PART_BRANDS,
  MAX_PART_PRICE,
} from "./data";

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

function CheckGroup({
  title,
  options,
  selected,
  onChange,
}: {
  title: string;
  options: readonly string[];
  selected: string[];
  onChange: (v: string[]) => void;
}) {
  const toggle = (opt: string) =>
    onChange(
      selected.includes(opt)
        ? selected.filter((s) => s !== opt)
        : [...selected, opt],
    );
  return (
    <div className="bikes-filter__group">
      <h4 className="bikes-filter__group-title po-filter__label">{title}</h4>
      {options.map((opt) => (
        <label key={opt} className="bikes-filter__checkbox-label">
          <input
            type="checkbox"
            checked={selected.includes(opt)}
            onChange={() => toggle(opt)}
            className="bikes-filter__checkbox"
          />
          {opt}
        </label>
      ))}
      <hr className="bikes-filter__divider" />
    </div>
  );
}

const STATUS_OPTIONS = ["In Stock", "Low Stock", "Pre Order"] as const;

export default function SparePartsPage() {
  const [priceRange, setPriceRange] = useState<[number, number]>([
    0,
    MAX_PART_PRICE,
  ]);
  const [categories, setCategories] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [statuses, setStatuses] = useState<string[]>([]);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [search, setSearch] = useState("");

  const q = search.toLowerCase();
  const filtered = SPARE_PARTS.filter((p) => {
    if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
    if (categories.length && !categories.includes(p.category)) return false;
    if (brands.length && !brands.includes(p.brand)) return false;
    if (statuses.length && !statuses.includes(p.status)) return false;
    if (
      q &&
      !`${p.name} ${p.brand} ${p.category} ${p.compatibility}`
        .toLowerCase()
        .includes(q)
    )
      return false;
    return true;
  });

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
            <h1 className="po-page__title">Spare Parts</h1>
            <p className="po-page__subtitle">
              Genuine and aftermarket parts for a wide range of motorcycle
              brands. Quality parts, delivered fast.
            </p>
          </div>

          {/* Search bar */}
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
                placeholder="Search parts…"
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
              max={MAX_PART_PRICE}
              value={priceRange}
              onChange={setPriceRange}
            />

            {/* Category */}
            <CheckGroup
              title="CATEGORY"
              options={PART_CATEGORIES}
              selected={categories}
              onChange={setCategories}
            />

            {/* Brand */}
            <CheckGroup
              title="BRAND"
              options={PART_BRANDS}
              selected={brands}
              onChange={setBrands}
            />

            {/* Availability */}
            <CheckGroup
              title="AVAILABILITY"
              options={STATUS_OPTIONS}
              selected={statuses}
              onChange={setStatuses}
            />
          </aside>

          {/* ── Product Grid ── */}
          <div className="po-grid">
            {filtered.length === 0 ? (
              <p className="po-grid__empty">No parts match your filters.</p>
            ) : (
              filtered.map((part) => (
                <Link
                  key={part.id}
                  href={`/spare-parts/${part.id}`}
                  className="po-card"
                >
                  <div className="po-card__image">
                    <img
                      src={part.image}
                      alt={part.name}
                      className="po-card__img"
                    />
                    <span
                      className={`po-card__badge${
                        part.status === "Pre Order"
                          ? " po-card__badge--preorder"
                          : part.status === "Low Stock"
                            ? " po-card__badge--low"
                            : ""
                      }`}
                    >
                      {part.status}
                    </span>
                  </div>
                  <div className="po-card__body">
                    <span className="sp-card__category">{part.category}</span>
                    <h3 className="po-card__title">{part.name}</h3>
                    <p className="sp-card__brand">{part.brand}</p>
                    <div className="po-card__footer">
                      <span className="po-card__price">
                        Rs.&nbsp;{part.price.toLocaleString("en-LK")}.00
                      </span>
                      <button
                        className="po-card__cart"
                        aria-label="Enquire about this part"
                      >
                        <svg
                          width="14"
                          height="14"
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
      </div>
    </section>
  );
}
