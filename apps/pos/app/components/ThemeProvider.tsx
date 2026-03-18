"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { Theme } from "../lib/types";
import { STORAGE_THEME } from "../lib/constants";

type ThemeCtxType = { theme: Theme; toggleTheme: () => void };
const ThemeCtx = createContext<ThemeCtxType>({ theme: "light", toggleTheme: () => {} });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_THEME) as Theme | null;
    if (saved === "dark" || saved === "light") setTheme(saved);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(STORAGE_THEME, theme);
  }, [theme]);

  return (
    <ThemeCtx.Provider value={{ theme, toggleTheme: () => setTheme((t) => (t === "light" ? "dark" : "light")) }}>
      {children}
    </ThemeCtx.Provider>
  );
}

export const useTheme = () => useContext(ThemeCtx);
