import { getProjectData, ProjectProps } from "../utils/ProjectUtils";
import { homeAnimation } from "../utils/AnimationUtils";
import { useEffect, useState } from "react";
import { useGlobalState } from "../utils/ControlUtil";
import TechStackTile from "./TechStackTile";
import { Link } from "react-router-dom";

export function ProjectTile({ dataID }: ProjectProps) {
  const { isMobile, executeTransition } = useGlobalState();
  const { togglePreview, resetPreview, movePreview } = homeAnimation();
  const [isHighlighted, setIsHighlighted] = useState(false);
  const project = getProjectData(dataID);
  const title = project.name.replace(/\s+/g, "-") || "";

  useEffect(() => {
    isMobile && isHighlighted ? resetPreview() : "";
  }, [isMobile]);

  return (
    <Link
      to={`${title}`}
      onClick={(e) => executeTransition(e, title, false)}
      className="tile hover all"
      onMouseEnter={() => {
        isMobile ? null : togglePreview(dataID);
        setIsHighlighted(true);
      }}
      onMouseLeave={() => {
        isMobile ? null : resetPreview();
        setIsHighlighted(false);
      }}
      onMouseMove={(event) => {
        isMobile ? null : movePreview(dataID, event);
      }}
    >
      <h5 className="title">{project.name}</h5>
      <small className="year">{project.year}</small>
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
      <small>???</small>
    </div>
  );
}
