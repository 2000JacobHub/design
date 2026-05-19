"use client";

import type { CSSProperties, ReactNode } from "react";

type ColorToken = { name: string; hex: string; group: ColorGroup; usage?: string };
type ColorGroup = "Surface" | "Foreground" | "Accent" | "Semantic";

const colorTokens: ColorToken[] = [
  { name: "cosmic-black", hex: "#050507", group: "Surface", usage: "Page base / body background" },
  { name: "deep-space", hex: "#0e0e14", group: "Surface", usage: "Card surface" },
  { name: "night-purple", hex: "#1a1c2a", group: "Surface" },
  { name: "dusk-blue", hex: "#0f1b2a", group: "Surface" },
  { name: "nebula-teal", hex: "#0e1f22", group: "Surface" },

  { name: "soft-white", hex: "#f5f6f8", group: "Foreground", usage: "Primary text · /92 /64 /46 ..." },

  { name: "stardust-gold", hex: "#f5d28a", group: "Accent", usage: "Brand · primary action" },
  { name: "stardust-amber", hex: "#f5b26a", group: "Accent", usage: "Warm accent / hover" },
  { name: "accent-teal", hex: "#7fb9be", group: "Accent", usage: "Data series · secondary" },
  { name: "accent-violet", hex: "#8c78bc", group: "Accent", usage: "Insight / AI" },
  { name: "accent-jade", hex: "#27757f", group: "Accent" },
  { name: "accent-amethyst", hex: "#6f48a4", group: "Accent" },

  { name: "danger", hex: "#e58c8c", group: "Semantic", usage: "Negative trend · error" },
];

const colorGroups: ColorGroup[] = ["Surface", "Foreground", "Accent", "Semantic"];

const fontTokens = [
  {
    name: "font-sans",
    value: '"Space Grotesk", "Avenir Next", "Inter", system-ui, sans-serif',
    style: { fontFamily: "var(--font-sans)" } as CSSProperties,
  },
  {
    name: "font-display",
    value: '"Space Grotesk", system-ui, sans-serif',
    style: { fontFamily: "var(--font-display)" } as CSSProperties,
  },
];

const typeScale = [
  { token: "text-6xl", size: "52 / 1.05", className: "text-6xl font-light" },
  { token: "text-5xl", size: "44 / 1.05", className: "text-5xl font-light" },
  { token: "text-4xl", size: "28 / 1.1",  className: "text-4xl font-light" },
  { token: "text-3xl", size: "22 / 28",   className: "text-3xl font-normal" },
  { token: "text-2xl", size: "20 / 26",   className: "text-2xl font-normal" },
  { token: "text-xl",  size: "18 / 24",   className: "text-xl font-normal" },
  { token: "text-lg",  size: "15 / 22",   className: "text-lg font-medium" },
  { token: "text-md",  size: "14 / 20",   className: "text-md" },
  { token: "text-base", size: "13 / 18",  className: "text-base" },
  { token: "text-sm",  size: "12 / 16",   className: "text-sm" },
  { token: "text-xs",  size: "11 / 16",   className: "text-xs" },
  { token: "text-2xs", size: "10 / 14",   className: "text-2xs uppercase tracking-[0.16em]" },
];

const radiusTokens = [
  { name: "radius-pill", value: "999px", className: "rounded-pill" },
  { name: "radius-card", value: "14px", className: "rounded-card" },
  { name: "radius-panel", value: "20px", className: "rounded-panel" },
];

const shadowTokens = [
  { name: "shadow-gold-glow", desc: "Outer + inset gold halo · 焦点容器", className: "shadow-gold-glow" },
  { name: "shadow-panel", desc: "大面板柔和投影", className: "shadow-panel" },
  { name: "shadow-card", desc: "卡片/小容器低层投影", className: "shadow-card" },
  { name: "shadow-gold-soft", desc: "高光金色光晕 · slider thumb / 提示点", className: "shadow-gold-soft" },
];

const utilityTokens = [
  { name: "cosmic-panel", desc: "主面板背景 · 双层渐变 + 边框 + 投影", element: "panel" },
  { name: "cosmic-card", desc: "二级卡片 · 较小尺寸，亮度更高", element: "card" },
  { name: "cosmic-pill", desc: "圆角徽章 · 类别 / kicker", element: "pill" },
  { name: "cosmic-board-bg", desc: "首页画板底色 · 多层径向渐变", element: "board" },
  { name: "cosmic-board-grid", desc: "网格遮罩 · 与 board-bg 配合使用", element: "grid" },
  { name: "dashboard-bg", desc: "大屏页面径向渐变", element: "dashboard" },
];

const kicker = "text-xs tracking-[0.18em] text-soft-white/46 uppercase";

export default function CosmicGravity() {
  return (
    <>
      <section className="flex flex-col gap-4 pt-6">
        <span className="cosmic-pill self-start">Cosmic Gravity</span>
        <h2 className="m-0 text-6xl leading-[1.05] font-light text-soft-white/92 max-w-[820px]">
          一套围绕 <span className="text-stardust-gold">@theme</span> 构建的设计 token 体系
        </h2>
        <p className="m-0 max-w-[640px] text-lg leading-relaxed text-soft-white/64">
          所有页面共享同一套 Tailwind v4 token：颜色 / 字体 / 圆角 / 阴影 / 工具类。
          修改 <code className="px-1.5 py-0.5 rounded-md bg-soft-white/8 text-stardust-gold text-base">app/globals.css</code> 中的 @theme 与 @utility 即可全局生效。
        </p>
      </section>

      <Section
        kicker="Color"
        title="颜色 Tokens"
        desc={`共 ${colorTokens.length} 个颜色变量。所有颜色都暴露为 Tailwind 工具类：bg-{name} / text-{name} / border-{name}，支持 /<alpha> 透明度修饰符。`}
      >
        {colorGroups.map((group) => (
          <div key={group} className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <h3 className="m-0 text-base font-medium text-soft-white/82">{group}</h3>
              <span className="h-px flex-1 bg-soft-white/8" />
              <span className="text-xs text-soft-white/46 tabular-nums">
                {colorTokens.filter((c) => c.group === group).length}
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {colorTokens
                .filter((c) => c.group === group)
                .map((color) => (
                  <ColorCard key={color.name} color={color} />
                ))}
            </div>
          </div>
        ))}
      </Section>

      <Section
        kicker="Typography"
        title="字体 & 字号"
        desc="字体族通过 --font-sans / --font-display 注册；字号通过 --text-{2xs..6xl} 注册（每档配套 line-height），统一使用 text-xs / text-sm / text-base ... 语义化工具类，避免散落的 text-[Npx] 任意值。"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {fontTokens.map((font) => (
            <article key={font.name} className="cosmic-panel p-6 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <CodeTag>{`--${font.name}`}</CodeTag>
                <span className="text-2xs tracking-[0.18em] text-soft-white/46 uppercase">{font.name}</span>
              </div>
              <div className="text-5xl leading-none font-light text-soft-white/92" style={font.style}>
                Aa Bb 0123
              </div>
              <p className="m-0 text-xs text-soft-white/52 break-all font-mono">{font.value}</p>
            </article>
          ))}
        </div>

        <div className="cosmic-panel p-6 flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <h3 className="m-0 text-base font-medium text-soft-white/82">推荐字号体系</h3>
            <span className="h-px flex-1 bg-soft-white/8" />
          </div>
          <div className="flex flex-col gap-4">
            {typeScale.map((row) => (
              <div key={row.token} className="grid grid-cols-[120px_88px_1fr] items-baseline gap-4 border-t border-soft-white/6 pt-3 first:border-0 first:pt-0">
                <CodeTag>{row.token}</CodeTag>
                <span className="text-xs text-soft-white/52 tabular-nums">{row.size}</span>
                <span className={`${row.className} text-soft-white/92 truncate`}>The quick brown cosmic fox 0123</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section
        kicker="Radius"
        title="圆角 Tokens"
        desc="rounded-pill / rounded-card / rounded-panel 三档圆角，匹配 pill / card / panel 三类容器。"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {radiusTokens.map((r) => (
            <article key={r.name} className="cosmic-panel p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <CodeTag>{`--${r.name}`}</CodeTag>
                <span className="text-xs text-soft-white/56 tabular-nums">{r.value}</span>
              </div>
              <div
                className={`${r.className} h-24 bg-[linear-gradient(135deg,rgb(245_210_138/0.32),rgb(127_185_190/0.18))] border border-stardust-gold/24`}
              />
              <CodeTag>{r.className}</CodeTag>
            </article>
          ))}
        </div>
      </Section>

      <Section
        kicker="Shadow"
        title="阴影 Tokens"
        desc="所有阴影都暴露为 shadow-{name}。组合了外阴影 + 内描边，避免在深色背景上发飘。"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {shadowTokens.map((s) => (
            <article key={s.name} className="cosmic-panel p-6 flex items-center justify-between gap-6">
              <div className="flex flex-col gap-2 min-w-0">
                <CodeTag>{`--${s.name}`}</CodeTag>
                <p className="m-0 text-sm text-soft-white/64">{s.desc}</p>
              </div>
              <div className={`shrink-0 w-24 h-24 rounded-card bg-deep-space border border-soft-white/8 ${s.className}`} />
            </article>
          ))}
        </div>
      </Section>

      <Section
        kicker="Utility"
        title="@utility 容器类"
        desc="通过 @utility 暴露的复合容器样式（多层渐变 / 阴影 / 内描边），可像 Tailwind 工具类一样直接使用。"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {utilityTokens.map((u) => (
            <UtilityCard key={u.name} token={u} />
          ))}
        </div>
      </Section>

      <Section
        kicker="Override"
        title="如何修改 / 扩展"
        desc="编辑 app/globals.css 顶部的 @theme {} 块即可重新映射所有 Tailwind 工具类。新增 token 只需新增一行 --color-x 或 --shadow-y。注意：使用裸 @theme，不要加 static —— @theme static 不会覆盖 / 扩展 Tailwind v4 内置 namespace（--text-*、--font-sans 等），自定义值会静默回落到默认值。"
      >
        <pre className="cosmic-panel p-5 text-sm leading-relaxed text-soft-white/82 font-mono overflow-x-auto">
{`@theme {
  /* Colors → bg-* / text-* / border-* */
  --color-cosmic-black: #050507;
  --color-stardust-gold: #f5d28a;
  --color-accent-teal: #7fb9be;
  /* ... */

  /* Font family → font-sans / font-display */
  --font-sans: "Space Grotesk", system-ui, sans-serif;

  /* Type scale → text-xs / text-sm / text-base / text-md ... */
  --text-xs: 11px;
  --text-xs--line-height: 16px;
  --text-base: 13px;
  --text-base--line-height: 18px;
  /* ... */

  /* Radius → rounded-pill / rounded-card / rounded-panel */
  --radius-pill: 999px;
  --radius-card: 14px;
  --radius-panel: 20px;

  /* Shadow → shadow-gold-glow / shadow-panel / ... */
  --shadow-gold-glow: 0 0 28px rgb(245 210 138 / 0.18), inset 0 0 0 1px rgb(245 210 138 / 0.22);
}`}
        </pre>
      </Section>
    </>
  );
}

function Section({
  kicker: kickerText,
  title,
  desc,
  children,
}: {
  kicker: string;
  title: string;
  desc?: string;
  children: ReactNode;
}) {
  return (
    <section className="flex flex-col gap-5">
      <header className="flex flex-col gap-2">
        <span className={kicker}>{kickerText}</span>
        <h2 className="m-0 text-4xl font-light text-soft-white/92">{title}</h2>
        {desc && <p className="m-0 max-w-[760px] text-base text-soft-white/64 leading-relaxed">{desc}</p>}
      </header>
      <div className="flex flex-col gap-6">{children}</div>
    </section>
  );
}

function ColorCard({ color }: { color: ColorToken }) {
  return (
    <article className="cosmic-card p-3 flex flex-col gap-3">
      <div
        className="h-20 rounded-[10px] border border-soft-white/8"
        style={{ background: color.hex }}
      />
      <div className="flex flex-col gap-1.5 min-w-0">
        <div className="flex items-baseline justify-between gap-2">
          <strong className="text-base font-medium text-soft-white/92 truncate">{color.name}</strong>
          <span className="text-2xs text-soft-white/46 tabular-nums uppercase">{color.hex}</span>
        </div>
        <CodeTag>{`--color-${color.name}`}</CodeTag>
        <div className="flex items-center gap-1.5 flex-wrap">
          <ChipTag>{`bg-${color.name}`}</ChipTag>
          <ChipTag>{`text-${color.name}`}</ChipTag>
        </div>
        {color.usage && <p className="m-0 text-2xs text-soft-white/46 leading-snug">{color.usage}</p>}
      </div>
    </article>
  );
}

function UtilityCard({ token }: { token: { name: string; desc: string; element: string } }) {
  return (
    <article className="cosmic-panel p-4 flex flex-col gap-3 min-h-[200px]">
      <div className="flex items-center justify-between gap-2">
        <CodeTag>{`.${token.name}`}</CodeTag>
      </div>
      <p className="m-0 text-xs text-soft-white/64 leading-snug">{token.desc}</p>
      <div className="flex-1 grid place-items-center bg-cosmic-black/40 rounded-[10px] p-4 overflow-hidden">
        <UtilitySample element={token.element} />
      </div>
    </article>
  );
}

function UtilitySample({ element }: { element: string }) {
  switch (element) {
    case "panel":
      return (
        <div className="cosmic-panel w-full p-3 flex flex-col gap-1">
          <span className="text-2xs text-soft-white/46">PANEL TITLE</span>
          <strong className="text-md text-soft-white/92">面板内容示例</strong>
        </div>
      );
    case "card":
      return (
        <div className="cosmic-card w-full p-3 flex flex-col gap-1">
          <span className="text-2xs text-soft-white/46">CARD TITLE</span>
          <strong className="text-md text-soft-white/92">卡片内容示例</strong>
        </div>
      );
    case "pill":
      return <span className="cosmic-pill">DESIGN SYSTEM</span>;
    case "board":
      return (
        <div className="cosmic-board-bg w-full h-20 rounded-[8px] relative overflow-hidden">
          <span className="absolute inset-0 cosmic-board-grid" />
        </div>
      );
    case "grid":
      return (
        <div className="relative w-full h-20 rounded-[8px] bg-cosmic-black overflow-hidden">
          <span className="absolute inset-0 cosmic-board-grid" />
        </div>
      );
    case "dashboard":
      return <div className="dashboard-bg w-full h-20 rounded-[8px]" />;
    default:
      return null;
  }
}

function CodeTag({ children }: { children: ReactNode }) {
  return (
    <code className="inline-block px-1.5 py-0.5 rounded-md bg-soft-white/6 text-stardust-gold/90 text-2xs font-mono w-max max-w-full truncate">
      {children}
    </code>
  );
}

function ChipTag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block px-1.5 py-0.5 rounded-md bg-cosmic-black/52 border border-soft-white/8 text-soft-white/64 text-2xs font-mono">
      {children}
    </span>
  );
}
