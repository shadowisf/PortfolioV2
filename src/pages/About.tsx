import {
  RiCake2Line,
  RiMapPinLine,
  RiGlasses2Line,
  RiGraduationCapLine,
} from "react-icons/ri";
import ProfilePicture from "../assets/ImageProfile.jpeg";
import { TimelineRow } from "../components/Timeline";
import {
  getAboutSkillset,
  architectureColors,
  architectureIcons,
} from "../utils/ProjectUtils";
import { useEffect } from "react";
import { useGlobalState } from "../utils/ControlUtil";

export default function About() {
  const { setCurrentPage } = useGlobalState();

  useEffect(() => {
    setCurrentPage("about");
  }, []);

  return (
    <main className="aboutWrapper">
      <section className="bio">
        <h1 className="accent mobileHeader">hey, i'm les!</h1>
        <br className="mobileHeader" />
        <img className="desktopImg" loading="lazy" src={ProfilePicture} />
        <div className="text">
          <h1 className="accent desktopHeader">hey, i'm les!</h1>
          <br />
          <h4>
            i'm all about designing functional apps with a focus on performance,
            scalability, and long-term viability.
          </h4>
          <br />
          <p className="faded">
            i primarily work with react, typescript, gsap, firebase, sql, and
            other libraries and frameworks. though i am highly flexible to
            different technologies and languages based on requirements.
          </p>
          <br />
          <p className="faded">
            outside of coding, i play video games (which i rarely do) with my
            friends, listen to music, or bingewatch tv shows or movies on
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
          <select>
            <option value="all" selected>
              all
            </option>
            <option value="expert">expert</option>
            <option value="intermediate">intermediate</option>
            <option value="learning">learning</option>
          </select>
        </div>
        <div className="skills">
          {getAboutSkillset().map((item) => {
            const color = architectureColors[item];
            const icon = architectureIcons[item];

            return (
              <span className="item" key={item} style={{ background: color }}>
                <span className="icon">{icon}</span>
                {item}
              </span>
            );
          })}
        </div>
      </section>
    </main>
  );
}
