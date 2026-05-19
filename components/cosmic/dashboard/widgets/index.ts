/**
 * Barrel for all dashboard widgets + the runtime widget registry.
 *
 * Consumers should import from this entry point rather than reaching
 * into individual files, e.g.:
 *
 *   import { KpiCard, TodayFocus, widgetRegistry } from "@/components/cosmic/dashboard/widgets";
 *
 * NOTE: `registry.tsx` itself imports each widget via its concrete file
 * path (not via this barrel) to avoid an import cycle — this barrel
 * re-exports both the widgets and the registry without creating one.
 */

export { AgentSummary, type AgentSummaryProps } from "@/components/cosmic/dashboard/widgets/AgentSummary";
export { AIInsights, type AIInsightsProps } from "@/components/cosmic/dashboard/widgets/AIInsights";
export { AIPlans, type AIPlansProps } from "@/components/cosmic/dashboard/widgets/AIPlans";
export { CampaignFunnel, type CampaignFunnelProps } from "@/components/cosmic/dashboard/widgets/CampaignFunnel";
export { CategorySales, type CategorySalesProps } from "@/components/cosmic/dashboard/widgets/CategorySales";
export { KpiCard, type KpiCardProps } from "@/components/cosmic/dashboard/widgets/KpiCard";
export { TodayFocus, type TodayFocusProps } from "@/components/cosmic/dashboard/widgets/TodayFocus";
export { TrafficSalesChart, type TrafficSalesChartProps } from "@/components/cosmic/dashboard/widgets/TrafficSalesChart";
export {
  widgetList,
  widgetRegistry,
  type WidgetId,
  type WidgetManifest,
} from "@/components/cosmic/dashboard/widgets/registry";
