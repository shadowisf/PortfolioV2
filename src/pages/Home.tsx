import { ProjectTile } from "../components/ProjectTile";
import { LinkWithIcon, LinkWithIconOnly } from "../components/Link";
import { useEffect } from "react";
import { useGlobalState } from "../utils/ControlUtils";
import {
  RiFilePdf2Line,
  RiGithubLine,
  RiInstagramLine,
  RiLinkedinBoxLine,
  RiMailLine,
} from "react-icons/ri";
import { homeAnimation, scrollingAnimation } from "../utils/AnimationUtils";
import {
  email,
  linkedin,
  instagram,
  github,
  projectData,
  cv,
} from "../utils/_GODMODE";
import { ProjectPreview } from "../components/ProjectPreview";
import { useGSAP } from "@gsap/react";

export default function Home() {
  const { setCurrentPage } = useGlobalState();
  const { scrollToTop } = scrollingAnimation();
  const { startup } = homeAnimation();

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
          <h1 className="extra name accent">
            {/* ᜎᜒᜐ᜔ ᜍᜈᜎᜈ᜔ */}
            les ranalan
          </h1>

          <h2 className="nonBold">
            <span className="bulletPoint">⊢ </span>fullstack software engineer
          </h2>

          <h2 className="nonBold">
            <span className="bulletPoint">⊢ </span>based in dubai
          </h2>

          <h2 className="nonBold">
            <span className="bulletPoint">⊢ </span>open to work
          </h2>

          <br />

          <div className="links">
            <LinkWithIcon
              className="faded"
              img={<RiFilePdf2Line size={32} />}
              href={cv}
            >
              resume
            </LinkWithIcon>

            <div>
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
        </div>
      </section>
    </main>
  );
}
