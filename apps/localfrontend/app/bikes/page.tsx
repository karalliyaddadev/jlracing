"use client";

import { useState } from "react";
import Link from "next/link";

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

export const MOCK_BIKES = [
  {
    id: 1,
    brand: "Yamaha",
    model: "R3",
    year: 2025,
    cc: "300cc",
    condition: "Used",
    mileage: "12,000 km",
    color: "Racing Blue",
    price: "Rs. 3,500,000",
    image:
      "https://images.pexels.com/photos/2393835/pexels-photo-2393835.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "A well-maintained Yamaha R3 in excellent condition. This sports bike delivers an exhilarating riding experience with its parallel-twin engine and sharp handling. Perfect for both city commuting and weekend track days.",
  },
  {
    id: 2,
    brand: "Yamaha",
    model: "MT-07",
    year: 2024,
    cc: "600cc +",
    condition: "Brand New",
    mileage: "0 km",
    color: "Midnight Black",
    price: "Rs. 4,200,000",
    image:
      "https://images.pexels.com/photos/1119796/pexels-photo-1119796.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "Brand new Yamaha MT-07 with aggressive naked styling and a powerful 689cc engine. The hyper-naked design gives unrivalled performance and style on Sri Lankan roads.",
  },
  {
    id: 3,
    brand: "Honda",
    model: "CBR 500R",
    year: 2024,
    cc: "400–600cc",
    condition: "Brand New",
    mileage: "0 km",
    color: "Grand Prix Red",
    price: "Rs. 5,100,000",
    image:
      "https://images.pexels.com/photos/2611690/pexels-photo-2611690.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "The Honda CBR 500R blends sporty performance with everyday usability. Built for riders who want the thrill of a sports bike without compromising on comfort for longer rides.",
  },
  {
    id: 4,
    brand: "Suzuki",
    model: "GSX-R 150",
    year: 2024,
    cc: "150–250cc",
    condition: "Used",
    mileage: "8,500 km",
    color: "Metallic Blue",
    price: "Rs. 1,800,000",
    image:
      "https://images.pexels.com/photos/1413412/pexels-photo-1413412.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "A sporty and agile 150cc motorcycle from Suzuki. Lightweight, fuel-efficient, and packed with performance-inspired design cues from the legendary GSX-R family.",
  },
  {
    id: 5,
    brand: "KTM",
    model: "Duke 390",
    year: 2025,
    cc: "250–400cc",
    condition: "Brand New",
    mileage: "0 km",
    color: "Orange",
    price: "Rs. 3,900,000",
    image:
      "https://images.pexels.com/photos/163210/motorcycles-racing-race-helmet-163210.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "The KTM Duke 390 is pure street fighter performance. With a single-cylinder 373cc engine and razor-sharp chassis, it's built for riders who demand precision and excitement.",
  },
  {
    id: 6,
    brand: "BMW",
    model: "G 310 R",
    year: 2024,
    cc: "250–400cc",
    condition: "Brand New",
    mileage: "0 km",
    color: "Alpine White",
    price: "Rs. 4,800,000",
    image:
      "https://images.pexels.com/photos/1715193/pexels-photo-1715193.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "BMW's entry into the middleweight naked segment. The G 310 R combines premium German engineering with a light, agile chassis ideal for urban riding and weekend adventures.",
  },
  {
    id: 7,
    brand: "Ducati",
    model: "Monster 797",
    year: 2023,
    cc: "600cc +",
    condition: "Used",
    mileage: "15,000 km",
    color: "Ducati Red",
    price: "Rs. 7,500,000",
    image:
      "https://images.pexels.com/photos/104842/bmw-motorcycle-race-helmet-104842.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "The iconic Ducati Monster 797 — a masterpiece of Italian engineering. Desmodromic L-twin engine, trellis frame, and unmistakable Ducati character for the ultimate riding experience.",
  },
  {
    id: 8,
    brand: "Honda",
    model: "CB300R",
    year: 2025,
    cc: "250–400cc",
    condition: "Brand New",
    mileage: "0 km",
    color: "Pearl Glare White",
    price: "Rs. 2,950,000",
    image:
      "https://images.pexels.com/photos/2519374/pexels-photo-2519374.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "The Honda CB300R is a neo-sports café machine with a clean, minimalist design. Equipped with a 286cc single-cylinder engine, it's perfect for new and experienced riders alike.",
  },
];

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

  const filtered = MOCK_BIKES.filter((b) => {
    if (brands.length && !brands.includes(b.brand)) return false;
    if (ccOptions.length && !ccOptions.includes(b.cc)) return false;
    if (statuses.length && !statuses.includes(b.condition)) return false;
    return true;
  });

  return (
    <section className="bikes-page">
      <div className="bikes-page__inner">
        {/* ── Header ── */}
        <div className="bikes-page__header">
          <h1 className="bikes-page__title">Bikes</h1>
          <p className="bikes-page__subtitle">
            Discover our collection of imported bikes, from sports machines to
            everyday rides.
          </p>
          <hr className="bikes-page__divider" />
        </div>

        <div className="bikes-page__body">
          {/* ── Sidebar Filters ── */}
          <aside className="bikes-filter">
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
