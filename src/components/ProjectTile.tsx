import {
  getProjectArchitecture,
  getProjectImage,
  getProjectName,
  getProjectYear,
  ProjectProps,
} from "../utils/ProjectUtils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useState } from "react";
import { useGlobalState } from "../utils/ControlUtil";

gsap.registerPlugin(gsap, useGSAP);

export function ProjectTile({ dataID, onClick }: ProjectProps) {
  const { isMobile } = useGlobalState();

  const [previewContainer, setPreviewContainer] =
    useState<NodeListOf<Element> | null>(null);

  useEffect(() => {
    setPreviewContainer(document.querySelectorAll(".homeWrapper .preview"));

    return () => {
      setPreviewContainer(null);
    };
  }, []);

  useEffect(() => {
    if (isMobile) {
      resetPreview();
    }
  }, [isMobile]);

  const animationPreviewDuration = "0.1";
  const animationEase = "power2.inOut";
  const boundaryDividend = 10;

  const animationEnter = {
    scale: "1",
    autoAlpha: "1",
    duration: animationPreviewDuration,
    ease: animationEase,
  };

  const animationExit = {
    scale: "0.95",
    autoAlpha: "0",
    duration: animationPreviewDuration,
    ease: animationEase,
  };

  const { contextSafe } = useGSAP();

  const togglePreview = contextSafe((targetID: number) => {
    previewContainer?.forEach((container) => {
      const dataKey = container.getAttribute("data-key");

      if (dataKey === targetID.toString()) {
        gsap.to(container, animationEnter);
        gsap.to(".homeWrapper .hero", animationExit);
      }
    });
  });

  const resetPreview = contextSafe(() => {
    previewContainer?.forEach((container) => {
      gsap.to(container, animationExit);
    });
    gsap.to(".homeWrapper .hero", animationEnter);
  });

  const movePreview = contextSafe(
    (targetID: number, event: React.MouseEvent) => {
      previewContainer?.forEach((container) => {
        const dataKey = container.getAttribute("data-key");

        if (dataKey === targetID.toString()) {
          gsap.set(container, {
            xPercent:
              (event.clientX / window.innerWidth) * boundaryDividend - 1.5,
            yPercent:
              (event.clientY / window.innerHeight) * boundaryDividend - 2,
          });
        }
      });
    }
  );

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
