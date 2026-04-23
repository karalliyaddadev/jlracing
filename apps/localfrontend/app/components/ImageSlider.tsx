"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

interface VehicleImage {
  id: number;
  url: string;
  isPrimary: boolean;
  sortOrder: number;
}

interface PublicVehicle {
  id: number;
  brand: { id: number; name: string };
  model: { id: number; name: string };
  year: number | null;
  engineCapacityCc: number | null;
  condition: string;
  sellingPrice: number | null;
  images: VehicleImage[];
}

interface SliderItem {
  id: number;
  image: string;
  brand: string;
  model: string;
  year: string;
  meta: string;
  price: string;
}

function mapCondition(c: string): string {
  if (c === "brandnew") return "Brand New";
  if (c === "reconditioned") return "Reconditioned";
  return "Used";
}

function formatPrice(price: number | null): string {
  if (!price) return "Contact for price";
  return `Rs. ${price.toLocaleString("en-LK")}`;
}

function getPrimaryImage(images: VehicleImage[]): string {
  if (!images.length) return "";
  const primary = images.find((i) => i.isPrimary) ?? images[0];
  return `${BACKEND_URL}${primary.url}`;
}

const CARD_STEP = 324;

export default function ImageSlider() {
  const [items, setItems] = useState<SliderItem[]>([]);
  const [offset, setOffset] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const offsetRef = useRef(0);

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/bikes/vehicles?limit=6`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => {
        const mapped: SliderItem[] = (data.vehicles ?? []).map(
          (v: PublicVehicle) => ({
            id: v.id,
            image: getPrimaryImage(v.images),
            brand: v.brand.name,
            model: v.model.name,
            year: v.year ? String(v.year) : "",
            meta: [
              v.engineCapacityCc ? `${v.engineCapacityCc}cc` : null,
              mapCondition(v.condition),
            ]
              .filter(Boolean)
              .join(" | "),
            price: formatPrice(v.sellingPrice),
          }),
        );
        setItems(mapped);
      })
      .catch(() => setItems([]));
  }, []);

  const maxOffset = Math.max(0, (items.length - 3) * CARD_STEP);

  const scrollLeft = () =>
    setOffset((o) => {
      const next = Math.max(o - CARD_STEP, 0);
      offsetRef.current = next;
      return next;
    });

  const scrollRight = () =>
    setOffset((o) => {
      const next = o >= maxOffset ? 0 : Math.min(o + CARD_STEP, maxOffset);
      offsetRef.current = next;
      return next;
    });

  useEffect(() => {
    if (items.length === 0) return;
    const timer = setInterval(() => {
      setOffset((o) => {
        const next = o >= maxOffset ? 0 : o + CARD_STEP;
        offsetRef.current = next;
        return next;
      });
    }, 3000);
    return () => clearInterval(timer);
  }, [items, maxOffset]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      diff > 0 ? scrollRight() : scrollLeft();
    }
    touchStartX.current = null;
  };

  return (
    <section className="slider-section">
      <div className="slider-section__header">
        <div>
          <span className="slider-section__label">FEATURED</span>
          <h2 className="slider-section__title">Latest Arrivals</h2>
        </div>
      </div>

      <div
        className="slider-section__viewport"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="slider-section__track"
          style={{ transform: `translateX(-${offset}px)` }}
        >
          {items.length === 0 ? (
            <p style={{ padding: "2rem", color: "#888" }}>Loading…</p>
          ) : (
            items.map((item) => (
              <Link
                key={item.id}
                href={`/bikes/${item.id}`}
                className="slider-card"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div className="slider-card__image">
                  <div
                    className="slider-card__bg"
                    style={{
                      backgroundImage: item.image ? `url(${item.image})` : undefined,
                    }}
                  />
                </div>
                <div className="slider-card__body">
                  <p className="slider-card__title">
                    {item.brand} {item.model} {item.year}
                  </p>
                  <p className="slider-card__meta-text">{item.meta}</p>
                  <span className="slider-card__price">{item.price}</span>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>

      <div className="slider-section__cta">
        <Link href="/bikes" className="slider-section__cta-btn">
          View All Bikes
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
}

