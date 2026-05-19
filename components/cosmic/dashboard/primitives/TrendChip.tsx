import type { Trend } from "@/components/cosmic/dashboard/data/types";

export type TrendChipProps = {
  trend: Trend;
  change: string;
};

export function TrendChip({ trend, change }: TrendChipProps) {
  const up = trend === "up";
  return (
    <span
      className={[
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs tabular-nums",
        up
          ? "text-stardust-gold bg-stardust-gold/12 border border-stardust-gold/24"
          : "text-danger bg-danger/12 border border-danger/24",
      ].join(" ")}
    >
      <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden>
        {up ? (
          <path d="M5 1.5 L9 6 L6.5 6 L6.5 9 L3.5 9 L3.5 6 L1 6 Z" fill="currentColor" />
        ) : (
          <path d="M5 8.5 L1 4 L3.5 4 L3.5 1 L6.5 1 L6.5 4 L9 4 Z" fill="currentColor" />
        )}
      </svg>
      {change}
    </span>
  );
}
