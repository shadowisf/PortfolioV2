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
import { useGlobalState } from "../utils/ControlUtil";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/all";

gsap.registerPlugin(useGSAP, gsap, ScrollToPlugin);

export default function ProjectPage({ dataID }: ProjectProps) {
  const [ifData5, setIfData5] = useState(false);
  const { startTransitionGlobal } = useGlobalState();

  useEffect(() => {
    if (dataID === 5 || dataID === 6) {
      setIfData5(true);
    }
  }, []);

  const { contextSafe } = useGSAP();

  const handleScrollToTop = contextSafe(() => {
    gsap.to(window, { scrollTo: { x: "0", y: "0" } });
  });

  return (
    <main className="projectWrapper" data-key={dataID}>
      <span
        className="mobileBackToHomeButton toThinHover noCursor"
        onClick={() => startTransitionGlobal(-1)}
      >
        ←<span>back</span>
      </span>
      <div className="header">
        <h1
          className="desktopBackToHomeButton toThinHover"
          onClick={() => startTransitionGlobal(-1)}
        >
          ←
        </h1>
        <h1 className="title accent">{getProjectName(dataID)}</h1>
        <span className="desktopBackToHomeButton" />
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

      <span
        className="backToTopButton toThinHover noCursor"
        onClick={() => handleScrollToTop()}
      >
        ↑ <span>back to top</span>
      </span>
    </main>
  );
}
