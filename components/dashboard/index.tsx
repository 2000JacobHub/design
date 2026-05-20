"use client";
import {
    DashboardBackdrop,
    PanelHeader,
} from "@/components/dashboard/primitives";
import Header from "@/components/dashboard/primitives/Header";

import CampaignRoiCard from "@/components/dashboard/widgets/small/CampaignRoiCard";
import TrafficCard from "@/components/dashboard/widgets/small/TrafficCard";
import SalesAmountCard from "@/components/dashboard/widgets/small/SalesAmountCard";
import ConversionRateCard from "@/components/dashboard/widgets/small/ConversionRateCard";
import NewMembersCard from "@/components/dashboard/widgets/small/NewMembersCard";
import ParkingSaturationCard from "@/components/dashboard/widgets/small/ParkingSaturationCard";
import TodayFocus from "@/components/dashboard/widgets/big/TodayFocus";
import TrafficSalesChart from "@/components/dashboard/widgets/big/TrafficSalesChart";
import AIInsights from "@/components/dashboard/widgets/big/AIInsights";
import AgentSummary from "@/components/dashboard/widgets/big/AgentSummary";
import CategorySales from "@/components/dashboard/widgets/big/CategorySales";
import CampaignFunnel from "@/components/dashboard/widgets/big/CampaignFunnel";
import ReportCard from "@/components/dashboard/widgets/mid/ReportCard";
import MarketingCard from "@/components/dashboard/widgets/mid/MarketingCard";
import PptCard from "@/components/dashboard/widgets/mid/PptCard";
import TenantCard from "@/components/dashboard/widgets/mid/TenantCard";
import ForecastCard from "@/components/dashboard/widgets/mid/ForecastCard";


const config = {
    small: [
        <TrafficCard/>,
        <SalesAmountCard/>,
        <ConversionRateCard/>,
        <NewMembersCard/>,
        <CampaignRoiCard/>,
        <ParkingSaturationCard/>,
    ],
    big: [
        <TodayFocus/>,
        <TrafficSalesChart/>,
        <AIInsights/>,
        <AgentSummary/>,
        <CategorySales/>,
        <CampaignFunnel/>,
    ],
    mid: [
        <ReportCard/>,
        <MarketingCard/>,
        <PptCard/>,
        <TenantCard/>,
        <ForecastCard/>,
    ],
}
export default function Dashboard() {
    return (
        <main className="relative min-h-screen w-full overflow-x-hidden p-3 sm:p-4 lg:p-5 dashboard-bg">
            <DashboardBackdrop/>
            <Header/>

            <section
                aria-label="核心指标"
                className="relative z-2 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 mb-4 lg:mb-5"
            >
                {config.small.map((card, i) => card)}
            </section>

            <section className="relative z-2 dashboard-main-grid">
                {config.big.map((panel, i) => panel)}

                <article
                    className={["cosmic-panel flex flex-col gap-3 p-4 lg:p-5 min-h-0"]
                        .filter(Boolean)
                        .join(" ")}
                    style={{gridArea: 'plan'}}
                >
                    <PanelHeader title={"AI 推荐计划"} meta={"由 AI 基于数据与目标推荐"}/>
                    <ul
                        className="m-0 p-0 list-none grid gap-3"
                        style={{gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))"}}
                    >
                        {config.mid.map((panel, i) => panel)}
                    </ul>
                </article>
            </section>
        </main>
    );
}
