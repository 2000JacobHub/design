/**
 * Widget registry — the single source of truth for "what widgets exist
 * on the dashboard". Each entry knows:
 *   - `id`            stable string id (also matches gridArea names)
 *   - `label`         human-readable name (for a future "add widget" UI)
 *   - `renderDefault` factory that mounts the widget with its built-in
 *                     default dataset; useful for previews and as the
 *                     fallback when a layout slot has no data attached.
 *
 * To add a new widget type:
 *   1. Define its data shape in `../data/types.ts`
 *   2. Add a default dataset in `../data/mock.ts`
 *   3. Implement the component under `./<Widget>.tsx`
 *   4. Register it here with a fresh `id`.
 *
 * The page layout (see `../index.tsx`) only needs to reference widgets
 * by `id` — that decoupling is what enables runtime customisation
 * (drag/drop, replace data source, hide/show, etc.) later.
 */

import type { ReactNode } from "react";
import * as mock from "@/components/dashboard/data/mock";
import { AgentSummary } from "@/components/dashboard/widgets/AgentSummary";
import { AIInsights } from "@/components/dashboard/widgets/AIInsights";
import { AIPlans } from "@/components/dashboard/widgets/AIPlans";
import { CampaignFunnel } from "@/components/dashboard/widgets/CampaignFunnel";
import { CategorySales } from "@/components/dashboard/widgets/CategorySales";
import { KpiCard } from "@/components/dashboard/widgets/KpiCard";
import { TodayFocus } from "@/components/dashboard/widgets/TodayFocus";
import { TrafficSalesChart } from "@/components/dashboard/widgets/TrafficSalesChart";

export type WidgetId =
  | "kpi-card"
  | "today-focus"
  | "agent-summary"
  | "traffic-sales"
  | "category-sales"
  | "campaign-funnel"
  | "ai-insights"
  | "ai-plans";

export type WidgetManifest = {
  id: WidgetId;
  label: string;
  renderDefault: () => ReactNode;
};

export const widgetRegistry: Record<WidgetId, WidgetManifest> = {
  "kpi-card": {
    id: "kpi-card",
    label: "KPI 卡片",
    renderDefault: () => <KpiCard data={mock.kpiCards[0]} />,
  },
  "today-focus": {
    id: "today-focus",
    label: "今日聚焦",
    renderDefault: () => <TodayFocus data={mock.todayFocus} />,
  },
  "agent-summary": {
    id: "agent-summary",
    label: "Agent 工作摘要",
    renderDefault: () => <AgentSummary data={mock.agentSummary} />,
  },
  "traffic-sales": {
    id: "traffic-sales",
    label: "客流 & 销售额趋势",
    renderDefault: () => <TrafficSalesChart data={mock.trafficSales} />,
  },
  "category-sales": {
    id: "category-sales",
    label: "品类销售额排行",
    renderDefault: () => <CategorySales data={mock.categorySales} />,
  },
  "campaign-funnel": {
    id: "campaign-funnel",
    label: "活动效果漏斗",
    renderDefault: () => <CampaignFunnel data={mock.campaignFunnel} />,
  },
  "ai-insights": {
    id: "ai-insights",
    label: "AI 异常洞察",
    renderDefault: () => <AIInsights data={mock.aiInsights} />,
  },
  "ai-plans": {
    id: "ai-plans",
    label: "AI 推荐计划",
    renderDefault: () => <AIPlans data={mock.aiPlans} />,
  },
};

export const widgetList: WidgetManifest[] = Object.values(widgetRegistry);
