"use client";

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { Icon, sliders, check } from "@/lib/icons";

const FLOAT_MARGIN = 12;

/** Draggable, edge-snapping floating button that toggles edit mode.
 *  A tap (no drag past the threshold) toggles; a drag relocates and snaps
 *  to the nearest horizontal edge. Defaults to the bottom-right corner. */
export function FloatingToggle({ editing, onToggle }: { editing: boolean; onToggle: () => void }) {
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

  // Position bottom-right on mount, then keep snapped on resize.
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
