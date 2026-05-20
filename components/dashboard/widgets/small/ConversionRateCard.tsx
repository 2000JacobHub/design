import {Card} from "@/components/dashboard/widgets/small/Card";

export default function ConversionRateCard() {
    return <Card data={{
        title: "转化率",
        value: "8.74%",
        change: "0.6pp",
        trend: "down",
        comparison: "较上周",
        spark: [9.5, 9.3, 9.0, 9.1, 8.9, 8.8, 8.74]
    }}/>
}
