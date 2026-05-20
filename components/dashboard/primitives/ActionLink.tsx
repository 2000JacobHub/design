import type { ReactNode } from "react";
import { arrowRight, Icon } from "@/lib/icons";

export type ActionLinkProps = {
  children?: ReactNode;
  onClick?: () => void;
};

export function ActionLink({ children = "查看更多", onClick }: ActionLinkProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1 text-xs text-stardust-gold/82 hover:text-stardust-gold transition-colors"
    >
      {children}
      <Icon icon={arrowRight} width={12} height={12} aria-hidden />
    </button>
  );
}
