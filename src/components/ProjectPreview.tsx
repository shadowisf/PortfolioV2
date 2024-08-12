import { ProjectProps, getProjectImage } from "../utils/ProjectUtils";

export default function ProjectPreview({ dataID }: ProjectProps) {
  return (
    <div data-key={dataID} className="preview">
      {getProjectImage(dataID)[0] && (
        <img src={getProjectImage(dataID)[0]} loading="lazy" />
      )}
    </div>
  );
}
