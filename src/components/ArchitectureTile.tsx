import { architectureStyling } from "../utils/ProjectUtils";

type ArchitectureTileProps = {
  architecture: string;
  classNameContainer: string;
  classNameIcon: string;
  dataKey?: string;
  preview: boolean;
};

export default function ArchitectureTile({
  architecture,
  classNameContainer,
  classNameIcon,
  dataKey,
  preview,
}: ArchitectureTileProps) {
  const unwantedChars = /[3210*]/g;

  const cleanItem = architecture.replace(unwantedChars, "");
  const data = architectureStyling[cleanItem];

  if (!data) {
    return null;
  }
  return preview ? (
    <small
      className={classNameContainer}
      style={{ backgroundColor: data.color }}
    >
      <span className={classNameIcon}>{data.icon}</span>
      {cleanItem}
    </small>
  ) : (
    <span
      className={classNameContainer}
      style={{ backgroundColor: data.color }}
      data-key={dataKey}
    >
      <span className={classNameIcon}>{data.icon}</span>
      {cleanItem}
    </span>
  );
}
