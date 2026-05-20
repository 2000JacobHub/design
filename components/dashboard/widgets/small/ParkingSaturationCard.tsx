import {Card} from "@/components/dashboard/widgets/small/Card";

export default function ParkingSaturationCard() {
    return <Card data={{
        title: "停车饱和度",
        value: "78%",
        change: "6pp",
        trend: "up",
        comparison: "较上周",
        spark: [68, 70, 72, 73, 75, 76, 78]
    }}/>
}
