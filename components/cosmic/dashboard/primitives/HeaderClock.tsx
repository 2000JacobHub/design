"use client";

import { useClock } from "@/hooks/useClock";

const WEEKDAYS = ["日", "一", "二", "三", "四", "五", "六"] as const;

/**
 * Top-right time/date readout used in the page header.
 * Self-contained — owns its own clock state via `useClock`.
 */
export function HeaderClock() {
  const now = useClock();

  const date = now
    ? `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`
    : "----";
  const time = now
    ? `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`
    : "--:--:--";
  const weekday = now ? WEEKDAYS[now.getDay()] : "-";

  return (
    <div className="cosmic-card inline-flex items-center gap-3 px-4 py-2">
      <svg viewBox="0 0 18 18" width="18" height="18" className="text-stardust-gold/72" aria-hidden>
        <circle cx="9" cy="9" r="7" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <path d="M9 4.5 V9 L12 10.8" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      </svg>
      <div className="flex flex-col leading-tight items-end">
        <span className="text-xl tabular-nums tracking-[0.06em] text-soft-white font-light">{time}</span>
        <span className="text-2xs text-soft-white/56 tabular-nums tracking-wider">
          {date} · 周{weekday}
        </span>
      </div>
    </div>
  );
}
