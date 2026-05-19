/**
 * Decorative blurred blobs that sit behind the dashboard content.
 * Pure presentational — no props, no state.
 */
export function DashboardBackdrop() {
  return (
    <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
      <span className="absolute top-[-260px] left-[-120px] w-[520px] h-[520px] rounded-full bg-stardust-gold/6 blur-[120px]" />
      <span className="absolute bottom-[-220px] right-[-160px] w-[640px] h-[640px] rounded-full bg-accent-teal/6 blur-[140px]" />
    </div>
  );
}
