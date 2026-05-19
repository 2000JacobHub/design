"use client";

import type { ReactNode } from "react";
import * as mock from "@/components/cosmic/dashboard/data/mock";
import {
  DashboardBackdrop,
  HeaderClock,
  SyncStatus,
} from "@/components/cosmic/dashboard/primitives";
import {
  AgentSummary,
  AIInsights,
  AIPlans,
  CampaignFunnel,
  CategorySales,
  KpiCard,
  TodayFocus,
  TrafficSalesChart,
} from "@/components/cosmic/dashboard/widgets";

const PANEL_CLS = "cosmic-panel flex flex-col gap-3 p-5 min-h-0";

/**
 * The main grid is described declaratively. Each `LayoutCell`:
 *   - `area`     matches a slot in `gridTemplateAreas` below
 *   - `render`   produces the widget node (we pass `data` explicitly so
 *                the page can substitute datasets without touching the
 *                widget itself)
 *   - `extraCls` per-slot overrides on the panel wrapper
 *
 * Reordering / removing / replacing widgets is now a one-line edit
 * here — neither the widgets nor the primitives need to change.
 */
type LayoutCell = {
  area: string;
  render: () => ReactNode;
  extraCls?: string;
};

const mainLayout: LayoutCell[] = [
  { area: "focus", render: () => <TodayFocus data={mock.todayFocus} /> },
  {
    area: "traffic",
    render: () => <TrafficSalesChart data={mock.trafficSales} />,
    extraCls: "overflow-visible",
  },
  { area: "insights", render: () => <AIInsights data={mock.aiInsights} /> },
  { area: "agent", render: () => <AgentSummary data={mock.agentSummary} /> },
  { area: "sales", render: () => <CategorySales data={mock.categorySales} /> },
  { area: "funnel", render: () => <CampaignFunnel data={mock.campaignFunnel} /> },
  { area: "plan", render: () => <AIPlans data={mock.aiPlans} /> },
];

export default function Dashboard() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden p-5 dashboard-bg">
      <DashboardBackdrop />

      <header className="relative z-2 flex items-center justify-between gap-4 mb-5">
        <div className="flex items-center gap-4">
          <div className="w-28 h-8 cosmic-card inline-flex items-center cursor-pointer" />
        </div>
        <div className="flex items-center gap-3">
          <SyncStatus />
          <HeaderClock />
        </div>
      </header>

      <section aria-label="核心指标" className="relative z-2 grid grid-cols-6 gap-3 mb-5">
        {mock.kpiCards.map((kpi) => (
          <KpiCard key={kpi.title} data={kpi} />
        ))}
      </section>

      <section
        className="relative z-2 grid gap-4"
        style={{
          gridTemplateColumns: "1.2fr 1.5fr 1.15fr",
          gridTemplateRows: "minmax(360px,auto) minmax(280px,auto) auto",
          gridTemplateAreas: `
            "focus traffic insights"
            "agent sales funnel"
            "plan plan plan"
          `,
        }}
      >
        {mainLayout.map((cell) => (
          <article
            key={cell.area}
            className={[PANEL_CLS, cell.extraCls].filter(Boolean).join(" ")}
            style={{ gridArea: cell.area }}
          >
            {cell.render()}
          </article>
        ))}
      </section>
    </main>
  );
}
