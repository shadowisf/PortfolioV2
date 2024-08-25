import {
  getProjectArchitecture,
  getProjectContent,
  getProjectImage,
  getProjectImageAlts,
  getProjectLinks,
  getProjectName,
  getProjectVideo,
  getProjectYear,
  ProjectProps,
} from "../utils/ProjectUtils";
import { useEffect, useState } from "react";
import { scrollingAnimation } from "../utils/AnimationUtils";
import mediumZoom from "medium-zoom";
import gsap from "gsap";
import { useGlobalState } from "../utils/ControlUtil";
import { useGSAP } from "@gsap/react";
import ArchitectureTile from "../components/ArchitectureTile";
import { Link } from "react-router-dom";

export default function Project({ dataID }: ProjectProps) {
  const [ifData5, setIfData5] = useState(false);
  const { executeTransition } = useGlobalState();
  const { scrollToTop } = scrollingAnimation();
  const { setCurrentPage } = useGlobalState();
  const title = getProjectName(dataID)?.replace(/\s+/g, "-") || "";
  const prevProject = getProjectName(dataID + 1)?.replace(/\s+/g, "-") || "";
  const nextProject = getProjectName(dataID - 1)?.replace(/\s+/g, "-") || "";
  const { contextSafe } = useGSAP();

  useEffect(() => {
    if (dataID === 5 || dataID === 6) {
      setIfData5(true);
    }

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
        <h1 className="title accent">{getProjectName(dataID)}</h1>
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

      <small className="year">{getProjectYear(dataID)}</small>

      <section className="architecture">
        {getProjectArchitecture(dataID).map((item, index) => {
          return (
            <ArchitectureTile
              architecture={item}
              key={index}
              classNameContainer="item"
              classNameIcon="icon"
              preview={false}
            />
          );
        })}
      </section>

      <section className="content">
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

        <div className="media">
          {getProjectImage(dataID).map((item, index) => (
            <img
              loading="lazy"
              key={index}
              src={item}
              alt={getProjectImageAlts(dataID)[index]}
            />
          ))}

          {getProjectVideo(dataID) && (
            <video controls muted src={getProjectVideo(dataID)} />
          )}
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
