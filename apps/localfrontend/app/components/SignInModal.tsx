"use client";

import { FormEvent, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const CMS_API_URL =
  process.env.NEXT_PUBLIC_CMS_API_URL || "http://localhost:5001";
const STORAGE_TOKEN = "local_cms_token";
const STORAGE_ADMIN = "local_cms_admin";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function SignInModal({ isOpen, onClose }: Props) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  // Prevent background scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
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
      onClose();
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sign in");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="signin-overlay" onClick={onClose}>
      <div
        className="signin-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="signin-title"
      >
        {/* Close button */}
        <button
          className="signin-modal__close"
          onClick={onClose}
          aria-label="Close"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M1 1L17 17M17 1L1 17"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* Logo */}
        <div className="signin-modal__logo">
          <img src="/landing/logo.png" alt="JL Racing" />
        </div>

        <h2 className="signin-modal__title" id="signin-title">
          Admin Sign In
        </h2>
        <p className="signin-modal__subtitle">
          Sign in to manage the local website content
        </p>

        <form className="signin-modal__form" onSubmit={handleSubmit} noValidate>
          <div className="signin-modal__field">
            <label htmlFor="signin-email" className="signin-modal__label">
              Email
            </label>
            <input
              id="signin-email"
              type="email"
              className="signin-modal__input"
              placeholder="admin@jlracing.lk"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              autoFocus
            />
          </div>

          <div className="signin-modal__field">
            <label htmlFor="signin-password" className="signin-modal__label">
              Password
            </label>
            <div className="signin-modal__pw-wrapper">
              <input
                id="signin-password"
                type={showPw ? "text" : "password"}
                className="signin-modal__input signin-modal__input--pw"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                className="signin-modal__pw-toggle"
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
            <p className="signin-modal__error" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="signin-modal__submit"
            disabled={loading}
          >
            {loading ? <span className="signin-modal__spinner" /> : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
