import {
  architectureStyling,
  getProjectArchitecture,
  getProjectContent,
  getProjectImage,
  getProjectImageAlts,
  getProjectLinks,
  getProjectName,
  ProjectProps,
} from "../utils/ProjectUtils";
import { useEffect, useState } from "react";
import { scrollingAnimation } from "../utils/AnimationUtils";
import mediumZoom from "medium-zoom";
import gsap from "gsap";
import { useGlobalState } from "../utils/ControlUtil";
import { useGSAP } from "@gsap/react";
import ArchitectureTile from "../components/ArchitectureTile";

export default function Project({ dataID }: ProjectProps) {
  const [ifData5, setIfData5] = useState(false);
  const { executeTransition } = useGlobalState();
  const { scrollToTop } = scrollingAnimation();
  const { setCurrentPage } = useGlobalState();
  const title = getProjectName(dataID)?.replace(/\s+/g, "-") || "";
  const { contextSafe } = useGSAP();

  useEffect(() => {
    if (dataID === 5 || dataID === 6) {
      setIfData5(true);
    }

    setCurrentPage(title);

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

  return (
    <main className="projectWrapper">
      <section className="header">
        <h1 className="nextPrevButton" data-tooltip="previous project">
          <span>←</span>
        </h1>
        <h1 className="title accent">{getProjectName(dataID)}</h1>
        <h1 className="nextPrevButton" data-tooltip="next project">
          <span>→</span>
        </h1>
      </section>

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
      </section>

      <section className="bottomNav">
        <a onClick={() => scrollToTop(0.25)}>
          ↑ <span>scroll to top</span>
        </a>
      </section>
    </main>
  );
}
