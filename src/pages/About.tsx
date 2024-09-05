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
} from "react-icons/ri";
import ProfilePicture from "../assets/ImageProfile.webp";
import ProfilePictureTiny from "../assets/ImageProfile_tiny.webp";
import { TimelineRow } from "../components/Timeline";
import { useEffect } from "react";
import { useGlobalState } from "../utils/ControlUtil";
import TechStackTile from "../components/TechStackTile";
import { aboutAnimation, scrollingAnimation } from "../utils/AnimationUtils";
import {
  LinkWithIcon,
  LinkWithIconOnly,
  LinkWithNoIcon,
} from "../components/Link";
import { getAllSkills, getSkillLevel, Views } from "../utils/AboutUtils";
import { useGSAP } from "@gsap/react";
import { cv, email, github, instagram, linkedin } from "../utils/SocialUtils";
import ProgressiveImg from "../components/ProgressiveImg";

export function getProfilePictureTiny() {
  return ProfilePictureTiny;
}
export function getProfilePicture() {
  return ProfilePicture;
}

export default function About() {
  const { scrollToTop } = scrollingAnimation();
  const { filterSkill, resetSkill, startup } = aboutAnimation();
  const { mobileView, desktopView } = Views();
  const { setCurrentPage, currentPage, isMobile } = useGlobalState();

  useEffect(() => {
    setCurrentPage("about");
    scrollToTop(0);
  }, []);

  useEffect(() => {
    isMobile ? mobileView() : desktopView();
  }, [isMobile, currentPage]);

  useGSAP(() => {
    startup();
  });

  return (
    <main className="aboutWrapper">
      <section className="bio">
        <ProgressiveImg
          realSrc={ProfilePicture}
          placeholderSrc={ProfilePictureTiny}
          alt="a picture of me"
          zoom={false}
        />
        <div className="content">
          <h1 className="extra header">hey, i'm les!</h1>
          <br />
          <h2>
            i'm all about creating functional, performant, scalable, and
            long-term apps.
          </h2>
          <br />
          <p>
            i primarily work with react, typescript, sass, gsap, firebase, and
            other libraries and frameworks. though i am highly flexible to
            different technologies and languages.
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

      <section className="timelineAndSkillset">
        <section className="timeline">
          <h1>my life's arc</h1>
          <div className="timelineRows">
            <TimelineRow
              date="february 15, 2004"
              img={<RiCake2Line size={40} fill="var(--accent-color)" />}
              verticalLine={true}
            >
              born in davao city, philippines
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
              first pair of eyeglasses
            </TimelineRow>

            <TimelineRow
              date="september 3, 2022"
              img={<RiGraduationCapLine size={40} fill="var(--accent-color)" />}
              verticalLine={true}
            >
              graduated{" "}
              <LinkWithNoIcon
                className="infoOnHover top alt"
                href="https://wincedu.uk"
                data-tooltip="western international college"
              >
                winc
              </LinkWithNoIcon>{" "}
              with diploma in general engineering
            </TimelineRow>

            <TimelineRow
              date="???"
              img={<RiGraduationCapLine size={40} fill="var(--accent-color)" />}
              verticalLine={false}
            >
              graduated{" "}
              <LinkWithNoIcon
                className="infoOnHover top alt"
                href="https://www.bolton.ac.uk"
                data-tooltip="university of bolton"
              >
                uob
              </LinkWithNoIcon>{" "}
              with bachelor in software engineering
            </TimelineRow>
          </div>
        </section>

        <section className="skillset">
          <h1>my skillset</h1>
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
            {getAllSkills().map((item, index) => {
              const level = getSkillLevel(item);

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
