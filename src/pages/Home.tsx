import { ProjectPreview, ProjectTile } from "../components/ProjectTile";
import { LinkWithIconOnly } from "../components/Link";
import { getProjectIDs } from "../utils/ProjectUtils";
import { useEffect } from "react";
import { useGlobalState } from "../utils/ControlUtil";
import {
  RiGithubLine,
  RiInstagramLine,
  RiLinkedinBoxLine,
  RiMailLine,
} from "react-icons/ri";

export default function Home() {
  const { setCurrentPage } = useGlobalState();

  useEffect(() => {
    setCurrentPage("/");
  }, []);

  return (
    <main className="homeWrapper">
      <section className="left">
        {getProjectIDs().map((id) => (
          <ProjectTile key={id} dataID={id} />
        ))}
      </section>
      <section className="right">
        {getProjectIDs().map((id) => (
          <ProjectPreview key={id} dataID={id} />
        ))}

        <div className="hero">
          <h1 className="extra name accent">les ranalan</h1>

          <h5 className="nonBold">
            <span className="bulletPoint">⊢</span> frontend software engineer
          </h5>
          <h5 className="nonBold">
            <span className="bulletPoint">⊢</span> ui/ux designer
          </h5>

          <br />

          <div className="links faded">
            <LinkWithIconOnly
              img={<RiMailLine size={32} />}
              href="mailto:les.ranalan@gmail.com"
            />

            <LinkWithIconOnly
              img={<RiLinkedinBoxLine size={32} />}
              href="https://www.linkedin.com/in/les-paul-ranalan/"
            />

            <LinkWithIconOnly
              img={<RiGithubLine size={32} />}
              href="https://github.com/shadowisf"
            />

            <LinkWithIconOnly
              img={<RiInstagramLine size={32} />}
              href="https://www.instagram.com/les.rx/"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
