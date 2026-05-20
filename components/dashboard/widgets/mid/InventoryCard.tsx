import {Card} from "@/components/dashboard/widgets/mid/Card";

export default function InventoryCard() {
    return <Card
        title="库存周转分析"
        description="识别滞销与缺货风险，给出补货建议"
        action="去分析"
        icon="inventory"
    />
}
