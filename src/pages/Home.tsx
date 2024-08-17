import { ProjectPreview, ProjectTile } from "../components/ProjectTile";
import gsap from "gsap";
import { LinkNoIcon } from "../components/Link";
import { getProjectIDs } from "../utils/ProjectUtils";
import { useGlobalState } from "../utils/ControlUtil";
import { useGSAP } from "@gsap/react";
import { TextPlugin } from "gsap/all";
import { pixelTransition, startUpAnimation } from "../utils/AnimationUtils";
import { useState } from "react";
import { generateTheme } from "../utils/ColorUtils";

gsap.registerPlugin(TextPlugin, useGSAP, gsap);

export default function Home() {
  const { setIsCustomTheme } = useGlobalState();
  const { tileStartUp } = startUpAnimation();
  const [count, setCount] = useState(0);
  const { executePixelTransition } = pixelTransition();

  function handleNameClick() {
    if (count === 10) {
      generateTheme();
      setIsCustomTheme(true);
    } else {
      setCount(count + 1);
    }
  }

  useGSAP(() => {
    tileStartUp();
  });

  return (
    <main data-key="-1" className="homeWrapper">
      <section className="left">
        {getProjectIDs().map((id) => (
          <ProjectTile
            onClick={() => executePixelTransition(id)}
            key={id}
            dataID={id}
          />
        ))}
      </section>
      <section className="right">
        {getProjectIDs().map((id) => (
          <ProjectPreview
            onClick={() => executePixelTransition(id)}
            key={id}
            dataID={id}
          />
        ))}

        <div className="hero">
          <h1
            className="name accent toThinHover noCursor"
            onClick={() => handleNameClick()}
          >
            les ranalan
          </h1>

          <h5>frontend software engineer</h5>

          <br />

          <div className="links faded noCursor">
            <LinkNoIcon
              className="faded"
              onClick={() => executePixelTransition(-2)}
            >
              about me
            </LinkNoIcon>
            •
            <LinkNoIcon
              className="faded"
              onClick={() => executePixelTransition(-3)}
            >
              contact me
            </LinkNoIcon>
          </div>
        </div>
      </section>
    </main>
  );
}
