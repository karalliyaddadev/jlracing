"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Pagination from "../components/Pagination";
import FadeIn from "../components/FadeIn";
import { useListingPageState } from "../hooks/useListingState";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";
const ITEMS_PER_PAGE = 8;

interface ProductImage {
  id: number;
  url: string;
  isPrimary: boolean;
  sortOrder: number;
}

interface PublicProduct {
  id: number;
  displayId: string;
  name: string;
  brand: { id: number; name: string } | null;
  category: { id: number; name: string } | null;
  quantity: number;
  lowStockThreshold: number | null;
  sellingPrice: number | null;
  description: string | null;
  images: ProductImage[];
}

function getStatus(
  quantity: number,
  lowStockThreshold: number | null,
): "In Stock" | "Low Stock" | "Out of Stock" {
  if (quantity <= 0) return "Out of Stock";
  if (lowStockThreshold != null && quantity <= lowStockThreshold)
    return "Low Stock";
  return "In Stock";
}

function getImageSrc(images: ProductImage[]): string {
  if (!images || images.length === 0) return "/images/placeholder.png";
  const primary = images.find((img) => img.isPrimary) ?? images[0];
  return `${BACKEND_URL}${primary.url}`;
}

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

const STATUS_OPTIONS = ["In Stock", "Low Stock", "Out of Stock"] as const;

export default function SparePartsPage() {
  const [products, setProducts] = useState<PublicProduct[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter state
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 0]);
  const [priceFiltered, setPriceFiltered] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [statuses, setStatuses] = useState<string[]>([]);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { currentPage, setCurrentPage } = useListingPageState(!loading);

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/bikes/products?limit=200`)
      .then((r) => r.json())
      .then((data) => {
        const list: PublicProduct[] = data.products ?? [];
        setProducts(list);
        const maxPrice = list.reduce(
          (m, p) => Math.max(m, p.sellingPrice ?? 0),
          0,
        );
        setPriceRange([0, maxPrice]);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const maxPrice = useMemo(
    () => products.reduce((m, p) => Math.max(m, p.sellingPrice ?? 0), 0),
    [products],
  );

  const categoryOptions = useMemo(
    () =>
      Array.from(
        new Set(products.map((p) => p.category?.name).filter(Boolean)),
      ).sort() as string[],
    [products],
  );

  const brandOptions = useMemo(
    () =>
      Array.from(
        new Set(products.map((p) => p.brand?.name).filter(Boolean)),
      ).sort() as string[],
    [products],
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search, priceRange, priceFiltered, categories, brands, statuses]);

  const q = search.toLowerCase();
  const filtered = products.filter((p) => {
    const price = p.sellingPrice ?? 0;
    if (priceFiltered && (price < priceRange[0] || price > priceRange[1]))
      return false;
    if (categories.length && !categories.includes(p.category?.name ?? ""))
      return false;
    if (brands.length && !brands.includes(p.brand?.name ?? "")) return false;
    const status = getStatus(p.quantity, p.lowStockThreshold);
    if (statuses.length && !statuses.includes(status)) return false;
    if (
      q &&
      !`${p.name} ${p.brand?.name ?? ""} ${p.category?.name ?? ""} ${p.description ?? ""}`
        .toLowerCase()
        .includes(q)
    )
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
        <FadeIn className="po-page__header">
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
        </FadeIn>

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
            {maxPrice > 0 && (
              <RangeSlider
                min={0}
                max={maxPrice}
                value={priceRange}
                onChange={(v) => {
                  setPriceRange(v);
                  setPriceFiltered(v[0] > 0 || v[1] < maxPrice);
                }}
              />
            )}

            {/* Category */}
            {categoryOptions.length > 0 && (
              <CheckGroup
                title="CATEGORY"
                options={categoryOptions}
                selected={categories}
                onChange={setCategories}
              />
            )}

            {/* Brand */}
            {brandOptions.length > 0 && (
              <CheckGroup
                title="BRAND"
                options={brandOptions}
                selected={brands}
                onChange={setBrands}
              />
            )}

            {/* Availability */}
            <CheckGroup
              title="AVAILABILITY"
              options={[...STATUS_OPTIONS]}
              selected={statuses}
              onChange={setStatuses}
            />
          </aside>

          {/* ── Product Grid ── */}
          <div className="po-grid">
            {loading ? (
              <p className="po-grid__empty">Loading parts…</p>
            ) : filtered.length === 0 ? (
              <p className="po-grid__empty">No parts match your filters.</p>
            ) : (
              paginated.map((part, i) => {
                const status = getStatus(part.quantity, part.lowStockThreshold);
                return (
                  <FadeIn key={`${currentPage}-${part.id}`} delay={i * 0.07}>
                  <Link
                    href={`/spare-parts/${part.id}`}
                    className="po-card"
                  >
                    <div className="po-card__image">
                      <img
                        src={getImageSrc(part.images)}
                        alt={part.name}
                        className="po-card__img"
                      />
                    </div>
                    <div className="po-card__body">
                      <span
                        className={`po-card__badge${
                          status === "Out of Stock"
                            ? " po-card__badge--preorder"
                            : status === "Low Stock"
                              ? " po-card__badge--low"
                              : ""
                        }`}
                      >
                        {status}
                      </span>
                      <h3 className="po-card__title">{part.name}</h3>
                      <p className="sp-card__brand">{part.brand?.name ?? ""}</p>
                      <div className="po-card__footer">
                        <span className="po-card__price">
                          Rs.&nbsp;
                          {(part.sellingPrice ?? 0).toLocaleString("en-LK")}.00
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
