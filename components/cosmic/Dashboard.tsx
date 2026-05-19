"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, type CSSProperties, type ReactNode } from "react";

type Trend = "up" | "down";

type KpiCard = {
  title: string;
  value: string;
  change: string;
  trend: Trend;
  comparison: string;
  spark: number[];
};

const kpiCards: KpiCard[] = [
  { title: "客流（人次）", value: "128.6万", change: "8.6%", trend: "up", comparison: "较上周", spark: [62, 68, 71, 65, 74, 88, 96] },
  { title: "销售额（万元）", value: "5,842.6", change: "12.3%", trend: "up", comparison: "较上周", spark: [42, 48, 55, 52, 60, 72, 80] },
  { title: "转化率", value: "8.74%", change: "0.6pp", trend: "down", comparison: "较上周", spark: [9.5, 9.3, 9.0, 9.1, 8.9, 8.8, 8.74] },
  { title: "会员新增（人）", value: "3,218", change: "18.7%", trend: "up", comparison: "较上周", spark: [2200, 2400, 2600, 2800, 2950, 3100, 3218] },
  { title: "活动 ROI", value: "3.21", change: "0.42", trend: "up", comparison: "较上周", spark: [2.5, 2.6, 2.7, 2.8, 2.95, 3.1, 3.21] },
  { title: "停车饱和度", value: "78%", change: "6pp", trend: "up", comparison: "较上周", spark: [68, 70, 72, 73, 75, 76, 78] },
];

type FocusItem = { rank: number; title: string; description: string; actions: string[] };

const todayFocus = {
  title: "今日该关注的 3 件事",
  tag: "由 AI 生成",
  items: [
    { rank: 1, title: "周末客流增长，但转化率下降 0.6pp", description: "主要受餐饮与服饰品类客单价下降影响，建议优化促销组合与动线引导。", actions: ["看数据依据", "生成方案", "创建任务"] },
    { rank: 2, title: "停车饱和度升至 78%，周末存在拥堵风险", description: "预计周末 14:00–18:00 车位紧张，建议提前发布停车引导与预约策略。", actions: ["看数据依据", "生成方案", "创建任务"] },
    { rank: 3, title: "未完成任务 18 项，其中 5 项已逾期", description: "涉及活动筹备、供应商对账与租户巡场等，建议优先处理逾期事项。", actions: ["看数据依据", "生成方案", "创建任务"] },
  ] as FocusItem[],
  footerAction: "查看全部建议（8）",
};

type AgentMetric = { title: string; value: string; unit: string; change: string };

const agentSummary = {
  title: "Agent 今日工作摘要",
  metrics: [
    { title: "监控指标", value: "126", unit: "个", change: "较昨日 +12" },
    { title: "发现异常", value: "8", unit: "项", change: "较昨日 +3" },
    { title: "生成方案", value: "5", unit: "份", change: "较昨日 +2" },
    { title: "创建任务", value: "18", unit: "项", change: "较昨日 +5" },
    { title: "待我审批", value: "6", unit: "项", change: "较昨日 +1" },
    { title: "已完成任务", value: "24", unit: "项", change: "较昨日 +7" },
  ] as AgentMetric[],
};

const trafficSales = {
  title: "客流 & 销售额趋势",
  xAxis: ["5.18", "5.19", "5.20", "5.21", "5.22", "5.23", "5.24"],
  traffic: [142, 156, 168, 152, 178, 220, 245],
  sales: [620, 685, 720, 692, 750, 920, 985],
  summary: "近7天客流同比 ↑ 8.6%，销售额同比 ↑ 12.3%",
};

type CategoryItem = { rank: number; category: string; sales: string; salesNum: number; change: string; trend: Trend };

const categoryRanking: CategoryItem[] = [
  { rank: 1, category: "餐饮", sales: "1,562.3", salesNum: 1562.3, change: "16.2%", trend: "up" },
  { rank: 2, category: "服饰", sales: "1,238.7", salesNum: 1238.7, change: "10.1%", trend: "up" },
  { rank: 3, category: "美妆个护", sales: "782.6", salesNum: 782.6, change: "8.3%", trend: "up" },
  { rank: 4, category: "黄金珠宝", sales: "652.1", salesNum: 652.1, change: "6.7%", trend: "up" },
  { rank: 5, category: "数码家电", sales: "541.3", salesNum: 541.3, change: "5.2%", trend: "up" },
];

const funnelData = {
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

type InsightTag = "销售洞察" | "运营洞察" | "会员洞察";
type InsightItem = { title: string; tag: InsightTag; time: string; description: string };

const insightsData = {
  items: [
    { title: "餐饮品类客单价下降显著", tag: "销售洞察", time: "09:42", description: "较上周下降 12.4%，建议检查活动折扣与菜品结构。" },
    { title: "周六 14–18 点停车饱和度偏高", tag: "运营洞察", time: "08:35", description: "峰值达 86%，建议加强车位引导与预约推广。" },
    { title: "会员新增主要来自线上渠道", tag: "会员洞察", time: "07:55", description: "占比 67%，建议增加线下会员招募与引导。" },
  ] as InsightItem[],
  footerAction: "查看全部洞察（8）",
};

type PlanIcon = "report" | "marketing" | "ppt" | "tenant" | "forecast";
type PlanCard = { title: string; description: string; action: string; icon: PlanIcon };

const aiPlans: PlanCard[] = [
  { title: "生成活动复盘报告", description: "自动生成本次活动效果复盘与优化建议", action: "立即生成", icon: "report" },
  { title: "创建营销方案", description: "基于客群与品类趋势，生成营销活动方案", action: "去创建", icon: "marketing" },
  { title: "生成汇报 PPT", description: "一键生成本周经营汇报 PPT", action: "去生成", icon: "ppt" },
  { title: "租户经营分析", description: "分析租户经营表现与潜力租户清单", action: "去查看", icon: "tenant" },
  { title: "客收预测", description: "预测下周客流与销售额", action: "去预测", icon: "forecast" },
];

function useClock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);
  return now;
}

const panelCls = "cosmic-panel flex flex-col gap-3 p-5 min-h-0";

export default function Dashboard() {
  const now = useClock();
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  const date = now
    ? `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`
    : "----";
  const time = now
    ? `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`
    : "--:--:--";
  const weekday = now ? ["日", "一", "二", "三", "四", "五", "六"][now.getDay()] : "-";

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden p-5 dashboard-bg">
      <DashboardBackdrop />

      <header className="relative z-2 flex items-center justify-between gap-4 mb-5">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10" aria-hidden>
            <span className="absolute inset-0 rounded-full border border-stardust-gold/45" />
            <span className="absolute inset-[7px] rounded-full bg-stardust-gold/24 shadow-gold-soft" />
            <span className="absolute inset-[14px] rounded-full bg-stardust-gold shadow-gold-pulse" />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-2xs tracking-[0.22em] text-soft-white/52">COSMIC GRAVITY · MALL OPS</span>
            <h1 className="m-0 text-3xl font-light text-soft-white/92">购物中心运营态势大屏</h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="cosmic-card inline-flex items-center gap-2 px-3 py-1.5 text-sm text-soft-white/82">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-teal shadow-teal-dot" />
            实时数据 · 同步正常
          </div>
          <div className="flex flex-col items-end leading-tight text-soft-white/82">
            <span className="text-2xl tabular-nums tracking-[0.04em]">{time}</span>
            <span className="text-2xs text-soft-white/56 tabular-nums">{date} · 周{weekday}</span>
          </div>
          <nav aria-label="主导航" className="flex items-center gap-1.5">
            <DashNavLink href="/">系统</DashNavLink>
            <DashNavLink href="/charts">图表</DashNavLink>
            <DashNavLink href="/forms">表单</DashNavLink>
            <DashNavLink href="/dashboard" active>大屏</DashNavLink>
          </nav>
        </div>
      </header>

      <section aria-label="核心指标" className="relative z-2 grid grid-cols-6 gap-3 mb-5">
        {kpiCards.map((kpi) => (
          <KpiCardView key={kpi.title} kpi={kpi} />
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
        <article className={panelCls} style={{ gridArea: "focus" }}><TodayFocusPanel /></article>
        <article className={`${panelCls} overflow-visible`} style={{ gridArea: "traffic" }}>
          <TrafficSalesChart hoverIdx={hoverIdx} onHover={setHoverIdx} />
        </article>
        <article className={panelCls} style={{ gridArea: "insights" }}><AIInsightsPanel /></article>
        <article className={panelCls} style={{ gridArea: "agent" }}><AgentSummaryPanel /></article>
        <article className={panelCls} style={{ gridArea: "sales" }}><CategorySalesPanel /></article>
        <article className={panelCls} style={{ gridArea: "funnel" }}><CampaignFunnelPanel /></article>
        <article className={panelCls} style={{ gridArea: "plan" }}><AIPlanPanel /></article>
      </section>
    </main>
  );
}

function DashNavLink({ href, children, active = false }: { href: string; children: ReactNode; active?: boolean }) {
  return (
    <Link
      href={href}
      className={[
        "h-7 px-3 inline-flex items-center justify-center rounded-full text-sm no-underline border",
        active
          ? "border-stardust-gold/45 bg-stardust-gold/12 text-soft-white shadow-gold-recess"
          : "border-soft-white/14 text-soft-white/64 bg-cosmic-black/52 hover:text-soft-white/92 hover:border-soft-white/28",
      ].join(" ")}
    >
      {children}
    </Link>
  );
}

function DashboardBackdrop() {
  return (
    <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
      <span className="absolute top-[-260px] left-[-120px] w-[520px] h-[520px] rounded-full bg-stardust-gold/6 blur-[120px]" />
      <span className="absolute bottom-[-220px] right-[-160px] w-[640px] h-[640px] rounded-full bg-accent-teal/6 blur-[140px]" />
    </div>
  );
}

function PanelHeader({
  title,
  meta,
  action,
}: {
  title: string;
  meta?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-3 min-w-0">
        <h2 className="m-0 text-lg font-medium text-soft-white/92 truncate">{title}</h2>
        {meta && <span className="text-xs text-soft-white/56">{meta}</span>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

function ActionLink({ children = "查看更多" }: { children?: ReactNode }) {
  return (
    <button
      type="button"
      className="inline-flex items-center gap-1 text-xs text-stardust-gold/82 hover:text-stardust-gold transition-colors"
    >
      {children}
      <svg viewBox="0 0 10 10" width="10" height="10" aria-hidden>
        <path d="M2 5 H7.5 M5 2.5 L8 5 L5 7.5" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

function TrendChip({ trend, change }: { trend: Trend; change: string }) {
  const up = trend === "up";
  return (
    <span
      className={[
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs tabular-nums",
        up ? "text-stardust-gold bg-stardust-gold/12 border border-stardust-gold/24" : "text-danger bg-danger/12 border border-danger/24",
      ].join(" ")}
    >
      <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden>
        {up ? (
          <path d="M5 1.5 L9 6 L6.5 6 L6.5 9 L3.5 9 L3.5 6 L1 6 Z" fill="currentColor" />
        ) : (
          <path d="M5 8.5 L1 4 L3.5 4 L3.5 1 L6.5 1 L6.5 4 L9 4 Z" fill="currentColor" />
        )}
      </svg>
      {change}
    </span>
  );
}

function KpiCardView({ kpi }: { kpi: KpiCard }) {
  return (
    <div className="cosmic-card flex flex-col gap-2 p-4 min-w-0">
      <div className="flex items-start justify-between gap-2 min-w-0">
        <span className="text-sm text-soft-white/64 truncate">{kpi.title}</span>
        <TrendChip trend={kpi.trend} change={kpi.change} />
      </div>
      <div className="text-4xl leading-none font-light text-soft-white/92 tabular-nums">{kpi.value}</div>
      <div className="flex items-center justify-between gap-3">
        <span className="text-2xs text-soft-white/46">{kpi.comparison}</span>
        <KpiSparkline data={kpi.spark} trend={kpi.trend} />
      </div>
    </div>
  );
}

function KpiSparkline({ data, trend }: { data: number[]; trend: Trend }) {
  const w = 72;
  const h = 22;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * (h - 4) - 2;
    return [x, y] as const;
  });
  const d = pts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  const fillD = `${d} L${w} ${h} L0 ${h} Z`;
  const stroke = trend === "up" ? "var(--color-stardust-gold)" : "var(--color-danger)";
  const fill = trend === "up" ? "url(#sparkFillUp)" : "url(#sparkFillDown)";
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h} aria-hidden>
      <defs>
        <linearGradient id="sparkFillUp" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-stardust-gold)" stopOpacity="0.32" />
          <stop offset="100%" stopColor="var(--color-stardust-gold)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="sparkFillDown" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-danger)" stopOpacity="0.28" />
          <stop offset="100%" stopColor="var(--color-danger)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={fillD} fill={fill} />
      <path d={d} fill="none" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" opacity="0.92" />
      <circle cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r="1.8" fill={stroke} />
    </svg>
  );
}

function TodayFocusPanel() {
  return (
    <>
      <PanelHeader
        title={todayFocus.title}
        meta={
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent-violet/22 text-accent-violet text-2xs">
            {todayFocus.tag}
          </span>
        }
      />
      <ul className="m-0 p-0 list-none flex flex-col gap-3 flex-1 overflow-y-auto">
        {todayFocus.items.map((item) => (
          <li key={item.rank} className="flex gap-3">
            <span
              className={[
                "shrink-0 w-7 h-7 rounded-full grid place-items-center text-sm font-medium",
                item.rank === 1
                  ? "bg-stardust-gold text-cosmic-black shadow-gold-pulse"
                  : item.rank === 2
                    ? "bg-stardust-gold/40 text-soft-white"
                    : "bg-soft-white/8 text-soft-white/72",
              ].join(" ")}
            >
              {item.rank}
            </span>
            <div className="flex flex-col gap-1 min-w-0 flex-1">
              <div className="text-base font-medium text-soft-white/92">{item.title}</div>
              <div className="text-sm text-soft-white/64 leading-snug">{item.description}</div>
              <div className="flex gap-2 mt-1 flex-wrap">
                {item.actions.map((a, i) => (
                  <button
                    key={a}
                    type="button"
                    className={[
                      "h-7 px-2.5 rounded-full text-xs transition-colors border",
                      i === 1
                        ? "bg-stardust-gold/14 border-stardust-gold/45 text-stardust-gold hover:bg-stardust-gold/22"
                        : "bg-cosmic-black/52 border-soft-white/10 text-soft-white/72 hover:border-soft-white/24 hover:text-soft-white/92",
                    ].join(" ")}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="pt-2 flex justify-end border-t border-soft-white/6">
        <ActionLink>{todayFocus.footerAction}</ActionLink>
      </div>
    </>
  );
}

function AgentSummaryPanel() {
  return (
    <>
      <PanelHeader title={agentSummary.title} action={<ActionLink />} />
      <ul className="m-0 p-0 list-none grid grid-cols-3 gap-2 flex-1">
        {agentSummary.metrics.map((m) => (
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
    </>
  );
}

function TrafficSalesChart({
  hoverIdx,
  onHover,
}: {
  hoverIdx: number | null;
  onHover: (idx: number | null) => void;
}) {
  const data = trafficSales;
  const w = 540;
  const h = 220;
  const pad = { top: 22, right: 44, bottom: 30, left: 44 };
  const innerW = w - pad.left - pad.right;
  const innerH = h - pad.top - pad.bottom;
  const n = data.xAxis.length;

  const trafficMax = Math.max(...data.traffic) * 1.12;
  const salesMax = Math.max(...data.sales) * 1.12;

  const xAt = (i: number) => pad.left + (i / (n - 1)) * innerW;
  const yTraffic = (v: number) => pad.top + innerH * (1 - v / trafficMax);
  const ySales = (v: number) => pad.top + innerH * (1 - v / salesMax);

  const buildSmooth = (vals: number[], y: (v: number) => number) => {
    const pts = vals.map((v, i) => ({ x: xAt(i), y: y(v) }));
    return pts
      .map((p, i) => {
        if (i === 0) return `M${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
        const prev = pts[i - 1];
        const mx = (prev.x + p.x) / 2;
        return `C${mx.toFixed(1)} ${prev.y.toFixed(1)} ${mx.toFixed(1)} ${p.y.toFixed(1)} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
      })
      .join(" ");
  };

  const trafficPath = useMemo(() => buildSmooth(data.traffic, yTraffic), [data.traffic]);
  const salesPath = useMemo(() => buildSmooth(data.sales, ySales), [data.sales]);
  const baseY = h - pad.bottom;
  const trafficArea = `${trafficPath} L${xAt(n - 1).toFixed(1)} ${baseY} L${xAt(0).toFixed(1)} ${baseY} Z`;

  const gridYs = [0, 0.25, 0.5, 0.75, 1].map((r) => pad.top + innerH * r);

  const showHover = hoverIdx !== null;
  const safeHover = Math.max(0, Math.min(n - 1, hoverIdx ?? 0));
  const hoverX = xAt(safeHover);
  const hoverYT = yTraffic(data.traffic[safeHover]);
  const hoverYS = ySales(data.sales[safeHover]);

  return (
    <>
      <PanelHeader
        title={trafficSales.title}
        meta={
          <span className="inline-flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5">
              <i className="w-2 h-2 rounded-full bg-stardust-gold shadow-gold-dot" />
              客流（人次/万）
            </span>
            <span className="inline-flex items-center gap-1.5">
              <i className="w-2 h-2 rounded-full bg-accent-teal" />
              销售额（万元）
            </span>
          </span>
        }
        action={<ActionLink />}
      />
      <div className="relative flex-1 min-h-0 overflow-visible">
        <svg
          viewBox={`0 0 ${w} ${h}`}
          className="w-full h-full"
          preserveAspectRatio="none"
          aria-label="客流与销售额趋势"
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const relX = ((e.clientX - rect.left) / rect.width) * w;
            const idx = Math.round(((relX - pad.left) / innerW) * (n - 1));
            onHover(Math.max(0, Math.min(n - 1, idx)));
          }}
          onMouseLeave={() => onHover(null)}
        >
          <defs>
            <linearGradient id="trafficFill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="var(--color-stardust-gold)" stopOpacity="0.28" />
              <stop offset="100%" stopColor="var(--color-stardust-gold)" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="trafficStroke" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="var(--color-soft-white)" stopOpacity="0.78" />
              <stop offset="60%" stopColor="var(--color-stardust-gold)" />
              <stop offset="100%" stopColor="var(--color-stardust-amber)" />
            </linearGradient>
          </defs>

          {gridYs.map((gy, i) => (
            <line key={i} x1={pad.left} x2={w - pad.right} y1={gy} y2={gy} stroke="rgb(245 246 248 / 0.06)" />
          ))}

          {[0, 0.25, 0.5, 0.75, 1].map((r) => {
            const v = Math.round(trafficMax * (1 - r));
            return (
              <text key={`yl-${r}`} x={pad.left - 8} y={pad.top + innerH * r + 4} textAnchor="end" fill="rgb(245 210 138 / 0.6)" fontSize="9.5">
                {v}
              </text>
            );
          })}

          {[0, 0.25, 0.5, 0.75, 1].map((r) => {
            const v = Math.round(salesMax * (1 - r));
            return (
              <text key={`yr-${r}`} x={w - pad.right + 8} y={pad.top + innerH * r + 4} textAnchor="start" fill="rgb(127 185 190 / 0.7)" fontSize="9.5">
                {v}
              </text>
            );
          })}

          {data.xAxis.map((label, i) => (
            <text key={`${label}-${i}`} x={xAt(i)} y={h - 10} textAnchor="middle" fill="rgb(245 246 248 / 0.46)" fontSize="10">
              {label}
            </text>
          ))}

          <path d={trafficArea} fill="url(#trafficFill)" />
          <path d={salesPath} fill="none" stroke="var(--color-accent-teal)" strokeWidth="1.6" strokeDasharray="5 4" />
          <path d={trafficPath} fill="none" stroke="url(#trafficStroke)" strokeWidth="2" />

          {data.traffic.map((_, i) => (
            <circle key={`t-${i}`} cx={xAt(i)} cy={yTraffic(data.traffic[i])} r="2.4" fill="var(--color-stardust-gold)" opacity="0.85" />
          ))}
          {data.sales.map((_, i) => (
            <circle key={`s-${i}`} cx={xAt(i)} cy={ySales(data.sales[i])} r="2.2" fill="var(--color-accent-teal)" opacity="0.85" />
          ))}

          {showHover && (
            <>
              <line x1={hoverX} x2={hoverX} y1={pad.top} y2={baseY} stroke="rgb(245 210 138 / 0.45)" strokeDasharray="2 3" />
              <circle cx={hoverX} cy={hoverYT} r="4.5" fill="var(--color-stardust-gold)" stroke="rgb(255 255 255 / 0.7)" />
              <circle cx={hoverX} cy={hoverYS} r="4.5" fill="var(--color-accent-teal)" stroke="rgb(255 255 255 / 0.7)" />
            </>
          )}
        </svg>

        {showHover && (
          <div
            className="absolute z-20 cosmic-card p-2.5 text-xs whitespace-nowrap pointer-events-none -translate-y-1/2"
            style={(() => {
              const flipped = hoverX > w / 2;
              const xPct = (hoverX / w) * 100;
              const yPct = (Math.min(hoverYT, hoverYS) / h) * 100;
              const horizontal = flipped
                ? { right: `calc(${(100 - xPct).toFixed(2)}% + 14px)` }
                : { left: `calc(${xPct.toFixed(2)}% + 14px)` };
              return {
                ...horizontal,
                top: `clamp(48px, ${yPct.toFixed(2)}%, calc(100% - 48px))`,
              } as CSSProperties;
            })()}
          >
            <div className="text-soft-white/64 text-2xs mb-1.5">{data.xAxis[safeHover]}</div>
            <div className="flex items-center gap-2">
              <i className="w-2 h-2 rounded-full bg-stardust-gold" />
              客流 <strong className="text-soft-white/92">{data.traffic[safeHover]} 万</strong>
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <i className="w-2 h-2 rounded-full bg-accent-teal" />
              销售额 <strong className="text-soft-white/92">{data.sales[safeHover]} 万</strong>
            </div>
          </div>
        )}
      </div>
      <div className="text-xs text-soft-white/56 text-center">{trafficSales.summary}</div>
    </>
  );
}

function CategorySalesPanel() {
  const max = Math.max(...categoryRanking.map((c) => c.salesNum));
  return (
    <>
      <PanelHeader title="品类销售额排行（万元）" meta="较上周" action={<ActionLink />} />
      <ul className="m-0 p-0 list-none flex flex-col gap-2.5 flex-1">
        {categoryRanking.map((c) => {
          const width = (c.salesNum / max) * 100;
          return (
            <li
              key={c.rank}
              className="grid items-center gap-2 text-sm"
              style={{ gridTemplateColumns: "20px 64px 1fr 72px 60px" }}
            >
              <span
                className={[
                  "w-5 h-5 rounded-full grid place-items-center text-xs font-medium",
                  c.rank <= 3 ? "bg-stardust-gold text-cosmic-black" : "bg-soft-white/8 text-soft-white/64",
                ].join(" ")}
              >
                {c.rank}
              </span>
              <span className="text-soft-white/92 truncate">{c.category}</span>
              <span className="h-1.5 rounded-full bg-soft-white/8 overflow-hidden">
                <i
                  className="block h-full rounded-full bg-linear-to-r from-stardust-gold to-accent-teal"
                  style={{ width: `${width}%` }}
                />
              </span>
              <span className="text-soft-white/92 tabular-nums text-right">{c.sales}</span>
              <span className="justify-self-end">
                <TrendChip trend={c.trend} change={c.change} />
              </span>
            </li>
          );
        })}
      </ul>
    </>
  );
}

function CampaignFunnelPanel() {
  const max = funnelData.stages[0].num;
  return (
    <>
      <PanelHeader title={funnelData.title} meta={funnelData.period} action={<ActionLink />} />
      <ul className="m-0 p-0 list-none flex flex-col gap-1.5 flex-1">
        {funnelData.stages.map((s, i) => {
          const width = 40 + (s.num / max) * 60;
          return (
            <li key={s.stage} className="flex flex-col items-center gap-1">
              {i > 0 && s.conversion && (
                <div className="text-2xs text-stardust-gold/72 flex items-center gap-1">
                  <span aria-hidden>↓</span>转化 {s.conversion}
                </div>
              )}
              <div
                className={[
                  "rounded-lg px-3 py-1.5 flex items-center justify-between gap-3",
                  "bg-linear-to-r from-stardust-gold/32 to-accent-teal/18",
                  "border border-stardust-gold/22",
                ].join(" ")}
                style={{ width: `${width}%` }}
              >
                <span className="text-xs text-soft-white/82">{s.stage}</span>
                <span className="text-sm text-soft-white/92 tabular-nums">{s.value}</span>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="cosmic-card flex items-center justify-between gap-2 p-3 mt-1">
        <div className="text-xs text-soft-white/64">{funnelData.roi.label}</div>
        <div className="flex items-baseline gap-2">
          <strong className="text-3xl font-light text-stardust-gold tabular-nums">{funnelData.roi.value}</strong>
          <span className="text-2xs text-stardust-gold/72">{funnelData.roi.change}</span>
        </div>
      </div>
    </>
  );
}

function AIInsightsPanel() {
  return (
    <>
      <PanelHeader title="AI 异常洞察" action={<ActionLink />} />
      <ul className="m-0 p-0 list-none flex flex-col gap-2.5 flex-1 overflow-y-auto">
        {insightsData.items.map((item, i) => (
          <li key={i} className="cosmic-card p-3 flex flex-col gap-1.5">
            <div className="flex items-center justify-between gap-2">
              <span className={`text-2xs px-1.5 py-0.5 rounded-full ${insightTagCls(item.tag)}`}>{item.tag}</span>
              <span className="text-2xs text-soft-white/46 tabular-nums">{item.time}</span>
            </div>
            <div className="text-base text-soft-white/92 font-medium leading-snug">{item.title}</div>
            <div className="text-xs text-soft-white/64 leading-snug">{item.description}</div>
          </li>
        ))}
      </ul>
      <div className="pt-2 flex justify-end border-t border-soft-white/6">
        <ActionLink>{insightsData.footerAction}</ActionLink>
      </div>
    </>
  );
}

function insightTagCls(tag: InsightTag) {
  if (tag === "销售洞察") return "bg-stardust-gold/16 text-stardust-gold border border-stardust-gold/24";
  if (tag === "运营洞察") return "bg-accent-teal/16 text-accent-teal border border-accent-teal/24";
  return "bg-accent-violet/22 text-accent-violet border border-accent-violet/24";
}

function AIPlanPanel() {
  return (
    <>
      <PanelHeader title="AI 推荐计划" meta="由 AI 基于数据与目标推荐" />
      <ul className="m-0 p-0 list-none grid grid-cols-5 gap-3">
        {aiPlans.map((p) => (
          <li key={p.title} className="cosmic-card p-4 flex flex-col gap-2 min-h-[148px]">
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
              <svg viewBox="0 0 10 10" width="10" height="10" aria-hidden>
                <path d="M2 5 H7.5 M5 2.5 L8 5 L5 7.5" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

function PlanIconGlyph({ kind }: { kind: PlanIcon }) {
  const s = 18;
  switch (kind) {
    case "report":
      return (
        <svg viewBox="0 0 18 18" width={s} height={s}>
          <rect x="3" y="2" width="12" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <path d="M6 6 H12 M6 9 H12 M6 12 H10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );
    case "marketing":
      return (
        <svg viewBox="0 0 18 18" width={s} height={s}>
          <path d="M3 7 L13 3 L13 15 L3 11 Z" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
          <path d="M13 7 L16 8 L16 10 L13 11" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
        </svg>
      );
    case "ppt":
      return (
        <svg viewBox="0 0 18 18" width={s} height={s}>
          <rect x="2" y="3" width="14" height="9" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <path d="M9 12 V15 M6 15 H12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M5 9 L7 7 L9 8.5 L13 5" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "tenant":
      return (
        <svg viewBox="0 0 18 18" width={s} height={s}>
          <path d="M3 15 V8 L9 4 L15 8 V15" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
          <path d="M7 15 V11 H11 V15" fill="none" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      );
    case "forecast":
      return (
        <svg viewBox="0 0 18 18" width={s} height={s}>
          <path d="M2 14 L6 10 L9 12 L15 5" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M11 5 H15 V9" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
  }
}
