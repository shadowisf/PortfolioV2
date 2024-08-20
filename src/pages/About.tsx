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
        <h1 className="accent mobileHeader">hey, i'm les!</h1>
        <br className="mobileHeader" />
        <img className="desktopImg" loading="lazy" src={ProfilePicture} />
        <div>
          <h1 className="accent desktopHeader">hey, i'm les!</h1>
          <br />
          <h4>
            i'm all about designing functional apps with a focus on performance,
            scalability, and long-term viability.
          </h4>
          <br />
          <p>
            i primarily work with react, typescript, gsap, firebase, sql, and
            other libraries and frameworks. though i am highly flexible to
            different technologies and languages based on requirements.
          </p>
          <br />
          <p>
            outside of coding, i play video games (which i rarely do) with my
            friends, listen to music, or bingewatch tv shows or movies on
            netflix.
          </p>
        </div>
      </section>

      <section className="timeline">
        <h1>my life's arc</h1>
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
        <div className="skills">
          <span>typescript</span>
          <span>javascript</span>
          <span>java</span>
          <span>python</span>
          <span>c#</span>
          <span>html</span>
          <span>css</span>
          <span>sass</span>
          <span>sql</span>
          <span>firebase</span>
        </div>
      </section>
    </main>
  );
}
