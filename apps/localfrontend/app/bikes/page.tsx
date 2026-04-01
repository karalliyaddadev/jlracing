"use client";

import { useState } from "react";
import Link from "next/link";
import { MOCK_BIKES } from "./data";

const BRANDS = [
  "Yamaha",
  "Honda",
  "Suzuki",
  "Triumph",
  "BMW",
  "Ducati",
  "Harley Davidson",
  "KTM",
];
const CC_OPTIONS = [
  "Under 150cc",
  "150–250cc",
  "250–400cc",
  "400–600cc",
  "600cc +",
];
const STATUS_OPTIONS = ["Brand New", "Used", "Reconditioned", "Pre-Order"];

function RangeSlider({
  label,
  min,
  max,
  value,
  onChange,
}: {
  label: string;
  min: number;
  max: number;
  value: [number, number];
  onChange: (v: [number, number]) => void;
}) {
  return (
    <div className="bikes-filter__group">
      <h4 className="bikes-filter__group-title">{label}</h4>
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
        <span>
          {value[1] === max
            ? `${max.toLocaleString()}`
            : value[1].toLocaleString()}
        </span>
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
  options: string[];
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
      <h4 className="bikes-filter__group-title">{title}</h4>
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

export default function BikesPage() {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000000]);
  const [yearRange, setYearRange] = useState<[number, number]>([2010, 2026]);
  const [mileageRange, setMileageRange] = useState<[number, number]>([
    0, 100000,
  ]);
  const [brands, setBrands] = useState<string[]>([]);
  const [ccOptions, setCcOptions] = useState<string[]>([]);
  const [statuses, setStatuses] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const q = search.toLowerCase();
  const filtered = MOCK_BIKES.filter((b) => {
    if (brands.length && !brands.includes(b.brand)) return false;
    if (ccOptions.length && !ccOptions.includes(b.cc)) return false;
    if (statuses.length && !statuses.includes(b.condition)) return false;
    if (q && !`${b.brand} ${b.model} ${b.year}`.toLowerCase().includes(q))
      return false;
    return true;
  });

  return (
    <section className="bikes-page">
      {filtersOpen && (
        <div
          className="po-filter-backdrop"
          onClick={() => setFiltersOpen(false)}
        />
      )}
      <div className="bikes-page__inner">
        {/* ── Header ── */}
        <div className="bikes-page__header">
          <div className="bikes-page__header-row">
            <div>
              <h1 className="bikes-page__title">Bikes</h1>
              <p className="bikes-page__subtitle">
                Discover our collection of imported bikes, from sports machines
                to everyday rides.
              </p>
            </div>
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
          <hr className="bikes-page__divider" />
        </div>

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

        <div className="bikes-page__body">
          {/* ── Sidebar Filters ── */}
          <aside className={`bikes-filter${filtersOpen ? " is-open" : ""}`}>
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
            <RangeSlider
              label="Price"
              min={0}
              max={5000000}
              value={priceRange}
              onChange={setPriceRange}
            />
            <CheckGroup
              title="Brand"
              options={BRANDS}
              selected={brands}
              onChange={setBrands}
            />
            <RangeSlider
              label="Year"
              min={2010}
              max={2026}
              value={yearRange}
              onChange={setYearRange}
            />
            <CheckGroup
              title="CC"
              options={CC_OPTIONS}
              selected={ccOptions}
              onChange={setCcOptions}
            />
            <CheckGroup
              title="Status"
              options={STATUS_OPTIONS}
              selected={statuses}
              onChange={setStatuses}
            />
            <RangeSlider
              label="Mileage"
              min={0}
              max={100000}
              value={mileageRange}
              onChange={setMileageRange}
            />
          </aside>

          {/* ── Product Grid ── */}
          <div className="bikes-grid">
            {filtered.length === 0 ? (
              <p className="bikes-grid__empty">No bikes match your filters.</p>
            ) : (
              filtered.map((bike) => (
                <Link
                  key={bike.id}
                  href={`/bikes/${bike.id}`}
                  className="bike-card"
                >
                  <div className="bike-card__image">
                    <img src={bike.image} alt={`${bike.brand} ${bike.model}`} />
                  </div>
                  <div className="bike-card__body">
                    <h3 className="bike-card__title">
                      {bike.brand} {bike.model} {bike.year}
                    </h3>
                    <p className="bike-card__meta">
                      {bike.cc}&nbsp;&nbsp;|&nbsp;&nbsp;{bike.condition}
                    </p>
                    <p className="bike-card__price">{bike.price}</p>
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
