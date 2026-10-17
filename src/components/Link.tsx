type LinkProps = {
  href?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  // the emoji icons are switched off for now -- every place that had one keeps
  // it as a comment, so uncommenting it there brings it straight back
  img?: React.ReactNode;
  className?: string;
  sameTab?: boolean;
  // the word shown over it on hover (with .infoOnHover)
  "data-tooltip"?: string;
};

// a link inside a sentence
export function InlineLink({
  className,
  href,
  onClick,
  children,
  sameTab,
  ...props
}: LinkProps) {
  return (
    <a
      className={className ? `${className} inlineLink` : "inlineLink"}
      href={href}
      target={sameTab ? "_self" : "_blank"}
      onClick={onClick}
      {...props}
    >
      {children}
      {/* a hand-drawn arrow, looping up from the word to its popup */}
      {props["data-tooltip"] && (
        <svg className="hoverArrow" viewBox="0 0 28 36" aria-hidden="true">
          <path
            className="hoverArrowLine"
            pathLength={1}
            d="M9 34C4 26 6 18 14 19C22 20 22 28 15 27C8 26 10 12 16 4"
          />
          <path className="hoverArrowHead" pathLength={1} d="M10.3 5.9L16 4L15.8 10" />
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
        {p.children}
        {p.href && (
          <span className="arrow" aria-hidden="true">
            ↗
          </span>
        )}
      </span>
    </a>
  );
}
