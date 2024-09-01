import { getProjectData, ProjectProps } from "../utils/ProjectUtils";
import { homeAnimation } from "../utils/AnimationUtils";
import { useEffect } from "react";
import { useGlobalState } from "../utils/ControlUtil";
import TechStackTile from "./TechStackTile";
import { Link } from "react-router-dom";

export function ProjectTile({ dataID }: ProjectProps) {
  const { isMobile, currentPage, executeTransition } = useGlobalState();
  const { togglePreview, resetPreview, movePreview } = homeAnimation();

  const project = getProjectData(dataID);

  const title = project.name.replace(/\s+/g, "-") || "";

  useEffect(() => {
    if (isMobile) {
      resetPreview();
    }
  }, [isMobile, currentPage]);

  return (
    <Link
      to={`${title}`}
      onClick={(e) => executeTransition(e, title, false)}
      className="tile hover all"
      onMouseEnter={() => {
        isMobile ? null : togglePreview(dataID);
      }}
      onMouseLeave={() => {
        isMobile ? null : resetPreview();
      }}
      onMouseMove={(event) => {
        isMobile ? null : movePreview(dataID, event);
      }}
    >
      <h5 className="title">{project.name}</h5>
      <small className="year faded">{project.year}</small>
    </Link>
  );
}

export function ProjectPreview({ dataID }: ProjectProps) {
  const project = getProjectData(dataID);

  return (
    <div data-key={dataID} className="preview">
      {project.video ? (
        <video loop muted src={project.video} />
      ) : (
        <img src={project.image} />
      )}
      <span className="techStack">
        {project.techStack
          .filter((item) => item.startsWith("*"))
          .map((item, index) => {
            return (
              <TechStackTile
                techStackItem={item}
                key={index}
                classNameContainer="item"
                classNameIcon="icon"
                preview={true}
              />
            );
          })}
      </span>
    </div>
  );
}

export function ProjectTilePlaceholder() {
  return (
    <div className="tile">
      <h5 className="title">????</h5>
      <small className="faded">????</small>
    </div>
  );
}
