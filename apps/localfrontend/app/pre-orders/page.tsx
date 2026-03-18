"use client";

export default function PreOrdersPage() {
  return (
    <section className="page-section">
      <div className="page-container">
        <h1 className="page-heading">Pre Orders</h1>
        <p className="page-description">
          Upcoming arrivals and pre-order opportunities. Reserve your dream bike
          before it hits the showroom floor.
        </p>
        <div className="listings-grid">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="listing-card listing-card--preorder">
              <div className="listing-card__image">
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
              </div>
              <div className="listing-card__body">
                <span className="listing-card__badge listing-card__badge--coming">
                  Coming Soon
                </span>
                <h3 className="listing-card__title">
                  Upcoming Motorcycle #{i}
                </h3>
                <p className="listing-card__price">Pre-order Available</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
