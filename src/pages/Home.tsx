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
        {getAllProjectIDs().map((id) => (
          <ProjectTile key={id} dataID={id} />
        ))}
      </section>
      <section className="right">
        {getAllProjectIDs().map((id) => (
          <ProjectPreview key={id} dataID={id} />
        ))}

        <div className="hero">
          <h1 className="extra name accent">les ranalan</h1>

          <h5 className="nonBold">
            <span className="bulletPoint">⊢</span> frontend developer{" "}
            <small className="smaller">(future fullstack)</small>
          </h5>
          <h5 className="nonBold">
            <span className="bulletPoint">⊢</span> ui/ux designer
          </h5>

          <br />

          <div className="links">
            <LinkWithIconOnly
              className="faded"
              img={<RiMailLine size={32} />}
              href="mailto:les.ranalan@gmail.com"
            />

            <LinkWithIconOnly
              className="faded"
              img={<RiLinkedinBoxLine size={32} />}
              href="https://www.linkedin.com/in/les-paul-ranalan/"
            />

            <LinkWithIconOnly
              className="faded"
              img={<RiGithubLine size={32} />}
              href="https://github.com/shadowisf"
            />

            <LinkWithIconOnly
              className="faded"
              img={<RiInstagramLine size={32} />}
              href="https://www.instagram.com/les.rx/"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
