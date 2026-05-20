import {Card} from "@/components/dashboard/widgets/mid/Card";

export default function AnomalyAlertCard() {
    return <Card
        title="异常预警推送"
        description="实时推送经营异常并附带处置建议"
        action="去配置"
        icon="alert"
    />
}
