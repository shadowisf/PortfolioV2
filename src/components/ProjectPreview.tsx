import { ProjectProps, getProjectImage } from "../utils/ProjectUtils";

export default function ProjectPreview({ dataID }: ProjectProps) {
  return (
    <div data-key={dataID} className="preview">
      {getProjectImage(dataID) && (
        <img src={getProjectImage(dataID)[0]} loading="lazy" />
      )}
    </div>
  );
}
