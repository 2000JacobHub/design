import type { DragEvent } from "react";
import { Icon, close } from "@/lib/icons";
import { WIDGET_MAP, type DragPayload, type WidgetDef, type WidgetType } from "@/components/dashboard/registry";

const PLACEHOLDER_MIN: Record<WidgetType, string> = {
  small: "min-h-[116px]",
  big: "min-h-[220px]",
  mid: "min-h-[148px]",
};

export type DashboardSlotProps = {
  section: WidgetType;
  index: number;
  id: string | null;
  /** grid-area name, for big slots */
  area?: string;
  editing: boolean;
  dragType: WidgetType | null;
  overSlot: string | null;
  onStartDrag: (e: DragEvent, payload: DragPayload) => void;
  onEndDrag: () => void;
  onDragOver: (e: DragEvent, section: WidgetType, index: number) => void;
  onDragLeave: (slotKey: string) => void;
  onDrop: (e: DragEvent, section: WidgetType, index: number) => void;
  onRemove: (section: WidgetType, index: number) => void;
};

/** One layout slot: renders the placed widget (draggable while editing) or
 *  a drop placeholder, and validates same-type drops via the parent. */
export function DashboardSlot({
  section,
  index,
  id,
  area,
  editing,
  dragType,
  overSlot,
  onStartDrag,
  onEndDrag,
  onDragOver,
  onDragLeave,
  onDrop,
  onRemove,
}: DashboardSlotProps) {
  const widget: WidgetDef | undefined = id ? WIDGET_MAP[id] : undefined;
  const slotKey = `${section}-${index}`;
  const isDroppable = editing && dragType === section;
  const isOver = overSlot === slotKey;

  return (
    <div
      style={area ? { gridArea: area } : undefined}
      draggable={editing && !!widget}
      onDragStart={
        widget
          ? (e) => onStartDrag(e, { type: section, widgetId: widget.id, from: { section, index } })
          : undefined
      }
      onDragEnd={onEndDrag}
      onDragOver={(e) => onDragOver(e, section, index)}
      onDragLeave={() => onDragLeave(slotKey)}
      onDrop={(e) => onDrop(e, section, index)}
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
            "h-full w-full grid place-items-center rounded-card border border-dashed text-2xs text-soft-white/40",
              `${editing ? 'border-stardust-gold': 'border-soft-white/15'}`,
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
            onRemove(section, index);
          }}
          className="absolute top-1.5 right-1.5 z-20 w-5 h-5 grid place-items-center rounded-full bg-cosmic-black/80 border border-soft-white/20 text-soft-white/70 hover:text-danger hover:border-danger/60 transition-colors"
          aria-label="移除组件"
        >
          <Icon icon={close} width={12} height={12} aria-hidden />
        </button>
      )}
    </div>
  );
}
