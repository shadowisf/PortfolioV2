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
  IconEmail,
  IconMemo,
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
              className="swirlEmoji"
              src={IconSwirl}
              onMouseEnter={swirlOnHover}
              onMouseLeave={swirlOnLeave}
            />
          </div>

          <h2 className="nonBold">
            <span className="bulletPoint">⊢ </span>software engineer
          </h2>

          <h2 className="nonBold">
            <span className="bulletPoint">⊢ </span>based in dubai
          </h2>

          <h2 className="nonBold">
            <span className="bulletPoint">⊢ </span>open to work
          </h2>

          <br />

          <div className="links">
            <LinkWithIcon img={<img src={IconMemo} />} href={resume}>
              resume
            </LinkWithIcon>

            <LinkWithIcon img={<img src={IconEmail} />} href={email}>
              email
            </LinkWithIcon>

            <LinkWithIcon img={<img src={IconBriefcase} />} href={linkedin}>
              linkedin
            </LinkWithIcon>

            <LinkWithIcon img={<img src={IconOctopus} />} href={github}>
              github
            </LinkWithIcon>
          </div>
        </div>
      </section>
    </main>
  );
}
