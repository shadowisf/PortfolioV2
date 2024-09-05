type LinkProps = {
  href?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  img?: React.ReactNode;
  className?: string;
  label?: string;
};

export function LinkWithNoIcon({
  href,
  children,
  onClick,
  className,
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

export function LinkWithIcon({
  href,
  children,
  onClick,
  img,
  className,
}: LinkProps) {
  return (
    <a
      onClick={onClick}
      href={href}
      target="_blank"
      className={`linkWithIcon ${className}`}
    >
      <picture>{img}</picture>
      <span className={className === "faded" ? "faded" : ""}>{children}</span>
    </a>
  );
}

export function LinkWithIconOnly({
  href,
  onClick,
  img,
  className,
  label,
}: LinkProps) {
  return (
    <a
      onClick={onClick}
      href={href}
      target="_blank"
      className={`linkWithIconOnly ${className}`}
    >
      <span className="label">{label}</span>
      {img}
    </a>
  );
}
