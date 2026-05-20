"use client";

import { useRef, useState, type DragEvent, type ReactNode } from "react";
import { DashboardBackdrop, PanelHeader } from "@/components/dashboard/primitives";
import Header from "@/components/dashboard/primitives/Header";
import {
  BIG_AREAS,
  INITIAL_LAYOUT,
  WIDGET_MAP,
  widgetsOfType,
  type Layout,
  type WidgetDef,
  type WidgetType,
} from "@/components/dashboard/registry";

type DragPayload = {
  type: WidgetType;
  widgetId: string;
  from: { section: WidgetType; index: number } | null;
};

const TYPE_LABEL: Record<WidgetType, string> = {
  small: "小卡片 · Small",
  big: "大面板 · Big",
  mid: "计划卡片 · Mid",
};

const PLACEHOLDER_MIN: Record<WidgetType, string> = {
  small: "min-h-[116px]",
  big: "min-h-[220px]",
  mid: "min-h-[148px]",
};

export default function Dashboard() {
  const [editing, setEditing] = useState(false);
  const [layout, setLayout] = useState<Layout>(INITIAL_LAYOUT);
  const [dragType, setDragType] = useState<WidgetType | null>(null);
  const [overSlot, setOverSlot] = useState<string | null>(null);
  const dragRef = useRef<DragPayload | null>(null);

  const startDrag = (e: DragEvent, payload: DragPayload) => {
    dragRef.current = payload;
    setDragType(payload.type);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", payload.widgetId);
  };

  const endDrag = () => {
    dragRef.current = null;
    setDragType(null);
    setOverSlot(null);
  };

  const onSlotDragOver = (e: DragEvent, section: WidgetType, index: number) => {
    if (dragRef.current?.type !== section) return; // only same type is droppable
    e.preventDefault();
    setOverSlot(`${section}-${index}`);
  };

  const onSlotDrop = (e: DragEvent, section: WidgetType, index: number) => {
    e.preventDefault();
    const d = dragRef.current;
    if (!d || d.type !== section) return;
    setLayout((prev) => {
      const arr = [...prev[section]];
      const displaced = arr[index];
      const existingIndex = arr.indexOf(d.widgetId);
      arr[index] = d.widgetId;
      // If the widget already lived in this section, swap so we never
      // duplicate it; otherwise the displaced widget returns to the library.
      if (existingIndex !== -1 && existingIndex !== index) {
        arr[existingIndex] = displaced;
      }
      return { ...prev, [section]: arr };
    });
    endDrag();
  };

  const removeSlot = (section: WidgetType, index: number) => {
    setLayout((prev) => {
      const arr = [...prev[section]];
      arr[index] = null;
      return { ...prev, [section]: arr };
    });
  };

  const renderSlot = (
    section: WidgetType,
    index: number,
    id: string | null,
    area?: string,
  ): ReactNode => {
    const widget: WidgetDef | undefined = id ? WIDGET_MAP[id] : undefined;
    const slotKey = `${section}-${index}`;
    const isDroppable = editing && dragType === section;
    const isOver = overSlot === slotKey;

    return (
      <div
        key={slotKey}
        style={area ? { gridArea: area } : undefined}
        draggable={editing && !!widget}
        onDragStart={
          widget ? (e) => startDrag(e, { type: section, widgetId: widget.id, from: { section, index } }) : undefined
        }
        onDragEnd={endDrag}
        onDragOver={(e) => onSlotDragOver(e, section, index)}
        onDragLeave={() => setOverSlot((s) => (s === slotKey ? null : s))}
        onDrop={(e) => onSlotDrop(e, section, index)}
        className={[
          "relative h-full min-h-0 rounded-card",
          editing && widget && "cursor-grab",
          isDroppable && !isOver && "outline-dashed outline-1 outline-soft-white/20 outline-offset-2",
          isOver && "outline outline-2 outline-stardust-gold outline-offset-2",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {widget ? (
          <div className={editing ? "pointer-events-none select-none h-full" : "h-full"}>
            {widget.render()}
          </div>
        ) : (
          <div
            className={[
              "h-full w-full grid place-items-center rounded-card border border-dashed border-soft-white/15 text-2xs text-soft-white/40",
              PLACEHOLDER_MIN[section],
            ].join(" ")}
          >
            {editing ? "拖拽组件到此" : ""}
          </div>
        )}

        {editing && widget && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              removeSlot(section, index);
            }}
            className="absolute top-1.5 right-1.5 z-20 w-6 h-6 grid place-items-center rounded-full bg-cosmic-black/80 border border-soft-white/20 text-soft-white/70 hover:text-danger hover:border-danger/60 transition-colors"
            aria-label="移除组件"
          >
            ×
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="flex min-h-screen">
      <main className="relative flex-1 min-w-0 overflow-x-hidden p-3 sm:p-4 lg:p-5 dashboard-bg">
        <DashboardBackdrop />

        <Header />

        <div className="relative z-2 flex items-center justify-end gap-2 mb-3 -mt-2">
          {editing && (
            <button
              type="button"
              onClick={() => setLayout(INITIAL_LAYOUT)}
              className="inline-flex items-center rounded-input px-3 py-1.5 text-xs border border-soft-white/15 text-soft-white/64 hover:text-soft-white/90 hover:border-soft-white/30 transition-colors"
            >
              重置
            </button>
          )}
          <button
            type="button"
            onClick={() => setEditing((v) => !v)}
            className={[
              "inline-flex items-center rounded-input px-3 py-1.5 text-xs border transition-colors",
              editing
                ? "bg-stardust-gold/16 border-stardust-gold/45 text-stardust-gold"
                : "border-soft-white/15 text-soft-white/72 hover:border-soft-white/30 hover:text-soft-white/90",
            ].join(" ")}
          >
            {editing ? "完成" : "自定义布局"}
          </button>
        </div>

        <section
          aria-label="核心指标"
          className="relative z-2 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 mb-4 lg:mb-5"
        >
          {layout.small.map((id, i) => renderSlot("small", i, id))}
        </section>

        <section className="relative z-2 dashboard-main-grid">
          {layout.big.map((id, i) => renderSlot("big", i, id, BIG_AREAS[i]))}

          <article
            className="cosmic-panel flex flex-col gap-3 p-4 lg:p-5 min-h-0"
            style={{ gridArea: "plan" }}
          >
            <PanelHeader title="AI 推荐计划" meta="由 AI 基于数据与目标推荐" />
            <div
              className="grid gap-3"
              style={{ gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}
            >
              {layout.mid.map((id, i) => renderSlot("mid", i, id))}
            </div>
          </article>
        </section>
      </main>

      {editing && (
        <aside className="w-72 shrink-0 h-screen sticky top-0 overflow-y-auto border-l border-soft-white/10 bg-cosmic-black/60 backdrop-blur p-4">
          <div className="text-sm font-medium text-soft-white/85 mb-1">组件库</div>
          <div className="text-2xs text-soft-white/45 mb-4">拖拽组件到左侧对应类型的槽位</div>

          {(["small", "big", "mid"] as WidgetType[]).map((type) => (
            <div key={type} className="mb-5">
              <div className="text-2xs uppercase tracking-wide text-soft-white/45 mb-2">
                {TYPE_LABEL[type]}
              </div>
              <div className="flex flex-col gap-2">
                {widgetsOfType(type).map((w) => {
                  const placed = layout[type].includes(w.id);
                  return (
                    <div
                      key={w.id}
                      draggable
                      onDragStart={(e) => startDrag(e, { type: w.type, widgetId: w.id, from: null })}
                      onDragEnd={endDrag}
                      className={[
                        "cosmic-card px-3 py-2 text-xs flex items-center justify-between gap-2 cursor-grab active:cursor-grabbing transition-opacity",
                        placed ? "opacity-45" : "hover:border-stardust-gold/40",
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
      )}
    </div>
  );
}
