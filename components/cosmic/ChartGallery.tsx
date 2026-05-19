"use client";

import { useMemo, useState, type CSSProperties, type ReactNode } from "react";
import { CosmicFrame } from "./CosmicFrame";

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
      if (index === 0) {
        return `M${point.x.toFixed(1)} ${point.y.toFixed(1)}`;
      }

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

export default function ChartGallery() {
  const [mode, setMode] = useState<ChartMode>("signal");
  const [intensity, setIntensity] = useState(72);
  const [activeBar, setActiveBar] = useState(8);
  const [selectedCell, setSelectedCell] = useState("R2-C4");
  const series = useMemo(() => buildSeries(mode, intensity), [intensity, mode]);
  const peak = Math.max(...series);
  const average = Math.round(series.reduce((total, value) => total + value, 0) / series.length);

  return (
    <CosmicFrame activePage="charts" ariaLabel="Cosmic chart components">
      <section className="gallery-page chart-page">
        <header className="gallery-header">
          <div>
            <div className="system-pill">Data Components</div>
            <h1 className="gallery-title">
              <span>Cosmic</span>
              <span>Analytics</span>
            </h1>
          </div>

          <div className="gallery-control-deck">
            <div className="mode-tabs" role="tablist" aria-label="Chart dataset">
              {(Object.keys(modeLabels) as ChartMode[]).map((item) => (
                <button
                  aria-selected={mode === item}
                  className={`mode-tab ${mode === item ? "mode-tab-active" : ""}`}
                  key={item}
                  onClick={() => setMode(item)}
                  role="tab"
                  type="button"
                >
                  {modeLabels[item]}
                </button>
              ))}
            </div>
            <label
              className="gallery-range"
              style={{ "--value": `${intensity}%` } as CSSProperties}
            >
              <span>Gravity Load</span>
              <input
                aria-label="Gravity load"
                max="100"
                min="0"
                onChange={(event) => setIntensity(Number(event.currentTarget.value))}
                type="range"
                value={intensity}
              />
              <b>{intensity}%</b>
            </label>
          </div>
        </header>

        <div className="chart-metric-row">
          <MetricCard label="Peak Pulse" value={`${peak}%`} />
          <MetricCard label="Average" value={`${average}%`} />
          <MetricCard label="Orbit Index" value={`${Math.round((peak + average) / 2)}.4`} />
        </div>

        <div className="chart-grid-gallery">
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
    </CosmicFrame>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <article className="mini-metric-card">
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  );
}

function ChartPanel({
  children,
  className = "",
  title,
}: {
  children: ReactNode;
  className?: string;
  title: string;
}) {
  return (
    <article className={`gallery-card chart-panel ${className}`}>
      <div className="section-kicker">{title}</div>
      {children}
    </article>
  );
}

function AreaChart({ mode, series }: { mode: ChartMode; series: number[] }) {
  const width = 542;
  const height = 244;
  const padding = 30;
  const path = buildPath(series, width, height, padding);

  return (
    <ChartPanel className="area-panel" title="Orbital Trend">
      <svg className="area-chart-svg" viewBox={`0 0 ${width} ${height}`} aria-label={`${modeLabels[mode]} trend chart`}>
        <defs>
          <linearGradient id="areaFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#F5D28A" stopOpacity=".34" />
            <stop offset=".58" stopColor="#6C5E9D" stopOpacity=".12" />
            <stop offset="1" stopColor="#0E1F22" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="areaStroke" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#F5F6F8" stopOpacity=".86" />
            <stop offset=".55" stopColor="#F5D28A" />
            <stop offset="1" stopColor="#7FB9BE" stopOpacity=".56" />
          </linearGradient>
        </defs>
        {[0, 1, 2, 3].map((line) => (
          <line
            className="chart-grid-line"
            key={line}
            x1={padding}
            x2={width - padding}
            y1={padding + line * 48}
            y2={padding + line * 48}
          />
        ))}
        <path className="area-fill" d={path.area} />
        <path className="area-line" d={path.line} />
        {path.points.map((point, index) => (
          <circle className="area-dot" cx={point.x} cy={point.y} key={labels[index]} r={index === 8 ? 4.5 : 2.8} />
        ))}
      </svg>
      <div className="area-chart-labels">
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
    <ChartPanel className="bar-panel" title="Solar Bars">
      <div className="bar-chart" role="list" aria-label="Monthly bar chart">
        {series.slice(0, 10).map((value, index) => (
          <button
            aria-label={`${labels[index]} ${value}%`}
            className={`bar-column ${activeBar === index ? "bar-column-active" : ""}`}
            key={labels[index]}
            onClick={() => onActiveBarChange(index)}
            role="listitem"
            style={{ "--height": `${value}%` } as CSSProperties}
            type="button"
          >
            <span />
          </button>
        ))}
      </div>
      <div className="bar-caption">
        <span>{labels[activeBar]}</span>
        <strong>{series[activeBar]}%</strong>
      </div>
    </ChartPanel>
  );
}

function DonutChart({ intensity, mode }: { intensity: number; mode: ChartMode }) {
  const segments = [
    { label: "Core", value: clamp(42 + intensity * 0.16), color: "#F5D28A" },
    { label: "Dust", value: clamp(30 + (mode === "orbit" ? 18 : 7)), color: "#7FB9BE" },
    { label: "Void", value: clamp(24 + (mode === "energy" ? 16 : 6)), color: "#8C78BC" },
  ];
  const total = segments.reduce((sum, segment) => sum + segment.value, 0);
  let offset = 25;

  return (
    <ChartPanel className="donut-panel" title="Mass Split">
      <div className="donut-wrap">
        <svg viewBox="0 0 150 150" aria-label="Mass split donut chart">
          <circle className="donut-track" cx="75" cy="75" r="52" />
          {segments.map((segment) => {
            const dash = (segment.value / total) * 327;
            const currentOffset = offset;
            offset -= dash;

            return (
              <circle
                className="donut-segment"
                cx="75"
                cy="75"
                key={segment.label}
                r="52"
                stroke={segment.color}
                strokeDasharray={`${dash} ${327 - dash}`}
                strokeDashoffset={currentOffset}
              />
            );
          })}
        </svg>
        <strong>{Math.round(total / 3)}%</strong>
      </div>
      <div className="donut-legend">
        {segments.map((segment) => (
          <span key={segment.label}>
            <i style={{ background: segment.color }} />
            {segment.label}
          </span>
        ))}
      </div>
    </ChartPanel>
  );
}

function RadarChart({ intensity, series }: { intensity: number; series: number[] }) {
  const stats = ["Flux", "Mass", "Light", "Noise", "Orbit", "Pull"];
  const values = stats.map((_, index) => clamp(series[index] + intensity * 0.05));
  const points = values
    .map((value, index) => {
      const angle = -Math.PI / 2 + (Math.PI * 2 * index) / stats.length;
      const radius = 18 + value * 0.52;
      return `${75 + Math.cos(angle) * radius},${75 + Math.sin(angle) * radius}`;
    })
    .join(" ");

  return (
    <ChartPanel className="radar-panel" title="Field Radar">
      <svg className="radar-svg" viewBox="0 0 150 150" aria-label="Field radar chart">
        {[28, 48, 68].map((radius) => (
          <circle className="radar-ring" cx="75" cy="75" key={radius} r={radius} />
        ))}
        {stats.map((stat, index) => {
          const angle = -Math.PI / 2 + (Math.PI * 2 * index) / stats.length;
          return (
            <g key={stat}>
              <line className="radar-axis" x1="75" x2={75 + Math.cos(angle) * 68} y1="75" y2={75 + Math.sin(angle) * 68} />
              <text className="radar-label" x={75 + Math.cos(angle) * 76} y={78 + Math.sin(angle) * 76}>
                {stat}
              </text>
            </g>
          );
        })}
        <polygon className="radar-area" points={points} />
        <polygon className="radar-stroke" points={points} />
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
    <ChartPanel className="heatmap-panel" title="Nebula Heat">
      <div className="heatmap-grid" role="grid" aria-label={`${modeLabels[mode]} heatmap`}>
        {Array.from({ length: 30 }, (_, index) => {
          const row = Math.floor(index / 6);
          const column = index % 6;
          const id = `R${row + 1}-C${column + 1}`;
          const value = clamp(24 + row * 12 + column * 7 + (mode === "energy" ? 10 : 0));

          return (
            <button
              aria-label={`${id} ${value}%`}
              className={`heatmap-cell ${selectedCell === id ? "heatmap-cell-active" : ""}`}
              key={id}
              onClick={() => onSelectedCellChange(id)}
              role="gridcell"
              style={{ "--alpha": `${value / 100}` } as CSSProperties}
              type="button"
            />
          );
        })}
      </div>
      <div className="heatmap-caption">
        <span>{selectedCell}</span>
        <strong>{modeLabels[mode]}</strong>
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
    <ChartPanel className="funnel-panel" title="Comet Funnel">
      <div className="funnel-chart">
        {rows.map(([label, value]) => (
          <div className="funnel-row" key={label}>
            <span>{label}</span>
            <i style={{ width: `${value}%` }} />
            <strong>{Math.round(value)}%</strong>
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
    <ChartPanel className="timeline-panel" title="Event Timeline">
      <ol className="timeline-list">
        {items.map(([time, label], index) => (
          <li key={time}>
            <span>{time}</span>
            <i className={index === 1 ? "timeline-hot" : ""} />
            <strong>{label}</strong>
          </li>
        ))}
      </ol>
    </ChartPanel>
  );
}

function ScatterChart({ series }: { series: number[] }) {
  return (
    <ChartPanel className="scatter-panel" title="Star Scatter">
      <svg className="scatter-svg" viewBox="0 0 250 120" aria-label="Star scatter chart">
        {[0, 1, 2].map((line) => (
          <line
            className="chart-grid-line"
            key={line}
            x1="10"
            x2="240"
            y1={24 + line * 34}
            y2={24 + line * 34}
          />
        ))}
        {series.slice(0, 9).map((value, index) => {
          const x = 18 + index * 27;
          const y = 106 - value;
          const radius = 3 + (value % 5);

          return (
            <circle
              className={index === 5 ? "scatter-dot scatter-dot-hot" : "scatter-dot"}
              cx={x}
              cy={y}
              key={labels[index]}
              r={radius}
            />
          );
        })}
      </svg>
    </ChartPanel>
  );
}
