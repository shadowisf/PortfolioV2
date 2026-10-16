import { RefObject, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { Flip } from "gsap/all";
import gsap from "gsap";

gsap.registerPlugin(Flip);

// The turns of a re-sort, each its own length and a step between one chip
// and the next -- the whole then played at whatever pace makes it last
// RESORT_SECONDS, however many chips move.
const RESORT_SECONDS = 1.5;
// the curves of the turns
const SHRINK_EASE = "power2.in";
const SLIDE_EASE = "power2.inOut";
const GROW_EASE = "power2.out";
const STAGGER = 0.02;
const LEAVE_SECONDS = 0.4;
const SLIDE_SECONDS = 0.6;
const GROW_SECONDS = 0.5;
// From one level to another, the chips only passing back through all come
// back blurred this much (px), so all never reads, for that moment, as the
// level just picked -- the new level's alone in focus. Softer than the
// 12px under the mobile menu and the work drawer (%pageBlur in main.scss):
// on a chip that small, 12px left no shape of the name at all.
const PASSING_BLUR = 6;
const blur = (px: number) => `blur(${px}px)`;

// A skill-level filter over a box of tech chips (SkillFilter.tsx): the chips
// are the box's children, each carrying its level in data-key.
export function useChipFilter(box: RefObject<HTMLElement | null>) {
  const { contextSafe } = useGSAP();
  // the level showing ("0" all), and a count of the switches, so a phase
  // chained to a switch since overtaken knows not to run
  const showing = useRef("0");
  const switches = useRef(0);
  // lets go of the page's scroll position, if a switch is holding it
  const releaseScroll = useRef<(() => void) | null>(null);

  const chips = () => [...(box.current?.children ?? [])] as HTMLElement[];
  const isShown = (chip: HTMLElement) => getComputedStyle(chip).display !== "none";
  const belongs = (chip: HTMLElement, level: string) =>
    level === "0" || chip.getAttribute("data-key") === level;

  // every chip put straight to where a level leaves it: anything still
  // moving is stopped, and each chip is simply shown, whole, or hidden
  const settle = (level: string) => {
    const all = chips();
    Flip.killFlipsOf(all, true);
    gsap.killTweensOf(all);
    all.forEach((chip) =>
      gsap.set(chip, {
        display: belongs(chip, level) ? "flex" : "none",
        autoAlpha: 1,
        scale: 1,
        filter: "none",
      })
    );
  };

  // The page held where it is while the chips move. Scrolled right to the
  // end, the view is at its furthest, so if the page is a fraction shorter
  // for even a frame of the re-sort, the browser pulls the view up to fit --
  // and leaves it there once the page is back to length. Each frame it has
  // slipped, it is put back. Let go once the chips are done, or the moment
  // the reader scrolls or touches the page themselves.
  const holdScroll = () => {
    releaseScroll.current?.();
    const y = window.scrollY;
    const ownMove = ["wheel", "touchstart", "keydown"];
    let frame = 0;
    const release = () => {
      cancelAnimationFrame(frame);
      ownMove.forEach((type) => window.removeEventListener(type, release));
      if (releaseScroll.current === release) releaseScroll.current = null;
    };
    const keep = () => {
      if (Math.abs(window.scrollY - y) > 0.5) window.scrollTo(0, y);
      frame = requestAnimationFrame(keep);
    };
    ownMove.forEach((type) => window.addEventListener(type, release, { passive: true }));
    frame = requestAnimationFrame(keep);
    releaseScroll.current = release;
    return release;
  };

  // Re-sort the chips to one level ("3" expert, "2" intermediate, "1"
  // beginner) or every skill ("0"), in three turns that never overlap, so no
  // chip ever lands on another: the ones leaving shrink away; once they are
  // gone, the ones staying slide to their new places (any only passing
  // through blurring as they go); once those have landed, the ones arriving
  // grow in where they belong. Each turn ripples
  // along the chips, one a moment after another. A turn left waiting by a
  // switch since made (still() false) is dropped. Each chip ends as sharp
  // as blurOf says (in focus, unless passing through).
  //
  // Deliberately animates even with reduced motion on: the chips re-sorting
  // is how the filter shows what it did, so it is kept like the dropdown's
  // slide and the hover weight change.
  const sortTo = (
    level: string,
    still: () => boolean,
    onComplete: () => void,
    blurOf: (chip: HTMLElement) => number = () => 0
  ) => {
    const all = chips();
    const leaving = all.filter((chip) => isShown(chip) && !belongs(chip, level));
    const arriving = all.filter((chip) => !isShown(chip) && belongs(chip, level));
    const staying = all.filter((chip) => isShown(chip) && belongs(chip, level));

    // the turns at their own timings, end to end, and the pace that brings
    // that to RESORT_SECONDS
    // the stayers only passing through, to blur as they slide
    const blurring = staying.filter((chip) => blurOf(chip) !== 0);

    const turn = (chipsIn: HTMLElement[], seconds: number) =>
      chipsIn.length ? seconds + STAGGER * (chipsIn.length - 1) : 0;
    const natural =
      turn(leaving, LEAVE_SECONDS) +
      turn(staying, SLIDE_SECONDS) +
      turn(arriving, GROW_SECONDS);
    const pace = natural > 0 ? natural / RESORT_SECONDS : 1;

    const growIn = () => {
      if (!still()) return;
      if (!arriving.length) return onComplete();
      gsap.to(arriving, {
        autoAlpha: 1,
        filter: (_, chip: HTMLElement) => blur(blurOf(chip)),
        scale: 1,
        duration: GROW_SECONDS / pace,
        ease: GROW_EASE,
        stagger: STAGGER / pace,
        onComplete,
      });
    };

    // the leavers out of the layout and the arrivals into it, unseen, with
    // the stayers carried from their old places to their new ones
    const slide = () => {
      if (!still()) return;
      const state = Flip.getState(staying);
      leaving.forEach((chip) => gsap.set(chip, { display: "none", autoAlpha: 1, scale: 1 }));
      arriving.forEach((chip) =>
        gsap.set(chip, { display: "flex", autoAlpha: 0, scale: 0, filter: blur(0) })
      );
      if (!staying.length) return growIn();
      // the stayers only passing through blur as they slide, over the
      // whole of the slide, so the two move as one
      if (blurring.length) {
        gsap.fromTo(
          blurring,
          { filter: blur(0) },
          {
            filter: (_, chip: HTMLElement) => blur(blurOf(chip)),
            duration: turn(staying, SLIDE_SECONDS) / pace,
            ease: SLIDE_EASE,
          }
        );
      }
      // lifted out of the row while they travel (absolute), each at its own
      // size: left in it, the row's flex-grow shared its room out on top of
      // the width flip gives them, so they flew at the wrong widths and
      // snapped to the right ones on landing
      Flip.from(state, {
        duration: SLIDE_SECONDS / pace,
        ease: SLIDE_EASE,
        stagger: STAGGER / pace,
        absolute: true,
        // (flip puts each one's inline styles back as it found them on
        // landing, so the blurred are blurred again there)
        onComplete: () => {
          blurring.forEach((chip) => gsap.set(chip, { filter: blur(blurOf(chip)) }));
          growIn();
        },
      });
    };

    if (!leaving.length) return slide();
    gsap.to(leaving, {
      autoAlpha: 0,
      scale: 0,
      duration: LEAVE_SECONDS / pace,
      ease: SHRINK_EASE,
      stagger: STAGGER / pace,
      onComplete: slide,
    });
  };

  // Show the skills at a level. From one level straight to another, every
  // skill comes back first -- the chips back in their original places, all
  // but the new level's blurred (PASSING_BLUR) --
  // and the new level is filtered from there, rather than one set swapping
  // for the other. A switch made while one is still going first puts every
  // chip where that one was headed (settle), and starts from there; a step
  // still waiting from it is dropped. Throughout, the page holds still
  // (holdScroll). onDone is called once the chips have all landed.
  const filterSkill = contextSafe((level: string, onDone?: () => void) => {
    const ticket = ++switches.current;
    const still = () => switches.current === ticket;
    const from = showing.current;
    settle(from);
    showing.current = level;
    const hold = holdScroll();
    const release = () => {
      hold();
      onDone?.();
    };

    if (from !== "0" && level !== "0" && from !== level) {
      sortTo(
        "0",
        still,
        () => sortTo(level, still, release),
        (chip) => (belongs(chip, level) ? 0 : PASSING_BLUR)
      );
    } else {
      sortTo(level, still, release);
    }
  });

  return { filterSkill };
}
