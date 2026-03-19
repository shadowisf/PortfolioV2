import { useState, Key, useRef, useCallback } from "react";
import { workMapping } from "../utils/workMapping";
import TechStackTile from "./TechStackTile";
import { ProjectProps } from "./ProjectTile";
import Spinner from "./Spinner";

function useResizeWidth() {
  const [width, setWidth] = useState<number | undefined>(undefined);
  const observerRef = useRef<ResizeObserver | null>(null);

  const ref = useCallback((el: HTMLElement | null) => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }
    if (el) {
      observerRef.current = new ResizeObserver(() => {
        setWidth(el.offsetWidth);
      });
      observerRef.current.observe(el);
    }
  }, []);

  return { width, ref };
}

export function ProjectPreview(p: ProjectProps) {
  const project = workMapping[p.dataID];
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [loading, setLoading] = useState(true);
  const { width: contentWidth, ref: contentRef } = useResizeWidth();

  return (
    <div data-key={p.dataID} className="preview">
      {project.name === "portfolio v2" ? (
        <div className="previewContent">
          <p className="currentPortfolio">
            you are currently viewing portfolio v2
          </p>

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
      ) : (
        <>
          <div className="previewContent">
            <div className="videoContainer">
              {loading && <Spinner />}

              <video
                ref={(el) => {
                  videoRef.current = el;
                  contentRef(el);
                }}
                src={project.video}
                muted
                loop
                playsInline
                style={{
                  visibility: loading ? "hidden" : "visible",
                }}
                preload="auto"
                onLoadedData={() => {
                  setLoading(false);
                }}
              />
            </div>
          </div>

          <span
            className="techStack"
            style={{
              width: contentWidth ? `${contentWidth}px` : undefined,
              maxWidth: "100%",
            }}
          >
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
        </>
      )}
    </div>
  );
}
