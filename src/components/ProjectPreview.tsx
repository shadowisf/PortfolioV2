import { useRef, useState, Key } from "react";
import { workMapping } from "../utils/workMapping";
import TechStackTile from "./TechStackTile";
import { ProjectProps } from "./ProjectTile";
import Spinner from "./Spinner";

export function ProjectPreview(p: ProjectProps) {
  const project = workMapping[p.dataID];
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [loading, setLoading] = useState(true);

  function onCanPlay() {
    setLoading(false);
  }

  return (
    <div data-key={p.dataID} className="preview">
      {project.name === "portfolio v2" ? (
        <p className="currentPortfolio">
          you are currently viewing portfolio v2
        </p>
      ) : (
        <div className="videoContainer">
          {loading && <Spinner />}
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            onCanPlay={onCanPlay}
            style={{
              visibility: loading ? "hidden" : "visible",
            }}
            preload="metadata"
            data-src={project.video}
          />
        </div>
      )}

      <span className="techStack">
        {project.techStack
          .filter((item: string) => item.startsWith("*"))
          .map((item: string, index: Key) => (
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
