"use client";

export default function AboutPage() {
  return (
    <section className="page-section">
      <div className="page-container">
        <h1 className="page-heading">About JL Racing</h1>
        <div className="about-grid">
          <div className="about-text">
            <p className="about-intro">
              JL Racing is Sri Lanka&apos;s premier destination for
              high-performance motorcycles, genuine spare parts, and expert
              services. With years of passion and expertise in the motorcycle
              industry, we bring riders the finest machines from around the
              world.
            </p>
            <p>
              Our commitment to quality, authenticity, and customer satisfaction
              sets us apart. Whether you&apos;re a seasoned rider or just
              starting your journey, JL Racing is your trusted partner on the
              road.
            </p>
            <div className="about-stats">
              <div className="stat-card">
                <span className="stat-number">500+</span>
                <span className="stat-label">Bikes Sold</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">10+</span>
                <span className="stat-label">Years Experience</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">1000+</span>
                <span className="stat-label">Happy Customers</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
