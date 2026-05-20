/**
 * Barrel for all dashboard primitives — atoms shared across widgets.
 *
 * Consumers should import from this entry point rather than reaching
 * into individual files, e.g.:
 *
 *   import { PanelHeader, TrendChip, ActionLink } from "@/components/dashboard/primitives";
 */

export { ActionLink, type ActionLinkProps } from "@/components/dashboard/primitives/ActionLink";
export { DashboardBackdrop } from "@/components/dashboard/primitives/DashboardBackdrop";
export { HeaderClock } from "@/components/dashboard/primitives/HeaderClock";
export { PanelHeader, type PanelHeaderProps } from "@/components/dashboard/primitives/PanelHeader";
export { PlanIconGlyph, type PlanIconGlyphProps } from "@/components/dashboard/primitives/PlanIconGlyph";
export { Sparkline, type SparklineProps } from "@/components/dashboard/primitives/Sparkline";
export { SyncStatus, type SyncStatusProps } from "@/components/dashboard/primitives/SyncStatus";
export { TrendChip, type TrendChipProps } from "@/components/dashboard/primitives/TrendChip";
