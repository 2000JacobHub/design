import * as mock from "@/components/dashboard/data/mock";
import { PanelHeader } from "@/components/dashboard/primitives";
import { BigPanel } from "@/components/dashboard/primitives/layouts";

/** Opaque ramp color (low → high) built by mixing the heat tokens. */
function rampColor(t: number) {
  return `color-mix(in srgb, var(--color-heat-low), var(--color-heat-high) ${(t * 100).toFixed(1)}%)`;
}

/** value 0–100 → an inline background: the busier the hour, the redder.
 *  Alpha rises with traffic so quiet hours fade into the panel. */
function cellStyle(value: number) {
  const t = Math.max(0, Math.min(1, value / 100));
  const transparentPct = (100 - (0.16 + t * 0.84) * 100).toFixed(1);
  return { background: `color-mix(in srgb, transparent ${transparentPct}%, ${rampColor(t)})` };
}

/** Opaque accent for the tooltip dot — same ramp at full opacity. */
function accentColor(value: number) {
  return rampColor(Math.max(0, Math.min(1, value / 100)));
}

export default function ParkingHeatmap() {
  const data = mock.parkingHeatmap;
  const peak = data.cells.reduce((a, b) => (b.value > a.value ? b : a), data.cells[0]);

  return (
    <BigPanel>
      <PanelHeader title={data.title} meta={data.meta} />

      <div className="flex flex-col gap-3 flex-1 justify-center px-4 xl:px-12">
        <div className="grid grid-cols-8 gap-1.5">
          {data.cells.map((c) => {
            const isPeak = c.hour === peak.hour;
            return (
              <div
                key={c.hour}
                className={[
                  "group relative aspect-square rounded-sm grid place-items-center text-2xs tabular-nums transition-transform hover:scale-110 cursor-default",
                  isPeak
                    ? "ring-1 ring-[var(--color-heat-peak)] text-soft-white font-medium"
                    : "text-soft-white/70",
                ].join(" ")}
                style={cellStyle(c.value)}
              >
                {parseInt(c.hour, 10)}
                <div className="pointer-events-none absolute left-1/2 bottom-full z-30 mb-2 -translate-x-1/2 translate-y-1 scale-95 opacity-0 transition-all duration-150 ease-out group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100">
                  <div className="relative whitespace-nowrap rounded-lg border border-soft-white/12 bg-cosmic-black/90 px-3 py-2 shadow-xl backdrop-blur">
                    <div className="flex items-center gap-1.5 text-2xs text-soft-white/55">
                      <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: accentColor(c.value) }} />
                      {c.hour}
                    </div>
                    <div className="mt-1 flex items-baseline gap-1">
                      <span className="text-[10px] text-soft-white/55">车流量</span>
                      <span className="text-base font-semibold leading-none tabular-nums text-soft-white">{c.count}</span>
                      <span className="text-2xs text-soft-white/55">辆</span>
                    </div>
                    <div className="mt-0.5 text-[10px] text-soft-white/45">饱和度 {c.value}%</div>
                    <span className="absolute left-1/2 top-full -mt-px h-0 w-0 -translate-x-1/2 border-[5px] border-transparent border-t-cosmic-black/90" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between gap-2 text-2xs text-soft-white/56">
          <span>低</span>
          <span
            className="h-1.5 flex-1 rounded-full"
            style={{
              background:
                "linear-gradient(to right, color-mix(in srgb, transparent 80%, var(--color-heat-low)) 0%, var(--color-heat-low) 50%, var(--color-heat-high) 100%)",
            }}
          />
          <span>高</span>
        </div>
      </div>

      <div className="text-xs text-soft-white/56 text-center">{data.summary}</div>
    </BigPanel>
  );
}
