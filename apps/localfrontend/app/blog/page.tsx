"use client";

export default function BlogPage() {
  return (
    <section className="page-section">
      <div className="page-container">
        <h1 className="page-heading">Blog</h1>
        <p className="page-description">
          Stay updated with the latest news, riding tips, bike reviews, and
          stories from the JL Racing community.
        </p>
        <div className="blog-grid">
          {[1, 2, 3].map((i) => (
            <article key={i} className="blog-card">
              <div className="blog-card__image">
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
              <div className="blog-card__body">
                <span className="blog-card__date">March {i * 5}, 2026</span>
                <h3 className="blog-card__title">Blog Post Title #{i}</h3>
                <p className="blog-card__excerpt">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Discover insights about the motorcycle world...
                </p>
                <span className="blog-card__readmore">Read More →</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
