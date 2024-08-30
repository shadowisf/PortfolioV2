import {
  getProjectTechStack,
  getProjectCoreConcept,
  getProjectDescription,
  getProjectImage,
  getProjectImageAlts,
  getProjectLinks,
  getProjectMyRole,
  getProjectName,
  getProjectVideo,
  getProjectYear,
  ProjectProps,
} from "../utils/ProjectUtils";
import { useEffect } from "react";
import { scrollingAnimation } from "../utils/AnimationUtils";
import mediumZoom from "medium-zoom";
import gsap from "gsap";
import { useGlobalState } from "../utils/ControlUtil";
import { useGSAP } from "@gsap/react";
import TechStackTile from "../components/TechStackTile";
import { Link } from "react-router-dom";

export default function Project({ dataID }: ProjectProps) {
  const { executeTransition } = useGlobalState();
  const { scrollToTop } = scrollingAnimation();
  const { setCurrentPage } = useGlobalState();
  const { contextSafe } = useGSAP();

  const title = getProjectName(dataID)?.replace(/\s+/g, "-") || "";
  const prevProject = getProjectName(dataID + 1)?.replace(/\s+/g, "-") || "";
  const nextProject = getProjectName(dataID - 1)?.replace(/\s+/g, "-") || "";

  useEffect(() => {
    const zoom = mediumZoom("img", {
      background: "var(--background-color)",
    });

    zoom.on(
      "open",
      contextSafe(() => {
        gsap.set("nav", { zIndex: "0" });
      })
    );

    zoom.on(
      "close",
      contextSafe(() => {
        gsap.set("nav", { zIndex: "1" });
      })
    );

    return () => {
      zoom.detach();
    };
  }, []);

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

        {/* links */}
        <div className="links">{getProjectLinks(dataID)}</div>

        {/* images/videos */}
        <div className="media">
          {getProjectImage(dataID).map((item, index) => (
            <img
              loading="lazy"
              key={index}
              src={item}
              alt={getProjectImageAlts(dataID)[index]}
            />
          ))}

          <video controls muted src={getProjectVideo(dataID)} />
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
