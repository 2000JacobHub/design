import type { KpiCardData } from "@/components/dashboard/data/types";
import { Sparkline, TrendChip } from "@/components/dashboard/primitives";

export type KpiCardProps = {
  data: KpiCardData;
};

/**
 * One KPI tile. Used in the top strip; render multiple of these in a
 * grid by mapping over an array of `KpiCardData`.
 */
export function KpiCard({ data }: KpiCardProps) {
  return (
    <div className="cosmic-card flex flex-col gap-2 p-4 min-w-0">
      <div className="flex items-start justify-between gap-2 min-w-0">
        <span className="text-sm text-soft-white/64 truncate">{data.title}</span>
        <TrendChip trend={data.trend} change={data.change} />
      </div>
      <div className="text-4xl leading-none font-light text-soft-white/92 tabular-nums">
        {data.value}
      </div>
      <div className="flex items-center justify-between gap-3">
        <span className="text-2xs text-soft-white/46">{data.comparison}</span>
        <Sparkline data={data.spark} trend={data.trend} />
      </div>
    </div>
  );
}
