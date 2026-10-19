import { useSyncExternalStore } from "react";

// Whether there is a cursor about -- a mouse or a trackpad, a laptop's or an
// ipad's with one connected -- rather than only a finger. The browser says so
// (a pointer that hovers and is fine), and a mouse's pointer moving says so
// too, for a browser slow to; unplugging one is the browser's to report. On
// the page as html.hasCursor (main.scss), in React as useHasCursor().
const fine = window.matchMedia("(any-hover: hover) and (any-pointer: fine)");
let present = fine.matches;
const listeners = new Set<() => void>();

function set(next: boolean) {
  if (next === present) return;
  present = next;
  document.documentElement.classList.toggle("hasCursor", present);
  listeners.forEach((listener) => listener());
}

document.documentElement.classList.toggle("hasCursor", present);
fine.addEventListener("change", () => set(fine.matches));
window.addEventListener(
  "pointermove",
  (e) => {
    if (e.pointerType === "mouse") set(true);
  },
  { passive: true }
);

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useHasCursor() {
  return useSyncExternalStore(subscribe, () => present);
}
