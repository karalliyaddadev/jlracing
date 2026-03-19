"use client";

export default function ContactPage() {
  return (
    <section className="page-section">
      <div className="page-container">
        <h1 className="page-heading">Contact Us</h1>
        <p className="page-description">
          Have a question or want to make an enquiry? Get in touch with the JL
          Racing team — we&apos;re happy to help.
        </p>

        <div className="about-grid">
          <div className="about-stats">
            <div className="stat-card">
              <span className="stat-number">📍</span>
              <span className="stat-label">Location</span>
              <p
                style={{
                  fontSize: "0.85rem",
                  marginTop: "0.5rem",
                  color: "var(--text-dark-muted)",
                }}
              >
                Colombo, Sri Lanka
              </p>
            </div>
            <div className="stat-card">
              <span className="stat-number">📞</span>
              <span className="stat-label">Phone</span>
              <p
                style={{
                  fontSize: "0.85rem",
                  marginTop: "0.5rem",
                  color: "var(--text-dark-muted)",
                }}
              >
                +94 XXX XXX XXX
              </p>
            </div>
            <div className="stat-card">
              <span className="stat-number">✉️</span>
              <span className="stat-label">Email</span>
              <p
                style={{
                  fontSize: "0.85rem",
                  marginTop: "0.5rem",
                  color: "var(--text-dark-muted)",
                }}
              >
                info@jlracing.lk
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
