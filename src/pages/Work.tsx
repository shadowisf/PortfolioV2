import { Key, useEffect, useState } from "react";
import TechStackTile from "../components/TechStackTile";
import { Link } from "react-router-dom";
import { workMapping } from "../utils/workMapping";
import "zoom-vanilla.js/dist/zoom.css";
import "zoom-vanilla.js/dist/zoom-vanilla.min.js";
import Spinner from "../components/Spinner";
import { useGlobalState } from "../providers/GlobalStateProvider";
import { useScrollingAnimation } from "../utils/gsap/useScrollingAnimation";
import { useGSAP } from "@gsap/react";
import { useWorkAnimation } from "../utils/gsap/useWorkAnimation";

type WorkProps = {
  dataID: number;
};

export default function Work(p: WorkProps) {
  const { setCurrentPage, setSkipStart } = useGlobalState();
  const { scrollToTop } = useScrollingAnimation();
  const { startup } = useWorkAnimation();

  const [imageLoading, setImageLoading] = useState(true);

  const project = workMapping[p.dataID];
  const currentProjectTitle = project.name.replace(/\s+/g, "-");

  const prevProject = workMapping[p.dataID - 1];
  const prevProjectTitle = prevProject
    ? prevProject.name.replace(/\s+/g, "-")
    : "";

  const nextProject = workMapping[p.dataID + 1];
  const nextProjectTitle = nextProject
    ? nextProject.name.replace(/\s+/g, "-")
    : "";

  useEffect(() => {
    setCurrentPage(currentProjectTitle);
    scrollToTop(0);
  }, [currentProjectTitle]);

  useGSAP(() => {
    startup();
  });

  return (
    <main className="workWrapper">
      <section className="projectNav">
        {/* previous project */}
        <Link
          to={`/${prevProjectTitle}`}
          className="nextPrevButton"
          style={
            prevProjectTitle === ""
              ? { opacity: "0.25", pointerEvents: "none" }
              : {}
          }
          onClick={() => setSkipStart(true)}
        >
          ← <small>prev</small>
        </Link>

        {/* next project */}
        <Link
          to={`/${nextProjectTitle}`}
          className="nextPrevButton"
          style={
            nextProjectTitle === ""
              ? { opacity: "0.25", pointerEvents: "none" }
              : {}
          }
          onClick={() => setSkipStart(true)}
        >
          <small>next</small> →
        </Link>
      </section>

      <br />
      <br />

      <section className="header">
        {/* title */}
        <h1 className="title">{project.name}</h1>
      </section>

      {/* year */}
      <small className="year">{project.year}</small>

      {/* tech stack */}
      <section className="techStack">
        {project.techStack?.map(
          (item: string, index: Key | null | undefined) => (
            <TechStackTile
              techStackItem={item}
              key={index}
              classNameContainer="item"
              classNameIcon="icon"
              preview={false}
            />
          )
        )}
      </section>

      <section className="content">
        {/* images & videos */}
        <div className="media">
          <div style={{ flex: project.imageFlex, width: "100%" }}>
            {imageLoading && <Spinner />}
            <img
              src={project.image}
              alt={project.imageAlt}
              data-action="zoom"
              onLoad={() => setImageLoading(false)}
              style={{ display: imageLoading ? "none" : "block" }}
            />
          </div>

          <div style={{ flex: project.videoFlex, width: "100%" }}>
            {/*
              "metadata" fetches only the header and first cluster -- 16-256KB
              depending on the clip, against originals up to 76MB -- which is
              what paints a real first frame instead of an empty grey box.
              The rest of the file still waits for an actual press of play.
              aspectRatio holds the box steady until that frame arrives.
            */}
            <video
              controls
              muted
              preload="metadata"
              src={project.video}
              style={{ aspectRatio: project.videoFlex }}
            />
          </div>
        </div>

        {/* links */}
        <div className="links">{project.links}</div>

        {/* content */}
        <div className="paragraph">
          <h4>status:</h4>
          {project.status}

          <br />
          <br />
          <br />

          <h4>description:</h4>
          {project.description}

          <br />
          <br />
          <br />

          <h4>my role:</h4>
          {project.myRole}
        </div>
      </section>

      <section className="bottomNav">
        <Link
          to={`/${nextProjectTitle}`}
          className="topButton"
          onClick={(e) => {
            e.preventDefault();
            scrollToTop(0.25);
          }}
        >
          ↑ <small>top</small>
        </Link>
      </section>
    </main>
  );
}
