import type { CampaignFunnelData } from "@/components/cosmic/dashboard/data/types";
import { ActionLink, PanelHeader } from "@/components/cosmic/dashboard/primitives";

export type CampaignFunnelProps = {
  data: CampaignFunnelData;
};

export function CampaignFunnel({ data }: CampaignFunnelProps) {
  const max = data.stages[0]?.num ?? 1;

  return (
    <>
      <PanelHeader title={data.title} meta={data.period} action={<ActionLink />} />
      <ul className="m-0 p-0 list-none flex flex-col gap-1.5 flex-1">
        {data.stages.map((s, i) => {
          const width = 40 + (s.num / max) * 60;
          return (
            <li key={s.stage} className="flex flex-col items-center gap-1">
              {i > 0 && s.conversion && (
                <div className="text-2xs text-stardust-gold/72 flex items-center gap-1">
                  <span aria-hidden>↓</span>转化
                  <span className="tabular-nums">{s.conversion}</span>
                </div>
              )}
              <div
                className={[
                  "rounded-lg px-3 py-1.5 flex items-center justify-between gap-3",
                  "bg-linear-to-r from-stardust-gold/32 to-accent-teal/18",
                  "border border-stardust-gold/22",
                ].join(" ")}
                style={{ width: `${width}%` }}
              >
                <span className="text-xs text-soft-white/82">{s.stage}</span>
                <span className="text-sm text-soft-white/92 tabular-nums">{s.value}</span>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="cosmic-card flex items-center justify-between gap-2 p-3 mt-1">
        <div className="text-xs text-soft-white/64">{data.roi.label}</div>
        <div className="flex items-baseline gap-2">
          <strong className="text-3xl font-light text-stardust-gold tabular-nums">{data.roi.value}</strong>
          <span className="text-2xs text-stardust-gold/72">{data.roi.change}</span>
        </div>
      </div>
    </>
  );
}
