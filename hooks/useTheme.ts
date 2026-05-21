"use client";

import { useCallback, useEffect, useState } from "react";
import { DEFAULT_THEME, THEME_IDS, THEME_STORAGE_KEY, type ThemeId } from "@/lib/theme";

function currentTheme(): ThemeId {
  if (typeof document === "undefined") return DEFAULT_THEME;
  const attr = document.documentElement.getAttribute("data-theme");
  return attr && (THEME_IDS as string[]).includes(attr) ? (attr as ThemeId) : DEFAULT_THEME;
}

export function useTheme() {
  // SSR/first paint renders the default; we sync to the real (script-applied)
  // theme after mount to avoid a hydration mismatch.
  const [theme, setTheme] = useState<ThemeId>(DEFAULT_THEME);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTheme(currentTheme());
    setMounted(true);
  }, []);

  const applyTheme = useCallback((next: ThemeId) => {
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      /* storage unavailable (private mode etc.) — theme still applies for the session */
    }
    setTheme(next);
  }, []);

  return { theme, setTheme: applyTheme, mounted };
}
