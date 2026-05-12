"use client";

import { useState, useEffect } from "react";
import FadeIn from "../components/FadeIn";

const CMS_API_URL =
  process.env.NEXT_PUBLIC_CMS_API_URL || "http://localhost:5001";

const PER_PAGE = 6;

interface GalleryItem {
  id: number;
  title: string;
  mediaUrl: string;
  thumbnailUrl: string | null;
  mediaType: string;
  aspectRatio: string;
}

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(
      `${CMS_API_URL}/api/gallery/active?site=LOCAL&page=${page}&limit=${PER_PAGE}`,
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load gallery");
        return res.json();
      })
      .then((data) => {
        setItems(data.items);
        setTotalPages(data.totalPages);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [page]);

  return (
    <>
      {/* ── Hero ── */}
      <section className="gallery-hero">
        <div
          className="gallery-hero__bg"
          style={{ backgroundImage: "url('/images/about-hero.jpg')" }}
        />
        <div className="gallery-hero__overlay" />
        <div className="gallery-hero__content">
          <span className="gallery-hero__label">Gallery</span>
          <h1 className="gallery-hero__title">
            <em>Experience the ride</em> through
            <br />
            videos, highlights, and
            <br />
            powerful machine moments.
          </h1>
        </div>
      </section>

      <section className="page-section">
        <div className="page-container">
          {loading ? (
            <p className="gallery-status">Loading gallery…</p>
          ) : error ? (
            <p className="gallery-status gallery-status--error">{error}</p>
          ) : items.length === 0 ? (
            <p className="gallery-status">No gallery items yet.</p>
          ) : (
            <div className="video-grid">
              {items.map((item, i) => (
                <FadeIn key={`${page}-${item.id}`} delay={i * 0.07}>
                <div className="video-card">
                  <div className="video-card__thumb">
                    {item.mediaType === "video" ? (
                      <video
                        src={`${CMS_API_URL}${item.mediaUrl}`}
                        className="video-card__video"
                        controls
                        preload="metadata"
                        playsInline
                        poster={
                          item.thumbnailUrl
                            ? `${CMS_API_URL}${item.thumbnailUrl}`
                            : undefined
                        }
                      />
                    ) : (
                      <img
                        src={`${CMS_API_URL}${item.mediaUrl}`}
                        alt={item.title}
                        className="video-card__video"
                        style={{
                          objectFit: "cover",
                          width: "100%",
                          height: "100%",
                        }}
                      />
                    )}
                  </div>
                  <p className="video-card__title">{item.title}</p>
                </div>
                </FadeIn>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="gallery-pagination">
              <button
                className="gallery-pagination__btn"
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page === 1}
                aria-label="Previous page"
              >
                &#8249;
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  className={`gallery-pagination__btn${n === page ? " gallery-pagination__btn--active" : ""}`}
                  onClick={() => setPage(n)}
                >
                  {n}
                </button>
              ))}
              <button
                className="gallery-pagination__btn"
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                disabled={page === totalPages}
                aria-label="Next page"
              >
                &#8250;
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
