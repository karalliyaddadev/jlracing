"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const STORAGE_TOKEN = "local_cms_token";
const STORAGE_ADMIN = "local_cms_admin";

interface Admin {
  id: number;
  name: string;
  email: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [admin, setAdmin] = useState<Admin | null>(null);

  useEffect(() => {
    const token = localStorage.getItem(STORAGE_TOKEN);
    if (!token) {
      router.replace("/");
      return;
    }
    try {
      const stored = localStorage.getItem(STORAGE_ADMIN);
      if (stored) setAdmin(JSON.parse(stored));
    } catch {
      // ignore parse errors
    }
  }, [router]);

  const handleSignOut = () => {
    localStorage.removeItem(STORAGE_TOKEN);
    localStorage.removeItem(STORAGE_ADMIN);
    router.push("/");
  };

  if (!admin) return null;

  return (
    <main className="lcms-dashboard">
      <header className="lcms-dashboard__header">
        <div className="lcms-dashboard__brand">
          <img
            src="/landing/logo.png"
            alt="JL Racing"
            className="lcms-dashboard__logo"
          />
          <div>
            <p className="lcms-dashboard__site-label">Local Website CMS</p>
            <h1 className="lcms-dashboard__title">Dashboard</h1>
          </div>
        </div>
        <div className="lcms-dashboard__user">
          <div className="lcms-dashboard__user-info">
            <span className="lcms-dashboard__user-name">{admin.name}</span>
            <span className="lcms-dashboard__user-email">{admin.email}</span>
          </div>
          <button className="lcms-dashboard__signout" onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      </header>

      <section className="lcms-dashboard__content">
        <p className="lcms-dashboard__welcome">
          Welcome back, <strong>{admin.name}</strong>. More content management
          tools coming soon.
        </p>
      </section>
    </main>
  );
}
