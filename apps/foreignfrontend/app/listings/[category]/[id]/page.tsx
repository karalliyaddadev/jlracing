"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

/* ─── Types ─────────────────────────────────────────────── */
interface VehicleImage {
  id: number;
  url: string;
  isPrimary: boolean;
  sortOrder: number;
}

interface BikeVehicle {
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

interface ExportVehicle {
  id: number;
  displayId: string;
  brand: string;
  model: string;
  colour: string | null;
  engineCc: number | null;
  year: number | null;
  condition: string;
  mileage: number;
  price: number | null;
  description: string | null;
  images: VehicleImage[];
}

type AnyVehicle =
  | { kind: "bike"; data: BikeVehicle }
  | { kind: "export"; data: ExportVehicle };

/* ─── Helpers ────────────────────────────────────────────── */
function mapCondition(c: string): string {
  if (c === "brandnew") return "Brand New";
  if (c === "reconditioned") return "Reconditioned";
  return "Used";
}

function formatPrice(price: number | null | undefined): string {
  if (!price) return "Contact for price";
  return `Rs. ${price.toLocaleString("en-LK")}`;
}

/* Map URL slug → readable label */
const CATEGORY_LABELS: Record<string, string> = {
  "2-wheelers": "2-Wheelers",
  automobiles: "Automobiles",
  "heavy-machinery": "Heavy Machinery",
};

/* ─── Page ───────────────────────────────────────────────── */
export default function ListingDetailPage() {
  const { category, id } = useParams<{ category: string; id: string }>();
  const [vehicle, setVehicle] = useState<AnyVehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    if (!id || !category) return;

    const url =
      category === "2-wheelers"
        ? `${BACKEND_URL}/api/bikes/vehicles/${id}`
        : `${BACKEND_URL}/api/export-vehicles/${category}/${id}`;

    fetch(url)
      .then((res) => {
        if (res.status === 404) {
          setNotFound(true);
          setLoading(false);
          return null;
        }
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        if (!data) return;
        if (category === "2-wheelers") {
          setVehicle({ kind: "bike", data: data as BikeVehicle });
        } else {
          setVehicle({ kind: "export", data: data as ExportVehicle });
        }
        setLoading(false);
      })
      .catch(() => {
        setNotFound(true);
        setLoading(false);
      });
  }, [id, category]);

  /* ── Loading ── */
  if (loading) {
    return (
      <section className="detail-loader-wrap">
        <span className="detail-loader__spinner" />
      </section>
    );
  }

  /* ── Not found ── */
  if (notFound || !vehicle) {
    return (
      <section className="bikedetail-notfound">
        <h2>Vehicle not found.</h2>
        <Link href="/listings" className="bikedetail__back">
          ← Back to Listings
        </Link>
      </section>
    );
  }

  /* ── Normalise fields ── */
  const isBike = vehicle.kind === "bike";
  const v = vehicle.data;

  const name = isBike
    ? `${(v as BikeVehicle).brand.name} ${(v as BikeVehicle).model.name}`
    : `${(v as ExportVehicle).brand} ${(v as ExportVehicle).model}`;

  const price = isBike
    ? formatPrice((v as BikeVehicle).sellingPrice)
    : formatPrice((v as ExportVehicle).price);

  const condition = mapCondition(v.condition);
  const images = v.images.map((img) => `${BACKEND_URL}${img.url}`);

  const specs = isBike
    ? [
        { label: "Brand", value: (v as BikeVehicle).brand.name },
        { label: "Model", value: (v as BikeVehicle).model.name },
        { label: "Year", value: v.year ?? "—" },
        {
          label: "Engine",
          value: (v as BikeVehicle).engineCapacityCc
            ? `${(v as BikeVehicle).engineCapacityCc}cc`
            : "—",
        },
        { label: "Condition", value: condition },
        { label: "Mileage", value: `${v.mileage.toLocaleString()} km` },
        { label: "Colour", value: v.colour ?? "—" },
      ]
    : [
        { label: "Brand", value: (v as ExportVehicle).brand },
        { label: "Model", value: (v as ExportVehicle).model },
        { label: "Year", value: v.year ?? "—" },
        {
          label: "Engine",
          value: (v as ExportVehicle).engineCc
            ? `${(v as ExportVehicle).engineCc}cc`
            : "—",
        },
        { label: "Condition", value: condition },
        { label: "Mileage", value: `${v.mileage.toLocaleString()} km` },
        { label: "Colour", value: (v as ExportVehicle).colour ?? "—" },
      ];

  const categoryLabel = CATEGORY_LABELS[category] ?? "Listings";

  return (
    <section className="bikedetail-page">
      <div className="bikedetail-container">
        {/* ── Back ── */}
        <Link href="/listings" className="bikedetail__back">
          ← Back to {categoryLabel}
        </Link>

        <div className="bikedetail__layout">
          {/* ── Left – Gallery ── */}
          <div className="bikedetail__gallery">
            <div className="bikedetail__main-img">
              {images.length > 0 ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={images[activeImg]} alt={name} />
              ) : (
                <div className="bike-card__no-image">No image available</div>
              )}
            </div>
            {images.length > 1 && (
              <div className="bikedetail__thumbs">
                {images.map((img, i) => (
                  <div
                    key={i}
                    className={`bikedetail__thumb${activeImg === i ? " is-active" : ""}`}
                    onClick={() => setActiveImg(i)}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img} alt={`thumb ${i + 1}`} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── Right – Info ── */}
          <div className="bikedetail__info">
            <span className="bikedetail__badge">{condition}</span>
            <h1 className="bikedetail__title">{name}</h1>
            {v.year && <p className="bikedetail__year">{v.year} Model</p>}

            <p className="bikedetail__price">{price}</p>

            <div className="bikedetail__divider" />

            {/* Specs */}
            <div className="bikedetail__specs">
              {specs.map((s) => (
                <div key={s.label} className="bikedetail__spec-item">
                  <span className="bikedetail__spec-label">{s.label}</span>
                  <span className="bikedetail__spec-value">
                    {String(s.value)}
                  </span>
                </div>
              ))}
            </div>

            <div className="bikedetail__divider" />

            {/* Description */}
            {v.description && (
              <div className="bikedetail__desc">
                <h3>About This Vehicle</h3>
                <p>{v.description}</p>
              </div>
            )}

            {/* CTAs */}
            <div className="bikedetail__actions">
              <Link
                href="/contact"
                className="bikedetail__btn bikedetail__btn--primary"
              >
                Inquire Now
              </Link>
              <a
                href="https://wa.me/94XXXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                className="bikedetail__btn bikedetail__btn--whatsapp"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
