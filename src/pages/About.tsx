import {
  RiCake2Line,
  RiMapPinLine,
  RiGlasses2Line,
  RiGraduationCapLine,
  RiFilePdf2Line,
} from "react-icons/ri";
import ProfilePicture from "../assets/ImageProfile.jpeg";
import { TimelineRow } from "../components/Timeline";
import { getAboutSkillset } from "../utils/ProjectUtils";
import { useEffect } from "react";
import { useGlobalState } from "../utils/ControlUtil";
import ArchitectureTile from "../components/ArchitectureTile";
import { aboutAnimation, scrollingAnimation } from "../utils/AnimationUtils";
import { LinkWithIcon } from "../components/Link";
import CV from "../assets/FileCV.PDF";

export default function About() {
  const { setCurrentPage, isMobile } = useGlobalState();
  const { scrollToTop } = scrollingAnimation();
  const bioHeader = document.querySelector(".aboutWrapper .bioHeader");
  const bioContainer = document.querySelector(".aboutWrapper .bio");
  const bioTextContainer = document.querySelector(".aboutWrapper .bio .text");

  const skillsetHeader = document.querySelector(".aboutWrapper .skillset h1");
  const timelineHeader = document.querySelector(".aboutWrapper .timeline h1");

  const { filterSkillset, resetSkillset } = aboutAnimation();

  useEffect(() => {
    setCurrentPage("about");
    scrollToTop(0);
  }, []);

  useEffect(() => {
    if (isMobile) {
      mobileView();
    }

    return () => {
      desktopView();
    };
  }, [isMobile]);

  function mobileView() {
    bioContainer?.prepend(bioHeader ? bioHeader : "");

    skillsetHeader?.classList.add("extra");
    timelineHeader?.classList.add("extra");
  }

  function desktopView() {
    bioTextContainer?.prepend(bioHeader ? bioHeader : "");

    skillsetHeader?.classList.remove("extra");
    timelineHeader?.classList.remove("extra");
  }

  return (
    <main className="aboutWrapper">
      <section className="bio">
        <img loading="lazy" src={ProfilePicture} />
        <div>
          <h1 className="extra accent bioHeader">hey, i'm les!</h1>
          <br />
          <h4>
            i'm all about creating functional, performant, scalable, and
            long-term apps.
          </h4>
          <br />
          <p className="faded">
            i primarily work with react, typescript, sass, gsap, firebase, and
            other libraries and frameworks. though i am highly flexible to
            different technologies and languages.
          </p>
          <br />
          <p className="faded">
            outside of coding, i play video games (which i rarely do nowadays
            lol), listen to music, or bingewatch tv shows/movies.
          </p>
          <br />
          <div className="links">
            <LinkWithIcon img={<RiFilePdf2Line size={24} />} href={CV}>
              download resume
            </LinkWithIcon>
          </div>
        </div>
      </section>

      <section className="timelineAndSkillset">
        <section className="timeline">
          <h1>my life's arc</h1>
          <div>
            <TimelineRow
              img={<RiCake2Line size={40} fill="var(--accent-color)" />}
              verticalLine={true}
            >
              born in davao city, philippines <br />
              <span className="faded">february 15, 2004</span>
            </TimelineRow>

            <TimelineRow
              img={<RiMapPinLine size={40} fill="var(--accent-color)" />}
              verticalLine={true}
            >
              moved to dubai, united arab emirates <br />
              <span className="faded">may 12, 2012</span>
            </TimelineRow>

            <TimelineRow
              img={<RiGlasses2Line size={40} fill="var(--accent-color)" />}
              verticalLine={true}
            >
              first pair of eyeglasses <br />
              <span className="faded">april 6, 2018</span>
            </TimelineRow>

            <TimelineRow
              img={<RiGraduationCapLine size={40} fill="var(--accent-color)" />}
              verticalLine={false}
            >
              graduated uob with bachelor in swe <br />
              <span className="faded">???</span>
            </TimelineRow>
          </div>
        </section>

        <section className="skillset">
          <div className="header">
            <h1>my skillset</h1>
            <select
              onMouseDown={(e) => resetSkillset(e)}
              onChange={(e) => filterSkillset(e)}
            >
              <option value={"-1"}>all</option>
              <option value={"3"}>expert</option>
              <option value={"2"}>intermediate</option>
              <option value={"1"}>beginner</option>
            </select>
          </div>
          <div className="skills">
            {getAboutSkillset().map((item) => {
              return (
                <ArchitectureTile
                  architecture={item}
                  classNameContainer="item"
                  classNameIcon="icon"
                  key={item}
                  dataKey={item}
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
