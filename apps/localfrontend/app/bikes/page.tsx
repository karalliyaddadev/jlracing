"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import Pagination from "../components/Pagination";
import FadeIn from "../components/FadeIn";
import { useListingPageState } from "../hooks/useListingState";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

const CC_OPTIONS = [
  "Under 150cc",
  "150–250cc",
  "250–400cc",
  "400–600cc",
  "600cc +",
];
const STATUS_OPTIONS = ["Brand New"];
const ITEMS_PER_PAGE = 8;

type VehicleGroup = {
  key: string;
  items: PublicVehicle[];
  representative: PublicVehicle;
  totalQuantity: number;
};

interface VehicleImage {
  id: number;
  url: string;
  isPrimary: boolean;
  sortOrder: number;
}

interface PublicVehicle {
  id: number;
  displayId: string;
  brand: { id: number; name: string };
  model: { id: number; name: string };
  colour: string;
  engineCapacityCc: number | null;
  year: number | null;
  condition: string;
  mileage: number;
  sellingPrice: number | null;
  description: string | null;
  images: VehicleImage[];
}

function getCCBucket(cc: number | null): string {
  if (cc === null || cc === 0) return "";
  if (cc < 150) return "Under 150cc";
  if (cc <= 250) return "150–250cc";
  if (cc <= 400) return "250–400cc";
  if (cc <= 600) return "400–600cc";
  return "600cc +";
}

function mapCondition(c: string): string {
  if (c === "brandnew") return "Brand New";
  if (c === "reconditioned") return "Reconditioned";
  return "Used";
}

function formatPrice(price: number | null): string {
  if (price === null || price === 0) return "Contact for price";
  return `Rs. ${price.toLocaleString("en-LK")}`;
}

function getPrimaryImage(images: VehicleImage[]): string | null {
  if (!images.length) return null;
  const primary = images.find((i) => i.isPrimary) ?? images[0];
  return `${BACKEND_URL}${primary.url}`;
}

function getVehicleGroupKey(vehicle: PublicVehicle) {
  return [
    vehicle.brand.id,
    vehicle.model.id,
    vehicle.year ?? "none",
    vehicle.colour.trim().toLowerCase(),
    vehicle.engineCapacityCc ?? "none",
    vehicle.condition.trim().toLowerCase(),
    vehicle.sellingPrice ?? "none",
  ].join(":");
}

function RangeSlider({
  label,
  min,
  max,
  value,
  onChange,
  unit,
  noGrouping,
}: {
  label: string;
  min: number;
  max: number;
  value: [number, number];
  onChange: (v: [number, number]) => void;
  unit?: string;
  noGrouping?: boolean;
}) {
  const formatValue = (n: number) =>
    (noGrouping ? String(n) : n.toLocaleString()) + (unit ? ` ${unit}` : "");

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
        <span>{formatValue(value[0])}</span>
        <span>{formatValue(value[1])}</span>
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
  const [vehicles, setVehicles] = useState<PublicVehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedGroupKey, setExpandedGroupKey] = useState<string | null>(null);
  const didMountRef = useRef(false);

  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000000]);
  const [yearRange, setYearRange] = useState<[number, number]>([
    2010,
    new Date().getFullYear(),
  ]);
  const [mileageRange, setMileageRange] = useState<[number, number]>([
    0, 100000,
  ]);
  const [brands, setBrands] = useState<string[]>([]);
  const [ccOptions, setCcOptions] = useState<string[]>([]);
  const [statuses, setStatuses] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const { currentPage, setCurrentPage } = useListingPageState(!loading);

  useEffect(() => {
    setLoading(true);
    fetch(`${BACKEND_URL}/api/bikes/vehicles?limit=200`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch bikes");
        return res.json();
      })
      .then((data) => {
        setVehicles(data.vehicles ?? []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Could not load bikes. Please try again later.");
        setLoading(false);
      });
  }, []);

  const dynamicMinYear = useMemo(() => {
    const years = vehicles
      .map((v) => v.year)
      .filter((y): y is number => y != null);
    return years.length > 0 ? Math.min(...years) : 2010;
  }, [vehicles]);

  const dynamicMaxYear = useMemo(() => {
    const years = vehicles
      .map((v) => v.year)
      .filter((y): y is number => y != null);
    return years.length > 0 ? Math.max(...years) : new Date().getFullYear();
  }, [vehicles]);

  useEffect(() => {
    setYearRange([dynamicMinYear, dynamicMaxYear]);
  }, [dynamicMinYear, dynamicMaxYear]);

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }
    setCurrentPage(1);
    setExpandedGroupKey(null);
  }, [search, brands, ccOptions, statuses]);

  // Derive unique brand names from fetched vehicles
  const availableBrands = Array.from(
    new Set(vehicles.map((v) => v.brand.name)),
  ).sort();

  const q = search.toLowerCase();
  const priceFiltered = priceRange[0] > 0 || priceRange[1] < 5000000;
  const yearFiltered =
    yearRange[0] > dynamicMinYear || yearRange[1] < dynamicMaxYear;
  const mileageFiltered = mileageRange[0] > 0 || mileageRange[1] < 100000;

  const filtered = vehicles.filter((v) => {
    if (priceFiltered) {
      const price = v.sellingPrice ?? 0;
      if (price < priceRange[0] || price > priceRange[1]) return false;
    }

    if (yearFiltered) {
      const year = v.year ?? 0;
      if (year && (year < yearRange[0] || year > yearRange[1])) return false;
    }

    if (mileageFiltered) {
      if (
        (v.mileage ?? 0) < mileageRange[0] ||
        (v.mileage ?? 0) > mileageRange[1]
      )
        return false;
    }

    if (brands.length && !brands.includes(v.brand.name)) return false;

    if (
      ccOptions.length &&
      !ccOptions.includes(getCCBucket(v.engineCapacityCc))
    )
      return false;

    if (statuses.length && !statuses.includes(mapCondition(v.condition)))
      return false;

    if (
      q &&
      !`${v.brand.name} ${v.model.name} ${v.year ?? ""}`
        .toLowerCase()
        .includes(q)
    )
      return false;

    return true;
  });

  const groupedVehicles = useMemo(() => {
    const groups = new Map<string, VehicleGroup>();

    filtered.forEach((vehicle) => {
      const key = getVehicleGroupKey(vehicle);
      const existing = groups.get(key);

      if (!existing) {
        groups.set(key, {
          key,
          items: [vehicle],
          representative: vehicle,
          totalQuantity: 1,
        });
        return;
      }

      existing.items.push(vehicle);
      existing.totalQuantity += 1;
    });

    return Array.from(groups.values());
  }, [filtered]);

  const totalPages = Math.ceil(groupedVehicles.length / ITEMS_PER_PAGE);
  const paginated = groupedVehicles.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  return (
    <section className="bikes-page">
      {filtersOpen && (
        <div
          className="po-filter-backdrop"
          onClick={() => setFiltersOpen(false)}
        />
      )}

      <div className="bikes-page__inner">
        <FadeIn className="bikes-page__header">
          <div className="bikes-page__header-row">
            <div>
              <h1 className="bikes-page__title">Stock</h1>
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
                  Ã—
                </button>
              )}
            </div>
          </div>
          <hr className="bikes-page__divider" />
        </FadeIn>

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
          <aside className={`bikes-filter${filtersOpen ? " is-open" : ""}`}>
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
              unit="LKR"
            />
            <CheckGroup
              title="Brand"
              options={availableBrands}
              selected={brands}
              onChange={setBrands}
            />
            <RangeSlider
              label="Year"
              min={dynamicMinYear}
              max={dynamicMaxYear}
              value={yearRange}
              onChange={setYearRange}
              noGrouping
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

          <div className="bikes-grid">
            {loading ? (
              <p className="bikes-grid__empty">Loading bikes…</p>
            ) : error ? (
              <p className="bikes-grid__empty">{error}</p>
            ) : groupedVehicles.length === 0 ? (
              <p className="bikes-grid__empty">No bikes match your filters.</p>
            ) : (
              paginated.map((group, i) => {
                const status = mapCondition(group.representative.condition);
                const imgSrc = getPrimaryImage(group.representative.images);
                const isExpanded = expandedGroupKey === group.key;

                if (group.items.length === 1) {
                  const vehicle = group.representative;
                  return (
                    <FadeIn key={`${currentPage}-${vehicle.id}`} delay={i * 0.07}>
                      <Link href={`/bikes/${vehicle.id}`} className="bike-card">
                        <div className="bike-card__image">
                          {imgSrc ? (
                            <img
                              src={imgSrc}
                              alt={`${vehicle.brand.name} ${vehicle.model.name}`}
                            />
                          ) : (
                            <div className="bike-card__no-image">No image</div>
                          )}
                        </div>
                        <div className="bike-card__body">
                          <h3 className="bike-card__title">
                            {vehicle.brand.name} {vehicle.model.name} {vehicle.year ?? ""}
                          </h3>
                          <p className="bike-card__meta">
                            {getCCBucket(vehicle.engineCapacityCc) ||
                              (vehicle.engineCapacityCc
                                ? `${vehicle.engineCapacityCc}cc`
                                : "")}
                            {vehicle.engineCapacityCc ? "\u00a0\u00a0|\u00a0\u00a0" : ""}
                            {status}
                          </p>
                          <p className="bike-card__price">
                            {formatPrice(vehicle.sellingPrice)}
                          </p>
                        </div>
                      </Link>
                    </FadeIn>
                  );
                }

                return (
                  <FadeIn key={`${currentPage}-${group.key}`} delay={i * 0.07}>
                    <article className={`bike-card bike-card--group${isExpanded ? " bike-card--expanded" : ""}`}>
                      <button
                        type="button"
                        className="bike-card__summary"
                        onClick={() =>
                          setExpandedGroupKey(isExpanded ? null : group.key)
                        }
                        aria-expanded={isExpanded}
                      >
                        <div className="bike-card__summary-visual">
                          <div className="bike-card__image">
                            {imgSrc ? (
                              <img
                                src={imgSrc}
                                alt={`${group.representative.brand.name} ${group.representative.model.name}`}
                              />
                            ) : (
                              <div className="bike-card__no-image">No image</div>
                            )}
                          </div>
                          <div className="bike-card__body">
                            <div className="bike-card__eyebrow">
                              <span className="bike-card__chip">Stock</span>
                              <span className="bike-card__count">{group.items.length} matches</span>
                            </div>
                            <h3 className="bike-card__title">
                              {group.representative.brand.name} {group.representative.model.name} {group.representative.year ?? ""}
                            </h3>
                            <p className="bike-card__meta">
                              {getCCBucket(group.representative.engineCapacityCc) ||
                                (group.representative.engineCapacityCc
                                  ? `${group.representative.engineCapacityCc}cc`
                                  : "")}
                              {group.representative.engineCapacityCc ? "\u00a0\u00a0|\u00a0\u00a0" : ""}
                              {status}
                            </p>
                            <div className="bike-card__action-row">
                              <span className="bike-card__summary-pill">
                                Qty {group.totalQuantity.toLocaleString("en-LK")}
                              </span>
                              <span className="bike-card__summary-button">
                                {isExpanded ? "Close group" : `View ${group.items.length} bikes`}
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M9 18l6-6-6-6" />
                                </svg>
                              </span>
                            </div>
                          </div>
                        </div>
                      </button>

                      {isExpanded && (
                        <div className="bike-card__expanded">
                          <div className="bike-card__expanded-head">
                            <div>
                              <span className="bike-card__expanded-title">Matching bikes</span>
                              <span className="bike-card__expanded-note">Tap a row to open its detail page</span>
                            </div>
                            <button
                              type="button"
                              className="bike-card__collapse-btn"
                              onClick={() => setExpandedGroupKey(null)}
                            >
                              Collapse
                            </button>
                          </div>
                          <div className="bike-card__variant-list">
                            {group.items.map((vehicle) => (
                              <Link
                                key={vehicle.id}
                                href={`/bikes/${vehicle.id}`}
                                className="bike-card__variant"
                              >
                                <div className="bike-card__variant-thumb">
                                  {getPrimaryImage(vehicle.images) ? (
                                    <img
                                      src={getPrimaryImage(vehicle.images) ?? ""}
                                      alt={`${vehicle.brand.name} ${vehicle.model.name}`}
                                    />
                                  ) : (
                                    <div className="bike-card__variant-empty">No image</div>
                                  )}
                                </div>
                                <div className="bike-card__variant-body">
                                  <strong>
                                    {vehicle.brand.name} {vehicle.model.name} {vehicle.year ?? ""}
                                  </strong>
                                  <span>
                                    Qty 1 • {formatPrice(vehicle.sellingPrice)}
                                  </span>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </article>
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
