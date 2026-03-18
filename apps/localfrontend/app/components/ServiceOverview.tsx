export default function ServiceOverview() {
  return (
    <section className="services">
      <div className="services__container">
        {/* Left — Image */}
        <div className="services__image">
          <div
            className="services__image-bg"
            style={{ backgroundImage: "url(/images/service-hero.jpg)" }}
          />
          <div className="services__image-overlay" />
          <div className="services__image-badge">
            <span className="services__image-badge-num">10+</span>
            <span className="services__image-badge-text">
              Years of
              <br />
              Excellence
            </span>
          </div>
        </div>

        {/* Right — Features */}
        <div className="services__content">
          <span className="services__label">OUR PROMISE</span>
          <h2 className="services__title">Why Choose Us</h2>
          <p className="services__subtitle">
            We go beyond selling bikes — we build lasting trust through
            transparency, quality, and a genuine passion for motorcycles.
          </p>

          <div className="services__grid">
            {/* Card 1 */}
            <div className="service-feature">
              <div className="service-feature__icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M21 10V7a2 2 0 00-2-2H5a2 2 0 00-2 2v3" />
                  <path d="M3 10h18l-1.5 7H4.5L3 10z" />
                  <circle cx="7.5" cy="19" r="1.5" />
                  <circle cx="16.5" cy="19" r="1.5" />
                </svg>
              </div>
              <div>
                <h4 className="service-feature__title">
                  Trusted Japanese Bike Importer
                </h4>
                <p className="service-feature__text">
                  We mainly import genuine Japanese bikes across all categories,
                  with selected European models available through trusted
                  sourcing.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="service-feature">
              <div className="service-feature__icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M9 12l2 2 4-4" />
                  <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7l-9-5z" />
                </svg>
              </div>
              <div>
                <h4 className="service-feature__title">
                  Genuine &amp; Transparent Deals
                </h4>
                <p className="service-feature__text">
                  From used bikes to brand-new imports, every deal is completed
                  with proper documents, honest pricing, and customer trust.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="service-feature">
              <div className="service-feature__icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <path d="M16 2v4M8 2v4M3 10h18" />
                  <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
                </svg>
              </div>
              <div>
                <h4 className="service-feature__title">Pre-Order Any Model</h4>
                <p className="service-feature__text">
                  Customers can pre-order Japanese bikes and selected European
                  models with a reliable importing process and clear delivery
                  updates.
                </p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="service-feature">
              <div className="service-feature__icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
                </svg>
              </div>
              <div>
                <h4 className="service-feature__title">
                  Spare Parts Availability
                </h4>
                <p className="service-feature__text">
                  We provide genuine spare parts for most Japanese bikes and
                  selected European models to ensure performance and
                  reliability.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
