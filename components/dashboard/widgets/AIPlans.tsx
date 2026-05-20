import { arrowRight, Icon } from "@/lib/icons";
import type { AIPlansData } from "@/components/dashboard/data/types";
import { PanelHeader, PlanIconGlyph } from "@/components/dashboard/primitives";

export type AIPlansProps = {
  data: AIPlansData;
};

export function AIPlans({ data }: AIPlansProps) {
  return (
    <>
      <PanelHeader title={data.title} meta={data.meta} />
      {/* `auto-fit` lets the grid pack as many columns of ≥180px as can
          fit in the panel — that way the layout scales from one column
          on phones up to as many columns as `data.items.length` on
          desktop, without the parent having to know how many items
          this widget is rendering. */}
      <ul
        className="m-0 p-0 list-none grid gap-3"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}
      >
        {data.items.map((p) => (
          <li key={p.title} className="cosmic-card relative p-4 flex flex-col gap-2 min-h-[148px] cursor-pointer group overflow-hidden">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-card" style={{ background: "linear-gradient(to right, rgb(245 210 138 / 0.08) 0%, rgb(127 185 190 / 0.06) 100%)" }} />
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
              <Icon icon={arrowRight} width={12} height={12} aria-hidden />
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
