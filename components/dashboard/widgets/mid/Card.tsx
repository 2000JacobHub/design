import { arrowRight, Icon } from "@/lib/icons";
import {AIPlansData, PlanCardData} from "@/components/dashboard/data/types";
import { PanelHeader, PlanIconGlyph } from "@/components/dashboard/primitives";
import {MidPanel} from "@/components/dashboard/common/layouts";

export function Card(p: PlanCardData) {
  return (
      <MidPanel>
          <div
              className="w-9 h-9 rounded-input bg-stardust-gold/14 text-stardust-gold grid place-items-center border border-stardust-gold/24">
              <PlanIconGlyph kind={p.icon}/>
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
              <Icon icon={arrowRight} width={12} height={12} aria-hidden/>
          </button>
      </MidPanel>
  );
}
