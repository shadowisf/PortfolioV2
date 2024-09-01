type LinkProps = {
  href?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  img?: React.ReactNode;
  className?: string;
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
  ...props
}: LinkProps) {
  return (
    <a
      onClick={onClick}
      href={href}
      target="_blank"
      className={`linkWithIcon ${className}`}
    >
      <picture>{img}</picture>
      <span>{children}</span>
    </a>
  );
}

export function LinkWithIconOnly({ href, onClick, img, className }: LinkProps) {
  return (
    <a
      onClick={onClick}
      href={href}
      target="_blank"
      className={`linkWithIconOnly ${className}`}
    >
      <picture>{img}</picture>
    </a>
  );
}
