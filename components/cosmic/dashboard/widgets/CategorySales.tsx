import type { CategorySalesData } from "@/components/cosmic/dashboard/data/types";
import { ActionLink, PanelHeader, TrendChip } from "@/components/cosmic/dashboard/primitives";

export type CategorySalesProps = {
  data: CategorySalesData;
};

export function CategorySales({ data }: CategorySalesProps) {
  const max = Math.max(...data.items.map((c) => c.salesNum));

  return (
    <>
      <PanelHeader title={data.title} meta={data.meta} action={<ActionLink />} />
      <ul className="m-0 p-0 list-none flex flex-col gap-2.5 flex-1">
        {data.items.map((c) => {
          const width = (c.salesNum / max) * 100;
          return (
            <li
              key={c.rank}
              className="grid items-center gap-2 text-sm"
              style={{ gridTemplateColumns: "20px 64px 1fr 72px 60px" }}
            >
              <span
                className={[
                  "w-5 h-5 rounded-full grid place-items-center text-xs font-medium tabular-nums",
                  c.rank <= 3 ? "bg-stardust-gold text-cosmic-black" : "bg-soft-white/8 text-soft-white/64",
                ].join(" ")}
              >
                {c.rank}
              </span>
              <span className="text-soft-white/92 truncate">{c.category}</span>
              <span className="h-1.5 rounded-full bg-soft-white/8 overflow-hidden">
                <i
                  className="block h-full rounded-full bg-linear-to-r from-stardust-gold to-accent-teal"
                  style={{ width: `${width}%` }}
                />
              </span>
              <span className="text-soft-white/92 tabular-nums text-right">{c.sales}</span>
              <span className="justify-self-end">
                <TrendChip trend={c.trend} change={c.change} />
              </span>
            </li>
          );
        })}
      </ul>
    </>
  );
}
