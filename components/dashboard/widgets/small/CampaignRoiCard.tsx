import {Card} from "@/components/dashboard/widgets/small/Card";

export default function CampaignRoiCard() {
    return <Card data={{
        title: "客流（人次）",
        value: "128.6万",
        change: "8.6%",
        trend: "up",
        comparison: "较上周",
        spark: [62, 68, 71, 65, 74, 88, 96]
    }}/>
}
