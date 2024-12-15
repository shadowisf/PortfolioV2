import { homeAnimation } from "../utils/AnimationUtils";
import { Key, useEffect, useState } from "react";
import { useGlobalState } from "../utils/ControlUtil";
import TechStackTile from "./TechStackTile";
import { Link } from "react-router-dom";
import { projectData } from "../utils/GODMODE";

type ProjectProps = {
  dataID: number;
  onClick?: () => void;
};

export function ProjectTile(p: ProjectProps) {
  const { isMobile, executeTransition } = useGlobalState();
  const { togglePreview, resetPreview, movePreview } = homeAnimation();
  const [isHighlighted, setIsHighlighted] = useState(false);
  const project = projectData[p.dataID];
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
        isMobile ? null : togglePreview(p.dataID);
        setIsHighlighted(true);
      }}
      onMouseLeave={() => {
        isMobile ? null : resetPreview();
        setIsHighlighted(false);
      }}
      onMouseMove={(event) => {
        isMobile ? null : movePreview(p.dataID, event);
      }}
    >
      <h5 className="title">{project.name}</h5>
      <small className="year">{project.year}</small>
    </Link>
  );
}

export function ProjectPreview({ dataID }: ProjectProps) {
  const project = projectData[dataID];

  return (
    <div data-key={dataID} className="preview">
      {dataID === 6 ? (
        <h1 style={{ textAlign: "center" }}>
          you are currently <br /> viewing portfolio v2
        </h1>
      ) : (
        <video loop muted src={project.video} />
      )}

      <span className="techStack">
        {project.techStack
          .filter((item: string) => item.startsWith("*"))
          .map((item: string, index: Key | null | undefined) => {
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
