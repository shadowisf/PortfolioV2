import { ProjectProps, getProjectData } from "../utils/ProjectUtils";
import { useEffect } from "react";
import { scrollingAnimation } from "../utils/AnimationUtils";
import { useGlobalState } from "../utils/ControlUtil";
import TechStackTile from "../components/TechStackTile";
import { Link } from "react-router-dom";
import ProgressiveImg from "../components/ProgressiveImg";
import "zoom-vanilla.js/dist/zoom.css";
import "zoom-vanilla.js/dist/zoom-vanilla.min.js";

export default function Project({ dataID }: ProjectProps) {
  const { executeTransition, setCurrentPage } = useGlobalState();
  const { scrollToTop } = scrollingAnimation();

  const project = getProjectData(dataID);
  const currentProjectTitle = project.name.replace(/\s+/g, "-");

  const prevProject = getProjectData(dataID + 1);
  const prevProjectTitle = prevProject
    ? prevProject.name.replace(/\s+/g, "-")
    : "";

  const nextProject = getProjectData(dataID - 1);
  const nextProjectTitle = nextProject
    ? nextProject.name.replace(/\s+/g, "-")
    : "";

  useEffect(() => {
    setCurrentPage(currentProjectTitle);
    scrollToTop(0);
  }, [currentProjectTitle]);

  return (
    <main className="projectWrapper">
      <section className="header">
        {/* previouse project */}
        <Link
          to={`/${prevProjectTitle}`}
          className="nextPrevButton infoOnHover top"
          data-tooltip="previous project"
          onClick={(e) => executeTransition(e, prevProjectTitle, false)}
          style={
            prevProjectTitle === ""
              ? { opacity: "0.25", pointerEvents: "none" }
              : {}
          }
        >
          ←
        </Link>

        {/* title */}
        <h1 className="title">{project.name}</h1>

        {/* next project */}
        <Link
          to={`/${nextProjectTitle}`}
          className="nextPrevButton infoOnHover top"
          data-tooltip="next project"
          onClick={(e) => executeTransition(e, nextProjectTitle, false)}
          style={
            nextProjectTitle === ""
              ? { opacity: "0.25", pointerEvents: "none" }
              : {}
          }
        >
          →
        </Link>
      </section>

      {/* year */}
      <small className="year">{project.year}</small>

      {/* tech stack */}
      <section className="techStack">
        {project.techStack?.map((item, index) => {
          return (
            <TechStackTile
              techStackItem={item}
              key={index}
              classNameContainer="item"
              classNameIcon="icon"
              preview={false}
            />
          );
        })}
      </section>

      <section className="content">
        {/* images & videos */}
        <div className="media">
          <div style={{ flex: project.imageFlex }}>
            <ProgressiveImg
              realSrc={project.image}
              placeholderSrc={project.imageTiny}
              alt={project.imageAlt}
              zoom={true}
            />
          </div>

          <div style={{ flex: project.videoFlex }}>
            <video controls muted src={project.video} />
          </div>
        </div>

        {/* links */}
        <div className="links">{project.links}</div>

        {/* content */}
        <div className="paragraph">
          <h1>description:</h1>
          <p>{project.description}</p>

          <br />

          <h1>core concept:</h1>
          <p>{project.coreConcept}</p>

          <br />

          <h1>my role:</h1>
          <p>{project.myRole}</p>
        </div>
      </section>

      <section className="bottomNav">
        <h1
          className="infoOnHover bottom"
          onClick={() => scrollToTop(0.25)}
          data-tooltip="to top"
        >
          ↑
        </h1>
      </section>
    </main>
  );
}
