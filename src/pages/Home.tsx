import { ProjectPreview, ProjectTile } from "../components/ProjectTile";
import gsap from "gsap";
import { LinkWithIconOnly } from "../components/Link";
import { getProjectIDs } from "../utils/ProjectUtils";
import { useGSAP } from "@gsap/react";
import { Email, Github, Instagram, LinkedIn } from "../components/Icon";
import { useEffect } from "react";
import { useGlobalState } from "../utils/ControlUtil";

gsap.registerPlugin(useGSAP, gsap);

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

          <div className="links faded noCursor">
            <LinkWithIconOnly
              img={<Email width="32px" />}
              href="mailto:les.ranalan@gmail.com"
            />

            <LinkWithIconOnly
              img={<LinkedIn width="32px" />}
              href="https://www.linkedin.com/in/les-paul-ranalan/"
            />

            <LinkWithIconOnly
              img={<Github width="32px" />}
              href="https://github.com/shadowisf"
            />

            <LinkWithIconOnly
              img={<Instagram width="32px" />}
              href="https://www.instagram.com/les.rx/"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
