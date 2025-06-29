type LinkProps = {
  href?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  img?: React.ReactNode;
  className?: string;
  label?: string;
  sameTab?: boolean;
};

export function LinkWithNoIcon({
  className,
  href,
  onClick,
  children,
  sameTab,
  ...props
}: LinkProps) {
  return (
    <a
      className={`${className} linkWithNoIcon`}
      href={href}
      target={sameTab ? "_self" : "_blank"}
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
      {p.img}
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
