import { RefObject, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";

// The cursor over the home page's project tiles, drawn rather than the
// system's: a small tile carrying the project's name in the site's hover
// weight, its year beneath (its data-name and data-meta), and a link's arrow.
// Nothing about it animates: it is there the moment the pointer is over a
// project, follows the pointer exactly, changes its label from one project to
// the next, and is gone the moment the pointer leaves them. A project still to come shows it too, though a click on it goes
// nowhere.
export function TileCursor({ within }: { within: RefObject<HTMLElement | null> }) {
  const pill = useRef<HTMLDivElement | null>(null);
  const name = useRef<HTMLSpanElement | null>(null);
  const meta = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = pill.current;
    if (!el) return;
    // centred on the pointer, its arrow turned to ↗ (hidden until needed:
    // .shown, below)
    gsap.set(el, { xPercent: -50, yPercent: -50 });
    gsap.set(el.querySelector(".tileCursorArrow"), { rotation: -45 });

    // the tile whose name is showing, null while hidden
    let current: HTMLElement | null = null;
    let pointer: { x: number; y: number } | null = null;

    const tileAt = (x: number, y: number) => {
      const hit = document.elementFromPoint(x, y);
      if (!hit || !within.current?.contains(hit)) return null;
      return hit.closest<HTMLElement>(".card");
    };

    const update = () => {
      if (!pointer) return;
      const tile = tileAt(pointer.x, pointer.y);
      if (tile) gsap.set(el, { x: pointer.x, y: pointer.y });
      if (tile === current) return;

      if (tile) {
        if (name.current) name.current.textContent = tile.dataset.name ?? "";
        if (meta.current) meta.current.textContent = tile.dataset.meta ?? "";
        // light over a clip too dark for it (overlayTheme), and over a
        // project still to come
        el.classList.toggle(
          "light",
          tile.dataset.overlay === "light" || tile.classList.contains("upcoming")
        );
      }
      // there or not, at once; from one tile to the next it stays, only its
      // words changing
      el.classList.toggle("shown", !!tile);
      current = tile;
    };

    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      pointer = { x: e.clientX, y: e.clientY };
      update();
    };

    window.addEventListener("pointermove", move);
    // a page scroll carries tiles under a still pointer, or away from it
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("scroll", update);
    };
  }, [within]);

  // on the body: the page wrapper's containment would otherwise pin a fixed
  // element to itself rather than the window
  return createPortal(
    <div className="tileCursor" ref={pill} aria-hidden="true">
      <span className="tileCursorText">
        <span className="tileCursorName" ref={name} />
        <span className="tileCursorMeta" ref={meta} />
      </span>
      <svg className="tileCursorArrow" viewBox="9 9 18 18">
        <path d="M11.5 18H24.5M19 12.5L24.5 18L19 23.5" />
      </svg>
    </div>,
    document.body
  );
}
