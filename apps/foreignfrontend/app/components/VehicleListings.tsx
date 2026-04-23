"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { VehicleCategory } from "../data/vehicles";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

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

/* ─── Types ─────────────────────────────────────────────── */
interface VehicleImage {
  id: number;
  url: string;
  isPrimary: boolean;
  sortOrder: number;
}

interface ApiBikeVehicle {
  id: number;
  brand: { id: number; name: string };
  model: { id: number; name: string };
  year: number | null;
  sellingPrice: number | null;
  images: VehicleImage[];
}

interface ApiExportVehicle {
  id: number;
  brand: string;
  model: string;
  year: number | null;
  price: number | null;
  images: VehicleImage[];
}

interface ListingCard {
  id: number;
  name: string;
  year: number | null;
  price: string;
  image: string | null;
}

/* ─── Helpers ────────────────────────────────────────────── */
function formatPrice(price: number | null | undefined): string {
  if (!price) return "Contact for price";
  return `Rs. ${price.toLocaleString("en-LK")}`;
}

function getPrimaryImage(images: VehicleImage[]): string | null {
  if (!images.length) return null;
  const primary = images.find((i) => i.isPrimary) ?? images[0];
  return `${BACKEND_URL}${primary.url}`;
}

function categorySlug(cat: VehicleCategory): string {
  if (cat === "2-Wheelers") return "2-wheelers";
  if (cat === "Heavy Machinery") return "heavy-machinery";
  return "automobiles";
}

type FetchState = { loading: boolean; cards: ListingCard[] };
const INITIAL: FetchState = { loading: false, cards: [] };

/* ─── Component ──────────────────────────────────────────── */
export default function VehicleListings() {
  const [active, setActive] = useState<VehicleCategory>("Automobiles");

  const [bikes, setBikes] = useState<FetchState>(INITIAL);
  const [autos, setAutos] = useState<FetchState>(INITIAL);
  const [heavy, setHeavy] = useState<FetchState>(INITIAL);

  useEffect(() => {
    setBikes((s) => ({ ...s, loading: true }));
    fetch(`${BACKEND_URL}/api/bikes/vehicles?limit=3`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => {
        const cards: ListingCard[] = (data.vehicles ?? []).map(
          (v: ApiBikeVehicle) => ({
            id: v.id,
            name: `${v.brand.name} ${v.model.name}`,
            year: v.year,
            price: formatPrice(v.sellingPrice),
            image: getPrimaryImage(v.images),
          }),
        );
        setBikes({ loading: false, cards });
      })
      .catch(() => setBikes({ loading: false, cards: [] }));
  }, []);

  useEffect(() => {
    setAutos((s) => ({ ...s, loading: true }));
    fetch(`${BACKEND_URL}/api/export-vehicles/automobile?limit=3`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => {
        const cards: ListingCard[] = (data.vehicles ?? []).map(
          (v: ApiExportVehicle) => ({
            id: v.id,
            name: `${v.brand} ${v.model}`,
            year: v.year,
            price: formatPrice(v.price),
            image: getPrimaryImage(v.images),
          }),
        );
        setAutos({ loading: false, cards });
      })
      .catch(() => setAutos({ loading: false, cards: [] }));
  }, []);

  useEffect(() => {
    setHeavy((s) => ({ ...s, loading: true }));
    fetch(`${BACKEND_URL}/api/export-vehicles/heavy-machinery?limit=3`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => {
        const cards: ListingCard[] = (data.vehicles ?? []).map(
          (v: ApiExportVehicle) => ({
            id: v.id,
            name: `${v.brand} ${v.model}`,
            year: v.year,
            price: formatPrice(v.price),
            image: getPrimaryImage(v.images),
          }),
        );
        setHeavy({ loading: false, cards });
      })
      .catch(() => setHeavy({ loading: false, cards: [] }));
  }, []);

  const activeState =
    active === "2-Wheelers" ? bikes : active === "Automobiles" ? autos : heavy;

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

        {/* Cards grid */}
        <div className="int-listings__grid">
          {activeState.loading ? (
            <p className="bikes-grid__empty">Loading…</p>
          ) : activeState.cards.length === 0 ? (
            <p className="bikes-grid__empty">No vehicles available yet.</p>
          ) : (
            activeState.cards.map((vehicle) => (
              <Link
                key={vehicle.id}
                href={`/listings/${categorySlug(active)}/${vehicle.id}`}
                className="int-veh-card"
              >
                <div className="int-veh-card__img-wrap">
                  {vehicle.image ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={vehicle.image}
                      alt={`${vehicle.name} ${vehicle.year ?? ""}`}
                      className="int-veh-card__img"
                    />
                  ) : (
                    <div className="bike-card__no-image">No image</div>
                  )}
                </div>
                <div className="int-veh-card__body">
                  <h3 className="int-veh-card__name">
                    {vehicle.name}
                    {vehicle.year ? `\u00a0\u00a0${vehicle.year}` : ""}
                  </h3>
                  <p className="int-veh-card__price">{vehicle.price}</p>
                  <span className="int-veh-card__cta">Explore More &gt;</span>
                </div>
              </Link>
            ))
          )}
        </div>

        {/* Footer row */}
        <div className="int-listings__footer">
          <Link href="/listings" className="int-btn int-btn--primary">
            View All Listings
          </Link>
        </div>
      </div>
    </section>
  );
}
