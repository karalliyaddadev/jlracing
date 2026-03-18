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
          <span className="services__label">WHAT WE OFFER</span>
          <h2 className="services__title">Our Services</h2>
          <p className="services__subtitle">
            From sourcing to delivery, we handle every aspect of your motorcycle
            journey with expertise and care.
          </p>

          <div className="services__grid">
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
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <path d="M8 21h8M12 17v4" />
                </svg>
              </div>
              <div>
                <h4 className="service-feature__title">Direct Imports</h4>
                <p className="service-feature__text">
                  We source premium motorcycles directly from Japan and
                  worldwide markets, ensuring authenticity and competitive
                  pricing for every unit.
                </p>
              </div>
            </div>

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
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
                </svg>
              </div>
              <div>
                <h4 className="service-feature__title">Quality Inspection</h4>
                <p className="service-feature__text">
                  Every motorcycle undergoes a rigorous multi-point inspection
                  process, from engine performance to frame integrity, before
                  being listed for sale.
                </p>
              </div>
            </div>

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
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                </svg>
              </div>
              <div>
                <h4 className="service-feature__title">Expert Support</h4>
                <p className="service-feature__text">
                  Our team of experts is here to help you every step of the way,
                  from choosing the right bike to troubleshooting and
                  after-sales support.
                </p>
              </div>
            </div>

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
                  <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h4 className="service-feature__title">Warranty Support</h4>
                <p className="service-feature__text">
                  Peace of mind with our comprehensive warranty coverage. Simply
                  submit a claim and track it in real time for a hassle-free
                  experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
