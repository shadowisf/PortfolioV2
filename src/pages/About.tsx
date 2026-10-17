import { TimelineRow } from "../components/Timeline";
import { useEffect } from "react";
import { ActionLink, InlineLink } from "../components/Link";
import { CompanyLink } from "../components/CompanyLink";
import { useMemo } from "react";
import { useGlobalState } from "../providers/GlobalStateProvider";
import { useScrollingAnimation } from "../utils/gsap/useScrollingAnimation";
import { SkillFilter } from "../components/SkillFilter";
import { skillsetRating } from "../utils/skillsetRating";
import {
// import { IconBriefcase, IconPHP, IconEye, IconUniversity, IconHandWave, IconUAE, IconCards, IconMailbox, IconOctopus } from "../utils/iconSetting";
  email,
  github,
  linkedin,
  resume,
} from "../utils/identitySetting";

export default function About() {
  const { scrollToTop } = useScrollingAnimation();
  const { setCurrentPage, isMobile } = useGlobalState();

  const shuffledSkills = useMemo(() => {
    return Object.keys(skillsetRating).sort(() => Math.random() - 0.5);
  }, []);

  useEffect(() => {
    setCurrentPage("about");
    scrollToTop(0);
  }, []);

  return (
    <main className="aboutWrapper">
      {/* who i am in a line, the longer version, then where to find me */}
      <section className="intro">
        {/* the waving hand, switched off for now (its wave was in
            useAboutAnimation.ts, now in git history; its size in main.scss):
        <span className="waveEmojiWrapper">
          <img
            alt="waving hand icon"
            className="waveEmoji"
            src={IconHandWave}
            onMouseEnter={waveOnHover}
          />
        </span> */}

        {/* the page's headline, apple's two-tone: the claim in full
            contrast, the qualifier after it in grey */}
        <h1 className="lede">
          <span className="emphasis">
            software engineer building functional, performant, and scalable
            apps;
          </span>{" "}
          with a focus on maintainability over the long term
        </h1>

        <div className="body">
          <p>
            i work across the stack with next.js, typescript, scss, amazon web
            services (aws), and sql. i also pick up new tools, frameworks, and
            languages quickly as projects require them.
          </p>
        </div>

        <div className="links">
          <ActionLink /* img={<img alt="resume icon" src={IconCards} />} */ href={resume}>
            resume
          </ActionLink>
          <ActionLink /* img={<img alt="mail icon" src={IconMailbox} />} */ href={email}>
            email
          </ActionLink>
          <ActionLink /* img={<img alt="briefcase icon" src={IconBriefcase} />} */ href={linkedin}>
            linkedin
          </ActionLink>
          <ActionLink /* img={<img alt="github icon" src={IconOctopus} />} */ href={github}>
            github
          </ActionLink>
        </div>
      </section>

      {/* the short facts as tiles, after apple's "at a glance" grids: role
          across the top, location and degree beneath */}
      <section className="glance">
        <h2 className="header">at a glance</h2>

        <div className="tiles">
          <div className="tile wide">
            <small>role</small>
            <p>
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
            </p>
          </div>
          <div className="tile">
            <small>location</small>
            <p>united arab emirates</p>
          </div>
          <div className="tile">
            <small>degree</small>
            <p>beng (hons) software engineering</p>
          </div>
        </div>
      </section>

      <section className="timeline">
        <h2 className="header">timeline</h2>

        <div className="timelineRows">
          <TimelineRow
            date="february 15, 2004"
            /* img={<img alt="philippines flag icon" src={IconPHP} />} */
          >
            born in davao, philippines
          </TimelineRow>

          <TimelineRow
            date="may 12, 2012"
            /* img={<img alt="united arab emirates flag icon" src={IconUAE} />} */
          >
            moved to dubai, united arab emirates
          </TimelineRow>

          {/* <TimelineRow
            date="april 6, 2018"
            img={<img alt="eye icon" src={IconEye} />}
          >
            acquired first pair of eyeglasses
          </TimelineRow> */}

          <TimelineRow
            date="august 29, 2021 - september 3, 2022 "
            /* img={<img style={{ marginBottom: "7px" }} alt="university icon" src={IconUniversity} />} */
          >
            acquired diploma in engineering from{" "}
            <InlineLink
              className="infoOnHover top"
              href="https://wincedu.uk"
              data-tooltip={isMobile ? "" : "western international college"}
            >
              winc
            </InlineLink>
          </TimelineRow>

          <TimelineRow
            date="february 5, 2025 - february 27, 2025"
            /* img={<img style={{ marginBottom: "6px" }} alt="briefcase icon" src={IconBriefcase} />} */
          >
            worked as full-stack developer at{" "}
            <CompanyLink name="whealthy vessel" />
            <span className="metaDot" aria-hidden="true">·</span>
            remote
          </TimelineRow>

          <TimelineRow
            date="september 19, 2022 - may 8, 2025"
            /* img={<img style={{ marginBottom: "7px" }} alt="university icon" src={IconUniversity} />} */
          >
            acquired beng (hons) in software engineering from{" "}
            <InlineLink
              className="infoOnHover top"
              href="https://greatermanchester.ac.uk"
              data-tooltip={
                isMobile ? "" : "university of greater manchester"
              }
            >
              uogm
            </InlineLink>
          </TimelineRow>

          <TimelineRow
            date="may 12, 2025 - june 6, 2025"
            /* img={<img style={{ marginBottom: "6px" }} alt="briefcase icon" src={IconBriefcase} />} */
          >
            worked as full-stack developer at{" "}
            <CompanyLink name="let there be fragrance" />
            <span className="metaDot" aria-hidden="true">·</span>
            remote
          </TimelineRow>

          <TimelineRow
            date="june 30, 2025 - november 3, 2025"
            /* img={<img style={{ marginBottom: "6px" }} alt="briefcase icon" src={IconBriefcase} />} */
          >
            worked as web developer at{" "}
            <InlineLink
              className="infoOnHover top"
              data-tooltip={
                isMobile ? "" : "an award-winning design & build company"
              }
              href="https://www.rayfitout.com"
            >
              rayfitout
            </InlineLink>
            <span className="metaDot" aria-hidden="true">·</span>
            on site
          </TimelineRow>

          <TimelineRow
            date="november 3, 2025 - june 8, 2026"
            /* img={<img style={{ marginBottom: "6px" }} alt="briefcase icon" src={IconBriefcase} />} */
          >
            promoted to software engineer at{" "}
            <InlineLink
              className="infoOnHover top"
              data-tooltip={
                isMobile ? "" : "an award-winning design & build company"
              }
              href="https://www.rayfitout.com"
            >
              rayfitout
            </InlineLink>
            <span className="metaDot" aria-hidden="true">·</span>
            remote
          </TimelineRow>

          <TimelineRow
            date="july 27, 2026 - present"
            /* img={<img style={{ marginBottom: "6px" }} alt="briefcase icon" src={IconBriefcase} />} */
          >
            working as full-stack developer at{" "}
            <InlineLink
              className="infoOnHover top"
              data-tooltip={
                isMobile ? "" : "an award-winning raw pet nutrition company"
              }
              href="https://furchildpets.com/"
            >
              furchild
            </InlineLink>
            <span className="metaDot" aria-hidden="true">·</span>
            on site
          </TimelineRow>

          {/* <TimelineRow
            date="???"
            img={<img alt="briefcase icon" src={IconBriefcase} />}
          >
            acquired driving license
          </TimelineRow> */}
        </div>
      </section>

      <section className="skillset">
        <h2 className="header">skillset</h2>

        {/* filtered by level with a segmented control (SkillFilter) */}
        <SkillFilter
          items={shuffledSkills}
          className="skills"
          label="filter by skill level"
        />
      </section>
    </main>
  );
}
