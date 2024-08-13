import {
  getProjectImage,
  getProjectName,
  getProjectYear,
  ProjectProps,
} from "../utils/ProjectUtils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Fragment, useEffect, useState } from "react";
import { useGlobalState } from "../utils/ControlUtil";
import { createPortal } from "react-dom";

export function ProjectTile({ dataID, onClick }: ProjectProps) {
  const { isMobile } = useGlobalState();

  const [rightDiv, setRightDiv] = useState<Element | null>(null);
  const [previewContainer, setPreviewContainer] =
    useState<NodeListOf<Element> | null>(null);
  const [previewImages, setPreviewImages] =
    useState<NodeListOf<Element> | null>(null);

  useEffect(() => {
    setRightDiv(document.querySelector(rightDivTarget));

    requestAnimationFrame(() => {
      setPreviewContainer(document.querySelectorAll(previewContainerTarget));
      setPreviewImages(document.querySelectorAll(previewImagesTarget));
    });

    return () => {
      setRightDiv(null);
      setPreviewContainer(null);
      setPreviewImages(null);
    };
  }, []);

  useEffect(() => {
    if (isMobile) {
      resetPreview();
    }
  }, [isMobile]);

  useGSAP(() => {
    requestAnimationFrame(() => {
      gsap.set(previewImagesTarget, animationExit);
    });
  });

  const previewContainerTarget = ".homeWrapper .right .preview";
  const previewImagesTarget = ".homeWrapper .right .preview img";
  const rightDivTarget = ".homeWrapper .right";

  const animationPreviewDuration = "0.25";
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
      const image = container.getElementsByTagName("img");

      if (dataKey === targetID.toString()) {
        gsap.to(image, animationEnter);
      }
    });
  });

  const resetPreview = contextSafe(() => {
    gsap.to(previewImages, animationExit);
  });

  const movePreview = contextSafe(
    (targetID: number, event: React.MouseEvent) => {
      previewContainer?.forEach((container) => {
        const dataKey = container.getAttribute("data-key");
        const image = container.getElementsByTagName("img");

        if (dataKey === targetID.toString()) {
          gsap.set(image, {
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
    <Fragment>
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

      {rightDiv && createPortal(<ProjectPreview dataID={dataID} />, rightDiv)}
    </Fragment>
  );
}

export function ProjectPreview({ dataID }: ProjectProps) {
  return (
    <div data-key={dataID} className="preview">
      <img src={getProjectImage(dataID)[0]} />
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
