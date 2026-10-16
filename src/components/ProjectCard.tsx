import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { workMapping } from "../utils/workMapping";
import { useGlobalState } from "../providers/GlobalStateProvider";
import { playPreview, primeWhenNear, stopPreview } from "../utils/gsap/useHomeAnimation";
import TechStackTile from "./TechStackTile";

// Safari, and every browser on ios (all of them webkit), cannot show a
// transparent webm -- they play it on black. A preview cut out to a
// transparent background comes as hevc with alpha for them instead.
const ua = typeof navigator === "undefined" ? "" : navigator.userAgent;
const webkitOnly =
  /iP(hone|ad|od)/.test(ua) ||
  (/Safari\//.test(ua) && !/Chrome|Chromium|Edg|Firefox|OPR/.test(ua));

type ProjectCardProps = {
  dataID: number;
  // played by whatever holds it (a mobile carousel, by what is in view),
  // not by hover
  autoplay?: boolean;
};

// One project in the home grid: the frame its preview starts on, in grey,
// with its stack inside the frame. Hovering plays the preview, in colour; the
// whole thing opens the project. The name and year ride on the cursor
// (TileCursor reads them off data-name and data-meta, and its theme off
// data-overlay), so the caption beneath
// shows only where there is no cursor -- on a touch screen.
export function ProjectCard({ dataID, autoplay = false }: ProjectCardProps) {
  const { executeTransition, setInMenu } = useGlobalState();
  const video = useRef<HTMLVideoElement | null>(null);

  // readied as the tile nears the screen, so a hover plays at once
  useEffect(() => {
    if (video.current) return primeWhenNear(video.current);
  }, []);

  const project = workMapping[dataID];
  const title = project.name.replace(/\s+/g, "-");
  // a phone recording (feeltok) is taller than wide; it is shown whole
  const portrait = parseFloat(project.videoFlex) < 1;

  return (
    <Link
      to={`/${title}`}
      className={portrait ? "card portrait" : "card"}
      // the caption can be hidden (see above), so the link names itself
      aria-label={`${project.name}, ${project.year}`}
      data-name={project.name}
      data-meta={project.year}
      data-overlay={project.overlayTheme}
      onClick={(e) => {
        e.preventDefault();
        setInMenu(false);
        executeTransition(title);
      }}
      onMouseEnter={() => !autoplay && video.current && playPreview(video.current)}
      onMouseLeave={() => !autoplay && video.current && stopPreview(video.current)}
    >
      {/* decorative: the caption already says what it is */}
      <div className="cardMedia" aria-hidden="true">
        {project.videoPreview ? (
          // no src until hovered -- until then the poster, the very frame
          // the hover starts on, stands in for it
          <video
            ref={video}
            data-src={
              webkitOnly && project.videoPreviewHevc
                ? project.videoPreviewHevc
                : project.videoPreview
            }
            data-start={project.previewStart ?? 0}
            poster={project.videoPoster}
            muted
            playsInline
            preload="none"
            // colour only while it is actually moving -- not while a slow
            // one is still loading, and not once paused
            onPlaying={(e) => {
              e.currentTarget.dataset.playing = "true";
              delete e.currentTarget.dataset.waiting;
            }}
            onPause={(e) => delete e.currentTarget.dataset.playing}
            onEmptied={(e) => delete e.currentTarget.dataset.playing}
            // stalled mid-play, buffering: the loading ring shows (the
            // colour stays -- it is still the clip that is playing)
            onWaiting={(e) => (e.currentTarget.dataset.waiting = "true")}
          />
        ) : (
          <img src={project.image} alt="" />
        )}

        {/* turns while a wanted preview is still loading, or buffering --
            shown only after a moment, so a preview that starts at once
            never flashes it */}
        {project.videoPreview && (
          <span className="cardLoading">
            <span className="cardLoadingRing" />
          </span>
        )}

        {/* its stack at a glance, inside the frame: frontend, backend,
            database (the project page lists the rest) */}
        <div className="cardStack">
          {(project.keyStack ?? []).map((item) => (
            <TechStackTile key={item} techStackItem={item} classNameContainer="chip" />
          ))}
        </div>
      </div>

      <div className="cardCaption">
        <span className="cardTitle">{project.name}</span>
        <small className="cardYear">{project.year}</small>
      </div>
    </Link>
  );
}

// A project that is coming but has no page yet: an empty panel, greyed and
// inert, its name inside it -- with no frame to show, the name stays.
export function UpcomingCard({ name }: { name: string }) {
  return (
    <div
      className="card upcoming"
      aria-disabled="true"
      data-name={name}
      data-meta="soon"
    >
      <div className="cardMedia" />
      <div className="cardCaption">
        <span className="cardTitle">{name}</span>
        <small className="cardYear">soon</small>
      </div>
    </div>
  );
}
