"use client";

import { useState, useEffect } from "react";
import { useDash } from "./DashProvider";
import { apiFetch } from "../../lib/api";

interface LiveStat {
  label: string;
  value: string;
  sub: string;
  icon: JSX.Element;
}

function StatIcon({ name }: { name: string }) {
  const icons: Record<string, JSX.Element> = {
    image: (
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
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    ),
    pen: (
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
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
    gallery: (
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
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="9" y1="21" x2="9" y2="9" />
      </svg>
    ),
    help: (
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
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    bike: (
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
        <circle cx="5.5" cy="17.5" r="3.5" />
        <circle cx="18.5" cy="17.5" r="3.5" />
        <path d="M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-3 11.5V14l-3-3 4-3 2 3h2" />
      </svg>
    ),
  };
  return icons[name] ?? <span>{name[0].toUpperCase()}</span>;
}

export default function DashHome() {
  const { admin, config } = useDash();
  const [stats, setStats] = useState<LiveStat[]>([]);
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      setStatsLoading(true);
      try {
        if (config.key === "local") {
          const [heroes, blogs, gallery, faqCats] = await Promise.all([
            apiFetch("/api/hero?site=LOCAL").then((r) =>
              r.ok ? r.json() : [],
            ),
            apiFetch("/api/blog").then((r) => (r.ok ? r.json() : [])),
            apiFetch("/api/gallery?site=LOCAL").then((r) =>
              r.ok ? r.json() : [],
            ),
            apiFetch("/api/faq/categories?site=LOCAL").then((r) =>
              r.ok ? r.json() : [],
            ),
          ]);
          const faqItems = (faqCats as any[]).reduce(
            (s: number, c: any) => s + (c.items?.length ?? 0),
            0,
          );
          setStats([
            {
              label: "Hero Banners",
              value: String((heroes as any[]).length),
              sub: "active slides",
              icon: <StatIcon name="image" />,
            },
            {
              label: "Blog Posts",
              value: String((blogs as any[]).length),
              sub: "total posts",
              icon: <StatIcon name="pen" />,
            },
            {
              label: "Gallery Items",
              value: String((gallery as any[]).length),
              sub: "media items",
              icon: <StatIcon name="gallery" />,
            },
            {
              label: "FAQ Q&As",
              value: String(faqItems),
              sub: "across all categories",
              icon: <StatIcon name="help" />,
            },
          ]);
        } else {
          const [heroes, listings, gallery, faqCats] = await Promise.all([
            apiFetch("/api/hero?site=FOREIGN").then((r) =>
              r.ok ? r.json() : [],
            ),
            apiFetch("/api/listings").then((r) => (r.ok ? r.json() : [])),
            apiFetch("/api/gallery?site=FOREIGN").then((r) =>
              r.ok ? r.json() : [],
            ),
            apiFetch("/api/faq/categories?site=FOREIGN").then((r) =>
              r.ok ? r.json() : [],
            ),
          ]);
          const faqItems = (faqCats as any[]).reduce(
            (s: number, c: any) => s + (c.items?.length ?? 0),
            0,
          );
          setStats([
            {
              label: "Hero Banners",
              value: String((heroes as any[]).length),
              sub: "active slides",
              icon: <StatIcon name="image" />,
            },
            {
              label: "Bike Listings",
              value: String((listings as any[]).length),
              sub: "foreign listings",
              icon: <StatIcon name="bike" />,
            },
            {
              label: "Gallery Items",
              value: String((gallery as any[]).length),
              sub: "media items",
              icon: <StatIcon name="gallery" />,
            },
            {
              label: "FAQ Q&As",
              value: String(faqItems),
              sub: "across all categories",
              icon: <StatIcon name="help" />,
            },
          ]);
        }
      } catch {
        // leave stats empty on error
      } finally {
        setStatsLoading(false);
      }
    }
    loadStats();
  }, [config.key]);

  return (
    <div className="dash-home">
      <div className="dash-home__welcome">
        <div>
          <h1 className="dash-home__title">
            Welcome back, {admin?.name ?? "Admin"}
          </h1>
          <p className="dash-home__subtitle">
            Manage your {config.key === "local" ? "local" : "international"}{" "}
            website content from here
          </p>
        </div>
      </div>

      {/* ── Live stat cards ── */}
      <div className="dash-home__stats">
        {statsLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="dash-stat-card dash-stat-card--skeleton">
                <div className="dash-stat-card__icon dash-stat-card__icon--skeleton" />
                <div className="dash-stat-card__info">
                  <span className="dash-stat-card__value--skeleton" />
                  <span className="dash-stat-card__label--skeleton" />
                </div>
              </div>
            ))
          : stats.map((s) => (
              <div key={s.label} className="dash-stat-card">
                <div className="dash-stat-card__icon">{s.icon}</div>
                <div className="dash-stat-card__info">
                  <span className="dash-stat-card__value">{s.value}</span>
                  <span className="dash-stat-card__label">{s.label}</span>
                  <span className="dash-stat-card__sub">{s.sub}</span>
                </div>
              </div>
            ))}
      </div>

      <div className="dash-home__section">
        <h2 className="dash-home__section-title">Quick Actions</h2>
        <div className="dash-home__actions">
          {config.actions.map((a) => (
            <a key={a.label} href={a.href} className="dash-action-card">
              {a.label}
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
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
