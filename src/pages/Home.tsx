import { ProjectTile } from "../components/ProjectTile";
import { useEffect, useState } from "react";
import { ProjectPreview } from "../components/ProjectPreview";
import { LinkWithIcon, LinkWithNoIcon } from "../components/Link";
import { useGlobalState } from "../providers/GlobalStateProvider";
import { useScrollingAnimation } from "../utils/gsap/useScrollingAnimation";
import { useHomeAnimation } from "../utils/gsap/useHomeAnimation";
import { useGSAP } from "@gsap/react";
import { resume, email, linkedin, github } from "../utils/identitySetting";
import { workMapping } from "../utils/workMapping";
import { useVideoPreloader } from "../utils/useVideoPreloader";
import {
  IconBriefcase,
  IconMailbox,
  IconCards,
  IconOctopus,
  IconSwirl,
} from "../utils/iconSetting";

export default function Home() {
  const { setCurrentPage } = useGlobalState();
  const { scrollToTop } = useScrollingAnimation();
  const { startup, swirlOnHover, swirlOnLeave } = useHomeAnimation();
  const { progress, done } = useVideoPreloader();
  const [fadingOut, setFadingOut] = useState(false);
  const [showHome, setShowHome] = useState(false);

  useEffect(() => {
    setCurrentPage("/");
    scrollToTop(0);
  }, []);

  useEffect(() => {
    if (done && !fadingOut && !showHome) {
      setFadingOut(true);
    }
  }, [done]);

  useGSAP(() => {
    if (showHome) {
      startup();
    }
  }, [showHome]);

  return (
    <>
      {!showHome && (
        <main
          className={`homeLoader ${fadingOut ? "fadeOut" : ""}`}
          onTransitionEnd={() => {
            if (fadingOut) {
              setShowHome(true);
            }
          }}
        >
          <div className="loaderContent">
            <small>{progress}%</small>
            <div className="progressBar">
              <div
                className="progressFill"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </main>
      )}

      {showHome && (
        <main className="homeWrapper">
          <section className="left">
            {Object.keys(workMapping).map((id) => (
              <ProjectTile key={id} dataID={Number(id)} />
            ))}
          </section>

          <section className="right">
            {Object.keys(workMapping).map((id) => (
              <ProjectPreview key={id} dataID={Number(id)} />
            ))}

            <div className="hero">
              <div className="intro">
                <h1 className="extra name accent">les ranalan</h1>
                <img
                  alt="swirl icon"
                  className="swirlEmoji"
                  src={IconSwirl}
                  onMouseEnter={swirlOnHover}
                  onMouseLeave={swirlOnLeave}
                />
              </div>

              <br />
              <br />

              <h5 className="nonBold">
                ⊢ software engineer @{" "}
                <LinkWithNoIcon
                  className="infoOnHover top"
                  data-tooltip="an award-winning design & build company"
                  href="https://www.rayfitout.com"
                >
                  rayfitout
                </LinkWithNoIcon>
              </h5>

              <h5 className="nonBold">⊢ beng (hons) software eng.</h5>

              <h5 className="nonBold">⊢ united arab emirates</h5>

              <br />
              <br />

              <div className="links">
                <LinkWithIcon
                  img={<img alt="resume icon" src={IconCards} />}
                  href={resume}
                >
                  resume
                </LinkWithIcon>

                <LinkWithIcon
                  img={<img alt="mail icon" src={IconMailbox} />}
                  href={email}
                >
                  email
                </LinkWithIcon>

                <LinkWithIcon
                  img={<img alt="briefcase icon" src={IconBriefcase} />}
                  href={linkedin}
                >
                  linkedin
                </LinkWithIcon>

                <LinkWithIcon
                  img={<img alt="github icon" src={IconOctopus} />}
                  href={github}
                >
                  github
                </LinkWithIcon>
              </div>
            </div>
          </section>
        </main>
      )}
    </>
  );
}
