import type { DragEvent } from "react";
import { Icon, rotateCcw } from "@/lib/icons";
import {
  widgetsOfType,
  type DragPayload,
  type Layout,
  type WidgetType,
} from "@/components/dashboard/registry";

const TYPE_LABEL: Record<WidgetType, string> = {
  small: "小卡片 · Small",
  big: "大面板 · Big",
  mid: "计划卡片 · Mid",
};

export type LibraryPanelProps = {
  layout: Layout;
  onReset: () => void;
  onDragStart: (e: DragEvent, payload: DragPayload) => void;
  onDragEnd: () => void;
};

export function LibraryPanel({ layout, onReset, onDragStart, onDragEnd }: LibraryPanelProps) {
  return (
    <aside className="w-72 shrink-0 h-screen sticky top-0 overflow-y-auto border-l border-soft-white/10 bg-cosmic-black/60 backdrop-blur p-4">
      <div className="flex items-center justify-between gap-2 mb-1">
        <div className="text-sm font-medium text-stardust-gold">组件库</div>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1 rounded-input px-2 py-1 text-2xs border border-soft-white/15 text-soft-white/64 hover:text-soft-white/90 hover:border-soft-white/30 transition-colors"
        >
          <Icon icon={rotateCcw} width={12} height={12} aria-hidden />
          重置
        </button>
      </div>
      <div className="text-2xs text-soft-white/45 mb-4">拖拽组件到左侧对应类型的槽位</div>

      {(["small", "big", "mid"] as WidgetType[]).map((type) => (
        <div key={type} className="mb-5">
          <div className="text-2xs uppercase tracking-wide text-stardust-gold mb-2">
            {TYPE_LABEL[type]}
          </div>
          <div className="flex flex-col gap-2">
            {widgetsOfType(type).map((w) => {
              const placed = layout[type].includes(w.id);
              return (
                <div
                  key={w.id}
                  draggable={!placed}
                  onDragStart={!placed ? (e) => onDragStart(e, { type: w.type, widgetId: w.id, from: null }) : undefined}
                  onDragEnd={onDragEnd}
                  className={[
                    "cosmic-card px-3 py-2 text-xs flex items-center justify-between gap-2 transition-opacity",
                    placed
                      ? "opacity-45 cursor-not-allowed"
                      : "cursor-grab active:cursor-grabbing hover:border-stardust-gold/40",
                  ].join(" ")}
                >
                  <span className="truncate text-soft-white/85">{w.label}</span>
                  {placed && <span className="text-2xs text-soft-white/40 shrink-0">已用</span>}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </aside>
  );
}
