---
name: add-theme
description: Add a new color theme (dark accent-variant or full light/blue-white scheme) to this Tailwind v4 design system. Use when the user asks to "add a theme", "新增主题", "add a light/dark/blue/<color> mode", "add a color scheme", or to recolor the UI via a new `data-theme`. Themes are pure CSS — adding one touches only `lib/theme.ts` and `app/globals.css`; the toggle, persistence, and no-flash script pick it up automatically.
---

# Add a Theme

This app supports runtime theme switching via a `data-theme` attribute on `<html>`.
Adding a theme is two edits — **no component changes** — because every color in the
UI resolves through CSS variables that each theme overrides.

## Architecture (read first — it explains the non-obvious parts)

```
@theme  --color-soft-white: var(--p-soft-white);   ← token points at palette var (indirection)
:root                       --p-soft-white: #f5f6f8;          ← dark default
:root[data-theme="light"]   --p-soft-white: #1c2230;         ← per-theme override
```

- **Palette indirection is mandatory.** `@theme` color tokens (`--color-*`) point at
  `--p-*` palette variables, not literal hex. If they were literal hex, Tailwind v4
  would *statically bake* opacity utilities (`text-soft-white/64` → `#f5f6f8a3`) and
  glow shadows at build time, and overriding the variable at runtime would do nothing.
  A `var()` value forces Tailwind to emit runtime `color-mix(in oklab, var(--color-soft-white) 64%, transparent)`,
  which DOES respond to overrides. **Never give a themed `--color-*` token a literal hex.**
- A theme is just a `:root[data-theme="<id>"] { … }` block that overrides `--p-*`
  (and, for light themes, structural surface vars + shadow colors).
- The toggle (`components/ThemeToggle.tsx`), persistence (`hooks/useTheme.ts`), and the
  no-flash script (`app/layout.tsx`) are all driven by the `THEMES` list in
  `lib/theme.ts` — add an entry there and they update automatically.

## Files

| File | Change |
|------|--------|
| `lib/theme.ts` | Add the theme id to the `ThemeId` union + an entry to `THEMES`. |
| `app/globals.css` | Add one `:root[data-theme="<id>"] { … }` block after the existing theme blocks. |

Nothing else. Do **not** touch `layout.tsx`, `ThemeToggle.tsx`, or `useTheme.ts`.

## Steps

### 1. Register the theme in `lib/theme.ts`

```ts
export type ThemeId = "dark" | "light" | "violet" | "emerald" | "azure" | "<id>";

export const THEMES: ThemeMeta[] = [
  // … existing …
  { id: "<id>", label: "<中文标签>", swatch: "<accent hex for the toggle dot>" },
];
```

`swatch` is the small dot shown in the header toggle — use the theme's primary accent.

### 2. Add the CSS block in `app/globals.css`

Place it right after the last `:root[data-theme=…]` block. Choose the recipe:

#### Recipe A — dark accent variant (cheapest)

The UI stays dark; only the primary accent hue changes. Override **two** vars:

```css
:root[data-theme="<id>"] {
  --p-stardust-gold: #b79cf5;   /* primary accent (fills, text, borders, glows) */
  --p-stardust-amber: #9f86e8;  /* gradient companion (slightly lighter/darker) */
}
```

Because glow shadows are `color-mix(var(--color-stardust-gold) …)`, recoloring this one
token re-tints the entire halo system. (See `violet` / `emerald` for working examples.)

#### Recipe B — light / blue-white / full scheme

A light theme must flip foreground/surface luminance, so override the **whole palette
+ shadow colors + structural surface vars + backgrounds**. Copy the `light` (neutral)
or `azure` (blue-tinted) block and retune. Full variable set:

```css
:root[data-theme="<id>"] {
  /* Palette — the 10 themed --color-* tokens */
  --p-cosmic-black: #eef1f6;   /* page base / overlays (was darkest) */
  --p-deep-space:   #ffffff;   /* solid surface (cards, donut bg) */
  --p-nebula-teal:  #e3ecec;   /* chart gradient tail */
  --p-soft-white:   #1c2230;   /* PRIMARY TEXT — flips to dark; /alpha → muted dark */
  --p-stardust-gold:  #b07d1f; /* primary accent (deepen so it reads on white) */
  --p-stardust-amber: #c2762a; /* gradient companion */
  --p-accent-teal:   #2f8c93;  /* secondary data series */
  --p-accent-violet: #6f5ba8;
  --p-accent-indigo: #5b4f8a;
  --p-danger:        #c0392b;  /* keep red for negative-trend semantics */

  /* Drop-shadow colors (alpha baked in — soft on light, heavy on dark) */
  --shadow-color-panel: rgb(40 50 80 / 0.16);
  --shadow-color-card:  rgb(40 50 80 / 0.12);

  /* Structural surfaces (consumed by the @utility blocks) */
  --surface-panel:        linear-gradient(180deg, rgb(255 255 255 / 0.92), rgb(247 249 252 / 0.96));
  --surface-panel-border: rgb(20 26 40 / 0.1);
  --surface-panel-inset:  rgb(255 255 255 / 0.6);
  --surface-card:         linear-gradient(180deg, rgb(255 255 255 / 0.96), rgb(244 247 251 / 0.98));
  --surface-card-border:  rgb(20 26 40 / 0.08);
  --pill-border:  rgb(20 26 40 / 0.14);
  --pill-surface: linear-gradient(180deg, rgb(20 26 40 / 0.035), rgb(20 26 40 / 0.01));
  --pill-text:    rgb(28 34 48 / 0.72);
  --kicker-text:  rgb(28 34 48 / 0.5);

  /* Page / board backgrounds (full multi-layer values) */
  --page-bg: radial-gradient(…), radial-gradient(…), linear-gradient(180deg, #eef1f6 0%, #e7ebf2 50%, #eef1f6 100%);
  --board-bg: radial-gradient(…), radial-gradient(…), #eef1f6;
  --board-grid-h: rgb(20 26 40 / 0.05);
  --board-grid-v: rgb(20 26 40 / 0.04);
}
```

### 3. Verify (temporarily set the default, screenshot, revert)

`localStorage` is empty in a fresh headless profile, so the rendered theme equals
`DEFAULT_THEME`. Use that to screenshot the new theme:

```bash
# 1. temporarily flip the default in lib/theme.ts:  DEFAULT_THEME = "<id>"
pnpm dev &   # wait ~16s for first compile
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
"$CHROME" --headless=new --disable-gpu --hide-scrollbars --window-size=1440,1200 \
  --screenshot=/tmp/theme-<id>.png --virtual-time-budget=6000 "http://localhost:3000/"
"$CHROME" --headless=new --disable-gpu --hide-scrollbars --window-size=1440,1200 \
  --screenshot=/tmp/theme-<id>-charts.png --virtual-time-budget=6000 "http://localhost:3000/dev/charts"
# 2. inspect both PNGs, then REVERT DEFAULT_THEME back to "dark"
```

Check the dashboard (`/`) and the charts page (`/dev/charts`, exercises SVG colors).
Confirm: text contrast on surfaces, panel/card backgrounds, shadow softness, chart
lines/fills, and the accent recolor.

## Variable reference

**Themed (override per theme):** `--p-cosmic-black`, `--p-deep-space`, `--p-nebula-teal`,
`--p-soft-white`, `--p-stardust-gold`, `--p-stardust-amber`, `--p-accent-teal`,
`--p-accent-violet`, `--p-accent-indigo`, `--p-danger`; `--shadow-color-panel`,
`--shadow-color-card`; `--surface-*`, `--pill-*`, `--kicker-text`, `--page-bg`,
`--board-bg`, `--board-grid-h/-v`.

**Constant — do NOT theme:** `--color-ink` (dark text that sits on accent fills, e.g.
gold buttons — must stay dark in every theme) and `--color-heat-low/-high/-peak`
(data-viz heatmap ramp, identical across themes).

## Pitfalls

- **Never** override `--color-*` directly in a theme block — override the `--p-*`
  palette var instead. Overriding `--color-*` won't reach the statically-baked alpha
  utilities; overriding `--p-*` will.
- **Don't** put a literal hex on a themed `--color-*` token in `@theme` — it breaks
  runtime theming for that color's `/alpha` utilities and glows (Tailwind bakes them).
- **Drop shadows:** Tailwind collapses a `color-mix()` inside a shadow value, so the
  translucency must live in `--shadow-color-*` directly (a plain `rgb(… / α)`), not in
  a mix inside `--shadow-panel`.
- **Ink-on-accent:** elements like the gold submit button / rank pill use `text-ink`
  (constant dark). On a deep accent fill this can be low-contrast. If a new theme's
  accent is dark, either lighten the accent or accept the minor contrast hit (only ~2
  spots use it).
- Always **revert `DEFAULT_THEME` to `"dark"`** after screenshot verification.
