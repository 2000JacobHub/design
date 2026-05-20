import {Card} from "@/components/dashboard/widgets/small/Card";

export default function SalesAmountCard() {
    return <Card data={{
        title: "销售额（万元）",
        value: "5,842.6",
        change: "12.3%",
        trend: "up",
        comparison: "较上周",
        spark: [42, 48, 55, 52, 60, 72, 80]
    }}/>
}
