import { techStackStyling } from "../utils/GODMODE";

type TechStackTileProps = {
  techStackItem: string;
  classNameContainer: string;
  classNameIcon: string;
  dataKey?: string;
  preview: boolean;
};

export default function TechStackTile(p: TechStackTileProps) {
  const unwantedChars = /[3210*]/g;

  const cleanItem = p.techStackItem.replace(unwantedChars, "");
  const data = techStackStyling[cleanItem];

  if (!data) {
    return null;
  }

  return p.preview ? (
    <small
      className={p.classNameContainer}
      style={{ backgroundColor: data.color }}
    >
      <span className={p.classNameIcon}>{data.icon}</span>
      {cleanItem}
    </small>
  ) : (
    <span
      className={p.classNameContainer}
      style={{ backgroundColor: data.color }}
      data-key={p.dataKey}
    >
      <span className={p.classNameIcon}>{data.icon}</span>
      {cleanItem}
    </span>
  );
}
