/**
 * Centralised icon registry for the project.
 *
 * Per `.cursor/skills/ui-design-rules`, every functional icon must come
 * from Iconify (https://iconify.design). We use the Lucide set
 * (`@iconify-icons/lucide`) because it matches the dashboard's existing
 * 1.2–1.5px stroke aesthetic.
 *
 * Why this barrel:
 *   - Each icon is imported as static JSON data, so SSR is stable and
 *     there's no API fetch / hydration flicker.
 *   - Consumers import from one place, which makes it easy to audit
 *     which icons the project uses and to swap sets later.
 *   - Re-exporting the renderer from `@iconify/react/offline` strips
 *     the API client entirely from the bundle.
 *
 * Usage:
 *   import { Icon, arrowRight } from "@/lib/icons";
 *   <Icon icon={arrowRight} width={16} height={16} />
 */

export { Icon } from "@iconify/react/offline";

export { default as arrowRight } from "@iconify-icons/lucide/arrow-right";
export { default as trendingUp } from "@iconify-icons/lucide/trending-up";
export { default as trendingDown } from "@iconify-icons/lucide/trending-down";
export { default as clock } from "@iconify-icons/lucide/clock";
export { default as fileText } from "@iconify-icons/lucide/file-text";
export { default as megaphone } from "@iconify-icons/lucide/megaphone";
export { default as presentation } from "@iconify-icons/lucide/presentation";
export { default as store } from "@iconify-icons/lucide/store";
export { default as lineChart } from "@iconify-icons/lucide/line-chart";
