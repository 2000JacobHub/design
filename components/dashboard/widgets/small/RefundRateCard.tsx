import {Card} from "@/components/dashboard/widgets/small/Card";

export default function RefundRateCard() {
    return <Card data={{
        title: "退货率",
        value: "2.1%",
        change: "0.3pp",
        trend: "down",
        comparison: "较上周",
        spark: [2.8, 2.6, 2.5, 2.4, 2.3, 2.2, 2.1]
    }}/>
}
