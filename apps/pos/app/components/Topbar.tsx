"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "./ThemeProvider";
import { useAdmin } from "./AdminContext";
import {
  IconSun,
  IconMoon,
  IconBell,
  IconSearch,
  IconClock,
  IconLogout,
  IconChevronDown,
  IconChevronNav,
} from "../lib/icons";

const BREADCRUMBS: Record<string, string> = {
  "/dashboard":            "Dashboard",
  "/dashboard/users":     "User Management",
  "/dashboard/invoices":  "Invoice Management",
  "/dashboard/inventory": "Inventory Management",
  "/dashboard/access":    "Access Management",
};

export function Topbar() {
  const { theme, toggleTheme } = useTheme();
  const { admin, logout } = useAdmin();
  const pathname = usePathname();
  const [clockTime, setClockTime] = useState("");
  const [clockDate, setClockDate] = useState("");

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setClockTime(now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }));
      setClockDate(now.toLocaleDateString("en-US", { weekday: "short", year: "numeric", month: "short", day: "numeric" }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const pageLabel = BREADCRUMBS[pathname] ?? "Dashboard";

  return (
    <header className="topbar">
      <div className="topbar-left">
        <div className="topbar-breadcrumb">
          <span className="topbar-breadcrumb-root">POS</span>
          <IconChevronNav />
          <span className="topbar-breadcrumb-page">{pageLabel}</span>
        </div>
        <div className="topbar-search">
          <IconSearch />
          <input type="text" placeholder="Search anything…" />
        </div>
      </div>

      {clockTime && (
        <div className="topbar-clock">
          <IconClock />
          <div className="topbar-clock-text">
            <span className="clock-time">{clockTime}</span>
            <span className="clock-date">{clockDate}</span>
          </div>
        </div>
      )}

      <div className="topbar-right">
        <button type="button" className="icon-btn theme-btn" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === "light" ? <IconMoon /> : <IconSun />}
        </button>
        <button type="button" className="icon-btn notif-btn" aria-label="Notifications">
          <IconBell />
          <span className="notif-badge">3</span>
        </button>
        <div className="topbar-divider" />
        <div className="admin-pill">
          <div className="admin-avatar">{admin.name.charAt(0).toUpperCase()}</div>
          <div className="admin-info">
            <span className="admin-name">{admin.name}</span>
            <span className="admin-role">Administrator</span>
          </div>
          <IconChevronDown />
        </div>
        <button type="button" className="topbar-logout-btn" onClick={logout} aria-label="Sign out">
          <IconLogout />
          <span>Sign out</span>
        </button>
      </div>
    </header>
  );
}
