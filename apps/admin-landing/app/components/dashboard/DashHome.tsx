"use client";

import { useDash } from "./DashProvider";

export default function DashHome() {
  const { admin, config } = useDash();

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

      <div className="dash-home__stats">
        {config.stats.map((s) => (
          <div key={s.label} className="dash-stat-card">
            <div className="dash-stat-card__icon">
              {s.icon[0].toUpperCase()}
            </div>
            <div className="dash-stat-card__info">
              <span className="dash-stat-card__value">{s.value}</span>
              <span className="dash-stat-card__label">{s.label}</span>
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
