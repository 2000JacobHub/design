import type { AIPlansData } from "@/components/cosmic/dashboard/data/types";
import { PanelHeader, PlanIconGlyph } from "@/components/cosmic/dashboard/primitives";

export type AIPlansProps = {
  data: AIPlansData;
};

export function AIPlans({ data }: AIPlansProps) {
  return (
    <>
      <PanelHeader title={data.title} meta={data.meta} />
      <ul
        className="m-0 p-0 list-none grid gap-3"
        style={{ gridTemplateColumns: `repeat(${data.items.length}, minmax(0, 1fr))` }}
      >
        {data.items.map((p) => (
          <li key={p.title} className="cosmic-card p-4 flex flex-col gap-2 min-h-[148px]">
            <div className="w-9 h-9 rounded-input bg-stardust-gold/14 text-stardust-gold grid place-items-center border border-stardust-gold/24">
              <PlanIconGlyph kind={p.icon} />
            </div>
            <div className="flex flex-col gap-1 flex-1 min-w-0">
              <div className="text-base font-medium text-soft-white/92">{p.title}</div>
              <div className="text-xs text-soft-white/64 leading-snug">{p.description}</div>
            </div>
            <button
              type="button"
              className="self-start inline-flex items-center gap-1 text-xs text-stardust-gold hover:text-stardust-amber transition-colors"
            >
              {p.action}
              <svg viewBox="0 0 10 10" width="10" height="10" aria-hidden>
                <path
                  d="M2 5 H7.5 M5 2.5 L8 5 L5 7.5"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
