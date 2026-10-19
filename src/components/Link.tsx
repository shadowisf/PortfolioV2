import { useHasCursor } from "../utils/hasCursor";

type LinkProps = {
  href?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  // the emoji icons are switched off for now -- every place that had one keeps
  // it as a comment, so uncommenting it there brings it straight back
  img?: React.ReactNode;
  className?: string;
  sameTab?: boolean;
  // the word shown over it on hover (with .infoOnHover), wherever there is
  // a cursor to hover with -- a phone's finger gets none
  "data-tooltip"?: string;
};

// the popup's arrow: a looped line, and its head
const ARROW_LINE = "M9 34C4 26 6 18 14 19C22 20 22 28 15 27C8 26 10 12 16 4";
const ARROW_HEAD = "M10.3 5.9L16 4L15.8 10";

// the room a popup keeps from the screen's sides
const POPUP_GUTTER = 16;

// How far a link's popup must move to stay on the screen, set as it is
// hovered: where it sits -- centred over the word, a .top one 1.5rem to the
// right -- against the screen's width, read off the popup itself.
function keepPopupOnScreen(link: HTMLElement) {
  link.style.removeProperty("--popupShift");
  const width = parseFloat(getComputedStyle(link, "::before").width);
  if (!width) return;
  const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
  const box = link.getBoundingClientRect();
  const centre = box.left + box.width / 2 + (link.classList.contains("top") ? 1.5 * rem : 0);
  const left = centre - width / 2;
  const right = centre + width / 2;
  const screen = document.documentElement.clientWidth;
  let shift = 0;
  if (left < POPUP_GUTTER) shift = POPUP_GUTTER - left;
  else if (right > screen - POPUP_GUTTER) shift = screen - POPUP_GUTTER - right;
  if (shift) link.style.setProperty("--popupShift", `${shift}px`);
}

// a link inside a sentence
export function InlineLink({
  className,
  href,
  onClick,
  children,
  sameTab,
  "data-tooltip": about,
  ...props
}: LinkProps) {
  const tooltip = useHasCursor() && about ? about : undefined;
  return (
    <a
      className={className ? `${className} inlineLink` : "inlineLink"}
      href={href}
      target={sameTab ? "_self" : "_blank"}
      onClick={onClick}
      data-tooltip={tooltip}
      onPointerEnter={tooltip ? (e) => keepPopupOnScreen(e.currentTarget) : undefined}
      {...props}
    >
      {/* the words, carrying the solid underline a hover fades in (main.scss) */}
      <span className="inlineLinkText">{children}</span>
      {/* a hand-drawn arrow, looping up from the word to its popup */}
      {tooltip && (
        <svg className="hoverArrow" viewBox="0 0 28 36" aria-hidden="true">
          {/* its edge, under the arrow itself (main.scss) */}
          <path className="hoverArrowLine hoverArrowEdge" pathLength={1} d={ARROW_LINE} />
          <path className="hoverArrowHead hoverArrowEdge" pathLength={1} d={ARROW_HEAD} />
          <path className="hoverArrowLine" pathLength={1} d={ARROW_LINE} />
          <path className="hoverArrowHead" pathLength={1} d={ARROW_HEAD} />
        </svg>
      )}
    </a>
  );
}

// A link standing on its own: resume, email, live website, source code. One
// that leaves the site says so with an arrow -- a character, not an icon.
export function ActionLink(p: LinkProps) {
  return (
    <a
      onClick={p.onClick}
      href={p.href}
      target="_blank"
      className={p.className ? `actionLink ${p.className}` : "actionLink"}
    >
      {p.img}
      {/* the arrow sits inside the label, so one underline runs under both */}
      <span className={p.className === "faded" ? "label faded" : "label"}>
        {/* carrying the solid underline a hover fades in (main.scss) */}
        <span className="labelLine">
          {/* the space before the arrow joined to the words, so one dashed
              underline runs from them under it */}
          {p.href && typeof p.children === "string" ? `${p.children}\u00a0` : p.children}
          {p.href && (
            <span className="arrow" aria-hidden="true">
              ↗
            </span>
          )}
        </span>
      </span>
    </a>
  );
}
