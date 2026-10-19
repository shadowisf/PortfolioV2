import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { THEME_MORPH_SECONDS } from "../utils/themeMorph";
import { lettersOf, originOf, weightOf } from "../utils/cursorGlyphs";

gsap.registerPlugin(MorphSVGPlugin);

// The menu's word for the theme you are in, "dark" or "light", beside its sun
// or moon -- and on a change of theme, its letters turned from the one word
// into the other as the sun turns into the moon, on the same clock: for its
// length the word is outlines (cursorGlyphs), "dark"'s four letters parting
// into "light"'s five, or running together the other way. Its box is as wide
// as the wider word, so nothing beside it moves; and like the icon it is kept
// out of the theme change's crossfade (`place`, main.scss), so it plays live.
export function ThemeWord({ dark, place }: { dark: boolean; place: string }) {
  const word = useRef<HTMLSpanElement | null>(null);
  const text = useRef<HTMLSpanElement | null>(null);
  const art = useRef<SVGSVGElement | null>(null);
  // the word drawn, so only a real change of theme plays (react's
  // development double-run of effects included)
  const drawn = useRef(dark);
  // set once; from then on the word is changed here, not by react, so the
  // morph has the old one to start from
  const [initial] = useState(dark ? "dark" : "light");
  const morph = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    const box = word.current;
    const el = text.current;
    const svg = art.current;
    if (!box || !el || !svg || drawn.current === dark) return;
    drawn.current = dark;
    morph.current?.progress(1);

    // the letters where they sit in the word's own box, unscaled -- the
    // button may be grown by a hover
    const letters = () => {
      const rect = box.getBoundingClientRect();
      const scale = rect.width / box.offsetWidth || 1;
      const { x, y } = originOf(el);
      const size = parseFloat(getComputedStyle(el).fontSize);
      return lettersOf(
        el.textContent ?? "",
        size,
        weightOf(el),
        (x - rect.left) / scale,
        (y - rect.top) / scale
      );
    };
    const from = letters();
    el.textContent = dark ? "dark" : "light";
    const to = letters();
    if (!from.length || !to.length) return;

    svg.setAttribute("viewBox", `0 0 ${box.offsetWidth} ${box.offsetHeight}`);
    svg.style.width = `${box.offsetWidth}px`;
    svg.style.height = `${box.offsetHeight}px`;
    svg.replaceChildren();
    svg.style.display = "block";
    el.style.opacity = "0";

    const done = () => {
      svg.style.display = "none";
      svg.replaceChildren();
      el.style.opacity = "";
      morph.current = null;
    };
    const tl = gsap.timeline({ onComplete: done });
    // letter into letter, in order, spread across the longer word
    const count = Math.max(from.length, to.length);
    for (let i = 0; i < count; i++) {
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", from[Math.floor((i * from.length) / count)]);
      svg.append(path);
      tl.to(
        path,
        {
          morphSVG: to[Math.floor((i * to.length) / count)],
          duration: THEME_MORPH_SECONDS,
          ease: "power2.inOut",
        },
        0
      );
    }
    morph.current = tl;
  }, [dark]);

  return (
    <span className="themeWord" ref={word} style={{ viewTransitionName: `themeWord-${place}` }}>
      <span className="themeWordText" ref={text}>
        {initial}
      </span>
      <svg ref={art} aria-hidden="true" />
    </span>
  );
}
