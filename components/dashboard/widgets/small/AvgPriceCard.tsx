import {Card} from "@/components/dashboard/widgets/small/Card";

export default function AvgPriceCard() {
    return <Card data={{
        title: "客单价（元）",
        value: "286.4",
        change: "3.2%",
        trend: "up",
        comparison: "较上周",
        spark: [262, 268, 271, 274, 279, 282, 286]
    }}/>
}
