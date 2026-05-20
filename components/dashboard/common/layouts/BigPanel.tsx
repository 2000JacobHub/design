import type { HTMLAttributes, ReactNode } from "react";

export type BigPanelProps = HTMLAttributes<HTMLElement> & {
  /** 对应 dashboard-main-grid 里的 grid-area 名称，如 "traffic"。 */
  area?: string;
  children: ReactNode;
};

/**
 * 第 2 种容器：第 2、3 行的大面板外壳。
 * 通过 `area` 放进主网格的对应槽位，内容通过 children 传入。
 */
export function BigPanel({ area, children, className, style, ...rest }: BigPanelProps) {
  return (
    <article
      className={["cosmic-panel flex flex-col gap-3 p-4 lg:p-5 min-h-0", className]
        .filter(Boolean)
        .join(" ")}
      style={area ? { gridArea: area, ...style } : style}
      {...rest}
    >
      {children}
    </article>
  );
}
