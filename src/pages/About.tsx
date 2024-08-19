import { Cake, Glasses, GraduateHat, Location } from "../components/Icon";
import { TimelineRow } from "../components/Timeline";
import ProfilePicture from "../assets/ImageProfile.jpeg";
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
        <img className="noCursor" loading="lazy" src={ProfilePicture} />
        <div>
          <h1 className="accent extra">hey, i'm les!</h1>
          <br />
          <h4>
            i’m passionate about designing functional applications, with a
            strong focus on performance, scalability, and long-term viability of
            projects.
          </h4>
          <br />
          <p>
            i primarily work with react, typescript, gsap, firebase, sql, and
            other libraries and frameworks. though i am highly adaptable to
            different technologies and languages based on project requirements.
          </p>
        </div>
      </section>

      <section className="timeline">
        <h1 className="extra">my life's arc</h1>
        <div>
          <TimelineRow img={<Cake />} verticalLine={true}>
            born in davao city, philippines <br /> <b>february 15, 2004</b>
          </TimelineRow>

          <TimelineRow img={<Location />} verticalLine={true}>
            moved to dubai, united arab emirates <br /> <b>may 12, 2012</b>
          </TimelineRow>

          <TimelineRow img={<Glasses />} verticalLine={true}>
            first pair of eyeglasses <br /> <b>april 6, 2018</b>
          </TimelineRow>

          <TimelineRow img={<GraduateHat />} verticalLine={false}>
            graduated uob with bachelor in swe <br /> <b>???</b>
          </TimelineRow>
        </div>
      </section>

      <section className="skillset">
        <h1>my skillset</h1>
        <div></div>
      </section>
    </main>
  );
}
