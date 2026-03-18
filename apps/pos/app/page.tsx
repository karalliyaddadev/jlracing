"use client";

import Image from "next/image";
import { FormEvent, useEffect, useMemo, useState } from "react";

type PosAdmin = { id: number; name: string; email: string; lastLoginAt: string | null };
type Theme = "light" | "dark";
type SectionKey = "user" | "invoice" | "inventory" | "access";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";
const STORAGE_TOKEN = "pos_access_token";
const STORAGE_ADMIN = "pos_admin_profile";
const STORAGE_THEME = "pos_theme";

/* ── SVG icons (inline, zero-dependency) ─────────────────── */
const IconUsers = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);
const IconInvoice = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
  </svg>
);
const IconInventory = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
  </svg>
);
const IconAccess = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);
const IconChevronLeft = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6"/>
  </svg>
);
const IconChevronRight = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);
const IconSun = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);
const IconMoon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);
const IconLogout = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
);
const IconEye = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
);
const IconEyeOff = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);
const IconBell = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
);
const IconSearch = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);
const IconClock = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);

const SECTION_ICONS: Record<SectionKey, () => JSX.Element> = {
  user: IconUsers,
  invoice: IconInvoice,
  inventory: IconInventory,
  access: IconAccess,
};

const sections: Array<{ key: SectionKey; label: string; hint: string; stat: string; statLabel: string }> = [
  { key: "user",      label: "User Management",      hint: "Manage cashiers, roles, and account states.",              stat: "12", statLabel: "Active Users" },
  { key: "invoice",   label: "Invoice Management",   hint: "Track invoices, payment statuses, and daily revenue.",     stat: "28", statLabel: "Open Invoices" },
  { key: "inventory", label: "Inventory Management", hint: "Monitor bike stock, spare parts, and reorder points.",     stat: "7",  statLabel: "Low Stock Alerts" },
  { key: "access",    label: "Access Management",    hint: "Control permissions, sign-in history, and audit access.",  stat: "3",  statLabel: "Pending Requests" },
];

export default function Page() {
  const [email, setEmail]                   = useState("");
  const [password, setPassword]             = useState("");
  const [showPw, setShowPw]                 = useState(false);
  const [loading, setLoading]               = useState(false);
  const [error, setError]                   = useState<string | null>(null);
  const [token, setToken]                   = useState<string | null>(null);
  const [admin, setAdmin]                   = useState<PosAdmin | null>(null);
  const [hydrated, setHydrated]             = useState(false);
  const [theme, setTheme]                   = useState<Theme>("light");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeSection, setActiveSection]   = useState<SectionKey>("user");
  const [clockDate, setClockDate]           = useState("");
  const [clockTime, setClockTime]           = useState("");

  /* ── live clock ─── */
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

  /* ── hydrate from storage ─── */
  useEffect(() => {
    const savedTheme = window.localStorage.getItem(STORAGE_THEME) as Theme | null;
    if (savedTheme === "dark" || savedTheme === "light") setTheme(savedTheme);

    const savedToken = window.localStorage.getItem(STORAGE_TOKEN);
    const savedAdmin = window.localStorage.getItem(STORAGE_ADMIN);
    if (savedToken && savedAdmin) {
      setToken(savedToken);
      try { setAdmin(JSON.parse(savedAdmin) as PosAdmin); }
      catch { window.localStorage.removeItem(STORAGE_TOKEN); window.localStorage.removeItem(STORAGE_ADMIN); }
    }
    setHydrated(true);
  }, []);

  /* ── sync theme to DOM ─── */
  useEffect(() => {
    document.body.dataset.theme = theme;
    window.localStorage.setItem(STORAGE_THEME, theme);
  }, [theme]);

  /* ── verify session on token change ─── */
  useEffect(() => {
    if (!token) return;
    const verify = async () => {
      try {
        const res = await fetch(`${API_URL}/api/pos/auth/me`, { headers: { Authorization: `Bearer ${token}` } });
        if (!res.ok) throw new Error();
        const payload = (await res.json()) as { data: PosAdmin };
        setAdmin(payload.data);
        window.localStorage.setItem(STORAGE_ADMIN, JSON.stringify(payload.data));
      } catch { doLogout(); }
    };
    void verify();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const activeSectionMeta = useMemo(() => sections.find((s) => s.key === activeSection), [activeSection]);

  const doLogout = () => {
    setToken(null); setAdmin(null);
    window.localStorage.removeItem(STORAGE_TOKEN);
    window.localStorage.removeItem(STORAGE_ADMIN);
  };

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/pos/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const payload = (await res.json()) as { data?: { accessToken: string; admin: PosAdmin }; message?: string };
      if (!res.ok || !payload.data) throw new Error(payload.message ?? "Invalid credentials");
      setToken(payload.data.accessToken);
      setAdmin(payload.data.admin);
      window.localStorage.setItem(STORAGE_TOKEN, payload.data.accessToken);
      window.localStorage.setItem(STORAGE_ADMIN, JSON.stringify(payload.data.admin));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sign in");
    } finally { setLoading(false); }
  };

  if (!hydrated) return <main className="pos-shell" />;

  /* ════════════════════ SIGN-IN PAGE ════════════════════ */
  if (!token || !admin) {
    return (
      <main className="auth-shell">
        {/* Left hero */}
        <section className="auth-hero">
          <div className="auth-brand">
            <Image src="/landing/logo.jpg" alt="JL Racing" width={80} height={80} style={{ borderRadius: 16 }} priority />
            <div>
              <p className="eyebrow">JL RACING</p>
              <h1>POS Control Panel</h1>
            </div>
          </div>
          <p className="hero-desc">Fast billing, inventory intelligence, and operational control for your showroom team.</p>
          <div className="hero-features">
            <div className="hero-feat"><IconInvoice /><span>Invoice Tracking</span></div>
            <div className="hero-feat"><IconInventory /><span>Live Inventory</span></div>
            <div className="hero-feat"><IconUsers /><span>Role Management</span></div>
            <div className="hero-feat"><IconAccess /><span>Access Audit</span></div>
          </div>
        </section>

        {/* Right card */}
        <section className="auth-card">
          {/* Branded top bar */}
          <div className="auth-card-topbar">
            <span className="auth-card-topbar-brand">JL <span>Racing</span> &middot; POS</span>
            <div className="auth-card-topbar-right">
              <span className="auth-card-topbar-secure">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                Secure
              </span>
              <button type="button" className="auth-theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
                {theme === "light" ? <IconMoon /> : <IconSun />}
                <span>{theme === "light" ? "Dark" : "Light"}</span>
              </button>
            </div>
          </div>

          {/* Floating form card */}
          <div className="auth-card-body">
            <div className="auth-form-card">
              <div className="auth-form-card-accent" />
              <div className="auth-card-inner">
                <p className="eyebrow">Welcome back</p>
                <h2>Admin Sign In</h2>
                <p className="auth-subtitle">Enter your POS administrator credentials to continue.</p>

                <form onSubmit={handleLogin} className="auth-form">
                  <div className="field-group">
                    <label htmlFor="pos-email">Email address</label>
                    <input
                      id="pos-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@jlracing.com"
                      autoComplete="email"
                      required
                    />
                  </div>

                  <div className="field-group">
                    <label htmlFor="pos-password">Password</label>
                    <div className="pw-wrap">
                      <input
                        id="pos-password"
                        type={showPw ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        autoComplete="current-password"
                        required
                      />
                      <button type="button" className="pw-eye" onClick={() => setShowPw((v) => !v)} aria-label={showPw ? "Hide password" : "Show password"}>
                        {showPw ? <IconEyeOff /> : <IconEye />}
                      </button>
                    </div>
                  </div>

                  {error ? <p className="auth-error">{error}</p> : null}

                  <button type="submit" className="btn-primary" disabled={loading}>
                    {loading ? <span className="spinner" /> : null}
                    {loading ? "Signing in…" : "Sign In"}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Bottom footer */}
          <div className="auth-card-footer">
            <span>Secure &middot; Reliable &middot; Professional</span>
            <span>&copy; 2026 JL Racing. All rights reserved.</span>
          </div>
        </section>
      </main>
    );
  }

  /* ════════════════════ DASHBOARD ════════════════════ */
  const SectionIcon = SECTION_ICONS[activeSection];

  return (
    <main className="pos-shell">
      {/* ── Sidebar ── */}
      <aside className={`sidebar${sidebarCollapsed ? " collapsed" : ""}`}>
        <div className="sidebar-header">
          <Image src="/landing/logo.jpg" alt="JL Racing" width={38} height={38} style={{ borderRadius: 10, flexShrink: 0 }} />
          {!sidebarCollapsed && <span className="sidebar-brand">JL Racing <strong>POS</strong></span>}
        </div>

        <div className="sidebar-search">
          {!sidebarCollapsed && (
            <>
              <IconSearch />
              <input type="text" placeholder="Quick search…" />
            </>
          )}
          {sidebarCollapsed && <IconSearch />}
        </div>

        <nav className="sidebar-nav">
          {sections.map(({ key, label }) => {
            const Icon = SECTION_ICONS[key];
            return (
              <button
                key={key}
                type="button"
                className={`nav-item${activeSection === key ? " active" : ""}`}
                onClick={() => setActiveSection(key)}
                title={sidebarCollapsed ? label : undefined}
              >
                <span className="nav-icon"><Icon /></span>
                {!sidebarCollapsed && <span className="nav-label">{label}</span>}
                {!sidebarCollapsed && activeSection === key && <span className="nav-dot" />}
              </button>
            );
          })}
        </nav>

        <button
          type="button"
          className="sidebar-toggle"
          onClick={() => setSidebarCollapsed((v) => !v)}
          aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {sidebarCollapsed ? <IconChevronRight /> : <IconChevronLeft />}
        </button>
      </aside>

      {/* ── Main area ── */}
      <div className="main-area">
        {/* ── Top header ── */}
        <header className="topbar">
          {/* Left: breadcrumb / page identity */}
          <div className="topbar-left">
            <div className="topbar-breadcrumb">
              <span className="topbar-breadcrumb-root">POS</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
              <span className="topbar-breadcrumb-page">{activeSectionMeta?.label}</span>
            </div>
            <div className="topbar-search">
              <IconSearch />
              <input type="text" placeholder="Search anything…" />
            </div>
          </div>

          {/* Date & time */}
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
            <button type="button" className="icon-btn theme-btn" onClick={toggleTheme} aria-label="Toggle theme" title={theme === "light" ? "Switch to Dark" : "Switch to Light"}>
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
              <svg className="admin-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
            </div>
            <button type="button" className="topbar-logout-btn" onClick={doLogout} aria-label="Logout" title="Sign out">
              <IconLogout />
              <span>Sign out</span>
            </button>
          </div>
        </header>

        {/* ── Page content ── */}
        <div className="page-content">
          {/* Page title row */}
          <div className="page-title-row">
            <div className="page-title-icon"><SectionIcon /></div>
            <div>
              <h2 className="page-title">{activeSectionMeta?.label}</h2>
              <p className="page-subtitle">{activeSectionMeta?.hint}</p>
            </div>
          </div>

          {/* KPI cards */}
          <div className="kpi-grid">
            {sections.map(({ key, statLabel, stat }) => {
              const KpiIcon = SECTION_ICONS[key];
              return (
                <div key={key} className={`kpi-card${activeSection === key ? " kpi-active" : ""}`} onClick={() => setActiveSection(key)}>
                  <div className="kpi-top">
                    <span className="kpi-label">{statLabel}</span>
                    <span className="kpi-icon-wrap"><KpiIcon /></span>
                  </div>
                  <strong className="kpi-value">{stat}</strong>
                  <span className="kpi-trend">↑ 4.2% this week</span>
                </div>
              );
            })}
          </div>

          {/* Content panel */}
          <div className="content-panel">
            <div className="panel-header">
              <div className="panel-title-row">
                <SectionIcon />
                <h3>{activeSectionMeta?.label}</h3>
              </div>
              <div className="panel-actions">
                <button type="button" className="btn-outline">Export</button>
                <button type="button" className="btn-accent">+ Add New</button>
              </div>
            </div>

            {/* Table */}
            <div className="data-table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: "Daily Sales Overview",               status: "Active",  date: new Date().toLocaleDateString() },
                    { name: "Pending Invoice Confirmation",        status: "Pending", date: new Date().toLocaleDateString() },
                    { name: "Stock Transfer Alert",                status: "Warning", date: new Date().toLocaleDateString() },
                    { name: "Access Change Request",               status: "Review",  date: new Date().toLocaleDateString() },
                  ].map((row, i) => (
                    <tr key={i}>
                      <td className="td-num">{i + 1}</td>
                      <td>{row.name}</td>
                      <td><span className={`badge badge-${row.status.toLowerCase()}`}>{row.status}</span></td>
                      <td className="td-muted">{row.date}</td>
                      <td><button type="button" className="btn-ghost">View →</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
