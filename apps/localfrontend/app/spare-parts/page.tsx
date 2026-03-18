"use client";

export default function SparePartsPage() {
  return (
    <section className="page-section">
      <div className="page-container">
        <h1 className="page-heading">Spare Parts</h1>
        <p className="page-description">
          Genuine and aftermarket spare parts for a wide range of motorcycle
          brands. Quality parts delivered fast.
        </p>
        <div className="listings-grid">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="listing-card">
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
                    <path d="M11 4a7 7 0 100 14A7 7 0 0011 4zm0 0V2m0 18v-2m7-7h2M2 11h2m11.657-5.657l1.414-1.414M4.929 19.071l1.414-1.414m12.728 0l1.414 1.414M4.929 4.929L6.343 6.343" />
                  </svg>
                </div>
              </div>
              <div className="listing-card__body">
                <span className="listing-card__badge">Available</span>
                <h3 className="listing-card__title">Spare Part #{i}</h3>
                <p className="listing-card__price">Contact for Price</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
