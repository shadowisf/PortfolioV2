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
import { scrollingAnimation } from "../utils/AnimationUtils";
import mediumZoom from "medium-zoom";
import gsap from "gsap";
import { useGlobalState } from "../utils/ControlUtil";
import { useGSAP } from "@gsap/react";

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
      <span
        className="mobileBackToHomeButton"
        onClick={() => executeTransition("/", false)}
      >
        ←<span>back</span>
      </span>
      <div className="header">
        <h1
          className="desktopBackToHomeButton"
          onClick={() => executeTransition("/", false)}
        >
          ←
        </h1>
        <h1 className="title accent">{getProjectName(dataID)}</h1>
        <span className="desktopBackToHomeButton" />
      </div>

      <div className="architecture">
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

      <span className="backToTopButton" onClick={() => scrollToTop()}>
        ↑ <span>back to top</span>
      </span>
    </main>
  );
}
