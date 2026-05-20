/**
 * Default (mock) dataset for every widget. Treat this as the "factory
 * default" — production code should pass real data via each widget's
 * `data` prop and use these only as a fallback or in design previews.
 */

import type {
  AgentSummaryData,
  AIInsightsData,
  AIPlansData,
  CampaignFunnelData,
  CategorySalesData,
  KpiCardData,
  TodayFocusData,
  TrafficSalesData,
} from "@/components/dashboard/data/types";

export const kpiCards: KpiCardData[] = [
  { title: "客流（人次）", value: "128.6万", change: "8.6%", trend: "up", comparison: "较上周", spark: [62, 68, 71, 65, 74, 88, 96] },
  { title: "销售额（万元）", value: "5,842.6", change: "12.3%", trend: "up", comparison: "较上周", spark: [42, 48, 55, 52, 60, 72, 80] },
  { title: "转化率", value: "8.74%", change: "0.6pp", trend: "down", comparison: "较上周", spark: [9.5, 9.3, 9.0, 9.1, 8.9, 8.8, 8.74] },
  { title: "会员新增（人）", value: "3,218", change: "18.7%", trend: "up", comparison: "较上周", spark: [2200, 2400, 2600, 2800, 2950, 3100, 3218] },
  { title: "活动 ROI", value: "3.21", change: "0.42", trend: "up", comparison: "较上周", spark: [2.5, 2.6, 2.7, 2.8, 2.95, 3.1, 3.21] },
  { title: "停车饱和度", value: "78%", change: "6pp", trend: "up", comparison: "较上周", spark: [68, 70, 72, 73, 75, 76, 78] },
];

export const todayFocus: TodayFocusData = {
  title: "今日该关注",
  tag: "由 AI 生成",
  items: [
    { rank: 1, title: "周末客流增长，但转化率下降 0.6pp", description: "主要受餐饮与服饰品类客单价下降影响，建议优化促销组合与动线引导。", actions: ["看数据依据", "生成方案", "创建任务"] },
    { rank: 2, title: "停车饱和度升至 78%，周末存在拥堵风险", description: "预计周末 14:00–18:00 车位紧张，建议提前发布停车引导与预约策略。", actions: ["看数据依据", "生成方案", "创建任务"] },
    { rank: 3, title: "未完成任务 18 项，其中 5 项已逾期", description: "涉及活动筹备、供应商对账与租户巡场等，建议优先处理逾期事项。", actions: ["看数据依据", "生成方案", "创建任务"] },
    { rank: 4, title: "未完成任务 18 项，其中 5 项已逾期", description: "涉及活动筹备、供应商对账与租户巡场等，建议优先处理逾期事项。", actions: ["看数据依据", "生成方案", "创建任务"] },
  ],
  footerAction: "查看全部建议（8）",
};

export const agentSummary: AgentSummaryData = {
  title: "Agent 今日工作摘要",
  metrics: [
    { title: "监控指标", value: "126", unit: "个", change: "较昨日 +12" },
    { title: "发现异常", value: "8", unit: "项", change: "较昨日 +3" },
    { title: "生成方案", value: "5", unit: "份", change: "较昨日 +2" },
    { title: "创建任务", value: "18", unit: "项", change: "较昨日 +5" },
    { title: "待我审批", value: "6", unit: "项", change: "较昨日 +1" },
    { title: "已完成任务", value: "24", unit: "项", change: "较昨日 +7" },
  ],
};

export const trafficSales: TrafficSalesData = {
  title: "客流 & 销售额趋势",
  xAxis: ["5.18", "5.19", "5.20", "5.21", "5.22", "5.23", "5.24"],
  traffic: [142, 156, 168, 152, 178, 220, 245],
  sales: [620, 685, 720, 692, 750, 920, 985],
  summary: "近7天客流同比 ↑ 8.6%，销售额同比 ↑ 12.3%",
};

export const categorySales: CategorySalesData = {
  title: "品类销售额排行（万元）",
  meta: "较上周",
  items: [
    { rank: 1, category: "餐饮", sales: "1,562.3", salesNum: 1562.3, change: "16.2%", trend: "up", lastWeekSales: "1,344.5", lastWeekNum: 1344.5 },
    { rank: 2, category: "服饰", sales: "1,238.7", salesNum: 1238.7, change: "10.1%", trend: "up", lastWeekSales: "1,125.1", lastWeekNum: 1125.1 },
    { rank: 3, category: "美妆个护", sales: "782.6", salesNum: 782.6, change: "8.3%", trend: "up", lastWeekSales: "722.6", lastWeekNum: 722.6 },
    { rank: 4, category: "黄金珠宝", sales: "652.1", salesNum: 652.1, change: "6.7%", trend: "up", lastWeekSales: "611.2", lastWeekNum: 611.2 },
    { rank: 5, category: "数码家电", sales: "541.3", salesNum: 541.3, change: "5.2%", trend: "up", lastWeekSales: "514.5", lastWeekNum: 514.5 },
    { rank: 6, category: "鞋靴箱包", sales: "487.5", salesNum: 487.5, change: "4.6%", trend: "up", lastWeekSales: "466.1", lastWeekNum: 466.1 },
    { rank: 7, category: "运动户外", sales: "412.8", salesNum: 412.8, change: "2.1%", trend: "down", lastWeekSales: "421.7", lastWeekNum: 421.7 },
    { rank: 8, category: "童装亲子", sales: "356.4", salesNum: 356.4, change: "3.8%", trend: "up", lastWeekSales: "343.4", lastWeekNum: 343.4 },
    { rank: 9, category: "家居生活", sales: "298.7", salesNum: 298.7, change: "1.4%", trend: "down", lastWeekSales: "302.9", lastWeekNum: 302.9 },
  ],
};

export const campaignFunnel: CampaignFunnelData = {
  title: "活动效果漏斗",
  period: "近7天",
  stages: [
    { stage: "曝光 UV", value: "68.7万", num: 68.7 },
    { stage: "到访 UV", value: "18.6万", num: 18.6, conversion: "27.1%" },
    { stage: "互动 UV", value: "6.3万", num: 6.3, conversion: "33.9%" },
    { stage: "成交 UV", value: "2.2万", num: 2.2, conversion: "34.9%" },
  ],
  roi: { label: "活动 ROI", value: "3.21", change: "较上周 ↑ 0.42" },
};

export const aiInsights: AIInsightsData = {
  title: "AI 异常洞察",
  items: [
    { title: "餐饮品类客单价下降显著", tag: "销售", time: "09:42", description: "较上周下降 12.4%，建议检查活动折扣与菜品结构。" },
    { title: "周六 14–18 点停车饱和度偏高", tag: "运营", time: "08:35", description: "峰值达 86%，建议加强车位引导与预约推广。" },
    { title: "会员新增主要来自线上渠道", tag: "会员", time: "07:55", description: "占比 67%，建议增加线下会员招募与引导。" },
  ],
  footerAction: "查看全部洞察（8）",
};

export const aiPlans: AIPlansData = {
  title: "AI 推荐计划",
  meta: "由 AI 基于数据与目标推荐",
  items: [
    { title: "生成活动复盘报告", description: "自动生成本次活动效果复盘与优化建议", action: "立即生成", icon: "report" },
    { title: "创建营销方案", description: "基于客群与品类趋势，生成营销活动方案", action: "去创建", icon: "marketing" },
    { title: "生成汇报 PPT", description: "一键生成本周经营汇报 PPT", action: "去生成", icon: "ppt" },
    { title: "租户经营分析", description: "分析租户经营表现与潜力租户清单", action: "去查看", icon: "tenant" },
    { title: "客收预测", description: "预测下周客流与销售额", action: "去预测", icon: "forecast" },
  ],
};
