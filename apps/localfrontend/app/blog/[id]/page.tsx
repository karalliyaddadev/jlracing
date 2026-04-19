"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

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
}

export default function BlogPostPage() {
  const params = useParams();
  const id = params.id;

  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    fetch(`${CMS_API_URL}/api/blog/published/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Post not found");
        return res.json();
      })
      .then(setPost)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <section className="blogpost-section">
        <div className="blogpost-container">
          <p style={{ color: "#aaa", textAlign: "center", padding: "4rem 0" }}>
            Loading…
          </p>
        </div>
      </section>
    );
  }

  if (error || !post) {
    return (
      <section className="blogpost-section">
        <div className="blogpost-container">
          <Link href="/blog" className="blogpost-back">
            ←Back
          </Link>
          <p
            style={{ color: "#f87171", textAlign: "center", padding: "4rem 0" }}
          >
            {error ?? "Post not found"}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="blogpost-section">
      <div className="blogpost-container">
        <Link href="/blog" className="blogpost-back">
          ←Back
        </Link>

        <h1 className="blogpost-title">{post.title}</h1>

        <div className="blogpost-image">
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
                borderRadius: "inherit",
              }}
            />
          ) : (
            <div className="blogpost-image__placeholder">
              <svg
                width="64"
                height="64"
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

        <div className="blogpost-content">
          {post.article
            .split("\n")
            .map((paragraph, index) =>
              paragraph.trim() ? <p key={index}>{paragraph}</p> : null,
            )}
        </div>

        <div className="blogpost-author">{post.author}</div>
      </div>
    </section>
  );
}
