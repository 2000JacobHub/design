export type ThemeId =
  | "dark"
  | "light"
  | "violet"
  | "emerald"
  | "atrium";

export type ThemeMeta = {
  id: ThemeId;
  label: string;
  /* swatch used in the toggle UI — the theme's primary accent */
  swatch: string;
};

export const THEMES: ThemeMeta[] = [
  { id: "dark", label: "深色", swatch: "#f5d28a" },
  { id: "light", label: "浅色", swatch: "#b07d1f" },
  { id: "violet", label: "紫韵", swatch: "#b79cf5" },
  { id: "emerald", label: "翠绿", swatch: "#5fd0a6" },
  { id: "atrium", label: "Atrium", swatch: "#0075de" },
];

export const THEME_IDS = THEMES.map((t) => t.id);

export const DEFAULT_THEME: ThemeId = "dark";

export const THEME_STORAGE_KEY = "theme";
