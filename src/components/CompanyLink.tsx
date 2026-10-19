import { InlineLink } from "./Link";

// The companies named across the site: where each one's link goes, and the
// word about it shown on hover -- one set of words, wherever it is named.
const COMPANIES = {
  furchild: {
    href: "https://furchildpets.com/",
    about: "an award-winning raw pet nutrition company",
  },
  rayfitout: {
    href: "https://www.rayfitout.com",
    about: "an award-winning design & build company",
  },
  "let there be fragrance": {
    href: "https://www.facebook.com/profile.php?id=61578562979907",
    about: "a unique & niche fragrance house company",
  },
  "whealthy vessel": {
    href: "https://www.facebook.com/p/Whealthy-Vessel-100084203772894/",
    about: "a premium & high-quality cookware company",
  },
};

// a company, linked wherever it is named, with its word on hover (wherever
// there is a cursor to hover with: InlineLink)
export function CompanyLink({ name }: { name: keyof typeof COMPANIES }) {
  const { href, about } = COMPANIES[name];
  return (
    <InlineLink className="infoOnHover top" data-tooltip={about} href={href}>
      {name}
    </InlineLink>
  );
}
