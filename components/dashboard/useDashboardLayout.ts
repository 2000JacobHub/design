"use client";

import { useEffect, useRef, useState, type DragEvent } from "react";
import {
  INITIAL_LAYOUT,
  WIDGET_MAP,
  type DragPayload,
  type Layout,
  type WidgetType,
} from "@/components/dashboard/registry";

const LAYOUT_STORAGE_KEY = "dashboard.layout.v1";

/**
 * Validate a stored layout against the current registry: arrays must keep
 * their slot counts, and every id must be a known widget of the matching
 * type (anything else — renamed/removed widgets, wrong type — becomes null).
 * Returns null when the shape is unusable so we fall back to the default.
 */
function sanitizeLayout(value: unknown): Layout | null {
  if (!value || typeof value !== "object") return null;
  const v = value as Record<string, unknown>;
  const pick = (arr: unknown, len: number, type: WidgetType): (string | null)[] | null => {
    if (!Array.isArray(arr) || arr.length !== len) return null;
    return arr.map((id) => (typeof id === "string" && WIDGET_MAP[id]?.type === type ? id : null));
  };
  const small = pick(v.small, INITIAL_LAYOUT.small.length, "small");
  const big = pick(v.big, INITIAL_LAYOUT.big.length, "big");
  const mid = pick(v.mid, INITIAL_LAYOUT.mid.length, "mid");
  if (!small || !big || !mid) return null;
  return { small, big, mid };
}

/**
 * Owns everything behind the dashboard's edit mode: layout state, drag &
 * drop between same-type slots, slot removal, reset, and localStorage
 * persistence. The page just renders with the values/handlers it returns.
 */
export function useDashboardLayout() {
  const [editing, setEditing] = useState(false);
  const [layout, setLayout] = useState<Layout>(INITIAL_LAYOUT);
  const [loaded, setLoaded] = useState(false);
  const [dragType, setDragType] = useState<WidgetType | null>(null);
  const [overSlot, setOverSlot] = useState<string | null>(null);
  const dragRef = useRef<DragPayload | null>(null);
  const loadedRef = useRef(false);

  // Load any saved layout on mount (after hydration to avoid a mismatch).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LAYOUT_STORAGE_KEY);
      if (raw) {
        const parsed = sanitizeLayout(JSON.parse(raw));
        if (parsed) setLayout(parsed);
      }
    } catch {
      // ignore corrupt/unavailable storage — fall back to the default
    }
    loadedRef.current = true;
    setLoaded(true);
  }, []);

  // Persist the layout whenever it changes (skip the pre-load render).
  useEffect(() => {
    if (!loadedRef.current) return;
    try {
      localStorage.setItem(LAYOUT_STORAGE_KEY, JSON.stringify(layout));
    } catch {
      // ignore storage write failures (private mode / quota)
    }
  }, [layout]);

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

  const onSlotDragLeave = (slotKey: string) => {
    setOverSlot((s) => (s === slotKey ? null : s));
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

  const resetLayout = () => setLayout(INITIAL_LAYOUT);
  const toggleEditing = () => setEditing((v) => !v);

  return {
    editing,
    toggleEditing,
    layout,
    loaded,
    dragType,
    overSlot,
    startDrag,
    endDrag,
    onSlotDragOver,
    onSlotDragLeave,
    onSlotDrop,
    removeSlot,
    resetLayout,
  };
}
