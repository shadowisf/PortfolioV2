import { InlineLink } from "./Link";
import { useGlobalState } from "../providers/GlobalStateProvider";

// The companies named on the project pages: where each one's link goes, and
// the word about it shown on hover -- the same words the about page uses.
const COMPANIES = {
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

// a company, linked wherever it is named, with its word on hover (none on
// mobile, where there is no hover to show it)
export function CompanyLink({ name }: { name: keyof typeof COMPANIES }) {
  const { isMobile } = useGlobalState();
  const { href, about } = COMPANIES[name];
  return (
    <InlineLink
      className="infoOnHover top"
      data-tooltip={isMobile ? "" : about}
      href={href}
    >
      {name}
    </InlineLink>
  );
}
