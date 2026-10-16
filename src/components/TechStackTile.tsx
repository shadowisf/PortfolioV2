import { knownTech } from "../utils/knownTech";
// import { techStackStyling } from "../utils/techStackStyling";

type TechStackTileProps = {
  techStackItem: string;
  classNameContainer: string;
  dataKey?: string;
};

// Just the name, on a quiet surface -- no logo, in keeping with the rest of
// the site having no icons.
export default function TechStackTile(p: TechStackTileProps) {
  const cleanItem = p.techStackItem.replace(/^[*0123]+/, "");

  if (!knownTech.has(cleanItem)) {
    return null;
  }

  // switched off for now: each chip's brand icon and colour, kept in
  // techStackStyling. To bring them back, uncomment the import above and these
  // lines, add style={{ backgroundColor: data.color }} to the <small>, and give
  // the chip its icon span again.
  // const data = techStackStyling[cleanItem];

  return (
    <small className={p.classNameContainer} data-key={p.dataKey}>
      {/* <span className="icon"><data.icon /></span> */}
      {cleanItem}
    </small>
  );
}
