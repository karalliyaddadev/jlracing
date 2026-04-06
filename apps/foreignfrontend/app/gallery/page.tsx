"use client";

import { useState } from "react";

// Placeholder gallery items — swap src for real media when available
const GALLERY_ITEMS = Array.from({ length: 18 }, (_, i) => ({
  id: i + 1,
  title: "Video Title",
  image:
    "https://images.pexels.com/photos/2393816/pexels-photo-2393816.jpeg?auto=compress&cs=tinysrgb&w=600",
}));

const PER_PAGE = 6;

export default function GalleryPage() {
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(GALLERY_ITEMS.length / PER_PAGE));
  const paginated = GALLERY_ITEMS.slice((page - 1) * PER_PAGE, page * PER_PAGE);

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
          <div className="gal-grid">
            {paginated.map((item) => (
              <div key={item.id} className="gal-card">
                <div className="gal-card__img-wrap">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="gal-card__img"
                  />
                </div>
                <p className="gal-card__title">{item.title}</p>
              </div>
            ))}
          </div>

          {/* Pagination */}
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
          )}
        </div>
      </section>
    </>
  );
}
