/**
 * Data contracts for every dashboard widget.
 *
 * Each widget under `../widgets/*` consumes one of these types via its
 * `data` prop — keeping the type definitions colocated here means the
 * "swap a widget's data source" use-case becomes a one-line edit.
 */

export type Trend = "up" | "down";

/* ------------------------------------------------------------------ KPI */

export type KpiCardData = {
  title: string;
  value: string;
  change: string;
  trend: Trend;
  comparison: string;
  spark: number[];
};

/* --------------------------------------------------------------- Focus */

export type FocusItem = {
  rank: number;
  title: string;
  description: string;
  actions: string[];
};

export type TodayFocusData = {
  title: string;
  tag: string;
  items: FocusItem[];
  footerAction: string;
};

/* ---------------------------------------------------- Agent / KPI tile */

export type AgentMetric = {
  title: string;
  value: string;
  unit: string;
  change: string;
};

export type AgentSummaryData = {
  title: string;
  metrics: AgentMetric[];
};

/* ---------------------------------------------------- Traffic & sales */

export type TrafficSalesData = {
  title: string;
  xAxis: string[];
  traffic: number[];
  sales: number[];
  summary: string;
};

/* --------------------------------------------------------- Category */

export type CategoryItem = {
  rank: number;
  category: string;
  sales: string;
  salesNum: number;
  change: string;
  trend: Trend;
  lastWeekSales: string;
  lastWeekNum: number;
};

export type CategorySalesData = {
  title: string;
  meta?: string;
  items: CategoryItem[];
};

/* ----------------------------------------------------------- Funnel */

export type FunnelStage = {
  stage: string;
  value: string;
  num: number;
  conversion?: string;
};

export type CampaignFunnelData = {
  title: string;
  period: string;
  stages: FunnelStage[];
  roi: { label: string; value: string; change: string };
};

/* ---------------------------------------------------------- Insights */

export type InsightTag = "销售" | "运营" | "会员";

export type InsightItem = {
  title: string;
  tag: InsightTag;
  time: string;
  description: string;
};

export type AIInsightsData = {
  title: string;
  items: InsightItem[];
  footerAction: string;
};

/* ------------------------------------------------------------- Plans */

export type PlanIconKind =
  | "report"
  | "marketing"
  | "ppt"
  | "tenant"
  | "forecast"
  | "alert"
  | "inventory";

export type PlanCardData = {
  title: string;
  description: string;
  action: string;
  icon: PlanIconKind;
};

export type AIPlansData = {
  items: PlanCardData[];
};

/* ------------------------------------------------- Parking heatmap */

export type ParkingHeatmapCell = {
  /** 24h clock label, e.g. "14:00" */
  hour: string;
  /** Saturation percentage 0–100 — drives the cell color */
  value: number;
  /** Vehicle flow for that hour (辆) — shown in the hover tooltip */
  count: number;
};

export type ParkingHeatmapData = {
  title: string;
  meta?: string;
  cells: ParkingHeatmapCell[];
  summary: string;
};

/* -------------------------------------------- Share (pie / donut) */

export type ShareSlice = {
  label: string;
  /** Percentage 0–100; slices should sum to ~100 */
  value: number;
  /** CSS color for the slice */
  color: string;
};

export type ShareChartData = {
  title: string;
  meta?: string;
  slices: ShareSlice[];
  /** Big number shown in a donut's center (optional) */
  centerLabel?: string;
  centerSub?: string;
};
