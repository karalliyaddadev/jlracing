"use client";

import { useState } from "react";
import Link from "next/link";
import Pagination from "../components/Pagination";

const blogPosts = [
  {
    id: 1,
    title: "Top 5 Motorcycle Maintenance Tips Every Rider Should Know",
    author: "JL Racing Team",
    date: "March 15, 2026",
    excerpt:
      "Keep your motorcycle running at peak performance with these essential maintenance tips from our expert mechanics.",
    image: "/images/blog-1.jpg",
  },
  {
    id: 2,
    title: "Best Riding Routes in Sri Lanka: A Complete Guide",
    author: "JL Racing Team",
    date: "March 10, 2026",
    excerpt:
      "Discover the most scenic and thrilling motorcycle routes across Sri Lanka, from coastal roads to mountain passes.",
    image: "/images/blog-2.jpg",
  },
  {
    id: 3,
    title: "How to Choose the Right Motorcycle for Your Riding Style",
    author: "JL Racing Team",
    date: "March 5, 2026",
    excerpt:
      "Whether you're a beginner or an experienced rider, finding the perfect motorcycle is key. Here's our buying guide.",
    image: "/images/blog-3.jpg",
  },
];

const ITEMS_PER_PAGE = 6;

export default function BlogPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(blogPosts.length / ITEMS_PER_PAGE);
  const paginated = blogPosts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );
  return (
    <>
      {/* ── Hero ── */}
      <section className="blog-hero">
        <div
          className="blog-hero__bg"
          style={{ backgroundImage: "url('/images/about-hero.jpg')" }}
        />
        <div className="blog-hero__overlay" />
        <div className="blog-hero__content">
          <span className="blog-hero__label">Blog</span>
          <h1 className="blog-hero__title">
            Explore <em>stories</em> and insights
            <br />
            made for true motorcycle enthusiasts.
          </h1>
        </div>
      </section>

      {/* ── Posts ── */}
      <section className="blog-section">
        <div className="blog-container">
          <div className="blog-grid">
            {paginated.map((post) => (
              <article key={post.id} className="blog-card">
                <div className="blog-card__image">
                  <div className="blog-card__image-placeholder">
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
                  <h3 className="blog-card__title">{post.title}</h3>
                  <div className="blog-card__meta">
                    <span className="blog-card__author">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                      {post.author}
                    </span>
                    <span className="blog-card__date">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <rect
                          x="3"
                          y="4"
                          width="18"
                          height="18"
                          rx="2"
                          ry="2"
                        />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                      {post.date}
                    </span>
                  </div>
                  <p className="blog-card__excerpt">{post.excerpt}</p>
                  <Link
                    href={`/blog/${post.id}`}
                    className="blog-card__readmore-btn"
                  >
                    Read More
                  </Link>
                </div>
              </article>
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </section>
    </>
  );
}
