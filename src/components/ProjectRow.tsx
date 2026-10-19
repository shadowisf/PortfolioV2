import { ReactNode, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/all";
import { playPreview, stopPreview } from "../utils/gsap/useHomeAnimation";
import { useHasCursor } from "../utils/hasCursor";

gsap.registerPlugin(ScrollToPlugin);

// how long a page along takes -- the browser's own smooth scroll is slower
// and cannot be quickened
const PAGE_SECONDS = 0.3;
// how much of a tile must be scrolled into its row to count as in view
const IN_VIEW = 0.6;

type ProjectRowProps = {
  label: string;
  children: ReactNode;
};

// One kind of work on the home page at mobile widths: its label, then its
// projects as a carousel, one in view at a time with the next peeking in at
// the edge. Swipe, or use the arrows beside the label -- which only appear
// when there is more to see. With no hover to start it, a preview plays by
// itself: the tile in view, in the row across the middle of the screen.
// With a cursor about, either edge of the row pages along too, the cursor
// tile turning into that way's arrow over it. (Wider screens get the bento grid.)
export function ProjectRow({ label, children }: ProjectRowProps) {
  const track = useRef<HTMLDivElement | null>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(true);
  // where a page in progress is headed, so taps in quick succession add up
  const heading = useRef<number | null>(null);
  const hasCursor = useHasCursor();

  // whether the arrows have anywhere left to go
  function updateEnds() {
    const el = track.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 1);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1);
  }

  // one tile along, either way. Snapping is held off while it moves -- with
  // it on, every step of the tween would be pulled back to a tile's edge --
  // and the tween lands on one anyway.
  function page(direction: 1 | -1) {
    const el = track.current;
    const card = el?.querySelector<HTMLElement>(".card");
    if (!el || !card) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    const from = heading.current ?? el.scrollLeft;
    const max = el.scrollWidth - el.clientWidth;
    const to = Math.min(max, Math.max(0, from + direction * (card.offsetWidth + gap)));
    heading.current = to;

    el.style.scrollSnapType = "none";
    gsap.to(el, {
      scrollTo: { x: to },
      duration: PAGE_SECONDS,
      ease: "power2.out",
      overwrite: true,
      onComplete: () => {
        heading.current = null;
        el.style.scrollSnapType = "";
      },
    });
  }

  // a resize can turn a row that fitted into one that scrolls, or back
  useEffect(() => {
    updateEnds();
    window.addEventListener("resize", updateEnds);
    return () => window.removeEventListener("resize", updateEnds);
  }, []);

  // What plays: a tile mostly scrolled into this row, while the row lies
  // across the screen's middle -- one row at a time, the one dead centre as
  // the page scrolls. Leaving either, it pauses where it is.
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const cards = [...el.querySelectorAll<HTMLElement>(".card")];
    const inRow = new Set<Element>();
    let centred = false;

    const sync = () => {
      for (const card of cards) {
        const video = card.querySelector("video");
        if (!video) continue;
        if (centred && inRow.has(card)) playPreview(video);
        else stopPreview(video);
      }
    };

    // the screen narrowed to a line across its middle
    const middle = new IntersectionObserver(
      ([entry]) => {
        centred = entry.isIntersecting;
        sync();
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );
    // which tiles are scrolled into the row
    const across = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.intersectionRatio >= IN_VIEW) inRow.add(entry.target);
          else inRow.delete(entry.target);
        }
        sync();
      },
      { root: el, threshold: [0, IN_VIEW, 1] }
    );

    middle.observe(el);
    cards.forEach((card) => across.observe(card));
    return () => {
      middle.disconnect();
      across.disconnect();
      cards.forEach((card) => {
        const video = card.querySelector("video");
        if (video) stopPreview(video);
      });
    };
  }, []);

  const scrolls = !(atStart && atEnd);

  return (
    <section className="projectGroup">
      <div className="groupHeader">
        <h2 className="groupLabel">{label}</h2>

        {scrolls && (
          <div className="paddles">
            <button
              aria-label={`previous ${label} project`}
              disabled={atStart}
              onClick={() => page(-1)}
            >
              ←
            </button>
            <button
              aria-label={`next ${label} project`}
              disabled={atEnd}
              onClick={() => page(1)}
            >
              →
            </button>
          </div>
        )}
      </div>

      <div className="rowFrame">
        <div className="row" ref={track} onScroll={updateEnds}>
          {children}
        </div>

        {/* the paddles' own, closer to hand, the cursor tile their arrow --
            a second way, so kept from the keyboard and screen readers, who
            have the paddles */}
        {hasCursor && scrolls && (
          <>
            <button
              className="rowEdge previous"
              aria-hidden="true"
              tabIndex={-1}
              disabled={atStart}
              onClick={() => page(-1)}
            />
            <button
              className="rowEdge next"
              aria-hidden="true"
              tabIndex={-1}
              disabled={atEnd}
              onClick={() => page(1)}
            />
          </>
        )}
      </div>
    </section>
  );
}
