/**
 * Pulsing "live" pill in the page header. Visual only — wire up the
 * `online` prop once the page has a real status source.
 */
export type SyncStatusProps = {
  label?: string;
  online?: boolean;
};

export function SyncStatus({ label = "实时同步正常", online = true }: SyncStatusProps) {
  return (
    <div
      className={[
        "inline-flex items-center gap-2 h-9 px-3.5 rounded-full border",
        online
          ? "bg-accent-teal/8 border-accent-teal/24"
          : "bg-danger/8 border-danger/24",
      ].join(" ")}
    >
      <span className="relative flex h-2 w-2">
        <span
          className={[
            "absolute inline-flex h-full w-full rounded-full opacity-60",
            online ? "bg-accent-teal animate-ping" : "bg-danger",
          ].join(" ")}
        />
        <span
          className={[
            "relative inline-flex h-2 w-2 rounded-full",
            online ? "bg-accent-teal shadow-teal-dot" : "bg-danger",
          ].join(" ")}
        />
      </span>
      <span
        className={[
          "text-xs tracking-wide",
          online ? "text-accent-teal/92" : "text-danger/92",
        ].join(" ")}
      >
        {label}
      </span>
    </div>
  );
}
