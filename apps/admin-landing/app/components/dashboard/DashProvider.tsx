"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { SiteConfig } from "./site-config";
import { apiFetch } from "../../lib/api";

interface Admin {
  id: number;
  name: string;
  email: string;
}

interface DashContextValue {
  admin: Admin | null;
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  signOut: () => void;
  config: SiteConfig;
}

const DashContext = createContext<DashContextValue | null>(null);

export function useDash() {
  const ctx = useContext(DashContext);
  if (!ctx) throw new Error("useDash must be inside DashProvider");
  return ctx;
}

interface Props {
  config: SiteConfig;
  children: ReactNode;
}

export default function DashProvider({ config, children }: Props) {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    apiFetch("/api/auth/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((data: Admin | null) => {
        if (data) setAdmin(data);
      })
      .finally(() => setReady(true));
  }, []);

  const toggleSidebar = () => setSidebarOpen((v) => !v);

  const signOut = async () => {
    await apiFetch("/api/auth/logout", { method: "POST" }).catch(() => {});
    window.location.href = "/";
  };

  if (!ready) return null;

  return (
    <DashContext.Provider
      value={{ admin, sidebarOpen, toggleSidebar, signOut, config }}
    >
      {children}
    </DashContext.Provider>
  );
}
