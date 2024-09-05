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
import { preloadTinyImages } from "../components/ProgressiveImg";

export default function Home() {
  const { setCurrentPage } = useGlobalState();
  const { scrollToTop } = scrollingAnimation();
  const { startup } = homeAnimation();
  const allProjectIDs = getAllProjectIDs();

  useEffect(() => {
    preloadTinyImages();

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
            {/* ᜎᜒᜐ᜔ ᜍᜈᜎᜈ᜔ */}
            les ranalan
          </h1>

          <h2 className="nonBold">
            <span className="bulletPoint">⊢</span> frontend developer{" "}
            <small className="smaller">(future fullstack)</small>
          </h2>
          <h2 className="nonBold">
            <span className="bulletPoint">⊢</span> uae-based
          </h2>

          <br />

          <div className="links">
            <LinkWithIconOnly
              className="faded"
              img={<RiMailLine size={32} />}
              href={email}
              label="email"
            />

            <LinkWithIconOnly
              className="faded"
              img={<RiLinkedinBoxLine size={32} />}
              href={linkedin}
              label="linkedin"
            />

            <LinkWithIconOnly
              className="faded"
              img={<RiInstagramLine size={32} />}
              href={instagram}
              label="instagram"
            />

            <LinkWithIconOnly
              className="faded"
              img={<RiGithubLine size={32} />}
              href={github}
              label="github"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
