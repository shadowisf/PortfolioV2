import { CSSProperties, useEffect, useRef } from "react";
import { ProjectCard, UpcomingCard } from "../components/ProjectCard";
import { TileCursor } from "../components/TileCursor";
import { ProjectRow } from "../components/ProjectRow";
import { useGlobalState } from "../providers/GlobalStateProvider";
import { useScrollingAnimation } from "../utils/gsap/useScrollingAnimation";
import { workMapping } from "../utils/workMapping";
import { upcomingWork } from "../utils/upcomingWork";
import { Link } from "react-router-dom";
import { InlineLink } from "../components/Link";

// At mobile widths, one carousel per kind of work instead, in this order; a
// kind with nothing in it is skipped.
const KINDS = [
  { title: "professional", type: "professional experience" },
  { title: "freelance", type: "freelance project" },
  { title: "personal", type: "personal project" },
];

// The bento, row by row. Every tile is its own clip's shape, never cropped:
// a row's tiles share one height, so each is as wide as its clip's aspect
// ratio makes it -- a big tile beside a narrow one, a pair, a trio, and the
// projects still to come stacked in a column beside the last.
//
//   rayfitout ops, big | feeltok, narrow and tall
//   rayfitout web | let there be fragrance
//   whealthy vessel | circuitcentral | apollo
//   examiq, big | still to come, stacked
//
// A project not named here still shows, in rows of three at the end.
const UPCOMING = "still to come";
const ROWS = [
  ["rayfitout ops", "feeltok"],
  ["rayfitout web", "let there be fragrance"],
  ["whealthy vessel", "circuitcentral", "apollo"],
  ["examiq", UPCOMING],
];
// the stacked column's share of its row, as if it were a clip of this shape
const STACK_RATIO = 0.75;

// The home page: one opening line, then the work -- on a wide screen as a
// bento grid, at mobile widths as a carousel per kind of work -- every
// project a panel of its own size, its preview playing on hover, and the ones
// still to come -- and a way on to about to finish.
export default function Home() {
  const { setCurrentPage, isMobile, executeTransition } = useGlobalState();
  const { scrollToTop } = useScrollingAnimation();
  const grid = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setCurrentPage("/");
    scrollToTop(0);
  }, []);

  const ids = Object.keys(workMapping).map(Number);
  const byName = (name: string) => ids.find((id) => workMapping[id].name === name);
  const named = new Set(ROWS.flat());
  const unplaced = [...ids].reverse().filter((id) => !named.has(workMapping[id].name));
  // each row as project ids, and the stack of those still to come
  type RowTile = number | typeof UPCOMING;
  const rows: RowTile[][] = [
    ...ROWS.map((row) =>
      row.flatMap((name): RowTile[] => {
        if (name === UPCOMING) return [UPCOMING];
        const id = byName(name);
        return id === undefined ? [] : [id];
      })
    ),
    ...Array.from({ length: Math.ceil(unplaced.length / 3) }, (_, i) =>
      unplaced.slice(i * 3, i * 3 + 3)
    ),
  ].filter((row) => row.length > 0);

  return (
    <main className="homeWrapper">
      {/* the opening statement: the name, and the two-tone line from about */}
      <section className="homeIntro">
        <h1 className="extra">les ranalan</h1>
        <h4 className="lede">
          <span className="emphasis">
            full-stack developer at{" "}
            <InlineLink
              className="infoOnHover top"
              data-tooltip={
                isMobile ? "" : "an award-winning raw pet nutrition company"
              }
              href="https://furchildpets.com/"
            >
              furchild
            </InlineLink>
            .
          </span>
          <br />
          beng (hons) software engineering.
          <br />
          based in the united arab emirates.
        </h4>
      </section>

      {isMobile ? (
        // a carousel for each kind of work, newest first
        <div className="homeRows" ref={grid}>
          {KINDS.map(({ title, type }) => {
            const projects = [...ids].reverse().filter((id) => workMapping[id].type === type);
            const upcoming = upcomingWork.filter((project) => project.type === type);
            if (projects.length + upcoming.length === 0) return null;
            return (
              <ProjectRow key={title} label={title}>
                {projects.map((id) => (
                  <ProjectCard key={id} dataID={id} autoplay />
                ))}
                {upcoming.map(({ name }) => (
                  <UpcomingCard key={name} name={name} />
                ))}
              </ProjectRow>
            );
          })}
        </div>
      ) : (
        <div className="bento" ref={grid}>
          {rows.map((row, index) => (
            <div className="bentoRow" key={index}>
              {row.map((tile) =>
                tile === UPCOMING ? (
                  <div
                    key={tile}
                    className="bentoStack"
                    style={{ "--ratio": STACK_RATIO } as CSSProperties}
                  >
                    {upcomingWork.map(({ name }) => (
                      <UpcomingCard key={name} name={name} />
                    ))}
                  </div>
                ) : (
                  <div
                    key={tile}
                    className="bentoTile"
                    style={
                      {
                        "--ratio": parseFloat(workMapping[tile].videoFlex) || 1.6,
                      } as CSSProperties
                    }
                  >
                    <ProjectCard dataID={tile} />
                  </div>
                )
              )}
            </div>
          ))}
        </div>
      )}

      {/* the way on, for a reader who has seen the work: who made it -- after
          apple's "get to know mac" -- the timeline, the skillset and the
          links to reach me, all on about */}
      <section className="homeAbout">
        <h2 className="homeAboutTitle">get to know me</h2>
        <p className="homeAboutLine">the story, the stack, and how to reach out.</p>
        <Link
          to="/about"
          className="actionLink"
          onClick={(e) => {
            e.preventDefault();
            executeTransition("about");
          }}
        >
          <span className="label">
            about
            {/* → for a page on this site; ↗ is kept for leaving it */}
            <span className="arrow" aria-hidden="true">
              →
            </span>
          </span>
        </Link>
      </section>

      {/* the bento's alone: on the carousels the caption names each tile */}
      {!isMobile && <TileCursor within={grid} />}
    </main>
  );
}
