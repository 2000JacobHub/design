import type { ReactNode } from "react";

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
      <svg viewBox="0 0 10 10" width="10" height="10" aria-hidden>
        <path
          d="M2 5 H7.5 M5 2.5 L8 5 L5 7.5"
          stroke="currentColor"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
