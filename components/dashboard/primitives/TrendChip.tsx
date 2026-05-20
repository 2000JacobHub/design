import { Icon, trendingDown, trendingUp } from "@/lib/icons";
import type { Trend } from "@/components/dashboard/data/types";

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
      <Icon icon={up ? trendingUp : trendingDown} width={12} height={12} aria-hidden />
      {change}
    </span>
  );
}
