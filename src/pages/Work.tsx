import { Key, useEffect, useState } from "react";
import TechStackTile from "../components/TechStackTile";
import { Link } from "react-router-dom";
import { workMapping } from "../utils/workMapping";
import "zoom-vanilla.js/dist/zoom.css";
import "zoom-vanilla.js/dist/zoom-vanilla.min.js";
import Spinner from "../components/Spinner";
import { useGlobalState } from "../providers/GlobalStateProvider";
import { useScrollingAnimation } from "../utils/gsap/useScrollingAnimation";

type WorkProps = {
  dataID: number;
};

export default function Work(p: WorkProps) {
  const { setCurrentPage } = useGlobalState();
  const { scrollToTop } = useScrollingAnimation();

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

  return (
    <main className="workWrapper">
      {/* what it is at a glance: what kind of work and when (the eyebrow, as
          apple sets a category over a product name), the name, where it
          stands now, and where to go and see it */}
      <section className="header">
        <small className="meta">
          {project.type}
          <span className="metaDot">•</span>
          {project.year}
        </small>
        <h1 className="extra title">{project.name}</h1>
        <p className="status">{project.status}</p>
        <div className="links">{project.links}</div>
      </section>

      <section className="media">
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
            style={
              {
                aspectRatio: project.videoFlex,
              } as React.CSSProperties
            }
          />
        </div>
      </section>

      {/* the reading, in the order someone deciding about the work wants it:
          what it is, what i did, then what it was built with */}
      <section className="details">
        <section className="spec">
          <h4>overview</h4>
          <div className="paragraph">{project.description}</div>
        </section>

        <section className="spec">
          <h4>role</h4>
          <div className="paragraph">{project.myRole}</div>
        </section>

        <section className="spec">
          <h4>techstack</h4>
          <div className="techStack">
            {project.techStack?.map(
              (item: string, index: Key | null | undefined) => (
                <TechStackTile
                  techStackItem={item}
                  key={index}
                  classNameContainer="item"
                />
              )
            )}
          </div>
        </section>
      </section>

      {/* prev and next sit down here, where a reader who finished this
          project is already looking */}
      <section className="bottomNav">
        {/* the projects either side, by name, apple's "next" style */}
        {prevProject ? (
          <Link to={`/${prevProjectTitle}`} className="nextPrevButton prev">
            <small>← previous</small>
            <span>{prevProject.name}</span>
          </Link>
        ) : (
          <span className="nextPrevButton prev" />
        )}

        {/* back to the top of this project, by name like the two either side */}
        <Link
          to={`/${currentProjectTitle}`}
          className="nextPrevButton top"
          onClick={(e) => {
            e.preventDefault();
            scrollToTop(0.25);
          }}
        >
          <small>↑ top</small>
          <span>{project.name}</span>
        </Link>

        {nextProject ? (
          <Link to={`/${nextProjectTitle}`} className="nextPrevButton next">
            <small>next →</small>
            <span>{nextProject.name}</span>
          </Link>
        ) : (
          <span className="nextPrevButton next" />
        )}
      </section>
    </main>
  );
}
