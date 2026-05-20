import type { HTMLAttributes, ReactNode } from "react";

export type SmallPanelProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

/**
 * 第 1 种容器：第一行的小卡片外壳（如 KPI 指标）。
 * 只负责外壳样式，内容通过 children 传入。
 */
export function SmallPanel({ children, className, ...rest }: SmallPanelProps) {
  return (
    <div
      className={["cosmic-card flex flex-col gap-2 p-4 min-w-0", className]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {children}
    </div>
  );
}
