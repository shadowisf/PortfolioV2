import {
  getProjectName,
  getProjectYear,
  ProjectProps,
} from "../utils/ProjectUtils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export function ProjectTile({ dataID }: ProjectProps) {
  const animationPreviewDuration = "0.25";
  const animationEase = "power2.inOut";
  const boundaryDividend = 5;
  const animationPreviewWidth = "1000px";

  const previewContainerLocation = ".homeWrapper .right .preview";

  const animationEnter = {
    scale: "1",
    display: "block",
    autoAlpha: "1",
    duration: animationPreviewDuration,
    ease: animationEase,
  };

  const animationExit = {
    scale: "0.95",
    display: "none",
    autoAlpha: "0",
    duration: animationPreviewDuration,
    ease: animationEase,
  };

  const { contextSafe } = useGSAP();

  const togglePreview = contextSafe((targetID: number) => {
    gsap.matchMedia().add(`(min-width: ${animationPreviewWidth}`, () => {
      const previewContainer = document.querySelectorAll(
        previewContainerLocation
      );

      previewContainer.forEach((container) => {
        const dataKey = container.getAttribute("data-key");
        const image = container.getElementsByTagName("img")[0];

        // wanted
        if (dataKey === targetID.toString()) {
          gsap.to(image, animationEnter);
        }
        // unwanted
        else {
          gsap.to(image, animationExit);
        }
      });
    });
  });

  const movePreview = contextSafe(
    (targetID: number, event: React.MouseEvent) => {
      gsap.matchMedia().add(`(min-width: ${animationPreviewWidth}`, () => {
        const previewContainer = document.querySelectorAll(
          previewContainerLocation
        );

        previewContainer.forEach((container) => {
          const dataKey = container.getAttribute("data-key");
          const image = container.getElementsByTagName("img")[0];

          if (dataKey === targetID.toString()) {
            gsap.set(image, {
              xPercent:
                (event.clientX / window.innerWidth) * boundaryDividend - 1.5,
              yPercent:
                (event.clientY / window.innerHeight) * boundaryDividend - 2,
              duration: animationPreviewDuration,
              ease: animationEase,
            });
          }
        });
      });
    }
  );

  return (
    <div
      className="tile toThinHover all noCursor"
      onMouseEnter={() => togglePreview(dataID)}
      /* onMouseLeave={() => togglePreview(-1)} */
      onMouseMove={(e) => movePreview(dataID, e)}
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
