import type { ReactNode } from "react";

export type PanelHeaderProps = {
  title: string;
  meta?: ReactNode;
  action?: ReactNode;
};

export function PanelHeader({ title, meta, action }: PanelHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-3 min-w-0">
        <h2 className="m-0 text-lg font-medium text-soft-white/92 truncate">{title}</h2>
        {meta && <span className="text-xs text-soft-white/56">{meta}</span>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
