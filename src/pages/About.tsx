import {
  RiCake2Line,
  RiMapPinLine,
  RiGlasses2Line,
  RiGraduationCapLine,
  RiFilePdf2Line,
  RiGithubLine,
  RiInstagramLine,
  RiLinkedinBoxLine,
  RiMailLine,
  RiBriefcaseLine,
} from "react-icons/ri";
import ProfilePicture from "../assets/ImageProfile.webp";
import { TimelineRow } from "../components/Timeline";
import { useEffect, useState } from "react";
import { useGlobalState } from "../utils/ControlUtils";
import TechStackTile from "../components/TechStackTile";
import { aboutAnimation, scrollingAnimation } from "../utils/AnimationUtils";
import {
  LinkWithIcon,
  LinkWithIconOnly,
  LinkWithNoIcon,
} from "../components/Link";
import { useGSAP } from "@gsap/react";
import {
  aboutSkillset,
  cv,
  email,
  github,
  instagram,
  linkedin,
} from "../utils/_GODMODE";
import Spinner from "../components/Spinner";

export default function About() {
  const { scrollToTop } = scrollingAnimation();
  const { filterSkill, resetSkill, startup } = aboutAnimation();
  const { setCurrentPage } = useGlobalState();

  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    setCurrentPage("about");
    scrollToTop(0);
  }, []);

  useGSAP(() => {
    startup();
  });

  return (
    <>
      <main className="aboutWrapper">
        <section className="bio">
          <h1 id="hs" className="extra header">
            hey, i'm les!
          </h1>

          {imageLoading && <Spinner />}
          <img
            src={ProfilePicture}
            alt={"a picture of me"}
            data-action="zoom"
            onLoad={() => setImageLoading(false)}
            style={{ display: imageLoading ? "none" : "block" }}
          />

          <div className="content">
            <h1 id="fs" className="extra header">
              hey, i'm les!
            </h1>

            <br />

            <h2>
              i'm all about creating functional, performant, scalable, and
              long-term apps.
            </h2>

            <br />

            <p>
              i primarily work with next.js, react.js, typescript, scss,
              supabase, postgresql, and other libraries/frameworks. though i am
              highly flexible to different technologies and programming
              languages.
            </p>

            <br />

            <p>
              outside of coding, i play video games (which i rarely do nowadays
              lol), listen to music, and bingewatch tv shows/movies.
            </p>

            <br />

            <div className="links">
              <span>
                <LinkWithIcon img={<RiFilePdf2Line size={24} />} href={cv}>
                  view cv
                </LinkWithIcon>
              </span>

              <span className="icons">
                <LinkWithIconOnly
                  img={<RiMailLine size={32} />}
                  href={email}
                  label="email"
                />

                <LinkWithIconOnly
                  img={<RiLinkedinBoxLine size={32} />}
                  href={linkedin}
                  label="linkedin"
                />

                <LinkWithIconOnly
                  img={<RiInstagramLine size={32} />}
                  href={instagram}
                  label="instagram"
                />

                <LinkWithIconOnly
                  img={<RiGithubLine size={32} />}
                  href={github}
                  label="github"
                />
              </span>
            </div>
          </div>
        </section>

        <section className="scrollPrompt">
          <p>scroll down</p>
          <p>↓</p>
        </section>

        <section className="timelineAndSkillset">
          <section className="timeline">
            <h1 className="header">my life's arc</h1>

            <div className="timelineRows">
              <TimelineRow
                date="february 15, 2004"
                img={<RiCake2Line size={40} fill="var(--accent-color)" />}
                verticalLine={true}
              >
                born in davao, philippines
              </TimelineRow>

              <TimelineRow
                date="may 12, 2012"
                img={<RiMapPinLine size={40} fill="var(--accent-color)" />}
                verticalLine={true}
              >
                moved to dubai, united arab emirates
              </TimelineRow>

              <TimelineRow
                date="april 6, 2018"
                img={<RiGlasses2Line size={40} fill="var(--accent-color)" />}
                verticalLine={true}
              >
                acquired first pair of eyeglasses
              </TimelineRow>

              <TimelineRow
                date="september 3, 2022"
                img={
                  <RiGraduationCapLine size={40} fill="var(--accent-color)" />
                }
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
                with international diploma in engineering
              </TimelineRow>

              <TimelineRow
                date="february 5, 2025"
                img={<RiBriefcaseLine size={40} fill="var(--accent-color)" />}
                verticalLine={true}
              >
                working as part-time full-stack web developer for whealthy
                vessel
              </TimelineRow>

              <TimelineRow
                date="may 8, 2025"
                img={
                  <RiGraduationCapLine size={40} fill="var(--accent-color)" />
                }
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
                img={<RiBriefcaseLine size={40} fill="var(--accent-color)" />}
                verticalLine={false}
              >
                working as part-time full-stack web developer for let there be
                fragrance
              </TimelineRow>
            </div>
          </section>

          <section className="scrollPrompt mobile">
            <p>scroll down</p>
            <p>↓</p>
          </section>

          <section className="skillset">
            <h1 className="header">my skillset</h1>

            <div className="filter">
              <span>filter:</span>
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
              {Object.keys(aboutSkillset)
                .sort(() => Math.random() - 0.5) // Shuffle keys
                .map((item, index) => {
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
    </>
  );
}
