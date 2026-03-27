"use client";

import { useState } from "react";

const VIDEOS = [
  { id: 1, src: "/gallery/video-1.mp4", title: "JL Racing Showroom" },
  { id: 2, src: "/gallery/video-2.mp4", title: "Kawasaki Ninja ZX-10R" },
  { id: 3, src: "/gallery/video-3.mp4", title: "Yamaha MT-09 Review" },
  { id: 4, src: "/gallery/video-4.mp4", title: "Honda CBR 600RR" },
  { id: 5, src: "/gallery/video-5.mp4", title: "Ducati Panigale V4" },
  { id: 6, src: "/gallery/video-6.mp4", title: "BMW S1000RR Delivery" },
  { id: 7, src: "/gallery/video-7.mp4", title: "Suzuki GSX-R1000" },
  { id: 8, src: "/gallery/video-8.mp4", title: "Track Day Highlights" },
  { id: 9, src: "/gallery/video-9.mp4", title: "New Arrivals March 2026" },
];

const PER_PAGE = 6;
const TOTAL_PAGES = Math.ceil(VIDEOS.length / PER_PAGE);

export default function GalleryPage() {
  const [page, setPage] = useState(1);

  const visible = VIDEOS.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <section className="page-section">
      <div className="page-container">
        <h1 className="page-heading">Gallery</h1>
        <p className="page-description">
          A look inside JL Racing — our bikes, events, and the passion that
          drives us.
        </p>

        <div className="video-grid">
          {visible.map((v) => (
            <div key={v.id} className="video-card">
              <div className="video-card__thumb">
                <video
                  src={v.src}
                  className="video-card__video"
                  controls
                  preload="metadata"
                  playsInline
                />
              </div>
              <p className="video-card__title">{v.title}</p>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="gallery-pagination">
          <button
            className="gallery-pagination__btn"
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            aria-label="Previous page"
          >
            &#8249;
          </button>
          {Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1).map((n) => (
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
            onClick={() => setPage((p) => Math.min(p + 1, TOTAL_PAGES))}
            disabled={page === TOTAL_PAGES}
            aria-label="Next page"
          >
            &#8250;
          </button>
        </div>
      </div>
    </section>
  );
}
