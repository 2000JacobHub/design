"use client";

import { useState } from "react";
import * as mock from "@/components/dashboard/data/mock";
import { PanelHeader } from "@/components/dashboard/primitives";
import { BigPanel } from "@/components/dashboard/primitives/layouts";

const SIZE = 168;
const R = 58;
const STROKE = 18;
const C = 2 * Math.PI * R;
const GAP = 5; // circumferential gap between segments (px)

export default function CustomerMixDonut() {
  const data = mock.customerMix;
  const total = data.slices.reduce((sum, s) => sum + s.value, 0) || 1;
  const [hovered, setHovered] = useState<number | null>(null);

  let acc = 0;
  const segments = data.slices.map((s, i) => {
    const rawLen = (s.value / total) * C;
    const drawLen = Math.max(rawLen - GAP, 1);
    const offset = -(acc + GAP / 2);
    acc += rawLen;
    return { ...s, i, drawLen, offset, pct: Math.round((s.value / total) * 100) };
  });

  const active = hovered != null ? segments[hovered] : null;

  return (
    <BigPanel className="max-h-[420px]">
      <PanelHeader title={data.title} meta={data.meta} />

      <div className="flex flex-1 items-center gap-5 px-2">
        <div className="relative shrink-0 w-[160px]">
          <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="w-full -rotate-90">
            <circle cx={SIZE / 2} cy={SIZE / 2} r={R} fill="none" stroke="var(--color-soft-white)" strokeOpacity={0.05} strokeWidth={STROKE} />
            {segments.map((s) => (
              <circle
                key={s.label}
                cx={SIZE / 2}
                cy={SIZE / 2}
                r={R}
                fill="none"
                stroke={s.color}
                strokeWidth={hovered === s.i ? STROKE + 5 : STROKE}
                strokeDasharray={`${s.drawLen} ${C - s.drawLen}`}
                strokeDashoffset={s.offset}
                strokeLinecap="round"
                className="transition-[stroke-width,opacity] duration-200 ease-out cursor-pointer"
                style={{ opacity: hovered == null || hovered === s.i ? 1 : 0.32 }}
                onMouseEnter={() => setHovered(s.i)}
                onMouseLeave={() => setHovered(null)}
              />
            ))}
          </svg>

          <div className="absolute inset-0 grid place-items-center text-center pointer-events-none">
            <div>
              <div className="text-2xl font-light text-soft-white/92 tabular-nums leading-none">
                {active ? `${active.pct}%` : data.centerLabel}
              </div>
              <div className="mt-1 text-2xs text-soft-white/50">
                {active ? active.label : data.centerSub}
              </div>
            </div>
          </div>
        </div>

        <ul className="m-0 p-0 list-none flex flex-col gap-2 flex-1 min-w-0">
          {segments.map((s) => (
            <li
              key={s.label}
              onMouseEnter={() => setHovered(s.i)}
              onMouseLeave={() => setHovered(null)}
              className={[
                "flex items-center gap-2 text-sm rounded-md px-2 py-1 -mx-2 cursor-pointer transition-colors",
                hovered === s.i ? "bg-soft-white/6" : "",
              ].join(" ")}
            >
              <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: s.color }} />
              <span className="text-soft-white/72 truncate flex-1">{s.label}</span>
              <span className="text-soft-white/92 tabular-nums">{s.pct}%</span>
            </li>
          ))}
        </ul>
      </div>
    </BigPanel>
  );
}
