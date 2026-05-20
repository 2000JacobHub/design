"use client";

import {clock as clockIcon, Icon} from "@/lib/icons";
import {useClock} from "@/hooks/useClock";

export default function Header() {
    return (
        <header className="relative z-2 flex flex-wrap items-center justify-between gap-3 mb-4 lg:mb-5">
            <div className="flex items-center gap-4">
                <div className="w-24 h-8 cosmic-card inline-flex items-center cursor-pointer"/>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
                {/* SyncStatus pill takes ~10rem; hide it below sm to keep the
              header readable on phones, where the live clock alone is enough. */}
                <div className="hidden sm:block">
                    <SyncStatus/>
                </div>
                <HeaderClock/>
            </div>
        </header>
    )
}


const WEEKDAYS = ["日", "一", "二", "三", "四", "五", "六"] as const;

/**
 * Top-right time/date readout used in the page header.
 * Self-contained — owns its own clock state via `useClock`.
 */
function HeaderClock() {
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
            <Icon
                icon={clockIcon}
                width={18}
                height={18}
                className="text-stardust-gold/72"
                aria-hidden
            />
            <div className="flex flex-col leading-tight items-end">
                <span className="text-xl tabular-nums tracking-[0.06em] text-soft-white font-light">{time}</span>
                <span className="text-2xs text-soft-white/56 tabular-nums tracking-wider">
          {date} · 周{weekday}
        </span>
            </div>
        </div>
    );
}


/**
 * Pulsing "live" pill in the page header. Visual only — wire up the
 * `online` prop once the page has a real status source.
 */
export type SyncStatusProps = {
    label?: string;
    online?: boolean;
};

export function SyncStatus({label = "实时同步正常", online = true}: SyncStatusProps) {
    return (
        <div
            className={[
                "inline-flex items-center gap-2 h-9 px-3.5 rounded-full border",
                online
                    ? "bg-accent-teal/8 border-accent-teal/24"
                    : "bg-danger/8 border-danger/24",
            ].join(" ")}
        >
      <span className="relative flex h-2 w-2">
        <span
            className={[
                "absolute inline-flex h-full w-full rounded-full opacity-60",
                online ? "bg-accent-teal animate-ping" : "bg-danger",
            ].join(" ")}
        />
        <span
            className={[
                "relative inline-flex h-2 w-2 rounded-full",
                online ? "bg-accent-teal shadow-teal-dot" : "bg-danger",
            ].join(" ")}
        />
      </span>
            <span
                className={[
                    "text-xs tracking-wide",
                    online ? "text-accent-teal/92" : "text-danger/92",
                ].join(" ")}
            >
        {label}
      </span>
        </div>
    );
}

