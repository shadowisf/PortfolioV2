import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { workMapping } from "../utils/workMapping";
import { useGlobalState } from "../providers/GlobalStateProvider";
import { playPreview, primeWhenNear, stopPreview } from "../utils/gsap/useHomeAnimation";
import TechStackTile from "./TechStackTile";
import { webkitOnly } from "../utils/webkit";

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
              const v = e.currentTarget;
              v.dataset.played = "true";
              delete v.dataset.waiting;
              // only warming up, out of sight (primePreview) -- unless it
              // was hovered meanwhile
              if (v.dataset.warming && v.dataset.wanted !== "true") return;
              v.dataset.playing = "true";
            }}
            onPause={(e) => delete e.currentTarget.dataset.playing}
            // unloaded (evicted): its frames are gone, so the poster again
            onEmptied={(e) => {
              delete e.currentTarget.dataset.playing;
              delete e.currentTarget.dataset.played;
            }}
            // stalled mid-play, buffering: the loading ring shows (the
            // colour stays -- it is still the clip that is playing)
            onWaiting={(e) => (e.currentTarget.dataset.waiting = "true")}
          />
        ) : (
          <img src={project.image} alt="" />
        )}

        {/* Safari's poster: it drops a video's own the moment playing starts,
            before the first frame is drawn, and the tile went blank between
            the loading ring and the clip. This one stays over the video until
            it has played (main.scss, .webkit). */}
        {project.videoPreview && (
          <img className="cardPoster" src={project.videoPoster} alt="" />
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
// the logo's ᜎ (the favicon's), for a tile still to come to show in place of
// a clip
const MARK = "M437.00 825.00L375.00 792.00Q399.00 749.00 426.00 723.50Q453.00 698.00 478.00 682.00Q488.00 676.00 488.00 672.00Q488.00 668.00 470.00 661.00Q453.00 654.00 436.50 647.50Q420.00 641.00 409.50 629.00Q399.00 617.00 399.00 595.00Q399.00 575.00 408.50 562.00Q418.00 549.00 429.50 541.50Q441.00 534.00 447.00 531.00Q458.00 526.00 467.00 521.50Q476.00 517.00 476.00 514.00Q476.00 510.00 458.00 503.00Q429.00 492.00 411.00 473.00Q393.00 454.00 393.00 424.00Q393.00 379.00 414.00 342.00Q374.00 361.00 327.50 376.50Q281.00 392.00 230.00 392.00Q165.00 392.00 119.50 369.00Q74.00 346.00 28.00 307.00L73.00 253.00Q107.00 285.00 144.50 304.50Q182.00 324.00 232.00 324.00Q274.00 324.00 330.50 302.50Q387.00 281.00 438.00 254.00Q516.00 213.00 576.50 196.00Q637.00 179.00 687.00 179.00Q743.00 179.00 787.00 191.50Q831.00 204.00 877.00 229.00L846.00 290.00Q806.00 269.00 770.50 258.00Q735.00 247.00 691.00 247.00Q620.00 247.00 569.50 270.00Q519.00 293.00 492.50 330.00Q466.00 367.00 466.00 410.00Q466.00 426.00 477.50 434.50Q489.00 443.00 510.00 451.00Q539.00 462.00 553.50 475.50Q568.00 489.00 568.00 509.00Q568.00 529.00 545.00 544.50Q522.00 560.00 501.00 573.00Q488.00 581.00 484.00 585.50Q480.00 590.00 480.00 592.00Q480.00 595.00 489.00 598.50Q498.00 602.00 508.00 607.00Q534.00 618.00 556.00 629.50Q578.00 641.00 578.00 665.00Q578.00 687.00 564.00 703.50Q550.00 720.00 524.00 737.00Q502.00 751.00 480.00 771.50Q458.00 792.00 437.00 825.00Z";

export function UpcomingCard({ name }: { name: string }) {
  return (
    <div
      className="card upcoming"
      aria-disabled="true"
      data-name={name}
      data-meta="soon"
    >
      <div className="cardMedia">
        <svg className="cardMark" viewBox="28 179 849 646" aria-hidden="true">
          <path d={MARK} />
        </svg>
      </div>
      <div className="cardCaption">
        <span className="cardTitle">{name}</span>
        <small className="cardYear">soon</small>
      </div>
    </div>
  );
}
