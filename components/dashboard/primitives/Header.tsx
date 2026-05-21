"use client";

import {clock as clockIcon, Icon} from "@/lib/icons";
import {useClock} from "@/hooks/useClock";
import {ThemeToggle} from "@/components/ThemeToggle";

export default function Header() {
    return (
        <header className="relative z-2 flex flex-wrap items-center justify-between gap-3 mb-4 lg:mb-5">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 grid place-items-center cursor-pointer" aria-label="X">
                    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden>
                        <defs>
                            <linearGradient id="x-logo-gold" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="var(--color-stardust-gold)"/>
                                <stop offset="55%" stopColor="var(--color-stardust-gold)"/>
                                <stop offset="100%" stopColor="var(--color-stardust-amber)"/>
                            </linearGradient>
                        </defs>
                        <path fill="url(#x-logo-gold)" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.451-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644Z"/>
                    </svg>
                </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
                <ThemeToggle/>
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

