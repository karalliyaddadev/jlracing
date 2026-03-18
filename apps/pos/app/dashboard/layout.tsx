"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "../components/Sidebar";
import { Topbar } from "../components/Topbar";
import { AdminCtx } from "../components/AdminContext";
import { API_URL, STORAGE_TOKEN, STORAGE_ADMIN } from "../lib/constants";
import type { PosAdmin } from "../lib/types";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [admin, setAdmin] = useState<PosAdmin | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const savedToken = localStorage.getItem(STORAGE_TOKEN);
    const savedAdmin = localStorage.getItem(STORAGE_ADMIN);
    if (!savedToken || !savedAdmin) {
      router.replace("/signin");
      return;
    }
    try {
      setToken(savedToken);
      setAdmin(JSON.parse(savedAdmin) as PosAdmin);
    } catch {
      localStorage.removeItem(STORAGE_TOKEN);
      localStorage.removeItem(STORAGE_ADMIN);
      router.replace("/signin");
      return;
    }
    setChecked(true);

    // Verify token is still valid in background
    void fetch(`${API_URL}/api/pos/auth/me`, {
      headers: { Authorization: `Bearer ${savedToken}` },
    }).then(async (res) => {
      if (!res.ok) {
        localStorage.removeItem(STORAGE_TOKEN);
        localStorage.removeItem(STORAGE_ADMIN);
        router.replace("/signin");
        return;
      }
      const payload = (await res.json()) as { data: PosAdmin };
      setAdmin(payload.data);
      localStorage.setItem(STORAGE_ADMIN, JSON.stringify(payload.data));
    }).catch(() => {
      // network error — keep session until next page load
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logout = () => {
    localStorage.removeItem(STORAGE_TOKEN);
    localStorage.removeItem(STORAGE_ADMIN);
    router.replace("/signin");
  };

  if (!checked || !admin || !token) {
    return <main className="pos-shell" />;
  }

  return (
    <AdminCtx.Provider value={{ admin, token, logout }}>
      <main className="pos-shell">
        <Sidebar />
        <div className="main-area">
          <Topbar />
          <div className="page-content">{children}</div>
        </div>
      </main>
    </AdminCtx.Provider>
  );
}
