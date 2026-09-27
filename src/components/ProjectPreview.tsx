import { Key } from "react";
import { workMapping } from "../utils/workMapping";
import TechStackTile from "./TechStackTile";
import { ProjectProps } from "./ProjectTile";
import Spinner from "./Spinner";

// A nominal display height, deliberately not the encode height -- previews are
// encoded at 360 but shown larger, and max-width caps the result anyway. This
// only has to establish the box before a src exists, and it has to be an inline
// style: the width/height attributes are presentational hints and lose to the
// stylesheet's `width: auto`. Without it a source-less <video> is 300x150 and
// the box jumps to its real size on first hover.
const PREVIEW_DISPLAY_HEIGHT = 540;

export function ProjectPreview(p: ProjectProps) {
  const project = workMapping[p.dataID];
  // a portrait clip needs a wider box so the tech stack below it is not
  // squeezed into the clip's own narrow width
  const previewRatio = Number(project.videoFlex) || 1.6;
  const isPortrait = previewRatio < 1;

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
            <div
              className={`videoContainer${isPortrait ? " portrait" : ""}`}
            >
              {/*
                no src until the tile is hovered -- useHomeAnimation attaches
                data-src on demand, by which point the preloader has already
                pulled the file into the http cache. aspectRatio holds the box
                at the right shape before any metadata exists, so nothing
                reflows when the clip appears.
              */}
              <video
                data-src={project.videoPreview}
                data-start={project.previewStart ?? 0}
                style={{
                  width: Math.round(PREVIEW_DISPLAY_HEIGHT * previewRatio),
                  aspectRatio: previewRatio,
                }}
                muted
                playsInline
                preload="none"
              />

              {/*
                shown only while the box is genuinely empty -- useHomeAnimation
                hides it the moment the first frame decodes, so a preview
                already in the cache never flashes one.
              */}
              <Spinner />
            </div>
          </div>

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
        </>
      )}
    </div>
  );
}
