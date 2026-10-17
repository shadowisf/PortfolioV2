import { useLayoutEffect, useRef, useState } from "react";
import TechStackTile from "./TechStackTile";
import { knownTech } from "../utils/knownTech";
import { skillsetRating } from "../utils/skillsetRating";
import { useChipFilter } from "../utils/gsap/useChipFilter";

// the segmented control's levels, as skillsetRating numbers them
const LEVELS = [
  ["3", "expert"],
  ["2", "intermediate"],
  ["1", "beginner"],
];

type SkillFilterProps = {
  // the tools, as written in skillsetRating (a leading * or digit is
  // dropped, as TechStackTile does)
  items: string[];
  // the chips' box's class ("skills" on about)
  className: string;
  label: string;
};

// Tech chips under a segmented control that filters them by skill level --
// all, or one level at a time, re-sorted by useChipFilter. A level none of
// the chips is at gets no segment, and with only one level among them there
// is nothing to filter, so no control at all. A tool with no rating shows
// under all only.
export function SkillFilter({ items, className, label }: SkillFilterProps) {
  const [level, setLevel] = useState("0");
  // while the chips are still moving: the control greyed out, nothing to
  // pick until they land
  const [sorting, setSorting] = useState(false);
  const box = useRef<HTMLDivElement | null>(null);
  const { filterSkill } = useChipFilter(box);

  const chips = items
    .map((item) => {
      const name = item.replace(/^[*0123]+/, "");
      return { item, rating: skillsetRating[name] };
    })
    .filter(({ item }) => knownTech.has(item.replace(/^[*0123]+/, "")));
  const levels = LEVELS.filter(([key]) => chips.some(({ rating }) => String(rating) === key));
  const segments = levels.length > 1 ? [["0", "all"], ...levels] : [];

  // The chips' box holds the height of every chip at once, whatever the
  // filter shows, so filtering never shortens the page under the reader. It
  // is measured on a hidden copy with all of them showing (the filter hides
  // chips with inline styles, which the copy drops) -- again whenever the
  // width changes, and once the fonts are in, since both change the wrap.
  useLayoutEffect(() => {
    const el = box.current;
    if (!el) return;
    let width = -1;
    const fit = (force = false) => {
      if (!force && el.clientWidth === width) return;
      width = el.clientWidth;
      const copy = el.cloneNode(true) as HTMLElement;
      copy.removeAttribute("style");
      copy.style.cssText = `position: absolute; visibility: hidden; pointer-events: none; width: ${width}px;`;
      copy.querySelectorAll(":scope > *").forEach((chip) => chip.removeAttribute("style"));
      el.parentElement?.append(copy);
      el.style.minHeight = `${copy.offsetHeight}px`;
      copy.remove();
    };
    fit(true);
    document.fonts.ready.then(() => fit(true));
    const observer = new ResizeObserver(() => fit());
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="skillFilter">
      {segments.length > 0 && (
        // all in a track of its own, the levels together in the next
        <div className="segmentedRow" role="group" aria-label={label} aria-busy={sorting}>
          {[segments.slice(0, 1), segments.slice(1)].map((track) => (
            <div className={`segmented${sorting ? " busy" : ""}`} key={track[0][0]}>
              {track.map(([key, name]) => (
                <button
                  key={key}
                  className={key === level ? "active" : undefined}
                  aria-pressed={key === level}
                  disabled={sorting}
                  onClick={() => {
                    if (key === level) return;
                    setLevel(key);
                    setSorting(true);
                    filterSkill(key, () => setSorting(false));
                  }}
                >
                  <span className="segmentedLabel" data-label={name}>
                    <span className="segmentedText">{name}</span>
                  </span>
                </button>
              ))}
            </div>
          ))}
        </div>
      )}

      <div className={className} ref={box}>
        {chips.map(({ item, rating }, index) => (
          <TechStackTile
            techStackItem={item}
            classNameContainer="item"
            key={index}
            dataKey={rating === undefined ? undefined : String(rating)}
          />
        ))}
      </div>
    </div>
  );
}
