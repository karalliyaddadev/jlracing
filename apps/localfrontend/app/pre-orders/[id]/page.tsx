"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import ImageLightbox from "../../components/ImageLightbox";

const BACKEND_URL = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000").replace(/\/$/, "");

function resolveBackendUrl(assetPath?: string | null) {
  if (!assetPath) return null;
  if (/^https?:\/\//i.test(assetPath)) return assetPath;
  return `${BACKEND_URL}${assetPath.startsWith("/") ? "" : "/"}${assetPath}`;
}

type PreOrderImage = {
  id: number;
  url: string;
  isPrimary: boolean;
  sortOrder: number;
};
type PreOrderBike = {
  id: number;
  displayId: string;
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
  pdfUrl?: string | null;
  images: PreOrderImage[];
};

export default function PreOrderDetailPage() {
  const { id } = useParams();
  const [bike, setBike] = useState<PreOrderBike | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [activeThumb, setActiveThumb] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!id) return;
    fetch(`${BACKEND_URL}/api/pre-orders/${id}`)
      .then((r) => {
        if (r.status === 404) {
          setNotFound(true);
          return null;
        }
        return r.json();
      })
      .then((data) => {
        if (data) setBike(data);
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

  if (notFound || !bike) {
    return (
      <section className="bikedetail-notfound">
        <h2>Bike not found.</h2>
        <Link href="/pre-orders" className="bikedetail__back">
          ← Back to Pre Orders
        </Link>
      </section>
    );
  }

  const displayStatus = bike.status === "in-stock" ? "In Stock" : "Pre Order";

  const specs = [
    { label: "Brand", value: bike.brand },
    { label: "Model", value: bike.model },
    { label: "Year", value: bike.year ? String(bike.year) : null },
    { label: "Engine", value: bike.cc },
    { label: "Color", value: bike.colour },
    { label: "Availability", value: displayStatus },
    { label: "Expected Arrival", value: bike.expectedArrival },
    { label: "Deposit Required", value: bike.depositRequired },
  ].filter((s) => s.value);

  const sortedImages = [...(bike.images ?? [])].sort((a, b) => {
    if (a.isPrimary && !b.isPrimary) return -1;
    if (!a.isPrimary && b.isPrimary) return 1;
    return a.sortOrder - b.sortOrder;
  });
  const brochureUrl = resolveBackendUrl(bike.pdfUrl?.trim() || null);

  return (
    <section className="bikedetail-page">
      <div className="bikedetail-container">
        {/* ── Back ── */}
        <Link href="/pre-orders" className="bikedetail__back">
          ← Back to Pre Orders
        </Link>

        <div className="bikedetail__layout">
          {/* ── Left — Gallery ── */}
          <div className="bikedetail__gallery">
            <div
              className="bikedetail__main-img"
              onClick={() =>
                sortedImages.length > 0 && setLightboxIndex(activeThumb)
              }
            >
              {sortedImages.length > 0 ? (
                <img
                  src={resolveBackendUrl(sortedImages[activeThumb]?.url ?? sortedImages[0].url) ?? ""}
                  alt={`${bike.brand} ${bike.model}`}
                />
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: 300,
                    background: "#f0f0f0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 8,
                    color: "#aaa",
                  }}
                >
                  No image available
                </div>
              )}
            </div>
            {sortedImages.length > 1 && (
              <div className="bikedetail__thumbs">
                {sortedImages.map((img, i) => (
                  <div
                    key={img.id}
                    className={`bikedetail__thumb${activeThumb === i ? " bikedetail__thumb--active" : ""}`}
                    onClick={() => setActiveThumb(i)}
                  >
                    <img
                      src={resolveBackendUrl(img.url) ?? ""}
                      alt={`View ${i + 1}`}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── Right — Info ── */}
          <div className="bikedetail__info">
            {/* Status badge */}
            <span
              className={`bikedetail__badge${displayStatus === "Pre Order" ? " bikedetail__badge--preorder" : ""}`}
            >
              {displayStatus}
            </span>

            <h1 className="bikedetail__title">
              {bike.brand} {bike.model}
            </h1>
            {bike.year && <p className="bikedetail__year">{bike.year} Model</p>}

            {bike.price != null && (
              <p className="bikedetail__price">
                Rs.&nbsp;{bike.price.toLocaleString("en-LK")}.00
              </p>
            )}

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
            {bike.description && (
              <div className="bikedetail__desc">
                <h3>About This Bike</h3>
                <p>{bike.description}</p>
              </div>
            )}

            {/* new button is added */}
            {/* CTA Buttons */}
            <div className="bikedetail__actions">
              <Link
                href="/contact"
                className="bikedetail__btn bikedetail__btn--primary"
              >
                Inquire / Pre-Order
              </Link>
              <a
                href="https://wa.me/94717910091"
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
              {brochureUrl && (
                <a
                  href={brochureUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bikedetail__btn bikedetail__btn--brochure"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="12" y1="18" x2="12" y2="12" />
                    <line x1="9" y1="15" x2="15" y2="15" />
                  </svg>
                  View Brochure
                </a>
              )}
            </div>

            {/* Deposit / Reserve note */}
            {bike.depositRequired && (
              <div className="po-detail__deposit-note">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span className="po-detail__deposit-text">
                  <span>
                    Deposit required to reserve:{" "}
                    <strong>{bike.depositRequired}</strong>.
                  </span>
                  <span>
                    Contact us to secure your slot before stock runs out.
                  </span>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      {lightboxIndex !== null && (
        <ImageLightbox
          images={sortedImages
            .map((img) => resolveBackendUrl(img.url))
            .filter((src): src is string => Boolean(src))}
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
