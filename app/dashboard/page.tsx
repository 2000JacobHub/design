"use client";

import {
  useEffect,
  useRef,
  useState,
  type DragEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import { DashboardBackdrop, PanelHeader } from "@/components/dashboard/primitives";
import Header from "@/components/dashboard/primitives/Header";
import { Icon, sliders, close, check } from "@/lib/icons";
import {
  BIG_AREAS,
  INITIAL_LAYOUT,
  WIDGET_MAP,
  type Layout,
  type WidgetDef,
  type WidgetType,
} from "@/components/dashboard/registry";
import { LibraryPanel, type DragPayload } from "@/components/dashboard/LibraryPanel";

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
            className="absolute top-1.5 right-1.5 z-20 w-5 h-5 grid place-items-center rounded-full bg-cosmic-black/80 border border-soft-white/20 text-soft-white/70 hover:text-danger hover:border-danger/60 transition-colors"
            aria-label="移除组件"
          >
            <Icon icon={close} width={12} height={12} aria-hidden />
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
        <LibraryPanel
          layout={layout}
          onReset={() => setLayout(INITIAL_LAYOUT)}
          onDragStart={startDrag}
          onDragEnd={endDrag}
        />
      )}

      <FloatingToggle editing={editing} onToggle={() => setEditing((v) => !v)} />
    </div>
  );
}

const FLOAT_MARGIN = 12;

function FloatingToggle({ editing, onToggle }: { editing: boolean; onToggle: () => void }) {
  const ref = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ x: FLOAT_MARGIN, y: FLOAT_MARGIN });
  const [ready, setReady] = useState(false);
  const [dragging, setDragging] = useState(false);
  const drag = useRef<{ sx: number; sy: number; bx: number; by: number; moved: boolean } | null>(null);

  const clamp = (x: number, y: number, w: number, h: number) => ({
    x: Math.min(Math.max(x, FLOAT_MARGIN), Math.max(FLOAT_MARGIN, window.innerWidth - w - FLOAT_MARGIN)),
    y: Math.min(Math.max(y, FLOAT_MARGIN), Math.max(FLOAT_MARGIN, window.innerHeight - h - FLOAT_MARGIN)),
  });

  const snapToEdge = () => {
    const el = ref.current;
    if (!el) return;
    const w = el.offsetWidth;
    const h = el.offsetHeight;
    setPos((p) => {
      const center = p.x + w / 2;
      const x = center < window.innerWidth / 2 ? FLOAT_MARGIN : window.innerWidth - w - FLOAT_MARGIN;
      return clamp(x, p.y, w, h);
    });
  };

  useEffect(() => {
    const el = ref.current;
    const w = el?.offsetWidth ?? 48;
    const h = el?.offsetHeight ?? 48;
    setPos({
      x: window.innerWidth - w - FLOAT_MARGIN,
      y: window.innerHeight - h - FLOAT_MARGIN,
    });
    setReady(true);
    window.addEventListener("resize", snapToEdge);
    return () => window.removeEventListener("resize", snapToEdge);
  }, []);

  const onPointerDown = (e: ReactPointerEvent<HTMLButtonElement>) => {
    drag.current = { sx: e.clientX, sy: e.clientY, bx: pos.x, by: pos.y, moved: false };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLButtonElement>) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.sx;
    const dy = e.clientY - d.sy;
    if (!d.moved && Math.hypot(dx, dy) > 4) {
      d.moved = true;
      setDragging(true);
    }
    if (!d.moved) return;
    const el = ref.current;
    const w = el?.offsetWidth ?? 0;
    const h = el?.offsetHeight ?? 0;
    setPos(clamp(d.bx + dx, d.by + dy, w, h));
  };

  const onPointerUp = (e: ReactPointerEvent<HTMLButtonElement>) => {
    const d = drag.current;
    drag.current = null;
    e.currentTarget.releasePointerCapture(e.pointerId);
    if (!d) return;
    if (!d.moved) {
      onToggle();
      return;
    }
    setDragging(false);
    snapToEdge();
  };

  return (
    <button
      ref={ref}
      type="button"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      style={{
        left: pos.x,
        top: pos.y,
        boxShadow: editing
          ? "0 10px 30px -6px rgba(0,0,0,0.6), 0 0 0 1px rgba(245,210,138,0.28), 0 0 26px -2px rgba(245,210,138,0.5)"
          : "0 10px 30px -8px rgba(0,0,0,0.65), 0 0 0 1px rgba(245,246,248,0.06), 0 0 20px -6px rgba(245,210,138,0.22)",
      }}
      aria-label={editing ? "完成" : "自定义布局"}
      title={editing ? "完成" : "自定义布局"}
      className={[
        "fixed z-50 w-12 h-12 grid place-items-center rounded-full border touch-none select-none backdrop-blur-md",
        ready ? "opacity-100" : "opacity-0",
        dragging
          ? "cursor-grabbing scale-105"
          : "cursor-grab transition-all duration-200 ease-out hover:scale-105 active:scale-95",
        editing
          ? "bg-stardust-gold/20 border-stardust-gold/50 text-stardust-gold"
          : "bg-cosmic-black/80 border-soft-white/15 text-soft-white/90 hover:text-stardust-gold hover:border-stardust-gold/40",
      ].join(" ")}
    >
      <Icon icon={editing ? check : sliders} width={18} height={18} aria-hidden />
    </button>
  );
}
