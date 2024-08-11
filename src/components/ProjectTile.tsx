import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { projectData } from "../pages/Index";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export function getName(dataID: number) {
  return projectData[dataID].name;
}

export function getYear(dataID: number) {
  return projectData[dataID].year;
}

export function getPicture(dataID: number) {
  return projectData[dataID].picture;
}

type ProjectTileProps = {
  dataID: number;
};

export function ProjectTile({ dataID }: ProjectTileProps) {
  useEffect(() => {
    setPersonalDiv(document.querySelector(".homeWrapper .right"));
  }, []);

  const [personalDiv, setPersonalDiv] = useState<Element | null>(null);

  const animationPictureDuration = "0.1";
  const animationEase = "power2.inOut";
  const boundaryDividend = 5;
  const animationPictureWidth = "1000px";

  const animationEnter = {
    scale: "1",
    display: "block",
    autoAlpha: "1",
    duration: animationPictureDuration,
    ease: animationEase,
  };

  const animationExit = {
    scale: "0.95",
    display: "none",
    autoAlpha: "0",
    duration: animationPictureDuration,
    ease: animationEase,
  };

  const { contextSafe } = useGSAP();

  const togglePicture = contextSafe((targetID: number) => {
    gsap.matchMedia().add(`(min-width: ${animationPictureWidth}`, () => {
      const imageContainer = document.querySelectorAll(".picture");

      imageContainer.forEach((container) => {
        const dataKey = container.getAttribute("data-key");
        const image = container.getElementsByTagName("img");

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

  const movePicture = contextSafe(
    (targetID: number, event: React.MouseEvent) => {
      gsap.matchMedia().add(`(min-width: ${animationPictureWidth}`, () => {
        const imageContainer = document.querySelectorAll(".picture");

        imageContainer.forEach((container) => {
          const dataKey = container.getAttribute("data-key");
          const image = container.getElementsByTagName("img")[0];

          if (dataKey === targetID.toString()) {
            gsap.set(image, {
              xPercent:
                (event.clientX / window.innerWidth) * boundaryDividend - 1.5,
              yPercent:
                (event.clientY / window.innerHeight) * boundaryDividend - 2,
              duration: animationPictureDuration,
              ease: animationEase,
            });
          }
        });
      });
    }
  );

  return (
    <>
      <div
        className="tile toThinHover all noCursor"
        onMouseEnter={() => togglePicture(dataID)}
        onMouseLeave={() => togglePicture(-1)}
        onMouseMove={(e) => movePicture(dataID, e)}
      >
        <h5 className="title">{getName(dataID)}</h5>
        <small className="year">{getYear(dataID)}</small>
      </div>
      {personalDiv &&
        createPortal(
          <div data-key={dataID} className="picture">
            <img src={getPicture(dataID)} />
          </div>,
          personalDiv
        )}
    </>
  );
}

export function ProjectTilePlaceholder() {
  return (
    <div className="tile toThinHover noCursor">
      <h5 className="title">????</h5>
      <small className="year">????</small>
    </div>
  );
}
