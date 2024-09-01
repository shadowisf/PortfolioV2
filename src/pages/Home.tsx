import { ProjectPreview, ProjectTile } from "../components/ProjectTile";
import { LinkWithIconOnly } from "../components/Link";
import { getAllProjectIDs } from "../utils/ProjectUtils";
import { useEffect } from "react";
import { useGlobalState } from "../utils/ControlUtil";
import {
  RiGithubLine,
  RiInstagramLine,
  RiLinkedinBoxLine,
  RiMailLine,
} from "react-icons/ri";
import { homeAnimation, scrollingAnimation } from "../utils/AnimationUtils";
import { useGSAP } from "@gsap/react";
import { email, github, instagram, linkedin } from "../utils/SocialUtils";

export default function Home() {
  const { setCurrentPage } = useGlobalState();
  const { scrollToTop } = scrollingAnimation();
  const { startup } = homeAnimation();
  const allProjectIDs = getAllProjectIDs();

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
        {allProjectIDs.map((id) => (
          <ProjectTile key={id} dataID={Number(id)} />
        ))}
      </section>
      <section className="right">
        {allProjectIDs.map((id) => (
          <ProjectPreview key={id} dataID={Number(id)} />
        ))}

        <div className="hero">
          <h1 className="extra name accent">
            les ranalan
            {/* ᜎᜒᜐ᜔ ᜍᜈᜎᜈ᜔ */}
          </h1>

          <h5 className="nonBold">
            <span className="bulletPoint">⊢</span> frontend developer{" "}
            <small className="smaller">(future fullstack)</small>
          </h5>
          <h5 className="nonBold">
            <span className="bulletPoint">⊢</span> uae-based
          </h5>

          <br />

          <div className="links">
            <LinkWithIconOnly
              className="faded"
              img={<RiMailLine size={32} />}
              href={email}
            />

            <LinkWithIconOnly
              className="faded"
              img={<RiLinkedinBoxLine size={32} />}
              href={linkedin}
            />

            <LinkWithIconOnly
              className="faded"
              img={<RiInstagramLine size={32} />}
              href={instagram}
            />

            <LinkWithIconOnly
              className="faded"
              img={<RiGithubLine size={32} />}
              href={github}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
