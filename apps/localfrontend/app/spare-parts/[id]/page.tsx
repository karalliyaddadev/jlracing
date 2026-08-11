"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import ImageLightbox from "../../components/ImageLightbox";
import { BackLink } from "../../components/BackLink";
import { WHATSAPP_LINK } from "../../lib/whatsapp";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

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

function getImageUrl(img: ProductImage): string {
  return `${BACKEND_URL}${img.url}`;
}

export default function SparePartDetailPage() {
  const { id } = useParams();
  const [part, setPart] = useState<PublicProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [activeThumb, setActiveThumb] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!id) return;
    fetch(`${BACKEND_URL}/api/bikes/products/${id}`)
      .then((r) => {
        if (r.status === 404) {
          setNotFound(true);
          return null;
        }
        return r.json();
      })
      .then((data) => {
        if (data) setPart(data);
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <section className="detail-loader-wrap">
        <span className="detail-loader__spinner" />
      </section>
    );
  }

  if (notFound || !part) {
    return (
      <section className="bikedetail-page">
        <div className="bikedetail-container">
          <Link href="/spare-parts" className="bikedetail__back">
            ← Back to Spare Parts
          </Link>
          <p style={{ padding: "4rem 0", textAlign: "center", color: "#888" }}>
            Part not found.
          </p>
        </div>
      </section>
    );
  }

  const status = getStatus(part.quantity, part.lowStockThreshold);
  const thumbs =
    part.images.length > 0
      ? part.images.map(getImageUrl)
      : ["/images/placeholder.png"];

  const specs = [
    { label: "Part No.", value: part.displayId },
    { label: "Brand", value: part.brand?.name ?? "—" },
    { label: "Category", value: part.category?.name ?? "—" },
    { label: "Availability", value: status },
    ...(part.quantity > 0
      ? [{ label: "In Stock", value: `${part.quantity} units` }]
      : []),
  ];

  return (
    <section className="bikedetail-page">
      <div className="bikedetail-container">
        {/* Back link */}
        <BackLink href="/spare-parts" label="Spare Parts" />

        <div className="bikedetail__layout">
          {/* ── Gallery ── */}
          <div className="bikedetail__gallery">
            <div
              className="bikedetail__main-img"
              onClick={() => setLightboxIndex(activeThumb)}
            >
              <img src={thumbs[activeThumb]} alt={part.name} />
              <span
                className={`bikedetail__badge${
                  status === "Out of Stock"
                    ? " bikedetail__badge--preorder"
                    : status === "Low Stock"
                      ? " bikedetail__badge--low"
                      : ""
                }`}
              >
                {status}
              </span>
            </div>

            {thumbs.length > 1 && (
              <div className="bikedetail__thumbs">
                {thumbs.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveThumb(i)}
                    className={`bikedetail__thumb${
                      i === activeThumb ? " bikedetail__thumb--active" : ""
                    }`}
                  >
                    <img src={src} alt={`${part.name} view ${i + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Info ── */}
          <div className="bikedetail__info">
            <span className="bikedetail__badge">
              {part.category?.name ?? ""}
            </span>
            <h1 className="bikedetail__title">{part.name}</h1>
            <p className="bikedetail__year">{part.brand?.name ?? ""}</p>

            <p className="bikedetail__price">
              Rs.&nbsp;
              {(part.sellingPrice ?? 0).toLocaleString("en-LK")}.00
            </p>

            <div className="bikedetail__divider" />

            {/* Specs */}
            <div className="bikedetail__specs">
              {specs.map((s) => (
                <div key={s.label} className="bikedetail__spec-item">
                  <span className="bikedetail__spec-label">{s.label}</span>
                  <span className="bikedetail__spec-value">{s.value}</span>
                </div>
              ))}
            </div>

            <div className="bikedetail__divider" />

            {/* Description */}
            {part.description && (
              <div className="bikedetail__desc">
                <h3>About This Part</h3>
                <p>{part.description}</p>
              </div>
            )}

            {/* CTA Buttons */}
            <div className="bikedetail__actions">
              <Link
                href="/contact"
                className="bikedetail__btn bikedetail__btn--primary"
              >
                Order Now
              </Link>
              <a
                href={WHATSAPP_LINK}
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
      {lightboxIndex !== null && (
        <ImageLightbox
          images={thumbs}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onChange={(i) => {
            setLightboxIndex(i);
            setActiveThumb(i);
          }}
        />
      )}
    </section>
  );
}
