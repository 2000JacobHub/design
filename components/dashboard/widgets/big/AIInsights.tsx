import type { InsightTag } from "@/components/dashboard/data/types";
import * as mock from "@/components/dashboard/data/mock";
import { ActionLink, PanelHeader } from "@/components/dashboard/primitives";
import {BigPanel} from "@/components/dashboard/primitives/layouts";

const TAG_CLS: Record<InsightTag, string> = {
  // "销售": "bg-stardust-gold/16 text-stardust-gold border border-stardust-gold/24",
  // "运营": "bg-accent-teal/16 text-accent-teal border border-accent-teal/24",
  // "会员": "bg-accent-violet/22 text-accent-violet border border-accent-violet/24",
    "销售": "",
    "运营": "",
    "会员": "",
};

export default function AIInsights() {
  const data = mock.aiInsights;
  return (
    <BigPanel area="insights">
      <PanelHeader title={data.title} action={<ActionLink />} />
      <ul className="m-0 p-0 list-none flex flex-col gap-2.5 flex-1 overflow-y-auto">
        {data.items.map((item, i) => (
          <li key={i} className="cosmic-card p-3 flex flex-col gap-1.5">
            <div className="flex items-center justify-between gap-2">
              <span className={`text-2xs px-1.5 py-0.5 rounded-full ${TAG_CLS[item.tag]}`}>{item.tag}</span>
              <span className="text-2xs text-soft-white/46 tabular-nums">{item.time}</span>
            </div>
            <div className="text-base text-soft-white/92 font-medium leading-snug">{item.title}</div>
            <div className="text-xs text-soft-white/64 leading-snug">{item.description}</div>
          </li>
        ))}
      </ul>
      <div className="pt-2 flex justify-end border-t border-soft-white/6">
        <ActionLink>{data.footerAction}</ActionLink>
      </div>
    </BigPanel>
  );
}
