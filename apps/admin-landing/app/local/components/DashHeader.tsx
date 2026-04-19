"use client";

import { useState, useEffect, useRef } from "react";
import { useDash } from "./DashProvider";

export default function DashHeader() {
  const { admin, sidebarOpen, toggleSidebar, signOut } = useDash();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [menuOpen]);

  const initials = admin?.name
    ? admin.name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "AD";

  return (
    <header className="dash-header">
      {/* Left — mobile toggle + breadcrumb */}
      <div className="dash-header__left">
        {!sidebarOpen && (
          <button
            className="dash-header__menu-btn"
            onClick={toggleSidebar}
            aria-label="Open sidebar"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        )}
        <div className="dash-header__breadcrumb">
          <span className="dash-header__breadcrumb-root">Local CMS</span>
        </div>
      </div>

      {/* Right — user area */}
      <div className="dash-header__right" ref={menuRef}>
        <div
          className="dash-header__user"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <div className="dash-header__avatar">{initials}</div>
          <div className="dash-header__user-info">
            <span className="dash-header__user-name">
              {admin?.name ?? "Admin"}
            </span>
            <span className="dash-header__user-role">Administrator</span>
          </div>
          <svg
            className="dash-header__chevron"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>

        {menuOpen && (
          <div className="dash-header__dropdown">
            <div className="dash-header__dropdown-info">
              <span className="dash-header__dropdown-name">{admin?.name}</span>
              <span className="dash-header__dropdown-email">
                {admin?.email}
              </span>
            </div>
            <div className="dash-header__dropdown-divider" />
            <button className="dash-header__dropdown-item" onClick={signOut}>
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
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Sign Out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
