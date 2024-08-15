import { ProjectPreview, ProjectTile } from "../components/ProjectTile";
import { generateTheme } from "../utils/ColorUtils";
import gsap from "gsap";
import { LinkNoIcon } from "../components/Link";
import { getProjectIDs } from "../utils/ProjectUtils";
import { useState } from "react";
import { useGlobalState } from "../utils/ControlUtil";
import { useGSAP } from "@gsap/react";
import { TextPlugin } from "gsap/all";
import { homeAnimation, startUpAnimation } from "../utils/AnimationUtils";

gsap.registerPlugin(TextPlugin, useGSAP, gsap);

export default function Home() {
  const { startTransitionGlobal } = useGlobalState();
  const { chaseStart, chaseEnd, changeOverallTheme } = homeAnimation();
  const { tileStartUp } = startUpAnimation();
  const [firstTime, setFirstTime] = useState(true);
  const [count, setCount] = useState(0);

  function handleNameClick() {
    if (count === 5) {
      generateTheme();

      if (firstTime) {
        chaseEnd();
        changeOverallTheme();

        setFirstTime(false);
      }
    } else {
      chaseStart();
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
