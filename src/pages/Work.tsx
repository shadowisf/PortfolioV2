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
  const [videoLoading, setVideoLoading] = useState(true);

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
      <section className="header">
        {/* previous project */}
        <Link
          to={`/${prevProjectTitle}`}
          className="nextPrevButton infoOnHover top"
          data-tooltip="prev"
          style={
            prevProjectTitle === ""
              ? { opacity: "0.25", pointerEvents: "none" }
              : {}
          }
          onClick={() => setSkipStart(true)}
        >
          ←
        </Link>

        {/* title */}
        <h1 className="title">{project.name}</h1>

        {/* next project */}
        <Link
          to={`/${nextProjectTitle}`}
          className="nextPrevButton infoOnHover top"
          data-tooltip="next"
          style={
            nextProjectTitle === ""
              ? { opacity: "0.25", pointerEvents: "none" }
              : {}
          }
          onClick={() => setSkipStart(true)}
        >
          →
        </Link>
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
            {videoLoading && <Spinner />}
            <video
              controls
              muted
              src={project.video}
              onLoadedMetadata={() => setVideoLoading(false)}
              style={{ display: videoLoading ? "none" : "block" }}
            />
          </div>
        </div>

        {/* links */}
        <div className="links">{project.links}</div>

        {/* content */}
        <div className="paragraph">
          <h1>status:</h1>
          {project.status}

          <br />
          <br />
          <br />

          <h1>description:</h1>
          {project.description}

          <br />
          <br />
          <br />

          <h1>my role:</h1>
          {project.myRole}
        </div>
      </section>

      <section className="bottomNav">
        <h1
          className="infoOnHover bottom"
          onClick={() => scrollToTop(0.25)}
          data-tooltip="top"
        >
          ↑
        </h1>
      </section>
    </main>
  );
}
