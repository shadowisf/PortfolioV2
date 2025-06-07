import ProfilePicture from "../assets/ImageProfile.webp";
import { TimelineRow } from "../components/Timeline";
import { useEffect, useState } from "react";
import TechStackTile from "../components/TechStackTile";
import { LinkWithNoIcon } from "../components/Link";
import { aboutSkillset } from "../utils/_GODMODE";
import Spinner from "../components/Spinner";
import { useMemo } from "react";
import { useGlobalState } from "../utils/ControlUtils";
import { useScrollingAnimation } from "../utils/useScrollingAnimation";
import { useAboutAnimation } from "../utils/useAboutAnimation";

export default function About() {
  const { scrollToTop } = useScrollingAnimation();
  const { filterSkill, resetSkill, waveOnHover } = useAboutAnimation();
  const { setCurrentPage } = useGlobalState();

  const [imageLoading, setImageLoading] = useState(true);

  const shuffledSkills = useMemo(() => {
    return Object.keys(aboutSkillset).sort(() => Math.random() - 0.5);
  }, []);

  useEffect(() => {
    setCurrentPage("about");
    scrollToTop(0);
  }, []);

  return (
    <main className="aboutWrapper">
      <section className="bio">
        <div id="hs">
          <div className="intro">
            <h1 className="extra header">hey, i'm les!</h1>
            <span className="waveEmojiWrapper">
              <img
                className="waveEmoji"
                src="src/assets/IconHandWave.svg"
                onMouseEnter={waveOnHover}
              />
            </span>
          </div>
        </div>

        {imageLoading && <Spinner />}
        <img
          src={ProfilePicture}
          alt={"a picture of me"}
          data-action="zoom"
          onLoad={() => setImageLoading(false)}
          style={{ display: imageLoading ? "none" : "block" }}
          className="profilePicture"
        />

        <div className="content">
          <div id="fs">
            <div className="intro">
              <h1 className="extra header">hey, i'm les!</h1>
              <span className="waveEmojiWrapper">
                <img
                  className="waveEmoji"
                  src="src/assets/IconHandWave.svg"
                  onMouseEnter={waveOnHover}
                />
              </span>
            </div>
          </div>

          <br />

          <h2>
            i'm all about creating functional, performant, scalable, and
            long-term apps.
          </h2>

          <br />

          <p>
            i primarily work with next.js, react.js, typescript, scss/tailwind
            css, supabase, and sql. though i am highly flexible to different
            frameworks/libraries and programming languages.
          </p>

          <br />

          <p>
            outside of coding, i play video games (which i rarely do nowadays
            lol), listen to music, bingewatch tv shows/movies, and doomscroll
            for{" "}
            <LinkWithNoIcon className="faded" href="/memes">
              memes
            </LinkWithNoIcon>
            .
          </p>

          <br />

          <p>
            i first got into coding when i was introduced to scratch, a visual
            programming language, during high school where i built a pong game
            using drag-and-drop blocks of different functions. i quickly fell in
            love with the idea, and one thing led to the next.
          </p>
        </div>
      </section>

      {/* <section className="scrollPrompt">
        <p>scroll</p>
        <p>↓</p>
      </section> */}

      <section className="timelineAndSkillset">
        <section className="timeline">
          <h1 className="header">my life's arc</h1>

          <div className="timelineRows">
            <TimelineRow
              date="february 15, 2004"
              img={<img src="src/assets/IconCake.svg" />}
              verticalLine={true}
            >
              born in davao, philippines
            </TimelineRow>

            <TimelineRow
              date="may 12, 2012"
              img={<img src="src/assets/IconPin.svg" />}
              verticalLine={true}
            >
              moved to dubai, united arab emirates
            </TimelineRow>

            <TimelineRow
              date="april 6, 2018"
              img={<img src="src/assets/IconGlasses.svg" />}
              verticalLine={true}
            >
              acquired first pair of eyeglasses
            </TimelineRow>

            <TimelineRow
              date="september 3, 2022"
              img={<img src="src/assets/IconGraduation.svg" />}
              verticalLine={true}
            >
              graduated from{" "}
              <LinkWithNoIcon
                className="infoOnHover top alt"
                href="https://wincedu.uk"
                data-tooltip="western international college"
              >
                winc
              </LinkWithNoIcon>{" "}
              with diploma in engineering
            </TimelineRow>

            <TimelineRow
              date="february 5, 2025"
              img={<img src="src/assets/IconBriefcase.svg" />}
              verticalLine={true}
            >
              worked as part-time full-stack web developer for whealthy vessel
            </TimelineRow>

            <TimelineRow
              date="may 8, 2025"
              img={<img src="src/assets/IconGraduation.svg" />}
              verticalLine={true}
            >
              graduated from{" "}
              <LinkWithNoIcon
                className="infoOnHover top alt"
                href="https://www.bolton.ac.uk"
                data-tooltip="university of greater manchester"
              >
                uogm
              </LinkWithNoIcon>{" "}
              with beng (hons) software engineering
            </TimelineRow>

            <TimelineRow
              date="may 12, 2025"
              img={<img src="src/assets/IconBriefcase.svg" />}
              verticalLine={false}
            >
              worked as part-time full-stack web developer for let there be
              fragrance
            </TimelineRow>
          </div>
        </section>

        {/* <section className="scrollPrompt mobile">
          <p>scroll</p>
          <p>↓</p>
        </section> */}

        <section className="skillset">
          <h1 className="header">my skillset</h1>

          <div className="filter">
            <span>filter by skill level:</span>
            <select
              onMouseDown={(e) => resetSkill(e)}
              onChange={(e) => filterSkill(e)}
            >
              <option value={"0"}>all</option>
              <option value={"3"}>expert</option>
              <option value={"2"}>intermediate</option>
              <option value={"1"}>beginner</option>
            </select>
            <small>(try it :p)</small>
          </div>

          <div className="skills">
            {shuffledSkills.map((item, index) => {
              const level = aboutSkillset[item];

              return (
                <TechStackTile
                  techStackItem={item}
                  classNameContainer="item"
                  classNameIcon="icon"
                  key={index}
                  dataKey={level.toString()}
                  preview={false}
                />
              );
            })}
          </div>
        </section>
      </section>
    </main>
  );
}
