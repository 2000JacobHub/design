"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import * as mock from "@/components/dashboard/data/mock";
import { ActionLink, PanelHeader } from "@/components/dashboard/primitives";
import {BigPanel} from "@/components/dashboard/primitives/layouts";

const PAD = { top: 22, right: 44, bottom: 30, left: 44 } as const;
const Y_TICKS = [0, 0.25, 0.5, 0.75, 1] as const;

export default function TrafficSalesChart() {
  const data = mock.trafficSales;
  /* Hover state lives inside the widget — that way the chart is a drop-in
     unit and the page composing it doesn't need to plumb hover handlers. */
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  /* Measure the actual container so the SVG viewBox uses real pixel
     coordinates. `size` starts as `null` (on both server and client),
     which deliberately keeps the SVG out of the SSR'd HTML — only after
     the container has been laid out and measured on the client do we
     mount the chart. Initialising with a placeholder size like
     `{540, 220}` would cause a one-frame "wrong size → correct size"
     re-layout on refresh (the perceived shake), because the SSR pass
     would draw the chart at 540×220 letterboxed inside the actual
     container, then the post-measurement render would redraw at the
     real pixel size. */
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const measure = () => {
      const { width, height } = el.getBoundingClientRect();
      if (width > 0 && height > 0) setSize({ w: width, h: height });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Math runs even when `size` is null (with w=h=0); the SVG itself is
  // gated below, so these values never reach the DOM unless real.
  const w = size?.w ?? 0;
  const h = size?.h ?? 0;
  const innerW = Math.max(1, w - PAD.left - PAD.right);
  const innerH = Math.max(1, h - PAD.top - PAD.bottom);
  const n = data.xAxis.length;

  const trafficMax = Math.max(...data.traffic) * 1.12;
  const salesMax = Math.max(...data.sales) * 1.12;

  const xAt = (i: number) => PAD.left + (i / (n - 1)) * innerW;
  const yTraffic = (v: number) => PAD.top + innerH * (1 - v / trafficMax);
  const ySales = (v: number) => PAD.top + innerH * (1 - v / salesMax);

  const buildSmooth = (vals: number[], y: (v: number) => number) => {
    const pts = vals.map((v, i) => ({ x: xAt(i), y: y(v) }));
    return pts
      .map((p, i) => {
        if (i === 0) return `M${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
        const prev = pts[i - 1];
        const mx = (prev.x + p.x) / 2;
        return `C${mx.toFixed(1)} ${prev.y.toFixed(1)} ${mx.toFixed(1)} ${p.y.toFixed(1)} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
      })
      .join(" ");
  };

  const trafficPath = buildSmooth(data.traffic, yTraffic);
  const salesPath = buildSmooth(data.sales, ySales);
  const baseY = h - PAD.bottom;
  const trafficArea = `${trafficPath} L${xAt(n - 1).toFixed(1)} ${baseY} L${xAt(0).toFixed(1)} ${baseY} Z`;

  const showHover = hoverIdx !== null;
  const safeHover = Math.max(0, Math.min(n - 1, hoverIdx ?? 0));
  const hoverX = xAt(safeHover);
  const hoverYT = yTraffic(data.traffic[safeHover]);
  const hoverYS = ySales(data.sales[safeHover]);

  return (
    <BigPanel className="overflow-visible max-h-[420px]">
      <PanelHeader
        title={data.title}
        meta={
          <span className="inline-flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5">
              <i className="w-2 h-2 rounded-full bg-stardust-gold shadow-gold-dot" />
              客流（人次/万）
            </span>
            <span className="inline-flex items-center gap-1.5">
              <i className="w-2 h-2 rounded-full bg-accent-teal" />
              销售额（万元）
            </span>
          </span>
        }
        action={<ActionLink />}
      />
      {/* `min-h-[260px]` reserves vertical space during the SSR pass and
          the brief unmeasured period after hydration — without it, the
          panel would render header + summary only, then expand once the
          SVG mounts, pushing every panel below it down by ~260px on
          mobile (where panels stack instead of sharing a grid row). */}
      <div ref={containerRef} className="relative flex-1 min-h-[260px] overflow-visible">
        {size && (
          <>
            <svg
              viewBox={`0 0 ${w} ${h}`}
              className="w-full h-full block"
              aria-label="客流与销售额趋势"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const relX = ((e.clientX - rect.left) / rect.width) * w;
                const idx = Math.round(((relX - PAD.left) / innerW) * (n - 1));
                setHoverIdx(Math.max(0, Math.min(n - 1, idx)));
              }}
              onMouseLeave={() => setHoverIdx(null)}
            >
              <defs>
                <linearGradient id="trafficFill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-stardust-gold)" stopOpacity="0.28" />
                  <stop offset="100%" stopColor="var(--color-stardust-gold)" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="trafficStroke" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0%" stopColor="var(--color-soft-white)" stopOpacity="0.78" />
                  <stop offset="60%" stopColor="var(--color-stardust-gold)" />
                  <stop offset="100%" stopColor="var(--color-stardust-amber)" />
                </linearGradient>
              </defs>

              {Y_TICKS.map((r) => (
                <line
                  key={`grid-${r}`}
                  x1={PAD.left}
                  x2={w - PAD.right}
                  y1={PAD.top + innerH * r}
                  y2={PAD.top + innerH * r}
                  stroke="var(--color-soft-white)"
                  strokeOpacity={0.06}
                />
              ))}

              {Y_TICKS.map((r) => {
                const v = Math.round(trafficMax * (1 - r));
                return (
                  <text
                    key={`yl-${r}`}
                    className="tabular-nums"
                    x={PAD.left - 8}
                    y={PAD.top + innerH * r + 4}
                    textAnchor="end"
                    fill="var(--color-stardust-gold)"
                    fillOpacity={0.6}
                    fontSize="9.5"
                  >
                    {v}
                  </text>
                );
              })}

              {Y_TICKS.map((r) => {
                const v = Math.round(salesMax * (1 - r));
                return (
                  <text
                    key={`yr-${r}`}
                    className="tabular-nums"
                    x={w - PAD.right + 8}
                    y={PAD.top + innerH * r + 4}
                    textAnchor="start"
                    fill="var(--color-accent-teal)"
                    fillOpacity={0.7}
                    fontSize="9.5"
                  >
                    {v}
                  </text>
                );
              })}

              {data.xAxis.map((label, i) => (
                <text
                  key={`${label}-${i}`}
                  className="tabular-nums"
                  x={xAt(i)}
                  y={h - 10}
                  textAnchor="middle"
                  fill="var(--color-soft-white)"
                  fillOpacity={0.46}
                  fontSize="10"
                >
                  {label}
                </text>
              ))}

              {/* Entrance choreography (matches `globals.css` keyframes):
                    0ms     traffic stroke begins drawing left→right
                    250ms   sales (dashed) line fades in
                    400ms   traffic area fill rises in
                    700ms+  data points pop along the timeline,
                            staggered by index so they cascade
                  Solid line uses stroke-dashoffset draw-on; dashed line
                  uses fade-up because dashoffset would clobber its
                  `5 4` dash pattern. */}
              <path
                d={trafficArea}
                fill="url(#trafficFill)"
                className="chart-fade-up"
                style={{ animationDelay: "400ms" }}
              />
              <path
                d={salesPath}
                fill="none"
                stroke="var(--color-accent-teal)"
                strokeWidth="1.6"
                strokeDasharray="5 4"
                className="chart-fade-up"
                style={{ animationDelay: "250ms" }}
              />
              <path
                d={trafficPath}
                pathLength={1}
                fill="none"
                stroke="url(#trafficStroke)"
                strokeWidth="2"
                className="chart-line-draw"
              />

              {data.traffic.map((_, i) => (
                <circle
                  key={`t-${i}`}
                  cx={xAt(i)}
                  cy={yTraffic(data.traffic[i])}
                  r="2.4"
                  fill="var(--color-stardust-gold)"
                  opacity="0.85"
                  className="chart-pop"
                  style={{ animationDelay: `${700 + i * 60}ms` }}
                />
              ))}
              {data.sales.map((_, i) => (
                <circle
                  key={`s-${i}`}
                  cx={xAt(i)}
                  cy={ySales(data.sales[i])}
                  r="2.2"
                  fill="var(--color-accent-teal)"
                  opacity="0.85"
                  className="chart-pop"
                  style={{ animationDelay: `${760 + i * 60}ms` }}
                />
              ))}

              {showHover && (
                <>
                  <line
                    x1={hoverX}
                    x2={hoverX}
                    y1={PAD.top}
                    y2={baseY}
                    stroke="var(--color-stardust-gold)"
                    strokeOpacity={0.45}
                    strokeDasharray="2 3"
                  />
                  <circle cx={hoverX} cy={hoverYT} r="4.5" fill="var(--color-stardust-gold)" stroke="var(--color-soft-white)" strokeOpacity={0.7} />
                  <circle cx={hoverX} cy={hoverYS} r="4.5" fill="var(--color-accent-teal)" stroke="var(--color-soft-white)" strokeOpacity={0.7} />
                </>
              )}
            </svg>

            {showHover && (
              <div
                className="absolute z-20 cosmic-card p-2.5 text-xs whitespace-nowrap pointer-events-none -translate-y-1/2"
                style={(() => {
                  const flipped = hoverX > w / 2;
                  const xPct = (hoverX / w) * 100;
                  const yPct = (Math.min(hoverYT, hoverYS) / h) * 100;
                  const horizontal = flipped
                    ? { right: `calc(${(100 - xPct).toFixed(2)}% + 14px)` }
                    : { left: `calc(${xPct.toFixed(2)}% + 14px)` };
                  return {
                    ...horizontal,
                    top: `clamp(48px, ${yPct.toFixed(2)}%, calc(100% - 48px))`,
                  } as CSSProperties;
                })()}
              >
                <div className="text-soft-white/64 text-2xs mb-1.5 tabular-nums">{data.xAxis[safeHover]}</div>
                <div className="flex items-center gap-2">
                  <i className="w-2 h-2 rounded-full bg-stardust-gold" />
                  客流 <strong className="text-soft-white/92 tabular-nums">{data.traffic[safeHover]} 万</strong>
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <i className="w-2 h-2 rounded-full bg-accent-teal" />
                  销售额 <strong className="text-soft-white/92 tabular-nums">{data.sales[safeHover]} 万</strong>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      <div className="text-xs text-soft-white/56 text-center">{data.summary}</div>
    </BigPanel>
  );
}
