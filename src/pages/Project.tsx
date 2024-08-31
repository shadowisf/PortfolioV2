import {
  getProjectTechStack,
  getProjectCoreConcept,
  getProjectDescription,
  getProjectImage,
  getProjectLinks,
  getProjectMyRole,
  getProjectName,
  getProjectYear,
  ProjectProps,
  getProjectImageFlex,
  getProjectVideo,
  getProjectVideoFlex,
} from "../utils/ProjectUtils";
import { useEffect } from "react";
import { scrollingAnimation } from "../utils/AnimationUtils";
import { useGlobalState } from "../utils/ControlUtil";
import TechStackTile from "../components/TechStackTile";
import { Link } from "react-router-dom";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

export default function Project({ dataID }: ProjectProps) {
  const { executeTransition } = useGlobalState();
  const { scrollToTop } = scrollingAnimation();
  const { setCurrentPage } = useGlobalState();

  const title = getProjectName(dataID)?.replace(/\s+/g, "-") || "";
  const prevProject = getProjectName(dataID + 1)?.replace(/\s+/g, "-") || "";
  const nextProject = getProjectName(dataID - 1)?.replace(/\s+/g, "-") || "";

  useEffect(() => {
    setCurrentPage(title);
    scrollToTop(0);
  }, [title]);

  return (
    <main className="projectWrapper">
      <section className="header">
        {/* previouse project */}
        <Link
          to={`/${prevProject}`}
          className="nextPrevButton"
          data-tooltip="previous project"
          onClick={(e) => executeTransition(e, prevProject, false)}
          style={
            prevProject === "" ? { opacity: "0.25", pointerEvents: "none" } : {}
          }
        >
          ←
        </Link>

        {/* title */}
        <h1 className="title accent">{getProjectName(dataID)}</h1>

        {/* next project */}
        <Link
          to={`/${nextProject}`}
          className="nextPrevButton"
          data-tooltip="next project"
          onClick={(e) => executeTransition(e, nextProject, false)}
          style={
            nextProject === "" ? { opacity: "0.25", pointerEvents: "none" } : {}
          }
        >
          →
        </Link>
      </section>

      {/* year */}
      <small className="year">{getProjectYear(dataID)}</small>

      {/* tech stack */}
      <section className="techStack">
        {getProjectTechStack(dataID).map((item, index) => {
          return (
            <TechStackTile
              techStackItem={item}
              key={index}
              classNameContainer="item"
              classNameIcon="icon"
              preview={false}
            />
          );
        })}
      </section>

      <section className="content">
        {/* images & videos */}
        <div className="media">
          <div style={{ flex: getProjectImageFlex(dataID) }}>
            <Zoom zoomMargin={50}>
              <img loading="lazy" src={getProjectImage(dataID)} />
            </Zoom>
          </div>

          <div style={{ flex: getProjectVideoFlex(dataID) }}>
            <video controls muted src={getProjectVideo(dataID)}></video>
          </div>
        </div>

        {/* links */}
        <div className="links">{getProjectLinks(dataID)}</div>

        {/* content */}
        <div className="paragraph">
          <h5>description:</h5>
          <p>{getProjectDescription(dataID)}</p>

          <br />

          <h5>core concept:</h5>
          <p>{getProjectCoreConcept(dataID)}</p>

          <br />

          <h5>my role:</h5>
          <p>{getProjectMyRole(dataID)}</p>
        </div>
      </section>

      <section className="bottomNav">
        <h1 onClick={() => scrollToTop(0.25)} data-tooltip="scroll to top">
          ↑
        </h1>
      </section>
    </main>
  );
}
