import type { IconifyIcon } from "@iconify/types";
import {
  bell,
  boxes,
  fileText,
  Icon,
  lineChart,
  megaphone,
  presentation,
  store,
} from "@/lib/icons";
import type { PlanIconKind } from "@/components/dashboard/data/types";

export type PlanIconGlyphProps = {
  kind: PlanIconKind;
  size?: number;
};

const KIND_TO_ICON: Record<PlanIconKind, IconifyIcon> = {
  report: fileText,
  marketing: megaphone,
  ppt: presentation,
  tenant: store,
  forecast: lineChart,
  alert: bell,
  inventory: boxes,
};

export function PlanIconGlyph({ kind, size = 18 }: PlanIconGlyphProps) {
  return <Icon icon={KIND_TO_ICON[kind]} width={size} height={size} aria-hidden />;
}
