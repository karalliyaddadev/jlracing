"use client";

export default function GalleryPage() {
  return (
    <section className="page-section">
      <div className="page-container">
        <h1 className="page-heading">Gallery</h1>
        <p className="page-description">
          A look inside JL Racing — our bikes, events, and the passion that
          drives us.
        </p>
        <div className="gallery-grid">
          {[
            { wide: true },
            { wide: false },
            { wide: false },
            { wide: true },
            { wide: false },
            { wide: false },
          ].map((item, i) => (
            <div
              key={i}
              className={`gallery-item${item.wide ? " gallery-item--wide" : ""}`}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  background: "linear-gradient(135deg, #2d3748, #4a5568)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="rgba(255,255,255,0.25)"
                  strokeWidth="1.5"
                >
                  <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="gallery-item__overlay">View</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
