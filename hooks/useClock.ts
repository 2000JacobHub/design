"use client";

import { useEffect, useState } from "react";

/**
 * Ticks once per second on the client. Returns `null` on first render
 * (server / pre-hydration) so the consumer can render a placeholder
 * without causing a hydration mismatch.
 */
export function useClock(): Date | null {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return now;
}
