import { ProjectPreview, ProjectTile } from "../components/ProjectTile";
import { generateTheme } from "../utils/ColorUtils";
import gsap from "gsap";
import { LinkNoIcon } from "../components/Link";
import { getProjectIDs } from "../utils/ProjectUtils";
import { useState } from "react";
import { useGlobalState } from "../utils/ControlUtil";
import { useGSAP } from "@gsap/react";
import { TextPlugin } from "gsap/all";
import { startUpAnimation } from "../utils/AnimationUtils";

gsap.registerPlugin(TextPlugin, useGSAP, gsap);

export default function Home() {
  const [firstTime, setFirstTime] = useState(true);
  const [count, setCount] = useState(0);
  const { startTransitionGlobal } = useGlobalState();
  const { tileStartUp } = startUpAnimation();

  useGSAP(() => {
    tileStartUp();
  });

  const highlightedTexts = [".homeWrapper .name", ".projectWrapper .title"];

  const fadedTexts = [
    ".homeWrapper .year",
    ".projectWrapper .year",
    ".homeWrapper .links",
  ];

  function handleNameClick() {
    if (count === 10) {
      generateTheme();

      if (firstTime) {
        gsap.set(highlightedTexts, {
          backgroundColor: "var(--text-color)",
          color: "var(--background-color",
        });
        gsap.set(fadedTexts, {
          autoAlpha: "0.5",
        });

        setFirstTime(false);
      }
    } else {
      setCount(count + 1);
    }
  }

  return (
    <main data-key="-1" className="homeWrapper">
      <section className="left">
        {getProjectIDs().map((id) => (
          <ProjectTile
            onClick={() => startTransitionGlobal(id)}
            key={id}
            dataID={id}
          />
        ))}
      </section>
      <section className="right">
        {getProjectIDs().map((id) => (
          <ProjectPreview
            onClick={() => startTransitionGlobal(id)}
            key={id}
            dataID={id}
          />
        ))}

        <div className="hero">
          <h1
            className="name accent noCursor"
            onClick={() => handleNameClick()}
          >
            les ranalan
          </h1>
          <h5>frontend software engineer</h5>

          <br />

          <div className="links faded noCursor">
            <LinkNoIcon
              className="faded"
              onClick={() => startTransitionGlobal(-2)}
            >
              about me
            </LinkNoIcon>
            •
            <LinkNoIcon
              className="faded"
              onClick={() => startTransitionGlobal(-3)}
            >
              contact me
            </LinkNoIcon>
          </div>
        </div>
      </section>
    </main>
  );
}
