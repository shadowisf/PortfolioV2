import {
  getProjectImage,
  getProjectName,
  getProjectYear,
  ProjectProps,
} from "../utils/ProjectUtils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useState } from "react";
import { useGlobalState } from "../utils/ControlUtil";

export function ProjectTile({ dataID, onClick }: ProjectProps) {
  const { isMobile } = useGlobalState();

  const [previewContainer, setPreviewContainer] =
    useState<NodeListOf<Element> | null>(null);
  const [previewImage, setPreviewImage] = useState<NodeListOf<Element> | null>(
    null
  );

  useEffect(() => {
    const preview = document.querySelectorAll(".homeWrapper .preview");
    const image = document.querySelectorAll(".homeWrapper .preview img");

    setPreviewContainer(preview);
    setPreviewImage(image);
  }, []);

  useGSAP(() => {
    gsap.set(".homeWrapper .preview img", animationExit);
  }, []);

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
    previewContainer
      ? previewContainer.forEach((container) => {
          if (container.getAttribute("data-key") === targetID.toString()) {
            gsap.to(container.querySelector("img"), animationEnter);
          }
        })
      : null;
  });

  const resetPreview = contextSafe(() => {
    previewImage ? gsap.to(previewImage, animationExit) : null;
  });

  const movePreview = contextSafe(
    (targetID: number, event: React.MouseEvent) => {
      previewContainer &&
        previewContainer.forEach((container) => {
          if (container.getAttribute("data-key") === targetID.toString()) {
            gsap.set(container.getElementsByTagName("img"), {
              xPercent:
                (event.clientX / window.innerWidth) * boundaryDividend - 1.5,
              yPercent:
                (event.clientY / window.innerHeight) * boundaryDividend - 2,

              ease: animationEase,
              duration: animationPreviewDuration,
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
        isMobile ? togglePreview(dataID) : null;
      }}
      onMouseLeave={() => {
        isMobile ? resetPreview() : null;
      }}
      onMouseMove={(event) => {
        isMobile ? movePreview(dataID, event) : null;
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
      {getProjectImage(dataID) && (
        <img src={getProjectImage(dataID)[0]} loading="lazy" />
      )}
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
