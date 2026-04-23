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

const CATEGORY_DESCS: Record<VehicleCategory, string> = {
  "2-Wheelers":
    "Explore motorcycles and scooters ready for pre-order and export to destinations worldwide.",
  Automobiles:
    "Explore cars and passenger vehicles ready for pre-order and export to destinations worldwide.",
  "Heavy Machinery":
    "Explore excavators, loaders, and industrial machinery available for international export.",
};

const PER_PAGE = 6;

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
  id: number | string;
  name: string;
  year: number | null;
  price: string;
  image: string | null;
}

function categorySlug(cat: VehicleCategory): string {
  if (cat === "2-Wheelers") return "2-wheelers";
  if (cat === "Heavy Machinery") return "heavy-machinery";
  return "automobiles";
}

function formatPrice(price: number | null | undefined): string {
  if (!price) return "Contact for price";
  return `Rs. ${price.toLocaleString("en-LK")}`;
}

function getPrimaryImage(images: VehicleImage[]): string | null {
  if (!images.length) return null;
  const primary = images.find((i) => i.isPrimary) ?? images[0];
  return `${BACKEND_URL}${primary.url}`;
}

type FetchState = {
  loading: boolean;
  error: string | null;
  cards: ListingCard[];
};
const INITIAL_STATE: FetchState = { loading: false, error: null, cards: [] };

export default function ListingsPage() {
  const [active, setActive] = useState<VehicleCategory>("Automobiles");
  const [page, setPage] = useState(1);

  const [bikes, setBikes] = useState<FetchState>(INITIAL_STATE);
  const [autos, setAutos] = useState<FetchState>(INITIAL_STATE);
  const [heavy, setHeavy] = useState<FetchState>(INITIAL_STATE);

  // Fetch 2-Wheelers (bikes API)
  useEffect(() => {
    setBikes((s) => ({ ...s, loading: true, error: null }));
    fetch(`${BACKEND_URL}/api/bikes/vehicles?limit=200`)
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
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
        setBikes({ loading: false, error: null, cards });
      })
      .catch(() =>
        setBikes({ loading: false, error: "Could not load bikes.", cards: [] }),
      );
  }, []);

  // Fetch Automobiles
  useEffect(() => {
    setAutos((s) => ({ ...s, loading: true, error: null }));
    fetch(`${BACKEND_URL}/api/export-vehicles/automobile?limit=200`)
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
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
        setAutos({ loading: false, error: null, cards });
      })
      .catch(() =>
        setAutos({
          loading: false,
          error: "Could not load automobiles.",
          cards: [],
        }),
      );
  }, []);

  // Fetch Heavy Machinery
  useEffect(() => {
    setHeavy((s) => ({ ...s, loading: true, error: null }));
    fetch(`${BACKEND_URL}/api/export-vehicles/heavy-machinery?limit=200`)
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
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
        setHeavy({ loading: false, error: null, cards });
      })
      .catch(() =>
        setHeavy({
          loading: false,
          error: "Could not load heavy machinery.",
          cards: [],
        }),
      );
  }, []);

  const handleCategory = (cat: VehicleCategory) => {
    setActive(cat);
    setPage(1);
  };

  const activeState =
    active === "2-Wheelers" ? bikes : active === "Automobiles" ? autos : heavy;

  const totalPages = Math.max(
    1,
    Math.ceil(activeState.cards.length / PER_PAGE),
  );
  const paginated = activeState.cards.slice(
    (page - 1) * PER_PAGE,
    page * PER_PAGE,
  );

  return (
    <>
      {/* â”€â”€ Hero â”€â”€ */}
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

      {/* â”€â”€ Full Listings â”€â”€ */}
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
            {activeState.loading ? (
              <p className="bikes-grid__empty">Loading vehiclesâ€¦</p>
            ) : activeState.error ? (
              <p className="bikes-grid__empty">{activeState.error}</p>
            ) : paginated.length === 0 ? (
              <p className="bikes-grid__empty">No vehicles available yet.</p>
            ) : (
              paginated.map((vehicle) => (
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
