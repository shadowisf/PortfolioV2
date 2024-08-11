import { projectData } from "../pages/Index";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Click from "../assets/AudioClick.mp3";

function getName(dataID: number) {
  return projectData[dataID].name;
}

function getYear(dataID: number) {
  return projectData[dataID].year;
}

type ProjectTileProps = {
  dataID: number;
};

export function ProjectTile({ dataID }: ProjectTileProps) {
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
    <div
      id="tile"
      data-key={dataID}
      className="tile toThinHover noCursor"
      onMouseEnter={() => togglePicture(dataID)}
      onMouseLeave={() => togglePicture(-1)}
      onMouseMove={(e) => movePicture(dataID, e)}
    >
      <audio id="click" src={Click} />
      <h5 className="title">{getName(dataID)}</h5>
      <small className="year">{getYear(dataID)}</small>
    </div>
  );
}
