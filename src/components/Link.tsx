type LinkProps = {
  href?: string;
  children?: React.ReactNode;
  onClick?: () => void;
};

export function LinkNoIcon({ href, children, onClick }: LinkProps) {
  return (
    <a className="toThinHover" href={href} target="_blank" onClick={onClick}>
      {children}
    </a>
  );
}
