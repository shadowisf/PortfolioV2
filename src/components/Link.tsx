type LinkProps = {
  href?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  img?: React.ReactNode;
  className?: string;
};

export function LinkNoIcon({ href, children, onClick, className }: LinkProps) {
  return (
    <a className={`${className}`} href={href} target="_blank" onClick={onClick}>
      {children}
    </a>
  );
}

export function LinkWithIcon({ href, children, onClick, img }: LinkProps) {
  return (
    <a onClick={onClick} href={href} target="_blank" className=" linkWithIcon">
      <picture>{img}</picture>
      <span>{children}</span>
    </a>
  );
}

export function LinkWithIconOnly({ href, onClick, img }: LinkProps) {
  return (
    <a
      onClick={onClick}
      href={href}
      target="_blank"
      className="linkWithIconOnly"
    >
      <picture>{img}</picture>
    </a>
  );
}
