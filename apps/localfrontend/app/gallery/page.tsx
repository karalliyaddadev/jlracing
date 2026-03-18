"use client";

export default function GalleryPage() {
  return (
    <section className="page-section">
      <div className="page-container">
        <h1 className="page-heading">Gallery</h1>
        <p className="page-description">
          Explore our collection of stunning motorcycle photography, showroom
          highlights, and event moments.
        </p>
        <div className="gallery-grid">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div
              key={i}
              className={`gallery-item ${i === 1 || i === 6 ? "gallery-item--wide" : ""}`}
            >
              <div className="listing-card__placeholder">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="gallery-item__overlay">
                <span>View</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
