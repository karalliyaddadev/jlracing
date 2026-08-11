"use client";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

type Saved = { page: number; scrollY: number; active?: string };

function readSaved(key: string): Saved | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(key);
    return raw ? (JSON.parse(raw) as Saved) : null;
  } catch {
    return null;
  }
}

function writeSaved(key: string, patch: Partial<Saved>) {
  try {
    const prev = readSaved(key) ?? { page: 1, scrollY: 0 };
    sessionStorage.setItem(key, JSON.stringify({ ...prev, ...patch }));
  } catch {
    // storage unavailable — ignore
  }
}

export function useListingPageState(loaded: boolean, defaultActive?: string) {
  const pathname = usePathname();
  const key = `listingState:${pathname}`;

  const [currentPage, setCurrentPage] = useState(
    () => readSaved(key)?.page ?? 1,
  );
  const [active, setActive] = useState(
    () => readSaved(key)?.active ?? defaultActive,
  );
  const restoredScroll = useRef(false);

  useEffect(() => {
    writeSaved(key, { page: currentPage });
  }, [currentPage, key]);

  useEffect(() => {
    if (active !== undefined) writeSaved(key, { active });
  }, [active, key]);

  useEffect(() => {
    const onScroll = () => writeSaved(key, { scrollY: window.scrollY });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [key]);

  useEffect(() => {
    if (!loaded || restoredScroll.current) return;
    restoredScroll.current = true;
    const saved = readSaved(key);
    if (saved?.scrollY) {
      requestAnimationFrame(() =>
        window.scrollTo({ top: saved.scrollY, behavior: "auto" }),
      );
    }
  }, [loaded, key]);

  return { currentPage, setCurrentPage, active, setActive };
}
