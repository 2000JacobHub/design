"use client";

import { useEffect, useRef, useState } from "react";
import * as mock from "@/components/dashboard/data/mock";
import {
      ActionLink,
      PanelHeader,
      TrendChip,
} from "@/components/dashboard/primitives";
import {BigPanel} from "@/components/dashboard/primitives/layouts";

export default function CategorySales() {
      const data = mock.categorySales;
      const max = Math.max(...data.items.map((c) => c.salesNum));
      const [hovered, setHovered] = useState<number | null>(null);
      const listRef = useRef<HTMLUListElement>(null);
      const detailRefs = useRef<Map<number, HTMLDivElement>>(new Map());

      useEffect(() => {
            if (hovered == null) return;
            let raf = 0;
            // Wait for the expand transition (200ms) so the detail has its
            // full height before we measure whether it overflows the list.
            const id = window.setTimeout(() => {
                  const list = listRef.current;
                  const el = detailRefs.current.get(hovered);
                  if (!list || !el) return;
                  const overflow =
                        el.getBoundingClientRect().bottom -
                        list.getBoundingClientRect().bottom;
                  if (overflow <= 0) return;

                  // Custom slow easing — native "smooth" can't be slowed down.
                  const start = list.scrollTop;
                  const distance = overflow + 8;
                  const duration = 150;
                  const t0 = performance.now();
                  const easeInOut = (p: number) =>
                        p < 0.5
                              ? 2 * p * p
                              : 1 - Math.pow(-2 * p + 2, 2) / 2;
                  const step = (now: number) => {
                        const p = Math.min((now - t0) / duration, 1);
                        list.scrollTop = start + distance * easeInOut(p);
                        if (p < 1) raf = requestAnimationFrame(step);
                  };
                  raf = requestAnimationFrame(step);
            }, 210);
            return () => {
                  window.clearTimeout(id);
                  if (raf) cancelAnimationFrame(raf);
            };
      }, [hovered]);

      return (
            <BigPanel>
                  <PanelHeader
                        title={data.title}
                        meta={data.meta}
                        action={<ActionLink />}
                  />
                  <ul
                        ref={listRef}
                        className="m-0 p-0 list-none flex flex-col gap-2.5 flex-1 min-h-[288px] max-h-[288px] overflow-y-auto no-scrollbar"
                  >
                        {data.items.map((c) => {
                              const width = (c.salesNum / max) * 100;
                              const isHovered = hovered === c.rank;
                              const delta = c.salesNum - c.lastWeekNum;
                              return (
                                    <li
                                          key={c.rank}
                                          onMouseEnter={() => setHovered(c.rank)}
                                          onMouseLeave={() => setHovered(null)}
                                          className="cursor-pointer rounded-md transition-colors hover:bg-soft-white/4"
                                    >
                                          <div
                                                className="grid items-center gap-2 text-sm"
                                                style={{
                                                      gridTemplateColumns:
                                                            "20px 64px 1fr 72px 60px",
                                                }}
                                          >
                                                <span
                                                      className={[
                                                            "w-5 h-5 rounded-full grid place-items-center text-xs font-medium tabular-nums",
                                                            c.rank <= 3
                                                                  ? "bg-stardust-gold text-ink"
                                                                  : "bg-soft-white/8 text-soft-white/64",
                                                      ].join(" ")}
                                                >
                                                      {c.rank}
                                                </span>
                                                <span className="text-soft-white/92 truncate">
                                                      {c.category}
                                                </span>
                                                <span className="h-1.5 rounded-full bg-soft-white/8 overflow-hidden">
                                                      <i
                                                            className="chart-bar-grow block h-full rounded-full bg-linear-to-r from-stardust-gold to-accent-teal"
                                                            style={{
                                                                  width: `${width}%`,
                                                                  animationDelay: `${(c.rank - 1) * 80}ms`,
                                                            }}
                                                      />
                                                </span>
                                                <span className="text-soft-white/92 tabular-nums text-right mr-4">
                                                      {c.sales}
                                                </span>
                                                <span className="justify-self-end">
                                                      <TrendChip
                                                            trend={c.trend}
                                                            change={c.change}
                                                      />
                                                </span>
                                          </div>
                                          <div
                                                ref={(el) => {
                                                      if (el)
                                                            detailRefs.current.set(
                                                                  c.rank,
                                                                  el,
                                                            );
                                                      else
                                                            detailRefs.current.delete(
                                                                  c.rank,
                                                            );
                                                }}
                                                className={[
                                                      "grid transition-all duration-200 ease-out",
                                                      isHovered
                                                            ? "grid-rows-[1fr] opacity-100 mt-1.5"
                                                            : "grid-rows-[0fr] opacity-0",
                                                ].join(" ")}
                                          >
                                                <div className="overflow-hidden">
                                                      <div className="flex items-center gap-2 pl-[98px] pr-1 pb-0.5 text-xs text-soft-white/56 tabular-nums">
                                                            <span>上周</span>
                                                            <span className="text-soft-white/80">
                                                                  {c.lastWeekSales} 万元
                                                            </span>
                                                            <span className="text-soft-white/24">·</span>
                                                            <span>本周</span>
                                                            <span
                                                                  className={
                                                                        delta >= 0
                                                                              ? "text-stardust-gold"
                                                                              : "text-danger"
                                                                  }
                                                            >
                                                                  {delta >= 0 ? "+" : "−"}
                                                                  {Math.abs(delta).toFixed(1)} 万元
                                                            </span>
                                                      </div>
                                                </div>
                                          </div>
                                    </li>
                              );
                        })}
                  </ul>
            </BigPanel>
      );
}
