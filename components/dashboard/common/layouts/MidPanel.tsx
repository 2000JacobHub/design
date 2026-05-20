import type { HTMLAttributes, ReactNode } from "react";

export type PlanCardProps = HTMLAttributes<HTMLLIElement> & {
  children: ReactNode;
};

/**
 * 第 3 种容器：第 4 行的卡片外壳（如 AI 计划项）。
 * 自带悬浮渐变高光，内容通过 children 传入。
 */
export function MidPanel({ children, className, ...rest }: PlanCardProps) {
  return (
    <li
      className={[
        "cosmic-card relative p-4 flex flex-col gap-2 min-h-[148px] cursor-pointer group overflow-hidden",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-card"
        style={{
          background:
            "linear-gradient(to right, rgb(245 210 138 / 0.08) 0%, rgb(127 185 190 / 0.06) 100%)",
        }}
      />
      {children}
    </li>
  );
}
