"use client";

import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "../components/ThemeProvider";
import {
  IconInvoice,
  IconInventory,
  IconUsers,
  IconAccess,
  IconEye,
  IconEyeOff,
  IconMoon,
  IconSun,
  IconLock,
} from "../lib/icons";
import { API_URL, STORAGE_TOKEN, STORAGE_ADMIN } from "../lib/constants";
import type { PosAdmin } from "../lib/types";

export default function SignInPage() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw]     = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState<string | null>(null);

  // If already logged in, redirect immediately
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
      const res = await fetch(`${API_URL}/api/pos/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const payload = (await res.json()) as {
        data?: { accessToken: string; admin: PosAdmin };
        message?: string;
      };
      if (!res.ok || !payload.data) throw new Error(payload.message ?? "Invalid credentials");
      localStorage.setItem(STORAGE_TOKEN, payload.data.accessToken);
      localStorage.setItem(STORAGE_ADMIN, JSON.stringify(payload.data.admin));
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sign in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-shell">
      {/* ── Left hero ── */}
      <section className="auth-hero">
        <div className="auth-brand">
          <Image src="/landing/logo.jpg" alt="JL Racing" width={80} height={80} style={{ borderRadius: 16 }} priority />
          <div>
            <p className="eyebrow">JL RACING</p>
            <h1>POS Control Panel</h1>
          </div>
        </div>
        <p className="hero-desc">
          Fast billing, inventory intelligence, and operational control for your showroom team.
        </p>
        <div className="hero-features">
          <div className="hero-feat"><IconInvoice /><span>Invoice Tracking</span></div>
          <div className="hero-feat"><IconInventory /><span>Live Inventory</span></div>
          <div className="hero-feat"><IconUsers /><span>Role Management</span></div>
          <div className="hero-feat"><IconAccess /><span>Access Audit</span></div>
        </div>
      </section>

      {/* ── Right navy card ── */}
      <section className="auth-card">
        {/* Branded top bar */}
        <div className="auth-card-topbar">
          <span className="auth-card-topbar-brand">
            JL <span>Racing</span> &middot; POS
          </span>
          <div className="auth-card-topbar-right">
            <span className="auth-card-topbar-secure">
              <IconLock />
              Secure
            </span>
            <button type="button" className="auth-theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === "light" ? <IconMoon /> : <IconSun />}
              <span>{theme === "light" ? "Dark" : "Light"}</span>
            </button>
          </div>
        </div>

        {/* Form card */}
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
                    <button
                      type="button"
                      className="pw-eye"
                      onClick={() => setShowPw((v) => !v)}
                      aria-label={showPw ? "Hide password" : "Show password"}
                    >
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

        {/* Footer */}
        <div className="auth-card-footer">
          <span>Secure &middot; Reliable &middot; Professional</span>
          <span>&copy; 2026 JL Racing. All rights reserved.</span>
        </div>
      </section>
    </main>
  );
}
