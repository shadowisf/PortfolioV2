import { useRef } from "react";
import gsap from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { useGSAP } from "@gsap/react";
import { THEME_MORPH_SECONDS } from "../utils/themeMorph";

gsap.registerPlugin(MorphSVGPlugin);

type ThemeIconProps = {
  // the theme you are in, which is what it shows: the moon in dark, the sun
  // in light
  dark: boolean;
  size?: number;
  // where it is (the bar, the menu...): its own name in the theme change's
  // crossfade, which it is kept out of (main.scss) -- each on the page needs
  // a different one
  place: string;
};

const MORPH_SECONDS = THEME_MORPH_SECONDS;

// The sun's disc: a circle of radius 5 in the middle of the 24 box.
const SUN = "M12 7A5 5 0 1 1 12 17A5 5 0 1 1 12 7Z";

// The moon, measured off the reference crescent rather than eyeballed: two
// circles fitted to its edges (they reproduce it to 98.8% of pixels) put the
// bite at 0.845 of the moon's radius, 0.592 of the radius off centre at 35
// degrees up to the right. Here the moon's radius is 10.5 -- as far out as the
// sun's rays reach -- so the two stand the same size.
const MOON =
  "M21.688 16.049A10.5 10.5 0 1 1 11.582 1.508A8.873 8.873 0 0 0 21.688 16.049Z";

// eight short rays, between radius 8 and 10.5 around the centre
const rays = Array.from({ length: 8 }, (_, i) => {
  const angle = (i * Math.PI) / 4;
  const point = (r: number) => [12 + r * Math.cos(angle), 12 + r * Math.sin(angle)];
  const [x1, y1] = point(8);
  const [x2, y2] = point(10.5);
  return { x1, y1, x2, y2 };
});

// One shape that is either the sun's disc or the moon's crescent, morphed
// between them, with the rays turning and shrinking into the moon and back out.
// A real outline rather than a masked circle: a mask scales along with the
// shape it is on, which kept the bite far bigger than intended.
export function ThemeIcon({ dark, size = 24, place }: ThemeIconProps) {
  const root = useRef<SVGSVGElement | null>(null);
  // The page loads already drawn in the right state (the markup below), and
  // only a real change of theme animates. Comparing with what is drawn, rather
  // than counting runs, keeps react's development double-run of effects from
  // passing itself off as a toggle -- which played the morph on every load.
  const initialDark = useRef(dark).current;
  const drawnDark = useRef(dark);

  useGSAP(
    () => {
      if (drawnDark.current === dark) return;
      drawnDark.current = dark;

      const timing = { duration: MORPH_SECONDS, ease: "power2.inOut" };
      gsap.to(".themeIconDisc", {
        morphSVG: dark ? MOON : SUN,
        overwrite: true,
        ...timing,
      });
      gsap.to(".themeIconRays", {
        rotation: dark ? -45 : 0,
        scale: dark ? 0.5 : 1,
        opacity: dark ? 0 : 1,
        svgOrigin: "12 12",
        overwrite: true,
        ...timing,
      });
    },
    { dependencies: [dark], scope: root }
  );

  return (
    <svg
      ref={root}
      className={`themeIcon ${dark ? "isMoon" : "isSun"}`}
      style={{ viewTransitionName: `themeIcon-${place}` }}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path className="themeIconDisc" d={initialDark ? MOON : SUN} fill="currentColor" />

      {/* the outer group only takes the hover turn; gsap moves the inner one */}
      <g className="themeIconRaysTurn">
        <g
          className="themeIconRays"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          // the moon's starting state: turned, halved and gone, as gsap
          // leaves them after a morph to the moon
          transform={
            initialDark
              ? "translate(12 12) rotate(-45) scale(0.5) translate(-12 -12)"
              : undefined
          }
          opacity={initialDark ? 0 : 1}
        >
          {rays.map((ray, i) => (
            <line key={i} {...ray} />
          ))}
        </g>
      </g>
    </svg>
  );
}
