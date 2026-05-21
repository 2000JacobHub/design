"use client";

import { THEMES } from "@/lib/theme";
import { useTheme } from "@/hooks/useTheme";

export function ThemeToggle() {
  const { theme, setTheme, mounted } = useTheme();

  return (
    <div
      role="radiogroup"
      aria-label="主题"
      className="cosmic-card inline-flex items-center gap-1 p-1.5"
    >
      {THEMES.map((t) => {
        const active = mounted && theme === t.id;
        return (
          <button
            key={t.id}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={t.label}
            title={t.label}
            onClick={() => setTheme(t.id)}
            className={[
              "w-6 h-6 rounded-full grid place-items-center transition-transform",
              active
                ? "ring-2 ring-stardust-gold/70 scale-105"
                : "ring-1 ring-soft-white/15 hover:scale-105",
            ].join(" ")}
          >
            <span className="w-3.5 h-3.5 rounded-full" style={{ background: t.swatch }} />
          </button>
        );
      })}
    </div>
  );
}
