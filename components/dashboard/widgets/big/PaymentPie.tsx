"use client";

import { useState } from "react";
import * as mock from "@/components/dashboard/data/mock";
import { PanelHeader } from "@/components/dashboard/primitives";
import { BigPanel } from "@/components/dashboard/primitives/layouts";

const SIZE = 176;
const R = 72;
const CENTER = SIZE / 2;
const PAD = 0; // no gap — slices sit flush against each other

/** Point on the circle for an angle measured clockwise from 12 o'clock. */
function polar(deg: number, radius = R): [number, number] {
  const a = ((deg - 90) * Math.PI) / 180;
  return [CENTER + radius * Math.cos(a), CENTER + radius * Math.sin(a)];
}

function wedge(startDeg: number, endDeg: number): string {
  const s = startDeg + PAD / 2;
  const e = endDeg - PAD / 2;
  const [sx, sy] = polar(s);
  const [ex, ey] = polar(e);
  const large = e - s > 180 ? 1 : 0;
  return `M ${CENTER} ${CENTER} L ${sx} ${sy} A ${R} ${R} 0 ${large} 1 ${ex} ${ey} Z`;
}

/** Mix a #rrggbb color toward white for a soft highlight stop. */
function lighten(hex: string, amt: number): string {
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  const mix = (c: number) => Math.round(c + (255 - c) * amt);
  return `rgb(${mix(r)}, ${mix(g)}, ${mix(b)})`;
}

export default function PaymentPie() {
  const data = mock.paymentMix;
  const total = data.slices.reduce((sum, s) => sum + s.value, 0) || 1;
  const [hovered, setHovered] = useState<number | null>(null);

  let acc = 0;
  const wedges = data.slices.map((s, i) => {
    const start = (acc / total) * 360;
    acc += s.value;
    const end = (acc / total) * 360;
    const mid = (start + end) / 2;
    const [ox, oy] = polar(mid, 7);
    return {
      ...s,
      i,
      d: wedge(start, end),
      dx: ox - CENTER,
      dy: oy - CENTER,
      pct: Math.round((s.value / total) * 100),
    };
  });

  return (
    <BigPanel className="max-h-[420px]">
      <PanelHeader title={data.title} meta={data.meta} />

      <div className="flex flex-1 items-center gap-5 px-2">
        <div className="shrink-0 w-[168px]">
          <svg
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            className="w-full overflow-visible"
            style={{ filter: "drop-shadow(0 8px 18px rgb(0 0 0 / 0.5))" }}
          >
            <defs>
              {wedges.map((s) => (
                <linearGradient key={s.label} id={`pie-${s.i}`} x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor={lighten(s.color, 0.32)} />
                  <stop offset="100%" stopColor={s.color} />
                </linearGradient>
              ))}
              {/* faint top sheen overlaid on the whole pie */}
              <radialGradient id="pie-sheen" cx="38%" cy="32%" r="75%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.18" />
                <stop offset="55%" stopColor="#ffffff" stopOpacity="0" />
              </radialGradient>
            </defs>

            {wedges.map((s) => (
              <path
                key={s.label}
                d={s.d}
                fill={`url(#pie-${s.i})`}
                stroke={`url(#pie-${s.i})`}
                strokeWidth={2}
                strokeLinejoin="round"
                className="transition-[transform,opacity] duration-200 ease-out cursor-pointer"
                style={{
                  opacity: hovered == null || hovered === s.i ? 1 : 0.38,
                  transform: hovered === s.i ? `translate(${s.dx}px, ${s.dy}px)` : undefined,
                }}
                onMouseEnter={() => setHovered(s.i)}
                onMouseLeave={() => setHovered(null)}
              />
            ))}

            <circle cx={CENTER} cy={CENTER} r={R} fill="url(#pie-sheen)" className="pointer-events-none" />
          </svg>
        </div>

        <ul className="m-0 p-0 list-none flex flex-col gap-2 flex-1 min-w-0">
          {wedges.map((s) => (
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
