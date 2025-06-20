import { TimelineRow } from "../components/Timeline";
import { useEffect, useState } from "react";
import TechStackTile from "../components/TechStackTile";
import { LinkWithNoIcon } from "../components/Link";
import Spinner from "../components/Spinner";
import { useMemo } from "react";
import { useGlobalState } from "../providers/GlobalStateProvider";
import { useScrollingAnimation } from "../utils/gsap/useScrollingAnimation";
import { useAboutAnimation } from "../utils/gsap/useAboutAnimation";
import { skillsetRating } from "../utils/skillsetRating";
import { useGSAP } from "@gsap/react";
import { profilePicture } from "../utils/identitySetting";
import {
  IconBriefcase,
  IconCake,
  IconGlasses,
  IconGraduation,
  IconHandWave,
  IconPin,
} from "../utils/iconSetting";

export default function About() {
  const { scrollToTop } = useScrollingAnimation();
  const { startup, filterSkill, resetSkill, waveOnHover } = useAboutAnimation();
  const { setCurrentPage } = useGlobalState();

  const [imageLoading, setImageLoading] = useState(true);

  const shuffledSkills = useMemo(() => {
    return Object.keys(skillsetRating).sort(() => Math.random() - 0.5);
  }, []);

  useEffect(() => {
    setCurrentPage("about");
    scrollToTop(0);
  }, []);

  useGSAP(() => {
    startup();
  });

  return (
    <main className="aboutWrapper">
      <section className="bio">
        <div id="hs">
          <div className="intro">
            <h1 className="extra header">hey, i'm les!</h1>
            <span className="waveEmojiWrapper">
              <img
                className="waveEmoji"
                src={IconHandWave}
                onMouseEnter={waveOnHover}
              />
            </span>
          </div>
        </div>

        {imageLoading && <Spinner />}
        <img
          src={profilePicture}
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
                  src={IconHandWave}
                  onMouseEnter={waveOnHover}
                />
              </span>
            </div>
          </div>

          <br />

          <h2>
            i build functional, performant, and scalable apps — with a focus on
            long-term maintainability.
          </h2>

          <br />

          <p>
            my current tech stack includes next.js, react.js, typescript,
            scss/tailwind css, supabase, and sql. but i’m always open to new
            tools, frameworks, or languages — i adapt fast.
          </p>

          <br />

          <p>
            outside of code, i enjoy music, movies, games (when i have time),
            and getting lost in rabbit holes of{" "}
            <LinkWithNoIcon
              className="infoOnHover faded top"
              href="/memes"
              data-tooltip="there is where productivity goes to die"
            >
              memes
            </LinkWithNoIcon>
            .
          </p>

          <br />

          <p>
            i got into programming through{" "}
            <LinkWithNoIcon
              className="infoOnHover faded top alt"
              href="https://scratch.mit.edu"
              data-tooltip="it literally does not need type safety"
            >
              scratch
            </LinkWithNoIcon>{" "}
            in high school, where i made a pong game with drag-and-drop blocks.
            since then, i’ve been hooked ever since.
          </p>
        </div>
      </section>

      <section className="scrollPrompt">
        <p>scroll</p>
        <p>↓</p>
      </section>

      <section className="timelineAndSkillset">
        <section className="timeline">
          <h1 className="header">my life's arc</h1>

          <div className="timelineRows">
            <TimelineRow
              date="february 15, 2004"
              img={<img src={IconCake} />}
              verticalLine={true}
            >
              born in davao, philippines
            </TimelineRow>

            <TimelineRow
              date="may 12, 2012"
              img={<img src={IconPin} />}
              verticalLine={true}
            >
              moved to dubai, united arab emirates
            </TimelineRow>

            <TimelineRow
              date="april 6, 2018"
              img={<img src={IconGlasses} />}
              verticalLine={true}
            >
              acquired first pair of eyeglasses
            </TimelineRow>

            <TimelineRow
              date="september 3, 2022"
              img={<img src={IconGraduation} />}
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
              img={<img src={IconBriefcase} />}
              verticalLine={true}
            >
              worked as freelance full-stack web developer for whealthy vessel
            </TimelineRow>

            <TimelineRow
              date="may 8, 2025"
              img={<img src={IconGraduation} />}
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
              img={<img src={IconBriefcase} />}
              verticalLine={false}
            >
              worked as freelance full-stack web developer for let there be
              fragrance
            </TimelineRow>
          </div>
        </section>

        <section className="scrollPrompt mobile">
          <p>scroll</p>
          <p>↓</p>
        </section>

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
          </div>

          <div className="skills">
            {shuffledSkills.map((item, index) => {
              const level = skillsetRating[item];

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
