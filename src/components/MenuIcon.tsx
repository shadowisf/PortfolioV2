import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

// The mobile bar's menu button: the hamburger, which turns into the cross
// while the menu is open, and back. Both are react-icons' own -- RiMenu4Line's
// three bars, and RiCloseLargeFill's cross, drawn again as the same two bars
// (corner for corner) with a third shrunk to a point at the middle -- so each
// is three four-cornered shapes, and every corner has one to go to: the top
// bar swings to one arm of the cross, the bottom to the other, and the middle
// draws in to nothing.
const MENU =
  "M19 4L19 6L8 6L8 4Z" + // top bar
  "M21 11L21 13L3 13L3 11Z" + // middle bar
  "M16 18L16 20L5 20L5 18Z"; // bottom bar
const CROSS =
  "M21.207 19.793L19.793 21.207L2.793 4.207L4.207 2.793Z" + // top-left to bottom-right
  "M12.01 11.99L12.01 12.01L11.99 12.01L11.99 11.99Z" + // the point at the middle
  "M19.793 2.793L21.207 4.207L4.207 21.207L2.793 19.793Z"; // top-right to bottom-left

export function MenuIcon({
  open,
  seconds = 0.4,
  size = 24,
}: {
  open: boolean;
  // how long the turn takes: the menu's own slide, given
  seconds?: number;
  size?: number;
}) {
  const path = useRef<SVGPathElement | null>(null);
  // what is drawn, so the first render (and a repeat of the same state)
  // simply shows it rather than animating to it
  const drawn = useRef(open);
  // the shape as first drawn, left alone by react after that -- were the d
  // attribute to follow the prop, it would jump to the new shape before the
  // tween could carry it there
  const [initial] = useState(open ? CROSS : MENU);

  useEffect(() => {
    if (!path.current || drawn.current === open) return;
    drawn.current = open;
    // the two shapes share every command, so their numbers tween across
    gsap.to(path.current, {
      attr: { d: open ? CROSS : MENU },
      duration: seconds,
      ease: "power2.inOut",
      overwrite: true,
    });
  }, [open, seconds]);

  return (
    <svg
      className="menuIcon"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path ref={path} d={initial} />
    </svg>
  );
}
