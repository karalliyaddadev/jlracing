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
      `${CMS_API_URL}/api/gallery/active?site=FOREIGN&page=${page}&limit=${PER_PAGE}`,
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load gallery");
        return res.json();
      })
      .then((data) => {
        setItems(data.items);
        setTotalPages(data.totalPages ?? 1);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [page]);

  return (
    <>
      {/* ── Hero ── */}
      <section className="gal-hero">
        <div className="gal-hero__bg" />
        <div className="gal-hero__overlay" />
        <div className="gal-hero__content">
          <span className="gal-hero__label">Gallery</span>
          <h1 className="gal-hero__heading">
            Highlighting our exports, vehicles,
            <br />
            and global operations
          </h1>
        </div>
      </section>

      {/* ── Grid ── */}
      <section className="gal-grid-section">
        <div className="gal-grid-section__inner">
          {loading ? (
            <p className="gal-status">Loading gallery…</p>
          ) : error ? (
            <p className="gal-status gal-status--error">{error}</p>
          ) : items.length === 0 ? (
            <p className="gal-status">No gallery items yet.</p>
          ) : (
            <div className="gal-grid">
              {items.map((item, i) => (
                <FadeIn key={`${page}-${item.id}`} className="gal-card" delay={i * 0.06}>
                  <div className="gal-card__img-wrap">
                    {item.mediaType === "video" ? (
                      <video
                        src={`${CMS_API_URL}${item.mediaUrl}`}
                        poster={
                          item.thumbnailUrl
                            ? `${CMS_API_URL}${item.thumbnailUrl}`
                            : undefined
                        }
                        className="gal-card__img"
                        controls
                        playsInline
                        preload="metadata"
                      />
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={`${CMS_API_URL}${item.mediaUrl}`}
                        alt={item.title}
                        className="gal-card__img"
                      />
                    )}
                  </div>
                  <p className="gal-card__title">{item.title}</p>
                </FadeIn>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <FadeIn>
            <div className="lst-pagination">
              <button
                className="lst-pagination__btn lst-pagination__btn--arrow"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                aria-label="Previous"
              >
                &lt;
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  className={`lst-pagination__btn${
                    page === n ? " lst-pagination__btn--active" : ""
                  }`}
                >
                  {n}
                </button>
              ))}
              <button
                className="lst-pagination__btn lst-pagination__btn--arrow"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                aria-label="Next"
              >
                &gt;
              </button>
            </div>
            </FadeIn>
          )}
        </div>
      </section>
    </>
  );
}
