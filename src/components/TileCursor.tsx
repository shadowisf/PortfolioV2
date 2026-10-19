import { RefObject, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { lettersIn } from "../utils/cursorGlyphs";

gsap.registerPlugin(MorphSVGPlugin);

// The cursor over the home page's project tiles, drawn rather than the
// system's: a small tile carrying the project's name, its year beneath (its
// data-name and data-meta), and a link's arrow, ↗. The name and arrow go on
// changing weight, back and forth, as a link does when hovered (main.scss).
// It is there the moment the pointer is over a project, follows the pointer
// exactly, changes its label from one project to the next, and is gone the moment the pointer leaves them. A project still to
// come shows it too, though a click on it goes nowhere. Over a carousel's
// edge (ProjectRow's .rowEdge) it morphs into a smaller tile naming that way
// -- "← prev", "next →", faded where there is nowhere further -- still
// following the pointer, and back into the project's over a project.

// the morph between the tile and an edge's
const MORPH_SECONDS = 0.45;
// the fade from one theme to the other, under a still cursor
const THEME_FADE_SECONDS = 0.3;
// the colours the tile is drawn in (main.scss), which a fade eases
const COLOURS = ["--surface", "--text-color", "--faded-color", "--edgeTint", "--way"] as const;
// the tile's corners ($radiusLarge)
const TILE_RADIUS = 10;

export function TileCursor({ within }: { within: RefObject<HTMLElement | null> }) {
  const pill = useRef<HTMLDivElement | null>(null);
  const shape = useRef<HTMLDivElement | null>(null);
  const label = useRef<HTMLSpanElement | null>(null);
  const edgeLabel = useRef<HTMLSpanElement | null>(null);
  const edgeWord = useRef<HTMLSpanElement | null>(null);
  const edgeArrow = useRef<HTMLSpanElement | null>(null);
  const name = useRef<HTMLSpanElement | null>(null);
  const nameText = useRef<HTMLSpanElement | null>(null);
  const meta = useRef<HTMLSpanElement | null>(null);
  const tileArrow = useRef<HTMLSpanElement | null>(null);
  const morphSvg = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const el = pill.current;
    const panel = shape.current;
    const words = label.current;
    const way = edgeLabel.current;
    const svg = morphSvg.current;
    const [wayWord, wayArrow] = [edgeWord.current, edgeArrow.current];
    const [tileName, tileMeta, tileGlyph] = [nameText.current, meta.current, tileArrow.current];
    if (!el || !panel || !words || !way || !svg) return;
    if (!wayWord || !wayArrow || !tileName || !tileMeta || !tileGlyph) return;
    gsap.set(way, { opacity: 0 });

    // the tile whose name is showing, or the edge whose way is, null while
    // hidden
    let current: HTMLElement | null = null;
    let off = false;
    let colourFade: gsap.core.Tween | null = null;
    let pointer: { x: number; y: number } | null = null;
    // a morph under way: from what, to what
    let morph: { tl: gsap.core.Timeline; from: HTMLElement; to: HTMLElement } | null = null;

    const tileAt = (x: number, y: number) => {
      const hit = document.elementFromPoint(x, y);
      if (!hit || !within.current?.contains(hit)) return null;
      return hit.closest<HTMLElement>(".rowEdge, .card");
    };

    // The panel's clip, as its lengths: none of it cut, the tile -- or cut
    // in to the way's smaller tile at its centre. Eased as numbers, written
    // out each frame for the panel and its fill inside its edge (main.scss):
    // the browser reads a clip back shortened, and GSAP would then pair the
    // wrong lengths.
    const clip = { y: 0, x: 0, radius: TILE_RADIUS };
    const draw = () => {
      panel.style.setProperty("--clipY", `${clip.y}px`);
      panel.style.setProperty("--clipX", `${clip.x}px`);
      panel.style.setProperty("--clipR", `${clip.radius}px`);
    };
    const clipFor = (edge: boolean) => {
      if (!edge) return { y: 0, x: 0, radius: TILE_RADIUS };
      return {
        y: Math.max(0, (panel.offsetHeight - way.offsetHeight) / 2),
        x: Math.max(0, (panel.offsetWidth - way.offsetWidth) / 2),
        radius: TILE_RADIUS,
      };
    };

    // The tile's colours as they are this moment -- partway through a fade,
    // maybe -- each worked out where the tile is, in its theme, by a probe
    // of its own.
    const probe = document.createElement("span");
    probe.style.cssText = "position:absolute;visibility:hidden";
    el.append(probe);
    const readColours = () =>
      Object.fromEntries(
        COLOURS.map((colour) => {
          probe.style.color = `var(${colour})`;
          return [colour, getComputedStyle(probe).color];
        })
      ) as Record<(typeof COLOURS)[number], string>;
    const clearColours = () => COLOURS.forEach((colour) => el.style.removeProperty(colour));
    // Before a change of theme: the colours it leaves, and the tile let go
    // of any fade under way, to take the new theme's when it changes.
    const leaving = () => {
      const from = readColours();
      colourFade?.kill();
      colourFade = null;
      clearColours();
      return from;
    };
    // After it: the new theme's colours, and the tile put back in the old
    // ones, to ease from. A fade of the colours themselves, by GSAP -- not
    // CSS transitions, which Safari does not play when a theme (light-dark)
    // turns them, and which ran each layer on a clock of its own.
    const arriving = (from: Record<string, string>) => {
      const to = readColours();
      COLOURS.forEach((colour) => el.style.setProperty(colour, from[colour]));
      return to;
    };
    // From the colours left to the new, given both: GSAP reads a tween's
    // starting values only as it first plays, a frame on, and a theme's
    // colour read off the tile then is its light-dark() whole -- the light
    // one first -- which flashed the light tile between two dark ones.
    const fadeColours = (apply: () => void) => {
      const from = leaving();
      apply();
      const to = arriving(from);
      colourFade = gsap.fromTo(el, { ...from }, {
        ...to,
        duration: THEME_FADE_SECONDS,
        ease: "power1.inOut",
        onComplete: clearColours,
      });
    };

    // Settled in a shape: its own words showing, the morph's letters gone --
    // its colours left to any fade still easing them (fadeColours), and the
    // morph's own let go of where it hands over
    const settle = (edge: boolean) => {
      morph = null;
      svg.style.display = "none";
      el.classList.remove("morphing");
      el.classList.toggle("edge", edge);
      gsap.set(words, { opacity: edge ? 0 : 1 });
      gsap.set(way, { opacity: edge ? 1 : 0 });
    };
    const stopMorph = () => {
      if (!morph) return;
      morph.tl.kill();
      clearColours();
      const edge = el.classList.contains("edge");
      Object.assign(clip, clipFor(edge));
      draw();
      settle(edge);
    };

    // The tile's words, or the edge's way -- and either way the theme of the
    // tile beneath: light over a clip too dark for it (overlayTheme); over a
    // project still to come, the other theme from the page's. An edge with
    // nowhere to go, faded (.off).
    // the project under an edge's strip, at the pointer
    const cardUnder = () =>
      document
        .elementsFromPoint(pointer!.x, pointer!.y)
        .map((hit) => hit.closest<HTMLElement>(".card"))
        .find(Boolean) ?? null;
    const change = (tile: HTMLElement, edge: boolean) => {
      const under = edge ? cardUnder() : tile;
      el.classList.toggle("edge", edge);
      el.classList.toggle("light", under?.dataset.overlay === "light");
      el.classList.toggle("other", !!under?.classList.contains("upcoming"));
      off = edge && tile.matches(":disabled");
      el.classList.toggle("off", off);
      if (edge) {
        const previous = tile.classList.contains("previous");
        way.classList.toggle("prev", previous);
        wayWord.textContent = previous ? "prev" : "next";
        wayArrow.textContent = previous ? "←" : "→";
        return;
      }
      // the name, and the copies its box is sized by (main.scss)
      tileName.textContent = tile.dataset.name ?? "";
      if (name.current) name.current.dataset.label = tile.dataset.name ?? "";
      tileMeta.textContent = tile.dataset.meta ?? "";
    };

    // The morph, as the logo's: the letters themselves turned from the one
    // label into the other -- the name into "next" or "prev", ↗ into → or
    // ←, the year fading out (or in, the other way) -- while the shape
    // closes to the smaller tile, or opens back out. For its length the
    // words are outlines (cursorGlyphs), set where the words were and where
    // they will be, at their weights then -- the weight changes held while
    // it plays, so the words it ends on start theirs afresh.
    const morphTo = (tile: HTMLElement, edge: boolean) => {
      const outline = (el: HTMLElement, weight?: number) => ({
        letters: lettersIn(el, weight),
        fill: getComputedStyle(el).color,
      });
      const before = panel.getBoundingClientRect();
      const fromWord = edge ? outline(tileName) : outline(wayWord);
      const fromArrow = edge ? outline(tileGlyph) : outline(wayArrow);
      const fromClip = { ...clip };
      const from = current!;

      el.classList.add("morphing");
      const fromColours = leaving();
      change(tile, edge);
      const box = panel.getBoundingClientRect();
      const toWord = edge ? outline(wayWord, 0) : outline(tileName, 0);
      const toArrow = edge ? outline(wayArrow, 0) : outline(tileGlyph, 0);
      const theMeta = outline(tileMeta, 0);
      const toColours = arriving(fromColours);
      // the shape as it was, in the panel as it now is (resized to new words)
      clip.x = Math.max(0, (box.width - (before.width - 2 * fromClip.x)) / 2);
      clip.y = Math.max(0, (box.height - (before.height - 2 * fromClip.y)) / 2);
      draw();

      // the letters, in the window's terms, drawn over the panel where it is
      svg.setAttribute("viewBox", `${box.left} ${box.top} ${box.width} ${box.height}`);
      svg.style.width = `${box.width}px`;
      svg.style.height = `${box.height}px`;
      svg.replaceChildren();
      svg.style.display = "block";
      gsap.set([words, way], { opacity: 0 });
      const letter = (d: string, fill: string) => {
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", d);
        path.style.fill = fill;
        svg.append(path);
        return path;
      };

      const ease = "power2.inOut";
      const tl = gsap
        .timeline({
          onComplete: () => {
            clearColours();
            settle(edge);
          },
          // back as it was: the way it came from's own words and theme
          onReverseComplete: () => {
            clearColours();
            change(from, !edge);
            settle(!edge);
          },
        })
        .to(clip, { ...clipFor(edge), duration: MORPH_SECONDS, ease, onUpdate: draw }, 0)
        // and its theme, if the project beneath is in the other
        .fromTo(el, { ...fromColours }, { ...toColours, duration: MORPH_SECONDS, ease }, 0);

      // Letter into letter, in order, spread across the longer word: the
      // name's into "next"'s, two or three into each -- running together
      // as they reach it -- or, the other way, each of "next"'s parting
      // into two or three of the name's. ↗ into → (or ←) the same.
      for (const [a, b] of [
        [fromWord, toWord],
        [fromArrow, toArrow],
      ]) {
        const count = Math.max(a.letters.length, b.letters.length);
        if (!a.letters.length || !b.letters.length) continue;
        for (let i = 0; i < count; i++) {
          const start = a.letters[Math.floor((i * a.letters.length) / count)];
          const end = b.letters[Math.floor((i * b.letters.length) / count)];
          tl.to(letter(start, a.fill), { morphSVG: end, fill: b.fill, duration: MORPH_SECONDS, ease }, 0);
        }
      }
      // the year, faded out over the first half, or in over the last
      for (const d of theMeta.letters) {
        const year = letter(d, fromColours["--faded-color"]);
        tl.to(year, { fill: toColours["--faded-color"], duration: MORPH_SECONDS, ease }, 0).fromTo(
          year,
          { opacity: edge ? 1 : 0 },
          { opacity: edge ? 0 : 1, duration: MORPH_SECONDS / 2, ease },
          edge ? 0 : MORPH_SECONDS / 2
        );
      }
      morph = { tl, from, to: tile };
    };

    const update = () => {
      if (!pointer) return;
      const tile = tileAt(pointer.x, pointer.y);
      if (tile) gsap.set(el, { x: pointer.x, y: pointer.y });
      if (tile === current) {
        // Still over an edge as its row pages along beneath it: an edge that
        // has just run out of room, or found more -- or a project come under
        // it in the other theme, which the tile fades over to
        if (tile?.classList.contains("rowEdge") && !morph) {
          const under = cardUnder();
          if (
            tile.matches(":disabled") !== off ||
            (under?.dataset.overlay === "light") !== el.classList.contains("light") ||
            !!under?.classList.contains("upcoming") !== el.classList.contains("other")
          ) {
            fadeColours(() => change(tile, true));
          }
        }
        return;
      }

      // partway through a morph, back the way it came, or on again
      if (morph && tile === morph.from) {
        morph.tl.reverse();
        current = tile;
        return;
      }
      if (morph && tile === morph.to) {
        morph.tl.play();
        current = tile;
        return;
      }
      stopMorph();

      const edge = tile?.classList.contains("rowEdge") ?? false;
      const wasEdge = current?.classList.contains("rowEdge") ?? false;
      // a morph only between the two shapes, while it shows; appearing, or
      // from one tile to the next, it is simply there in its shape
      if (tile && current && edge !== wasEdge) morphTo(tile, edge);
      else if (tile) {
        // from one project to the next -- a swipe along the row beneath it,
        // say -- the words at once, the theme faded
        if (current) fadeColours(() => change(tile, edge));
        else {
          // appearing: in its theme at once, any fade from before let go
          leaving();
          change(tile, edge);
        }
        Object.assign(clip, clipFor(edge));
        draw();
        settle(edge);
      }

      // there or not, at once; from one tile to the next it stays, only its
      // words changing
      el.classList.toggle("shown", !!tile);
      current = tile;
    };
    // a row's own scroll too (capture), and a frame on, once its paging has
    // settled which edges still have somewhere to go
    const scrolled = () => requestAnimationFrame(update);

    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      pointer = { x: e.clientX, y: e.clientY };
      update();
    };

    window.addEventListener("pointermove", move);
    // a page scroll carries tiles under a still pointer, or away from it
    window.addEventListener("scroll", scrolled, { passive: true, capture: true });
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("scroll", scrolled, { capture: true });
      morph?.tl.kill();
      colourFade?.kill();
      probe.remove();
    };
  }, [within]);

  // on the body: the page wrapper's containment would otherwise pin a fixed
  // element to itself rather than the window
  return createPortal(
    <div className="tileCursor" ref={pill} aria-hidden="true">
      <div className="tileCursorShape" ref={shape}>
        <span className="tileCursorLabel" ref={label}>
          <span className="tileCursorText">
            <span className="tileCursorName" ref={name}>
              <span className="tileCursorNameText" ref={nameText} />
            </span>
            <span className="tileCursorMeta" ref={meta} />
          </span>
          <span className="tileCursorArrow" ref={tileArrow}>
            ↗
          </span>
        </span>
        <span className="tileCursorEdge">
          <span className="tileCursorEdgeText" ref={edgeLabel}>
            <span className="tileCursorEdgeWord" ref={edgeWord} />
            <span className="tileCursorEdgeArrow" ref={edgeArrow} />
          </span>
        </span>
        {/* the letters while it morphs (morphTo) */}
        <svg className="tileCursorMorph" ref={morphSvg} aria-hidden="true" />
      </div>
    </div>,
    document.body
  );
}
