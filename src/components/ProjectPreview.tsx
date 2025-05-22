import { useRef, useState, Key } from "react";
import { projectData } from "../utils/_GODMODE";
import Spinner from "./Spinner";
import TechStackTile from "./TechStackTile";
import { ProjectProps } from "./ProjectTile";

export function ProjectPreview(p: ProjectProps) {
  const project = projectData[p.dataID];
  const [loading, setLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  function onCanPlay() {
    setLoading(false);
    videoRef.current?.play();
  }

  return (
    <div data-key={p.dataID} className="preview">
      {p.dataID === 6 ? (
        <h1 className="currentPortfolio">
          you are currently viewing portfolio v2
        </h1>
      ) : (
        <div className="videoContainer">
          {loading && <Spinner />}
          <video
            ref={videoRef}
            src={project.video}
            autoPlay
            muted
            loop
            playsInline
            onCanPlay={onCanPlay}
            style={{
              visibility: loading ? "hidden" : "visible",
            }}
          />
        </div>
      )}

      <span className="techStack">
        {project.techStack
          .filter((item: string) => item.startsWith("*"))
          .map((item: string, index: Key | null | undefined) => (
            <TechStackTile
              techStackItem={item}
              key={index}
              classNameContainer="item"
              classNameIcon="icon"
              preview={true}
            />
          ))}
      </span>
    </div>
  );
}
