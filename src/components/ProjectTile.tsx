import {
  getProjectName,
  getProjectYear,
  ProjectProps,
} from "../utils/ProjectUtils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { isMobile } from "../utils/ControlUtil";
import { effect } from "@preact/signals-react";

export function ProjectTile({ dataID }: ProjectProps) {
  useGSAP(() => {
    gsap.set(previewImageLocation, {
      autoAlpha: "0",
      scale: "0.95",
    });
  });

  effect(() => {
    if (isMobile.value) {
      resetPreview();
    }
  });

  const animationPreviewDuration = "0.01";
  const animationEase = "power2.inOut";

  const previewContainerLocation = ".homeWrapper .right .preview";
  const previewImageLocation = previewContainerLocation + " img";

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
    const previewContainer = document.querySelectorAll(
      previewContainerLocation
    );

    previewContainer.forEach((container) => {
      const dataKey = container.getAttribute("data-key");
      const image = container.getElementsByTagName("img")[0];

      if (dataKey === targetID.toString()) {
        gsap.to(image, animationEnter);
      }
    });
  });

  const resetPreview = contextSafe(() => {
    gsap.to(previewImageLocation, animationExit);
  });

  return (
    <div
      className="tile toThinHover all noCursor"
      onMouseEnter={() => {
        isMobile.value ? null : togglePreview(dataID);
      }}
      onMouseLeave={() => {
        isMobile.value ? null : resetPreview();
      }}
    >
      <h5 className="title">{getProjectName(dataID)}</h5>
      <small className="year faded">{getProjectYear(dataID)}</small>
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
