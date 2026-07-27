"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";

const CMS_API_URL =
  process.env.NEXT_PUBLIC_CMS_API_URL || "http://localhost:5001";

// Keys that use CMS backend auth (modal flow)
const CMS_CARDS = ["local", "international"] as const;
type CmsCardKey = (typeof CMS_CARDS)[number];

// Where to redirect after successful CMS login
const CMS_DASHBOARD: Record<CmsCardKey, string> = {
  local: "/local",
  international: "/international",
};

interface PortalCard {
  key: string;
  title: string;
  features: string[];
  signInUrl: string;
  available: boolean;
}

const cards: PortalCard[] = [
  {
    key: "pos",
    title: "POS",
    features: ["Bike Inventory", "Spare Parts"],
    signInUrl: "https://admin.jlracingshop.com/",
    available: true,
  },
  {
    key: "local",
    title: "Local Website",
    features: [
      "Home Page- Hero Banner",
      "Home Page- Video (16:9)",
      "Pre-Listing",
      "Blog",
      "Gallery Videos",
    ],
    signInUrl: "",
    available: true,
  },
  {
    key: "international",
    title: "International Website",
    features: ["Home Page- Video (16:9)", "Listing", "Gallery"],
    signInUrl: "",
    available: true,
  },
  {
    key: "employee",
    title: "Employee Management",
    features: ["Will be Available soon"],
    signInUrl: "#",
    available: false,
  },
];

// ─── CMS Sign-In Modal ────────────────────────────────────────────────────────

interface ModalProps {
  cardKey: CmsCardKey;
  cardTitle: string;
  onClose: () => void;
}

function CmsSignInModal({ cardKey, cardTitle, onClose }: ModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Lock background scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(`${CMS_API_URL}/api/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = (await res.json()) as {
        admin?: { id: number; name: string; email: string };
        message?: string;
      };
      if (!res.ok) {
        throw new Error(data?.message || "Invalid credentials");
      }
      // Cookies (access_token + refresh_token) are set by the server.
      // Just redirect to the appropriate dashboard.
      window.location.href = CMS_DASHBOARD[cardKey];
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sign in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cmsmodal-overlay" onClick={onClose}>
      <div
        className="cmsmodal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cmsmodal-title"
      >
        {/* Close */}
        <button
          className="cmsmodal__close"
          onClick={onClose}
          aria-label="Close"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M1 1L15 15M15 1L1 15"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* Logo */}
        <div className="cmsmodal__logo">
          <img src="/img/logo.jpg" alt="JL Racing" />
        </div>

        <p className="cmsmodal__eyebrow">JL RACING</p>
        <h2 className="cmsmodal__title" id="cmsmodal-title">
          {cardTitle} CMS
        </h2>
        <p className="cmsmodal__subtitle">
          Enter your administrator credentials to continue
        </p>

        <form className="cmsmodal__form" onSubmit={handleSubmit} noValidate>
          <div className="cmsmodal__field">
            <label htmlFor="cms-email">Email address</label>
            <input
              id="cms-email"
              type="email"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              placeholder="admin@jlracing.lk"
              autoComplete="email"
              autoFocus
              required
            />
          </div>

          <div className="cmsmodal__field">
            <label htmlFor="cms-password">Password</label>
            <div className="cmsmodal__pw-wrap">
              <input
                id="cms-password"
                type={showPw ? "text" : "password"}
                value={password}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
                placeholder="Enter your password"
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                className="cmsmodal__pw-eye"
                onClick={() => setShowPw((v) => !v)}
                aria-label={showPw ? "Hide password" : "Show password"}
              >
                {showPw ? (
                  <svg
                    width="16"
                    height="16"
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
                    width="16"
                    height="16"
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
            <p className="cmsmodal__error" role="alert">
              {error}
            </p>
          )}

          <button type="submit" className="cmsmodal__submit" disabled={loading}>
            {loading ? <span className="cmsmodal__spinner" /> : null}
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function Page() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [activeModal, setActiveModal] = useState<CmsCardKey | null>(null);

  const openModal = (key: CmsCardKey) => setActiveModal(key);
  const closeModal = () => setActiveModal(null);

  const activeCard = cards.find((c) => c.key === activeModal);

  return (
    <main className="admin">
      <div className="admin__bg" />
      <div className="admin__overlay" />

      <div className="admin__container">
        <header className="admin__header">
          <img
            src="/img/logo.jpg"
            alt="JL Racing"
            className="admin__logo-img"
          />
          <h1 className="admin__title">Admin Portal</h1>
          <p className="admin__subtitle">管理ポータル</p>
        </header>

        <div className="admin__grid">
          {cards.map((card) => (
            <div
              key={card.key}
              className={`admin__card ${
                hoveredCard === card.key ? "is-hovered" : ""
              } ${!card.available ? "is-disabled" : ""}`}
              onMouseEnter={() => setHoveredCard(card.key)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <h2 className="admin__card-title">{card.title}</h2>

              <ul className="admin__card-features">
                {card.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>

              <div className="admin__card-footer">
                {card.available ? (
                  CMS_CARDS.includes(card.key as CmsCardKey) ? (
                    <button
                      className="admin__card-btn"
                      onClick={() => openModal(card.key as CmsCardKey)}
                    >
                      Sign In
                    </button>
                  ) : (
                    <a href={card.signInUrl} className="admin__card-btn">
                      Sign In
                    </a>
                  )
                ) : (
                  <span className="admin__card-btn admin__card-btn--disabled">
                    Sign In
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {activeModal && activeCard && (
        <CmsSignInModal
          cardKey={activeModal}
          cardTitle={activeCard.title}
          onClose={closeModal}
        />
      )}
    </main>
  );
}
