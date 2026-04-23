"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Pagination from "../components/Pagination";

const CMS_API_URL =
  process.env.NEXT_PUBLIC_CMS_API_URL || "http://localhost:5001";

interface BlogPost {
  id: number;
  title: string;
  author: string;
  publishedAt: string;
  article: string;
  imageUrl: string;
  imageRatio: string;
  isPublished: boolean;
}

const ITEMS_PER_PAGE = 6;

export default function BlogPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(
      `${CMS_API_URL}/api/blog/published?page=${currentPage}&limit=${ITEMS_PER_PAGE}`,
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch blog posts");
        return res.json();
      })
      .then((data) => {
        setPosts(data.posts);
        setTotalPages(data.totalPages);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [currentPage]);

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
          {loading && (
            <p
              style={{ textAlign: "center", color: "#aaa", padding: "3rem 0" }}
            >
              Loading posts…
            </p>
          )}
          {error && (
            <p
              style={{
                textAlign: "center",
                color: "#f87171",
                padding: "3rem 0",
              }}
            >
              {error}
            </p>
          )}
          {!loading && !error && (
            <>
              <div className="blog-grid">
                {posts.map((post) => (
                  <article key={post.id} className="blog-card">
                    <div className="blog-card__image">
                      {post.imageUrl ? (
                        <img
                          src={
                            post.imageUrl.startsWith("http")
                              ? post.imageUrl
                              : `${CMS_API_URL}${post.imageUrl}`
                          }
                          alt={post.title}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
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
                      )}
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
                          {new Date(post.publishedAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            },
                          )}
                        </span>
                      </div>
                      <p className="blog-card__excerpt">
                        {post.article.length > 160
                          ? post.article.slice(0, 160) + "…"
                          : post.article}
                      </p>
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
            </>
          )}
        </div>
      </section>
    </>
  );
}
