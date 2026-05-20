import * as mock from "@/components/dashboard/data/mock";
import { ActionLink, PanelHeader } from "@/components/dashboard/primitives";
import {BigPanel} from "@/components/dashboard/primitives/layouts";

export default function AgentSummary() {
  const data = mock.agentSummary;
  return (
    <BigPanel area="agent">
      <PanelHeader title={data.title} action={<ActionLink />} />
      <ul className="m-0 p-0 list-none grid grid-cols-2 sm:grid-cols-3 gap-2 flex-1">
        {data.metrics.map((m) => (
          <li key={m.title} className="cosmic-card flex flex-col gap-1 p-3 min-w-0">
            <span className="text-xs text-soft-white/56 truncate">{m.title}</span>
            <div className="flex items-baseline gap-1">
              <strong className="text-3xl font-light text-soft-white/92 tabular-nums">{m.value}</strong>
              <span className="text-xs text-soft-white/52">{m.unit}</span>
            </div>
            <span className="text-2xs text-stardust-gold/72">{m.change}</span>
          </li>
        ))}
      </ul>
    </BigPanel>
  );
}
