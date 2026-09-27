import { useEffect } from "react";
import { workMapping } from "./workMapping";

// How many previews are in flight at once. The queue is the point: the old
// loader started all fourteen at once as <video preload="auto"> elements, and
// chromium holds a decode pipeline open for every video with a source
// attached -- that pileup was what froze the page. These are plain fetches, so
// there is no element and no decoder, and a small pool keeps a slow connection
// from being swamped while the bar still moves steadily.
const CONCURRENCY = 3;

// Once per session, not once per mount. Home unmounts when you navigate to a
// work page or about, so without this, coming back re-ran the whole pass and
// put the bar up again every single time -- even though every preview was
// already sitting in the http cache.
let previewsWarmed = false;

// Nothing is returned on purpose. The page does not wait on this, so reporting
// progress would only re-render Home once per file -- and every ProjectPreview
// with it -- for a bar no one is looking at.
export function useVideoPreloader(enabled: boolean) {
  useEffect(() => {
    // already warmed earlier in this session -- nothing to wait for
    if (previewsWarmed) return;

    // previews only ever play on hover, so a touch device would be paying for
    // megabytes it can never use
    if (!enabled) return;

    // the previews, never the originals -- those are ~150MB and only ever
    // load when someone presses play on a work page
    const urls = Object.values(workMapping)
      .map((project) => project.videoPreview)
      .filter((url) => url.length > 0);

    if (urls.length === 0) return;

    const controller = new AbortController();
    let cancelled = false;
    let cursor = 0;

    const worker = async () => {
      while (!cancelled) {
        const index = cursor++;
        if (index >= urls.length) return;

        try {
          const response = await fetch(urls[index], {
            signal: controller.signal,
          });
          // drain it, otherwise the response may never reach the cache
          await response.arrayBuffer();
        } catch {
          // one unreachable preview should not hold the whole site hostage
        }

        if (cancelled) return;
      }
    };

    const pool = Array.from({ length: Math.min(CONCURRENCY, urls.length) }, worker);

    Promise.all(pool).then(() => {
      // only latch on a pass that actually finished; an aborted one should be
      // retried on the next visit rather than assumed warm
      if (!cancelled) previewsWarmed = true;
    });

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [enabled]);
}
