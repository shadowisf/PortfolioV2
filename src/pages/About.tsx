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
  IconPHP,
  IconEye,
  IconUniversity,
  IconHandWave,
  IconUAE,
} from "../utils/iconSetting";

export default function About() {
  const { scrollToTop } = useScrollingAnimation();
  const { startup, filterSkill, resetSkill, waveOnHover } = useAboutAnimation();
  const { setCurrentPage, isMobile } = useGlobalState();

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
        {/* mobile header */}
        <div id="hs">
          <div className="intro">
            <h1 className="extra header">hey, i'm les!</h1>
            <span className="waveEmojiWrapper">
              <img
                alt="waving hand icon"
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
          {/* desktop header */}
          <div id="fs">
            <div className="intro">
              <h1 className="extra header">hey, i'm les!</h1>
              <span className="waveEmojiWrapper">
                <img
                  alt="waving hand icon"
                  className="waveEmoji"
                  src={IconHandWave}
                  onMouseEnter={waveOnHover}
                />
              </span>
            </div>
          </div>

          <br />

          <h4>
            i build functional, performant, and scalable apps — with a focus on
            long-term maintainability.
          </h4>

          <br />

          <p>
            my current tech stack includes next.js, typescript, scss, amazon web
            services (aws), and sql. but i’m always open to new tools,
            frameworks, or languages — i adapt fast.
          </p>

          <br />

          <p>
            outside of code, i enjoy music, movies, games (when i have time),
            and getting lost in rabbit holes of{" "}
            <LinkWithNoIcon
              className="infoOnHover faded top"
              href="/memes"
              data-tooltip={
                isMobile ? "" : "there is where productivity goes to die"
              }
            >
              memes
            </LinkWithNoIcon>
            .
          </p>

          <br />

          <p>
            i got into coding through{" "}
            <LinkWithNoIcon
              className="infoOnHover faded top"
              href="https://scratch.mit.edu"
              data-tooltip={
                isMobile ? "" : "it literally does not need type safety"
              }
            >
              scratch
            </LinkWithNoIcon>{" "}
            in high school, where i made a pong game with drag-and-drop blocks.
            since then, i’ve been hooked.
          </p>
        </div>
      </section>

      <section className="scrollPrompt">
        <p>scroll</p>
        <p>↓</p>
      </section>

      <section className="timelineAndSkillset">
        <section className="timeline">
          <h2 className="header">my life's arc</h2>

          <div className="timelineRows">
            <TimelineRow
              date="february 15, 2004"
              img={<img alt="philippines flag icon" src={IconPHP} />}
              verticalLine={true}
            >
              born in davao, philippines
            </TimelineRow>

            <TimelineRow
              date="may 12, 2012"
              img={<img alt="united arab emirates flag icon" src={IconUAE} />}
              verticalLine={true}
            >
              moved to dubai, united arab emirates
            </TimelineRow>

            <TimelineRow
              date="april 6, 2018"
              img={<img alt="eye icon" src={IconEye} />}
              verticalLine={true}
            >
              acquired first pair of eyeglasses
            </TimelineRow>

            <TimelineRow
              date="august 29, 2021 — september 3, 2022 "
              img={<img alt="university icon" src={IconUniversity} />}
              verticalLine={true}
            >
              graduated from{" "}
              <LinkWithNoIcon
                className="infoOnHover top"
                href="https://wincedu.uk"
                data-tooltip="western international college"
              >
                winc
              </LinkWithNoIcon>{" "}
              w/ diploma in engineering
            </TimelineRow>

            <TimelineRow
              date="february 5, 2025 — february 27, 2025"
              img={<img alt="briefcase icon" src={IconBriefcase} />}
              verticalLine={true}
            >
              worked remotely as freelance full-stack web developer @{" "}
              <LinkWithNoIcon
                className="infoOnHover top"
                data-tooltip="a premium & high-quality cookware company"
                href="/whealthy-vessel"
                sameTab={true}
              >
                whealthy vessel
              </LinkWithNoIcon>
            </TimelineRow>

            <TimelineRow
              date="september 19, 2022 — may 8, 2025"
              img={<img alt="university icon" src={IconUniversity} />}
              verticalLine={true}
            >
              graduated from{" "}
              <LinkWithNoIcon
                className="infoOnHover top"
                href="https://greatermanchester.ac.uk"
                data-tooltip="university of greater manchester"
              >
                uogm
              </LinkWithNoIcon>{" "}
              w/ bachelor of engineering (honours) in software engineering
            </TimelineRow>

            <TimelineRow
              date="may 12, 2025 — june 6, 2025"
              img={<img alt="briefcase icon" src={IconBriefcase} />}
              verticalLine={true}
            >
              worked remotely as freelance full-stack web developer @{" "}
              <LinkWithNoIcon
                className="infoOnHover top"
                data-tooltip="a unique & niche fragrance house company"
                href="/let-there-be-fragrance"
                sameTab={true}
              >
                let there be fragrance
              </LinkWithNoIcon>
            </TimelineRow>

            <TimelineRow
              date="june 30, 2025 — november 3, 2025"
              img={<img alt="briefcase icon" src={IconBriefcase} />}
              verticalLine={true}
            >
              worked on-site as full-time web developer @{" "}
              <LinkWithNoIcon
                className="infoOnHover top"
                data-tooltip="an award-winning design & build company"
                href="https://www.rayfitout.com"
              >
                rayfitout
              </LinkWithNoIcon>
            </TimelineRow>

            <TimelineRow
              date="november 3, 2025 — present"
              img={<img alt="briefcase icon" src={IconBriefcase} />}
              verticalLine={false}
            >
              promoted and working remotely as full-time software engineer @{" "}
              <LinkWithNoIcon
                className="infoOnHover top"
                data-tooltip="an award-winning design & build company"
                href="https://www.rayfitout.com"
              >
                rayfitout
              </LinkWithNoIcon>
            </TimelineRow>
          </div>
        </section>

        <section className="scrollPrompt mobile">
          <p>scroll</p>
          <p>↓</p>
        </section>

        <section className="skillset">
          <h2 className="header">my skillset</h2>

          <div className="filter">
            <label htmlFor="skillsetFilter">filter by skill level:</label>
            <select
              id="skillsetFilter"
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
