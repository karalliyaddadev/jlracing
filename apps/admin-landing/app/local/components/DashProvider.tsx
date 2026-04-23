"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

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
}

const DashContext = createContext<DashContextValue | null>(null);

export function useDash() {
  const ctx = useContext(DashContext);
  if (!ctx) throw new Error("useDash must be inside DashProvider");
  return ctx;
}

const TOKEN_KEY = "local_cms_token";
const ADMIN_KEY = "local_cms_admin";

export default function DashProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = localStorage.getItem(TOKEN_KEY);
    const a = localStorage.getItem(ADMIN_KEY);
    if (t && a) {
      try {
        setToken(t);
        setAdmin(JSON.parse(a));
      } catch {
        // corrupted
      }
    }
    setReady(true);
  }, []);

  const toggleSidebar = () => setSidebarOpen((v) => !v);

  const signOut = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ADMIN_KEY);
    window.location.href = "/";
  };

  if (!ready) return null;

  return (
    <DashContext.Provider
      value={{ admin, token, sidebarOpen, toggleSidebar, signOut }}
    >
      {children}
    </DashContext.Provider>
  );
}
