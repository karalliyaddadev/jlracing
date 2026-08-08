"use client";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

type Saved<T extends string> = { page: number; scrollY: number; active?: T };

function readSaved<T extends string>(key: string): Saved<T> | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(key);
    return raw ? (JSON.parse(raw) as Saved<T>) : null;
  } catch {
    return null;
  }
}

function writeSaved<T extends string>(key: string, patch: Partial<Saved<T>>) {
  try {
    const prev = readSaved<T>(key) ?? { page: 1, scrollY: 0 };
    sessionStorage.setItem(key, JSON.stringify({ ...prev, ...patch }));
  } catch {
    // storage unavailable — ignore
  }
}

export function useListingPageState<T extends string = string>(
  loaded: boolean,
  defaultActive?: T,
) {
  const pathname = usePathname();
  const key = `listingState:${pathname}`;

  const [currentPage, setCurrentPage] = useState(
    () => readSaved<T>(key)?.page ?? 1,
  );
  const [active, setActive] = useState<T | undefined>(
    () => readSaved<T>(key)?.active ?? defaultActive,
  );
  const restoredScroll = useRef(false);

  useEffect(() => {
    writeSaved<T>(key, { page: currentPage });
  }, [currentPage, key]);

  useEffect(() => {
    if (active !== undefined) writeSaved<T>(key, { active });
  }, [active, key]);

  useEffect(() => {
    const onScroll = () => writeSaved<T>(key, { scrollY: window.scrollY });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [key]);

  useEffect(() => {
    if (!loaded || restoredScroll.current) return;
    restoredScroll.current = true;
    const saved = readSaved<T>(key);
    if (saved?.scrollY) {
      requestAnimationFrame(() =>
        window.scrollTo({ top: saved.scrollY, behavior: "auto" }),
      );
    }
  }, [loaded, key]);

  return { currentPage, setCurrentPage, active, setActive };
}
