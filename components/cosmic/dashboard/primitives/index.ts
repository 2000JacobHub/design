/**
 * Barrel for all dashboard primitives — atoms shared across widgets.
 *
 * Consumers should import from this entry point rather than reaching
 * into individual files, e.g.:
 *
 *   import { PanelHeader, TrendChip, ActionLink } from "@/components/cosmic/dashboard/primitives";
 */

export { ActionLink, type ActionLinkProps } from "@/components/cosmic/dashboard/primitives/ActionLink";
export { DashboardBackdrop } from "@/components/cosmic/dashboard/primitives/DashboardBackdrop";
export { HeaderClock } from "@/components/cosmic/dashboard/primitives/HeaderClock";
export { PanelHeader, type PanelHeaderProps } from "@/components/cosmic/dashboard/primitives/PanelHeader";
export { PlanIconGlyph, type PlanIconGlyphProps } from "@/components/cosmic/dashboard/primitives/PlanIconGlyph";
export { Sparkline, type SparklineProps } from "@/components/cosmic/dashboard/primitives/Sparkline";
export { SyncStatus, type SyncStatusProps } from "@/components/cosmic/dashboard/primitives/SyncStatus";
export { TrendChip, type TrendChipProps } from "@/components/cosmic/dashboard/primitives/TrendChip";
