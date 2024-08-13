import {
  getProjectArchitecture,
  getProjectContent,
  getProjectImage,
  getProjectImageAlts,
  getProjectLinks,
  getProjectName,
  getProjectYear,
  ProjectProps,
} from "../utils/ProjectUtils";
import { useEffect, useState } from "react";
import { ArrowLeft } from "./Icon";
import { pixelTransition } from "./PixelGrid";

export default function ProjectPage({ dataID }: ProjectProps) {
  const [ifData5, setIfData5] = useState(false);

  useEffect(() => {
    if (dataID === 5 || dataID === 6) {
      setIfData5(true);
    }
  }, []);

  const { startTransition } = pixelTransition();

  return (
    <main className="projectWrapper" data-key={dataID}>
      <span
        className="mobileBackButton toThinHover noCursor"
        onClick={() => startTransition(-1)}
      >
        <ArrowLeft width="24" />
        <span>back to menu</span>
      </span>
      <div className="header">
        <span className="desktopBackButton">
          <ArrowLeft onClick={() => startTransition(-1)} width="32" />
        </span>
        <h1 className="title accent">{getProjectName(dataID)}</h1>
        <span className="desktopBackButton" />
      </div>

      <div className="architecture noCursor">
        <h6 className="item">{getProjectYear(dataID)}</h6>
        {getProjectArchitecture(dataID).map((item, index) => (
          <h6 key={index} className="item">
            {item.replace("*", "")}
          </h6>
        ))}
      </div>

      <div className="content">
        <div className="paragraph">{getProjectContent(dataID)}</div>

        {ifData5 ? (
          <div>
            <b>attributions:</b>
            <br />
            <br />
            <div className="links">{getProjectLinks(dataID)}</div>
          </div>
        ) : (
          <div className="links">{getProjectLinks(dataID)}</div>
        )}

        <div className="imageContainer">
          {getProjectImage(dataID).map((item, index) => (
            <img
              loading="lazy"
              key={index}
              src={item}
              alt={getProjectImageAlts(dataID)[index]}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
