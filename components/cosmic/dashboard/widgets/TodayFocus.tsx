import type { TodayFocusData } from "@/components/cosmic/dashboard/data/types";
import { ActionLink, PanelHeader } from "@/components/cosmic/dashboard/primitives";

export type TodayFocusProps = {
  data: TodayFocusData;
};

const RANK_BADGE = [
  // index 0 unused; rank starts at 1.
  "",
  "bg-stardust-gold text-cosmic-black shadow-gold-pulse",
  "bg-stardust-gold/40 text-soft-white",
  "bg-soft-white/8 text-soft-white/72",
] as const;

export function TodayFocus({ data }: TodayFocusProps) {
  return (
    <>
      <PanelHeader
        title={data.title}
        meta={
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent-violet/22 text-accent-violet text-2xs">
            {data.tag}
          </span>
        }
      />
      <ul className="m-0 p-0 list-none flex flex-col gap-3 flex-1 overflow-y-auto">
        {data.items.map((item) => (
          <li key={item.rank} className="flex gap-3">
            <span
              className={[
                "shrink-0 w-7 h-7 rounded-full grid place-items-center text-sm font-medium font-mono",
                RANK_BADGE[item.rank] ?? RANK_BADGE[3],
              ].join(" ")}
            >
              {item.rank}
            </span>
            <div className="flex flex-col gap-1 min-w-0 flex-1">
              <div className="text-base font-medium text-soft-white/92">{item.title}</div>
              <div className="text-sm text-soft-white/64 leading-snug">{item.description}</div>
              <div className="flex gap-2 mt-1 flex-wrap">
                {item.actions.map((a, i) => (
                  <button
                    key={a}
                    type="button"
                    className="h-5 px-1.5 rounded-full text-2xs transition-colors border bg-cosmic-black/52 border-soft-white/10 text-soft-white/72 hover:bg-stardust-gold/14 hover:border-stardust-gold/45 hover:text-stardust-gold"
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="pt-2 flex justify-end border-t border-soft-white/6">
        <ActionLink>{data.footerAction}</ActionLink>
      </div>
    </>
  );
}
