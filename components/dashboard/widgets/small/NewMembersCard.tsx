import {Card} from "@/components/dashboard/widgets/small/Card";

export default function NewMembersCard() {
    return <Card data={{
        title: "会员新增（人）",
        value: "3,218",
        change: "18.7%",
        trend: "up",
        comparison: "较上周",
        spark: [2200, 2400, 2600, 2800, 2950, 3100, 3218]
    }}/>
}
