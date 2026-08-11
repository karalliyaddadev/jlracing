"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import Pagination from "../components/Pagination";
import FadeIn from "../components/FadeIn";
import { useListingPageState } from "../hooks/useListingState";

const MAX_PRICE = 3_000_000;
const ITEMS_PER_PAGE = 8;
const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

type PreOrderImage = {
  id: number;
  url: string;
  isPrimary: boolean;
  sortOrder: number;
};
type PreOrderBike = {
  id: number;
  brand: string;
  model: string;
  year?: number | null;
  cc?: string | null;
  colour?: string | null;
  price?: number | null;
  depositRequired?: string | null;
  expectedArrival?: string | null;
  status: string;
  description?: string | null;
  images: PreOrderImage[];
};

function getStatusDisplay(status: string): "In Stock" | "Pre Order" {
  return status === "in-stock" ? "In Stock" : "Pre Order";
}

function getPrimaryImageSrc(images: PreOrderImage[]): string | null {
  if (!images?.length) return null;
  const primary = images.find((i) => i.isPrimary) ?? images[0];
  return `${BACKEND_URL}${primary.url}`;
}

const AVAILABILITY_OPTIONS = ["In Stock", "Pre Order"] as const;

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
      <h4 className="bikes-filter__group-title po-filter__label">{label}</h4>
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

export default function PreOrdersPage() {
  const [allBikes, setAllBikes] = useState<PreOrderBike[]>([]);
  const [loadingBikes, setLoadingBikes] = useState(true);
  const didMountRef = useRef(false);

  const [priceRange, setPriceRange] = useState<[number, number]>([0, MAX_PRICE]);
  const [yearRange, setYearRange] = useState<[number, number]>([2015, new Date().getFullYear()]);
  const [brands, setBrands] = useState<string[]>([]);
  const [ccFilters, setCcFilters] = useState<string[]>([]);
  const [availability, setAvailability] = useState<string[]>([]);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { currentPage, setCurrentPage } = useListingPageState(!loadingBikes);

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/pre-orders`)
      .then((r) => r.json())
      .then((data) => setAllBikes(data.data ?? []))
      .catch(() => setAllBikes([]))
      .finally(() => setLoadingBikes(false));
  }, []);

  const dynamicMax = useMemo(() => {
    const prices = allBikes.map((b) => b.price).filter((p): p is number => p != null);
    return prices.length > 0 ? Math.max(...prices) : MAX_PRICE;
  }, [allBikes]);

  const dynamicMinYear = useMemo(() => {
    const years = allBikes.map((b) => b.year).filter((y): y is number => y != null);
    return years.length > 0 ? Math.min(...years) : 2015;
  }, [allBikes]);

  const dynamicMaxYear = useMemo(() => {
    const years = allBikes.map((b) => b.year).filter((y): y is number => y != null);
    return years.length > 0 ? Math.max(...years) : new Date().getFullYear();
  }, [allBikes]);

  const availableBrands = useMemo(
    () => Array.from(new Set(allBikes.map((b) => b.brand).filter(Boolean))).sort(),
    [allBikes],
  );

  const availableCCValues = useMemo(
    () =>
      Array.from(
        new Set(allBikes.map((b) => b.cc).filter((cc): cc is string => !!cc)),
      ).sort(),
    [allBikes],
  );

  useEffect(() => { setPriceRange([0, dynamicMax]); }, [dynamicMax]);
  useEffect(() => { setYearRange([dynamicMinYear, dynamicMaxYear]); }, [dynamicMinYear, dynamicMaxYear]);
  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }
    setCurrentPage(1);
  }, [search, availability, brands, ccFilters]);

  const q = search.toLowerCase();
  const priceFiltered = priceRange[0] > 0 || priceRange[1] < dynamicMax;
  const yearFiltered = yearRange[0] > dynamicMinYear || yearRange[1] < dynamicMaxYear;

  const filtered = allBikes.filter((b) => {
    if (priceFiltered) {
      const price = b.price ?? 0;
      if (price < priceRange[0] || price > priceRange[1]) return false;
    }
    if (yearFiltered && b.year != null) {
      if (b.year < yearRange[0] || b.year > yearRange[1]) return false;
    }
    if (brands.length && !brands.includes(b.brand)) return false;
    if (ccFilters.length && (!b.cc || !ccFilters.includes(b.cc))) return false;
    const displayStatus = getStatusDisplay(b.status);
    if (availability.length && !availability.includes(displayStatus)) return false;
    if (q && !`${b.brand} ${b.model} ${b.year ?? ""}`.toLowerCase().includes(q)) return false;
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
        <div className="po-filter-backdrop" onClick={() => setFiltersOpen(false)} />
      )}

      <div className="po-page__inner">
        {/* ── Page Header ── */}
        <FadeIn className="po-page__header">
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
        </FadeIn>

        <hr className="po-page__divider" />

        {/* Mobile filter toggle */}
        <button className="po-filter-toggle" onClick={() => setFiltersOpen(true)}>
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
              label="PRICE"
              min={0}
              max={dynamicMax}
              value={priceRange}
              onChange={setPriceRange}
            />

            {availableBrands.length > 0 && (
              <CheckGroup
                title="BRAND"
                options={availableBrands}
                selected={brands}
                onChange={setBrands}
              />
            )}

            <RangeSlider
              label="YEAR"
              min={dynamicMinYear}
              max={dynamicMaxYear}
              value={yearRange}
              onChange={setYearRange}
            />

            {availableCCValues.length > 0 && (
              <CheckGroup
                title="CC"
                options={availableCCValues}
                selected={ccFilters}
                onChange={setCcFilters}
              />
            )}

            <CheckGroup
              title="AVAILABILITY"
              options={[...AVAILABILITY_OPTIONS]}
              selected={availability}
              onChange={setAvailability}
            />
          </aside>

          {/* ── Product Grid ── */}
          <div className="po-grid">
            {loadingBikes ? (
              <p className="po-grid__empty">Loading pre-orders…</p>
            ) : filtered.length === 0 ? (
              <p className="po-grid__empty">No bikes match your filters.</p>
            ) : (
              paginated.map((bike, i) => {
                const imgSrc = getPrimaryImageSrc(bike.images);
                const displayStatus = getStatusDisplay(bike.status);
                return (
                  <FadeIn key={`${currentPage}-${bike.id}`} delay={i * 0.07}>
                    <Link href={`/pre-orders/${bike.id}`} className="po-card">
                      <div className="po-card__image">
                        {imgSrc ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={imgSrc}
                            alt={`${bike.brand} ${bike.model}`}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          />
                        ) : (
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
                        )}
                      </div>
                      <div className="po-card__body">
                        <span
                          className={`po-card__badge${
                            displayStatus === "Pre Order" ? " po-card__badge--preorder" : ""
                          }`}
                        >
                          {displayStatus}
                        </span>
                        <h3 className="po-card__title">
                          {bike.brand} {bike.model} {bike.year}
                        </h3>
                        <div className="po-card__footer">
                          <span className="po-card__price">
                            Rs.&nbsp;
                            {bike.price != null
                              ? bike.price.toLocaleString("en-LK")
                              : "—"}
                            .00
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
                  </FadeIn>
                );
              })
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
