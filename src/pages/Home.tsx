import { ProjectTile } from "../components/ProjectTile";
import { useEffect } from "react";
import { email, linkedin, github, projectData, cv } from "../utils/_GODMODE";
import { ProjectPreview } from "../components/ProjectPreview";
import { LinkWithIcon } from "../components/Link";
import { useGlobalState } from "../utils/ControlUtils";
import { useScrollingAnimation } from "../utils/useScrollingAnimation";
import { useHomeAnimation } from "../utils/useHomeAnimation";
import { useGSAP } from "@gsap/react";

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
        {Object.keys(projectData).map((id) => (
          <ProjectTile key={id} dataID={Number(id)} />
        ))}
      </section>

      <section className="right">
        {Object.keys(projectData).map((id) => (
          <ProjectPreview key={id} dataID={Number(id)} />
        ))}

        <div className="hero">
          <div className="intro">
            <h1 className="extra name accent">les ranalan</h1>
            <img
              className="swirlEmoji"
              src="src/assets/IconSwirl.svg"
              onMouseEnter={swirlOnHover}
              onMouseLeave={swirlOnLeave}
            />
          </div>

          <h2 className="nonBold">
            <span className="bulletPoint">⊢ </span>full-stack software engineer
          </h2>

          <h2 className="nonBold">
            <span className="bulletPoint">⊢ </span>based in dubai
          </h2>

          <h2 className="nonBold">
            <span className="bulletPoint">⊢ </span>open to work
          </h2>

          <br />

          <div className="links">
            <LinkWithIcon img={<img src="src/assets/IconMemo.svg" />} href={cv}>
              resume
            </LinkWithIcon>

            <LinkWithIcon
              img={<img src="src/assets/IconEmail.svg" />}
              href={email}
            >
              email
            </LinkWithIcon>

            <LinkWithIcon
              img={<img src="src/assets/IconBriefcase.svg" />}
              href={linkedin}
            >
              linkedin
            </LinkWithIcon>

            <LinkWithIcon
              img={<img src="src/assets/IconOctopus.svg" />}
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
