import * as mock from "@/components/dashboard/data/mock";
import { PanelHeader } from "@/components/dashboard/primitives";
import { BigPanel } from "@/components/dashboard/primitives/layouts";

/** value 0–100 → an inline background that reads as a low→high heatmap. */
function cellStyle(value: number) {
  const t = Math.max(0, Math.min(1, value / 100));
  // Hue glides teal → gold → amber as saturation climbs; alpha rises so
  // quiet hours stay near the panel background and peaks glow.
  const alpha = (0.1 + t * 0.85).toFixed(3);
  const color =
    t < 0.5
      ? `rgba(127, 185, 190, ${alpha})` // teal for the calmer half
      : `rgba(245, ${Math.round(210 - (t - 0.5) * 80)}, 138, ${alpha})`; // gold→amber
  return { background: color };
}

export default function ParkingHeatmap() {
  const data = mock.parkingHeatmap;
  const peak = data.cells.reduce((a, b) => (b.value > a.value ? b : a), data.cells[0]);

  return (
    <BigPanel>
      <PanelHeader title={data.title} meta={data.meta} />

      <div className="flex flex-col gap-3 flex-1 justify-center">
        <div className="grid grid-cols-12 gap-1.5">
          {data.cells.map((c) => {
            const isPeak = c.hour === peak.hour;
            return (
              <div
                key={c.hour}
                title={`${c.hour} · 饱和度 ${c.value}%`}
                className={[
                  "aspect-square rounded-sm grid place-items-center text-2xs tabular-nums transition-transform hover:scale-110 cursor-default",
                  isPeak
                    ? "ring-1 ring-stardust-gold text-cosmic-black font-medium"
                    : "text-soft-white/70",
                ].join(" ")}
                style={cellStyle(c.value)}
              >
                {parseInt(c.hour, 10)}
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
                "linear-gradient(to right, rgba(127,185,190,0.18) 0%, rgba(127,185,190,0.6) 45%, rgba(245,210,138,0.85) 70%, rgba(245,180,138,0.95) 100%)",
            }}
          />
          <span>高</span>
        </div>
      </div>

      <div className="text-xs text-soft-white/56 text-center">{data.summary}</div>
    </BigPanel>
  );
}
