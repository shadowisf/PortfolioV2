import { techStackStyling } from "../utils/techStackStyling";

type TechStackTileProps = {
  techStackItem: string;
  classNameContainer: string;
  classNameIcon: string;
  dataKey?: string;
  preview: boolean;
};

export default function TechStackTile(p: TechStackTileProps) {
  const cleanItem = p.techStackItem.replace(/^[*0123]+/, "");
  const data = techStackStyling[cleanItem];

  if (!data) {
    return null;
  }

  return p.preview ? (
    <small
      className={p.classNameContainer}
      style={{ backgroundColor: data.color }}
    >
      <span className={p.classNameIcon}>
        <data.icon />
      </span>
      {cleanItem}
    </small>
  ) : (
    <small
      className={p.classNameContainer}
      style={{ backgroundColor: data.color }}
      data-key={p.dataKey}
    >
      <span className={p.classNameIcon}>
        <data.icon />
      </span>
      {cleanItem}
    </small>
  );
}
