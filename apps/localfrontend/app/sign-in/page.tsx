"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const CMS_API_URL =
  process.env.NEXT_PUBLIC_CMS_API_URL || "http://localhost:5001";
const STORAGE_TOKEN = "local_cms_token";
const STORAGE_ADMIN = "local_cms_admin";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Already logged in → skip to dashboard
  useEffect(() => {
    if (localStorage.getItem(STORAGE_TOKEN)) {
      router.replace("/dashboard");
    }
  }, [router]);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(`${CMS_API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.message || "Invalid credentials");
      }
      localStorage.setItem(STORAGE_TOKEN, data.accessToken);
      localStorage.setItem(STORAGE_ADMIN, JSON.stringify(data.admin));
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sign in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="lcms-auth-shell">
      {/* ── Left Hero ── */}
      <section className="lcms-auth-hero">
        <div className="lcms-auth-brand">
          <Image
            src="/landing/logo.png"
            alt="JL Racing"
            width={72}
            height={72}
            style={{ borderRadius: 12 }}
            priority
          />
          <div>
            <p className="lcms-auth-eyebrow">JL RACING</p>
            <h1 className="lcms-auth-hero-title">Local Website CMS</h1>
          </div>
        </div>
        <p className="lcms-auth-hero-desc">
          Manage your local website content — hero banners, bike listings, blog
          posts, gallery, and more.
        </p>
        <ul className="lcms-auth-features">
          <li>
            <span className="lcms-auth-feat-icon">◈</span>
            Hero &amp; Banner Management
          </li>
          <li>
            <span className="lcms-auth-feat-icon">◈</span>
            Bike Listings
          </li>
          <li>
            <span className="lcms-auth-feat-icon">◈</span>
            Blog &amp; Articles
          </li>
          <li>
            <span className="lcms-auth-feat-icon">◈</span>
            Gallery &amp; Media
          </li>
        </ul>
      </section>

      {/* ── Right Form Card ── */}
      <section className="lcms-auth-card">
        <div className="lcms-auth-card-topbar">
          <span className="lcms-auth-card-brand">
            JL <span>Racing</span> &middot; Local CMS
          </span>
          <span className="lcms-auth-secure">
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            Secure
          </span>
        </div>

        <div className="lcms-auth-card-body">
          <div className="lcms-auth-form-card">
            <div className="lcms-auth-form-accent" />
            <div className="lcms-auth-card-inner">
              <p className="lcms-auth-welcome">Welcome back</p>
              <h2 className="lcms-auth-form-title">Admin Sign In</h2>
              <p className="lcms-auth-subtitle">
                Enter your CMS administrator credentials to continue.
              </p>

              <form
                onSubmit={handleLogin}
                className="lcms-auth-form"
                noValidate
              >
                <div className="lcms-field-group">
                  <label htmlFor="lcms-email">Email address</label>
                  <input
                    id="lcms-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@jlracing.lk"
                    autoComplete="email"
                    autoFocus
                    required
                  />
                </div>

                <div className="lcms-field-group">
                  <label htmlFor="lcms-password">Password</label>
                  <div className="lcms-pw-wrap">
                    <input
                      id="lcms-password"
                      type={showPw ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      required
                    />
                    <button
                      type="button"
                      className="lcms-pw-eye"
                      onClick={() => setShowPw((v) => !v)}
                      aria-label={showPw ? "Hide password" : "Show password"}
                    >
                      {showPw ? (
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                          <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                          <line x1="1" y1="1" x2="23" y2="23" />
                        </svg>
                      ) : (
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {error && (
                  <p className="lcms-auth-error" role="alert">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  className="lcms-btn-primary"
                  disabled={loading}
                >
                  {loading && <span className="lcms-spinner" />}
                  {loading ? "Signing in…" : "Sign In"}
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="lcms-auth-card-footer">
          <span>Secure &middot; Reliable &middot; Professional</span>
          <span>&copy; 2026 JL Racing. All rights reserved.</span>
        </div>
      </section>
    </main>
  );
}
