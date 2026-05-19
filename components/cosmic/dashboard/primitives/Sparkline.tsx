import type { Trend } from "@/components/cosmic/dashboard/data/types";

export type SparklineProps = {
  data: number[];
  trend: Trend;
  width?: number;
  height?: number;
};

/**
 * Tiny inline area + line chart used inside KPI cards.
 *
 * Each instance gets its own gradient ids (suffixed with a hash of the
 * data) so multiple sparklines on the same page don't collide.
 */
export function Sparkline({ data, trend, width = 72, height = 22 }: SparklineProps) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((v - min) / range) * (height - 4) - 2;
    return [x, y] as const;
  });

  const d = pts
    .map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`)
    .join(" ");
  const fillD = `${d} L${width} ${height} L0 ${height} Z`;

  // Stable per-instance ids so multiple sparklines coexist without
  // sharing/overriding gradient defs.
  const uid = `${trend}-${data[0]}-${data[data.length - 1]}-${data.length}`;
  const fillId = `spark-fill-${uid}`;

  const stroke = trend === "up" ? "var(--color-stardust-gold)" : "var(--color-danger)";
  const fillStop = trend === "up" ? "var(--color-stardust-gold)" : "var(--color-danger)";

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height} aria-hidden>
      <defs>
        <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={fillStop} stopOpacity="0.32" />
          <stop offset="100%" stopColor={fillStop} stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Area lags slightly so the eye reads the line first; pop-in dot
          lands after the stroke sweep finishes. Durations / delays are
          kept short here because sparklines are tiny — drawn-out timing
          on a 22px-tall chart looks sluggish. */}
      <path
        d={fillD}
        fill={`url(#${fillId})`}
        className="chart-fade-up"
        style={{ animationDuration: "520ms", animationDelay: "200ms" }}
      />
      <path
        d={d}
        pathLength={1}
        fill="none"
        stroke={stroke}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.92"
        className="chart-line-draw"
        style={{ animationDuration: "640ms" }}
      />
      <circle
        cx={pts[pts.length - 1][0]}
        cy={pts[pts.length - 1][1]}
        r="1.8"
        fill={stroke}
        className="chart-pop"
        style={{ animationDelay: "560ms" }}
      />
    </svg>
  );
}
