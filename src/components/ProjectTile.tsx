import {
  getProjectArchitecture,
  getProjectImage,
  getProjectName,
  getProjectYear,
  ProjectProps,
} from "../utils/ProjectUtils";
import { projectTileAnimation } from "../utils/AnimationUtils";
import { useEffect, useState } from "react";
import { useGlobalState } from "../utils/ControlUtil";

export function ProjectTile({ dataID, onClick }: ProjectProps) {
  const { isMobile } = useGlobalState();
  const [previewContainer, setPreviewContainer] =
    useState<NodeListOf<Element> | null>(null);
  const { togglePreview, resetPreview, movePreview } =
    projectTileAnimation(previewContainer);

  useEffect(() => {
    if (isMobile) {
      resetPreview();
    }

    return () => {
      resetPreview();
    };
  }, [isMobile]);

  useEffect(() => {
    setPreviewContainer(document.querySelectorAll(".homeWrapper .preview"));

    return () => {
      setPreviewContainer(null);
    };
  }, []);

  return (
    <div
      onClick={onClick}
      className="tile toThinHover all noCursor"
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
      <h5 className="title">{getProjectName(dataID)}</h5>
      <small className="year faded">{getProjectYear(dataID)}</small>
    </div>
  );
}

export function ProjectPreview({ dataID }: ProjectProps) {
  return (
    <div data-key={dataID} className="preview">
      <img loading="lazy" src={getProjectImage(dataID)[0]} />
      <span className="architecture">
        {getProjectArchitecture(dataID)
          .filter((item) => item.startsWith("*"))
          .map((item, index) => (
            <small key={index} className="item">
              {item.replace("*", "")}
            </small>
          ))}
      </span>
    </div>
  );
}

export function ProjectTilePlaceholder() {
  return (
    <div className="tile toThinHover noCursor">
      <h5 className="title">????</h5>
      <small className="faded">????</small>
    </div>
  );
}
