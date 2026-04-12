"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { SiteConfig } from "./site-config";

interface Admin {
  id: number;
  name: string;
  email: string;
}

interface DashContextValue {
  admin: Admin | null;
  token: string | null;
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
  const [token, setToken] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = localStorage.getItem(config.tokenKey);
    const a = localStorage.getItem(config.adminKey);
    if (t && a) {
      try {
        setToken(t);
        setAdmin(JSON.parse(a));
      } catch {
        // corrupted
      }
    }
    setReady(true);
  }, [config.tokenKey, config.adminKey]);

  const toggleSidebar = () => setSidebarOpen((v) => !v);

  const signOut = () => {
    localStorage.removeItem(config.tokenKey);
    localStorage.removeItem(config.adminKey);
    window.location.href = "/";
  };

  if (!ready) return null;

  return (
    <DashContext.Provider
      value={{ admin, token, sidebarOpen, toggleSidebar, signOut, config }}
    >
      {children}
    </DashContext.Provider>
  );
}
