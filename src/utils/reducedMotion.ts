// True when the visitor has asked their OS for less motion. Read on every call
// rather than cached, so flipping the setting takes effect without a reload.
//
// Things that travel -- slides, spins, wipes, cursor-following -- check this
// and either skip or land instantly. Plain fades are left alone: a change of
// opacity is not the kind of motion the setting is about.
export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
