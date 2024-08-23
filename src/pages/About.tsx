import {
  RiCake2Line,
  RiMapPinLine,
  RiGlasses2Line,
  RiGraduationCapLine,
} from "react-icons/ri";
import ProfilePicture from "../assets/ImageProfile.jpeg";
import { TimelineRow } from "../components/Timeline";
import { getAboutSkillset } from "../utils/ProjectUtils";
import { ChangeEvent, useEffect } from "react";
import { useGlobalState } from "../utils/ControlUtil";
import gsap from "gsap";
import { Flip } from "gsap/all";
import ArchitectureTile from "../components/ArchitectureTile";

gsap.registerPlugin(Flip);

export default function About() {
  const { setCurrentPage, isMobile } = useGlobalState();
  const bioHeader = document.querySelector(".aboutWrapper .bioHeader");
  const bioContainer = document.querySelector(".aboutWrapper .bio");
  const bioTextContainer = document.querySelector(".aboutWrapper .bio .text");

  const skillsetHeader = document.querySelector(".aboutWrapper .skillset h1");
  const timelineHeader = document.querySelector(".aboutWrapper .timeline h1");

  useEffect(() => {
    setCurrentPage("about");
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

  function getSkillsetValue(event: ChangeEvent<HTMLSelectElement>) {
    const selectedValue = event.target.value;
    const allSkills = gsap.utils.toArray(".skills .item") as HTMLElement[];

    const state = Flip.getState(allSkills);

    if (selectedValue === "-1") {
      allSkills.forEach((skill) => {
        skill.style.display = "flex";
      });
    } else {
      allSkills.forEach((skill) => {
        const dataKey = skill.getAttribute("data-key");

        if (dataKey?.startsWith(selectedValue)) {
          skill.style.display = "flex";
        } else {
          skill.style.display = "none";
        }
      });
    }

    Flip.from(state, {
      duration: 0.7,
      ease: "power2.inOut",
      stagger: 0.08,
      absolute: true,
      onEnter: (elements) =>
        gsap.fromTo(
          elements,
          { opacity: 0, scale: 0 },
          { opacity: 1, scale: 1, duration: 1 }
        ),
      onLeave: (elements) =>
        gsap.to(elements, { opacity: 0, scale: 0, duration: 1 }),
    });
  }

  return (
    <main className="aboutWrapper">
      <section className="bio">
        <img loading="lazy" src={ProfilePicture} />
        <div className="text">
          <h1 className="extra accent bioHeader">hey, i'm les!</h1>
          <br />
          <h4>
            i'm all about designing functional apps with a focus on performance,
            scalability, and long-term viability.
          </h4>
          <br />
          <p className="faded">
            i primarily work with react, typescript, gsap, firebase, mysql, and
            other libraries and frameworks. though i am highly flexible to
            different technologies and languages based on requirements.
          </p>
          <br />
          <p className="faded">
            outside of coding, i play video games (which i rarely do lol) with
            my friends, listen to music, or bingewatch tv shows/movies on
            netflix.
          </p>
        </div>
      </section>

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
          <select onChange={(e) => getSkillsetValue(e)}>
            <option value={"-1"}>all</option>
            <option value={"3"}>expert</option>
            <option value={"2"}>intermediate</option>
            <option value={"1"}>beginner</option>
            <option value={"0"}>planning to learn</option>
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
    </main>
  );
}
