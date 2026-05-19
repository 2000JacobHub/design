import type { CampaignFunnelData } from "@/components/cosmic/dashboard/data/types";
import { ActionLink, PanelHeader } from "@/components/cosmic/dashboard/primitives";

export type CampaignFunnelProps = {
  data: CampaignFunnelData;
};

const MIN_W = 0.38;
const MAX_W = 1.0;

export function CampaignFunnel({ data }: CampaignFunnelProps) {
  const max = data.stages[0]?.num ?? 1;
  const widths = data.stages.map(s => MIN_W + (s.num / max) * (MAX_W - MIN_W));

  return (
    <>
      <PanelHeader title={data.title} meta={data.period} action={<ActionLink />} />

      <div className="flex flex-col flex-1 justify-center px-6">
        {data.stages.map((s, i) => {
          const w = widths[i];
          const wNext = widths[i + 1] ?? w;
          const lPct = ((1 - w) / 2) * 100;
          const rPct = 100 - lPct;
          const lNextPct = ((1 - wNext) / 2) * 100;
          const rNextPct = 100 - lNextPct;
          // Text padding uses the narrower (bottom) edge so text stays inside the shape
          const padPct = Math.max(lPct, lNextPct);
          const t = i / Math.max(data.stages.length - 1, 1);
          const goldA = (0.32 - t * 0.1).toFixed(2);
          const tealA = (0.14 + t * 0.12).toFixed(2);

          // Stage i enters at i*150ms; badge after previous stage enters at i*150ms-70ms
          const stageDelay = `${i * 150}ms`;
          const badgeDelay = `${i * 150 - 70}ms`;
          const labelDelay = `${i * 150 + 60}ms`;

          return (
            <div key={s.stage}>
              {i > 0 && s.conversion && (
                <div className="flex items-center justify-center h-8">
                  <div
                    className="chart-fade-up flex items-center gap-1 px-2 py-0.5 rounded-full bg-deep-space border border-stardust-gold/16"
                    style={{ animationDelay: badgeDelay }}
                  >
                    <span className="text-2xs text-stardust-gold/45">↓</span>
                    <span className="text-2xs text-stardust-gold/65 tabular-nums">{s.conversion}</span>
                  </div>
                </div>
              )}

              <div className="relative h-7">
                {/* Trapezoid wipes in from center; drop-shadow traces the clip contour */}
                <div
                  className="funnel-stage absolute inset-0"
                  style={{
                    clipPath: `polygon(${lPct.toFixed(2)}% 0%, ${rPct.toFixed(2)}% 0%, ${rNextPct.toFixed(2)}% 100%, ${lNextPct.toFixed(2)}% 100%)`,
                    background: `linear-gradient(to right, rgba(245,210,138,${goldA}) 0%, rgba(127,185,190,${tealA}) 100%)`,
                    filter: "drop-shadow(0 0 1.5px rgba(245,210,138,0.28))",
                    animationDelay: stageDelay,
                  }}
                />
                {/* Labels fade up slightly after the shape appears */}
                <div
                  className="chart-fade-up absolute inset-0 flex items-center justify-between"
                  style={{
                    paddingLeft: `calc(${padPct.toFixed(2)}% + 10px)`,
                    paddingRight: `calc(${padPct.toFixed(2)}% + 10px)`,
                    animationDelay: labelDelay,
                  }}
                >
                  <span className="text-xs text-soft-white/72 truncate">{s.stage}</span>
                  <span className="text-sm text-soft-white/90 tabular-nums shrink-0 ml-1">{s.value}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="cosmic-card flex items-center justify-between gap-2 p-3 mt-2">
        <div className="text-xs text-soft-white/64">{data.roi.label}</div>
        <div className="flex items-baseline gap-2">
          <strong className="text-3xl font-light text-stardust-gold tabular-nums">{data.roi.value}</strong>
          <span className="text-2xs text-stardust-gold/72">{data.roi.change}</span>
        </div>
      </div>
    </>
  );
}
