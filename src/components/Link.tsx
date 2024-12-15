type LinkProps = {
  href?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  img?: React.ReactNode;
  className?: string;
  label?: string;
};

export function LinkWithNoIcon({
  className,
  href,
  onClick,
  children,
  ...props
}: LinkProps) {
  return (
    <a
      className={`${className} linkWithNoIcon`}
      href={href}
      target="_blank"
      onClick={onClick}
      {...props}
    >
      {children}
    </a>
  );
}

export function LinkWithIcon(p: LinkProps) {
  return (
    <a
      onClick={p.onClick}
      href={p.href}
      target="_blank"
      className={`linkWithIcon ${p.className}`}
    >
      <picture>{p.img}</picture>
      <span className={p.className === "faded" ? "faded" : ""}>
        {p.children}
      </span>
    </a>
  );
}

export function LinkWithIconOnly(p: LinkProps) {
  return (
    <a
      onClick={p.onClick}
      href={p.href}
      target="_blank"
      className={`linkWithIconOnly ${p.className}`}
    >
      <span className="label">{p.label}</span>
      {p.img}
    </a>
  );
}
