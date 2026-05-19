import type { PlanIconKind } from "@/components/cosmic/dashboard/data/types";

export type PlanIconGlyphProps = {
  kind: PlanIconKind;
  size?: number;
};

export function PlanIconGlyph({ kind, size = 18 }: PlanIconGlyphProps) {
  switch (kind) {
    case "report":
      return (
        <svg viewBox="0 0 18 18" width={size} height={size}>
          <rect x="3" y="2" width="12" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <path d="M6 6 H12 M6 9 H12 M6 12 H10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );
    case "marketing":
      return (
        <svg viewBox="0 0 18 18" width={size} height={size}>
          <path d="M3 7 L13 3 L13 15 L3 11 Z" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
          <path d="M13 7 L16 8 L16 10 L13 11" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
        </svg>
      );
    case "ppt":
      return (
        <svg viewBox="0 0 18 18" width={size} height={size}>
          <rect x="2" y="3" width="14" height="9" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <path d="M9 12 V15 M6 15 H12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M5 9 L7 7 L9 8.5 L13 5" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "tenant":
      return (
        <svg viewBox="0 0 18 18" width={size} height={size}>
          <path d="M3 15 V8 L9 4 L15 8 V15" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
          <path d="M7 15 V11 H11 V15" fill="none" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      );
    case "forecast":
      return (
        <svg viewBox="0 0 18 18" width={size} height={size}>
          <path d="M2 14 L6 10 L9 12 L15 5" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M11 5 H15 V9" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
  }
}
