import { ProjectTile } from "../components/ProjectTile";
import { useEffect } from "react";
import { ProjectPreview } from "../components/ProjectPreview";
import { LinkWithIcon } from "../components/Link";
import { useGlobalState } from "../providers/GlobalStateProvider";
import { useScrollingAnimation } from "../utils/gsap/useScrollingAnimation";
import { useHomeAnimation } from "../utils/gsap/useHomeAnimation";
import { useGSAP } from "@gsap/react";
import { resume, email, linkedin, github } from "../utils/identitySetting";
import { workMapping } from "../utils/workMapping";
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

  useEffect(() => {
    setCurrentPage("/");
    scrollToTop(0);
  }, []);

  useGSAP(() => {
    startup();
  });

  return (
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
            ⊢ full-stack software engineer <small>(open to work)</small>
          </h5>

          <h5 className="nonBold">⊢ beng (hons) software eng.</h5>

          <h5 className="nonBold">⊢ dubai, uae</h5>

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
  );
}
