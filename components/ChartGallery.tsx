"use client";

import { useMemo, useState, type CSSProperties, type ReactNode } from "react";

type ChartMode = "signal" | "energy" | "orbit";

const modeLabels: Record<ChartMode, string> = {
  signal: "Signal",
  energy: "Energy",
  orbit: "Orbit",
};

const baseSeries: Record<ChartMode, number[]> = {
  signal: [31, 44, 38, 57, 50, 68, 61, 76, 66, 83, 72, 88],
  energy: [62, 68, 66, 74, 81, 77, 86, 91, 84, 93, 88, 96],
  orbit: [52, 49, 58, 64, 61, 70, 74, 72, 81, 78, 86, 84],
};

const labels = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

function clamp(value: number, min = 0, max = 100) {
  return Math.min(Math.max(value, min), max);
}

function buildSeries(mode: ChartMode, intensity: number) {
  const lift = (intensity - 50) * 0.18;
  return baseSeries[mode].map((value, index) => {
    const pulse = Math.sin(index * 0.9 + intensity / 32) * 5;
    return clamp(Math.round(value + lift + pulse), 12, 98);
  });
}

function buildPath(values: number[], width: number, height: number, padding: number) {
  const spanX = width - padding * 2;
  const spanY = height - padding * 2;
  const points = values.map((value, index) => {
    const x = padding + (spanX / (values.length - 1)) * index;
    const y = padding + spanY - (value / 100) * spanY;
    return { x, y };
  });

  const line = points
    .map((point, index) => {
      if (index === 0) return `M${point.x.toFixed(1)} ${point.y.toFixed(1)}`;
      const previous = points[index - 1];
      const controlX = (previous.x + point.x) / 2;
      return `C${controlX.toFixed(1)} ${previous.y.toFixed(1)} ${controlX.toFixed(1)} ${point.y.toFixed(1)} ${point.x.toFixed(1)} ${point.y.toFixed(1)}`;
    })
    .join(" ");

  const first = points[0];
  const last = points[points.length - 1];
  const area = `${line} L${last.x.toFixed(1)} ${height - padding} L${first.x.toFixed(1)} ${height - padding} Z`;

  return { area, line, points };
}

const kicker = "text-xs tracking-[0.16em] text-soft-white/46 uppercase";

export default function ChartGallery() {
  const [mode, setMode] = useState<ChartMode>("signal");
  const [intensity, setIntensity] = useState(72);
  const [activeBar, setActiveBar] = useState(8);
  const [selectedCell, setSelectedCell] = useState("R2-C4");
  const series = useMemo(() => buildSeries(mode, intensity), [intensity, mode]);
  const peak = Math.max(...series);
  const average = Math.round(series.reduce((t, v) => t + v, 0) / series.length);

  return (
    <section aria-label="Cosmic chart components" className="flex flex-col gap-6 pt-4">
      <header className="flex flex-wrap items-start justify-between gap-6">
        <div className="flex flex-col gap-3">
          <span className="cosmic-pill self-start">Data Components</span>
          <h1 className="m-0 leading-none flex flex-col gap-1 text-soft-white/92 font-light">
            <span className="text-5xl">Cosmic</span>
            <span className="text-5xl">Analytics</span>
          </h1>
        </div>

        <div className="flex flex-col items-stretch md:items-end gap-3 min-w-[280px]">
          <div
            role="tablist"
            aria-label="Chart dataset"
            className="inline-flex items-center gap-1 p-1 rounded-full bg-cosmic-black/64 border border-soft-white/10 self-start md:self-end"
          >
            {(Object.keys(modeLabels) as ChartMode[]).map((item) => {
              const active = mode === item;
              return (
                <button
                  key={item}
                  aria-selected={active}
                  onClick={() => setMode(item)}
                  role="tab"
                  type="button"
                  className={[
                    "h-8 px-5 rounded-full text-sm uppercase tracking-[0.14em] transition-colors",
                    active
                      ? "bg-stardust-gold/16 text-soft-white shadow-gold-ring"
                      : "text-soft-white/64 hover:text-soft-white/92",
                  ].join(" ")}
                >
                  {modeLabels[item]}
                </button>
              );
            })}
          </div>
          <label
            className="flex items-center gap-3 min-w-[280px]"
            style={{ "--value": `${intensity}%` } as CSSProperties}
          >
            <span className="text-xs uppercase tracking-[0.14em] text-soft-white/56">Gravity Load</span>
            <span className="relative flex-1 h-3 flex items-center">
              <span className="absolute inset-x-0 h-[3px] rounded-full bg-soft-white/12" />
              <span
                className="absolute left-0 h-[3px] rounded-full bg-linear-to-r from-soft-white to-stardust-gold"
                style={{ width: "var(--value)" }}
              />
              <input
                aria-label="Gravity load"
                className="relative w-full h-3 opacity-0 cursor-pointer"
                max="100"
                min="0"
                onChange={(e) => setIntensity(Number(e.currentTarget.value))}
                type="range"
                value={intensity}
              />
              <span
                aria-hidden
                className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 w-3 h-3 rounded-full bg-stardust-gold shadow-gold-pin pointer-events-none"
                style={{ left: "var(--value)" }}
              />
            </span>
            <b className="text-sm tabular-nums text-soft-white/82 min-w-[40px] text-right">{intensity}%</b>
          </label>
        </div>
      </header>

      <div className="grid grid-cols-3 gap-3">
        <MetricCard label="Peak Pulse" value={`${peak}%`} />
        <MetricCard label="Average" value={`${average}%`} />
        <MetricCard label="Orbit Index" value={`${Math.round((peak + average) / 2)}.4`} />
      </div>

      <div
        className="grid gap-4"
        style={{
          gridTemplateColumns: "1.6fr 1fr 1fr",
          gridAutoRows: "280px",
          gridTemplateAreas: `
            "area area bars"
            "donut radar heat"
            "funnel timeline scatter"
          `,
        }}
      >
        <AreaChart mode={mode} series={series} />
        <BarChart activeBar={activeBar} onActiveBarChange={setActiveBar} series={series} />
        <DonutChart intensity={intensity} mode={mode} />
        <RadarChart intensity={intensity} series={series} />
        <HeatmapChart
          mode={mode}
          onSelectedCellChange={setSelectedCell}
          selectedCell={selectedCell}
        />
        <FunnelChart intensity={intensity} />
        <TimelineChart mode={mode} />
        <ScatterChart series={series} />
      </div>
    </section>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <article className="cosmic-card flex items-center justify-between gap-2 px-4 py-3">
      <span className={kicker}>{label}</span>
      <strong className="text-3xl font-light text-soft-white/92 tabular-nums">{value}</strong>
    </article>
  );
}

function ChartPanel({
  area,
  children,
  title,
}: {
  area: string;
  children: ReactNode;
  title: string;
}) {
  return (
    <article
      className="cosmic-panel relative flex flex-col gap-3 p-4 min-h-0 overflow-hidden"
      style={{ gridArea: area }}
    >
      <div className={kicker}>{title}</div>
      <div className="flex-1 min-h-0 relative">{children}</div>
    </article>
  );
}

function AreaChart({ mode, series }: { mode: ChartMode; series: number[] }) {
  const width = 542;
  const height = 244;
  const padding = 30;
  const path = buildPath(series, width, height, padding);

  return (
    <ChartPanel area="area" title="Orbital Trend">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-full"
        preserveAspectRatio="none"
        aria-label={`${modeLabels[mode]} trend chart`}
      >
        <defs>
          <linearGradient id="areaFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="var(--color-stardust-gold)" stopOpacity=".34" />
            <stop offset=".58" stopColor="var(--color-accent-indigo)" stopOpacity=".12" />
            <stop offset="1" stopColor="var(--color-nebula-teal)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="areaStroke" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="var(--color-soft-white)" stopOpacity=".86" />
            <stop offset=".55" stopColor="var(--color-stardust-gold)" />
            <stop offset="1" stopColor="var(--color-accent-teal)" stopOpacity=".56" />
          </linearGradient>
        </defs>
        {[0, 1, 2, 3].map((line) => (
          <line
            key={line}
            className="stroke-soft-white/6"
            x1={padding}
            x2={width - padding}
            y1={padding + line * 48}
            y2={padding + line * 48}
            strokeDasharray="3 4"
          />
        ))}
        <path d={path.area} fill="url(#areaFill)" />
        <path d={path.line} fill="none" stroke="url(#areaStroke)" strokeWidth="2" />
        {path.points.map((point, index) => (
          <circle
            key={labels[index]}
            cx={point.x}
            cy={point.y}
            r={index === 8 ? 4.5 : 2.8}
            fill={index === 8 ? "var(--color-stardust-gold)" : "color-mix(in srgb, var(--color-soft-white) 82%, transparent)"}
          />
        ))}
      </svg>
      <div className="absolute inset-x-4 bottom-3 flex justify-between text-2xs uppercase tracking-[0.14em] text-soft-white/46">
        <span>{labels[0]}</span>
        <span>{modeLabels[mode]} Flux</span>
        <span>{labels[labels.length - 1]}</span>
      </div>
    </ChartPanel>
  );
}

function BarChart({
  activeBar,
  onActiveBarChange,
  series,
}: {
  activeBar: number;
  onActiveBarChange: (index: number) => void;
  series: number[];
}) {
  return (
    <ChartPanel area="bars" title="Solar Bars">
      <div
        className="flex items-end justify-between gap-2 h-full pb-7"
        role="list"
        aria-label="Monthly bar chart"
      >
        {series.slice(0, 10).map((value, index) => {
          const active = activeBar === index;
          return (
            <button
              key={labels[index]}
              aria-label={`${labels[index]} ${value}%`}
              onClick={() => onActiveBarChange(index)}
              role="listitem"
              type="button"
              className="relative flex-1 h-full flex items-end justify-center group"
            >
              <span
                className={[
                  "block w-full rounded-t-md transition-all",
                  active
                    ? "bg-linear-to-b from-stardust-gold to-stardust-amber shadow-gold-soft"
                    : "bg-linear-to-b from-stardust-gold/62 to-accent-indigo/42 group-hover:from-stardust-gold/82 group-hover:to-accent-indigo/62",
                ].join(" ")}
                style={{ height: `${value}%` }}
              />
            </button>
          );
        })}
      </div>
      <div className="absolute inset-x-4 bottom-3 flex justify-between text-xs text-soft-white/64">
        <span className="uppercase tracking-[0.12em]">{labels[activeBar]}</span>
        <strong className="text-soft-white/92 tabular-nums">{series[activeBar]}%</strong>
      </div>
    </ChartPanel>
  );
}

function DonutChart({ intensity, mode }: { intensity: number; mode: ChartMode }) {
  const segments = [
    { label: "Core", value: clamp(42 + intensity * 0.16), color: "var(--color-stardust-gold)" },
    { label: "Dust", value: clamp(30 + (mode === "orbit" ? 18 : 7)), color: "var(--color-accent-teal)" },
    { label: "Void", value: clamp(24 + (mode === "energy" ? 16 : 6)), color: "var(--color-accent-violet)" },
  ];
  const total = segments.reduce((s, x) => s + x.value, 0);
  let offset = 25;

  return (
    <ChartPanel area="donut" title="Mass Split">
      <div className="relative h-full flex flex-col items-center justify-center gap-3">
        <div className="relative w-[120px] h-[120px]">
          <svg viewBox="0 0 150 150" aria-label="Mass split donut chart" className="w-full h-full -rotate-90">
            <circle className="stroke-soft-white/8" cx="75" cy="75" r="52" fill="none" strokeWidth="12" />
            {segments.map((seg) => {
              const dash = (seg.value / total) * 327;
              const currentOffset = offset;
              offset -= dash;
              return (
                <circle
                  key={seg.label}
                  cx="75"
                  cy="75"
                  r="52"
                  fill="none"
                  stroke={seg.color}
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeDasharray={`${dash} ${327 - dash}`}
                  strokeDashoffset={currentOffset}
                />
              );
            })}
          </svg>
          <strong className="absolute inset-0 grid place-items-center text-3xl font-light text-soft-white/92 tabular-nums">
            {Math.round(total / 3)}%
          </strong>
        </div>
        <div className="flex flex-wrap gap-3 justify-center text-xs text-soft-white/72">
          {segments.map((seg) => (
            <span key={seg.label} className="inline-flex items-center gap-1.5">
              <i className="w-2 h-2 rounded-full inline-block" style={{ background: seg.color }} />
              {seg.label}
            </span>
          ))}
        </div>
      </div>
    </ChartPanel>
  );
}

function RadarChart({ intensity, series }: { intensity: number; series: number[] }) {
  const stats = ["Flux", "Mass", "Light", "Noise", "Orbit", "Pull"];
  const values = stats.map((_, i) => clamp(series[i] + intensity * 0.05));
  const points = values
    .map((value, index) => {
      const angle = -Math.PI / 2 + (Math.PI * 2 * index) / stats.length;
      const radius = 18 + value * 0.52;
      return `${75 + Math.cos(angle) * radius},${75 + Math.sin(angle) * radius}`;
    })
    .join(" ");

  return (
    <ChartPanel area="radar" title="Field Radar">
      <svg viewBox="0 0 160 160" className="w-full h-full" aria-label="Field radar chart">
        {[28, 48, 68].map((r) => (
          <circle key={r} className="stroke-soft-white/7" cx="75" cy="75" r={r} fill="none" />
        ))}
        {stats.map((stat, i) => {
          const angle = -Math.PI / 2 + (Math.PI * 2 * i) / stats.length;
          return (
            <g key={stat}>
              <line
                className="stroke-soft-white/7"
                x1="75"
                x2={75 + Math.cos(angle) * 68}
                y1="75"
                y2={75 + Math.sin(angle) * 68}
              />
              <text
                className="fill-soft-white/54"
                x={75 + Math.cos(angle) * 80}
                y={78 + Math.sin(angle) * 80}
                fontSize="9"
                textAnchor="middle"
              >
                {stat}
              </text>
            </g>
          );
        })}
        <polygon className="fill-stardust-gold/22" points={points} stroke="var(--color-stardust-gold)" strokeWidth="1.4" />
      </svg>
    </ChartPanel>
  );
}

function HeatmapChart({
  mode,
  onSelectedCellChange,
  selectedCell,
}: {
  mode: ChartMode;
  onSelectedCellChange: (cell: string) => void;
  selectedCell: string;
}) {
  return (
    <ChartPanel area="heat" title="Nebula Heat">
      <div
        className="grid grid-cols-6 gap-1 h-full pb-6"
        role="grid"
        aria-label={`${modeLabels[mode]} heatmap`}
      >
        {Array.from({ length: 30 }, (_, index) => {
          const row = Math.floor(index / 6);
          const column = index % 6;
          const id = `R${row + 1}-C${column + 1}`;
          const value = clamp(24 + row * 12 + column * 7 + (mode === "energy" ? 10 : 0));
          const alpha = value / 100;
          const active = selectedCell === id;
          return (
            <button
              key={id}
              aria-label={`${id} ${value}%`}
              onClick={() => onSelectedCellChange(id)}
              role="gridcell"
              type="button"
              className={[
                "rounded-sm transition-transform",
                active ? "scale-110 ring-1 ring-stardust-gold/72" : "hover:scale-105",
              ].join(" ")}
              style={{ background: `color-mix(in srgb, var(--color-stardust-gold) ${(alpha * 100).toFixed(0)}%, transparent)` }}
            />
          );
        })}
      </div>
      <div className="absolute inset-x-4 bottom-3 flex justify-between text-xs">
        <span className="text-soft-white/64 tabular-nums">{selectedCell}</span>
        <strong className="text-soft-white/92 uppercase tracking-[0.12em]">{modeLabels[mode]}</strong>
      </div>
    </ChartPanel>
  );
}

function FunnelChart({ intensity }: { intensity: number }) {
  const rows = [
    ["Detected", 100],
    ["Stabilized", clamp(84 + intensity * 0.05)],
    ["Mapped", clamp(65 + intensity * 0.14)],
    ["Locked", clamp(42 + intensity * 0.2)],
  ] as const;

  return (
    <ChartPanel area="funnel" title="Comet Funnel">
      <div className="flex flex-col gap-3">
        {rows.map(([label, value]) => (
          <div key={label} className="grid grid-cols-[64px_1fr_42px] items-center gap-2 text-xs">
            <span className="text-soft-white/64 uppercase tracking-widest">{label}</span>
            <span className="h-2 rounded-full bg-soft-white/8 overflow-hidden">
              <i
                className="block h-full rounded-full bg-linear-to-r from-stardust-gold to-accent-teal"
                style={{ width: `${value}%` }}
              />
            </span>
            <strong className="text-soft-white/92 tabular-nums text-right">{Math.round(value)}%</strong>
          </div>
        ))}
      </div>
    </ChartPanel>
  );
}

function TimelineChart({ mode }: { mode: ChartMode }) {
  const items = [
    ["01:20", "Pulse aligned"],
    ["04:10", `${modeLabels[mode]} peak`],
    ["12:45", "Ring sampled"],
    ["18:30", "Archive synced"],
  ];

  return (
    <ChartPanel area="timeline" title="Event Timeline">
      <ol className="flex flex-col gap-3 pl-2">
        {items.map(([time, label], index) => (
          <li key={time} className="grid grid-cols-[44px_10px_1fr] items-center gap-2 text-xs">
            <span className="text-soft-white/56 tabular-nums">{time}</span>
            <i
              className={[
                "w-2 h-2 rounded-full justify-self-center",
                index === 1 ? "bg-stardust-gold shadow-gold-pin" : "bg-soft-white/40",
              ].join(" ")}
            />
            <strong className="text-soft-white/82 font-medium">{label}</strong>
          </li>
        ))}
      </ol>
    </ChartPanel>
  );
}

function ScatterChart({ series }: { series: number[] }) {
  return (
    <ChartPanel area="scatter" title="Star Scatter">
      <svg viewBox="0 0 250 120" className="w-full h-full" aria-label="Star scatter chart">
        {[0, 1, 2].map((line) => (
          <line
            key={line}
            className="stroke-soft-white/6"
            x1="10"
            x2="240"
            y1={24 + line * 34}
            y2={24 + line * 34}
            strokeDasharray="3 4"
          />
        ))}
        {series.slice(0, 9).map((value, index) => {
          const x = 18 + index * 27;
          const y = 106 - value;
          const r = 3 + (value % 5);
          return (
            <circle
              key={labels[index]}
              cx={x}
              cy={y}
              r={r}
              fill={index === 5 ? "var(--color-stardust-gold)" : "color-mix(in srgb, var(--color-soft-white) 72%, transparent)"}
              stroke={index === 5 ? "color-mix(in srgb, var(--color-stardust-gold) 45%, transparent)" : "none"}
              strokeWidth={index === 5 ? "4" : "0"}
            />
          );
        })}
      </svg>
    </ChartPanel>
  );
}
