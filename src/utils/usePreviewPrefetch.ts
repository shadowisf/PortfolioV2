import { useEffect } from "react";
import { workMapping } from "./workMapping";

// Once the intro animation is done, quietly pull the hover previews into the
// http cache one at a time, so the first hover has nothing left to fetch.
//
// This is deliberately plain fetch() rather than a <video> element: chromium
// spins up a decode pipeline for every video that has a source attached, and
// fourteen of those at once is what used to lock up the main thread. Here there
// is no element and no decoder -- just bytes.
const PREFETCH_DELAY_MS = 2000;

// The whole set is about 6MB today (60fps previews). This ceiling is not a tuning knob so much
// as a tripwire: if someone adds a long clip later, the prefetch stops early
// rather than quietly costing every desktop visitor another few megabytes.
// Anything skipped still loads on hover, just not ahead of time.
const PREFETCH_BUDGET_BYTES = 7 * 1024 * 1024;

// The visitor is paying for these, and they are only ever useful on a pointer
// device, so bail out for anyone who has said not to or cannot afford it.
function shouldPrefetch() {
  const connection = (
    navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }
  ).connection;

  if (!connection) return true; // safari and firefox -- assume it is fine
  if (connection.saveData) return false;
  return connection.effectiveType !== "slow-2g" && connection.effectiveType !== "2g";
}

export function usePreviewPrefetch(enabled: boolean) {
  useEffect(() => {
    // previews only ever play on hover, so a touch device never needs them
    if (!enabled || !shouldPrefetch()) return;

    const urls = Object.values(workMapping)
      .map((project) => project.videoPreview)
      .filter((url) => url.length > 0);

    const controller = new AbortController();

    const warmCache = async () => {
      let spent = 0;

      for (const url of urls) {
        if (controller.signal.aborted || spent >= PREFETCH_BUDGET_BYTES) return;
        try {
          const response = await fetch(url, {
            signal: controller.signal,
            // deprioritised behind anything the visitor actually asked for
            priority: "low",
          } as RequestInit);
          // drain it, otherwise the response may never reach the cache
          spent += (await response.arrayBuffer()).byteLength;
        } catch {
          // offline, or the visitor navigated away -- neither is worth reporting
        }
      }
    };

    const timer = window.setTimeout(warmCache, PREFETCH_DELAY_MS);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [enabled]);
}
