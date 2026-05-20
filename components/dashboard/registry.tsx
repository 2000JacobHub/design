import type { ReactNode } from "react";

import TrafficCard from "@/components/dashboard/widgets/small/TrafficCard";
import SalesAmountCard from "@/components/dashboard/widgets/small/SalesAmountCard";
import ConversionRateCard from "@/components/dashboard/widgets/small/ConversionRateCard";
import NewMembersCard from "@/components/dashboard/widgets/small/NewMembersCard";
import CampaignRoiCard from "@/components/dashboard/widgets/small/CampaignRoiCard";
import ParkingSaturationCard from "@/components/dashboard/widgets/small/ParkingSaturationCard";
import AvgPriceCard from "@/components/dashboard/widgets/small/AvgPriceCard";
import RefundRateCard from "@/components/dashboard/widgets/small/RefundRateCard";

import TodayFocus from "@/components/dashboard/widgets/big/TodayFocus";
import TrafficSalesChart from "@/components/dashboard/widgets/big/TrafficSalesChart";
import AIInsights from "@/components/dashboard/widgets/big/AIInsights";
import AgentSummary from "@/components/dashboard/widgets/big/AgentSummary";
import CategorySales from "@/components/dashboard/widgets/big/CategorySales";
import CampaignFunnel from "@/components/dashboard/widgets/big/CampaignFunnel";
import ParkingHeatmap from "@/components/dashboard/widgets/big/ParkingHeatmap";
import CustomerMixDonut from "@/components/dashboard/widgets/big/CustomerMixDonut";
import PaymentPie from "@/components/dashboard/widgets/big/PaymentPie";

import ReportCard from "@/components/dashboard/widgets/mid/ReportCard";
import MarketingCard from "@/components/dashboard/widgets/mid/MarketingCard";
import PptCard from "@/components/dashboard/widgets/mid/PptCard";
import TenantCard from "@/components/dashboard/widgets/mid/TenantCard";
import ForecastCard from "@/components/dashboard/widgets/mid/ForecastCard";
import AnomalyAlertCard from "@/components/dashboard/widgets/mid/AnomalyAlertCard";
import InventoryCard from "@/components/dashboard/widgets/mid/InventoryCard";

export type WidgetType = "small" | "mid" | "big";

export type WidgetDef = {
  id: string;
  type: WidgetType;
  label: string;
  render: () => ReactNode;
};

/** Describes what is being dragged: a widget from the library (`from: null`)
 *  or one already sitting in a slot (`from` = its section + index). */
export type DragPayload = {
  type: WidgetType;
  widgetId: string;
  from: { section: WidgetType; index: number } | null;
};

export const WIDGETS: WidgetDef[] = [
  // —— small ——
  { id: "traffic", type: "small", label: "客流", render: () => <TrafficCard /> },
  { id: "sales-amount", type: "small", label: "销售额", render: () => <SalesAmountCard /> },
  { id: "conversion", type: "small", label: "转化率", render: () => <ConversionRateCard /> },
  { id: "new-members", type: "small", label: "会员新增", render: () => <NewMembersCard /> },
  { id: "campaign-roi", type: "small", label: "活动 ROI", render: () => <CampaignRoiCard /> },
  { id: "parking-saturation", type: "small", label: "停车饱和度", render: () => <ParkingSaturationCard /> },
  { id: "avg-price", type: "small", label: "客单价", render: () => <AvgPriceCard /> },
  { id: "refund-rate", type: "small", label: "退货率", render: () => <RefundRateCard /> },

  // —— big ——
  { id: "today-focus", type: "big", label: "今日该关注", render: () => <TodayFocus /> },
  { id: "traffic-sales", type: "big", label: "客流 & 销售额趋势", render: () => <TrafficSalesChart /> },
  { id: "ai-insights", type: "big", label: "AI 异常洞察", render: () => <AIInsights /> },
  { id: "agent-summary", type: "big", label: "Agent 工作摘要", render: () => <AgentSummary /> },
  { id: "category-sales", type: "big", label: "品类销售额排行", render: () => <CategorySales /> },
  { id: "campaign-funnel", type: "big", label: "活动效果漏斗", render: () => <CampaignFunnel /> },
  { id: "parking-heatmap", type: "big", label: "停车场流量热力图", render: () => <ParkingHeatmap /> },
  { id: "customer-mix", type: "big", label: "客群结构占比（环形图）", render: () => <CustomerMixDonut /> },
  { id: "payment-pie", type: "big", label: "支付方式占比（饼图）", render: () => <PaymentPie /> },

  // —— mid ——
  { id: "report", type: "mid", label: "生成活动复盘报告", render: () => <ReportCard /> },
  { id: "marketing", type: "mid", label: "创建营销方案", render: () => <MarketingCard /> },
  { id: "ppt", type: "mid", label: "生成汇报 PPT", render: () => <PptCard /> },
  { id: "tenant", type: "mid", label: "租户经营分析", render: () => <TenantCard /> },
  { id: "forecast", type: "mid", label: "客收预测", render: () => <ForecastCard /> },
  { id: "anomaly-alert", type: "mid", label: "异常预警推送", render: () => <AnomalyAlertCard /> },
  { id: "inventory", type: "mid", label: "库存周转分析", render: () => <InventoryCard /> },
];

export const WIDGET_MAP: Record<string, WidgetDef> = Object.fromEntries(
  WIDGETS.map((w) => [w.id, w]),
);

export const widgetsOfType = (type: WidgetType): WidgetDef[] =>
  WIDGETS.filter((w) => w.type === type);

/** Grid-area names for the 6 big slots, in slot order. */
export const BIG_AREAS = ["focus", "traffic", "insights", "agent", "sales", "funnel"] as const;

export type Layout = {
  small: (string | null)[]; // 6 slots
  big: (string | null)[]; // 6 slots → BIG_AREAS
  mid: (string | null)[]; // 5 slots
};

/** Initial placement — parking-heatmap is intentionally left in the library. */
export const INITIAL_LAYOUT: Layout = {
  small: ["traffic", "sales-amount", "conversion", "new-members", "campaign-roi", "parking-saturation"],
  big: ["today-focus", "traffic-sales", "ai-insights", "parking-heatmap", "category-sales", "campaign-funnel"],
  mid: ["report", "marketing", "ppt", "tenant", "forecast"],
};
