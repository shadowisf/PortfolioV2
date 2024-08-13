type LinkProps = {
  href?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  img?: React.ReactNode;
  className?: string;
};

export function LinkNoIcon({ href, children, onClick, className }: LinkProps) {
  return (
    <a
      className={`toThinHover ${className}`}
      href={href}
      target="_blank"
      onClick={onClick}
    >
      {children}
    </a>
  );
}

export function LinkWithIcon({ href, children, onClick, img }: LinkProps) {
  return (
    <span onClick={onClick} className=" linkWithIcon toThinHover noCursor">
      <picture>{img}</picture>
      <a href={href} target="_blank">
        {children}
      </a>
    </span>
  );
}
