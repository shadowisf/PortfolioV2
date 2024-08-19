import { Cake, Glasses, GraduateHat, Location } from "../components/Icon";
import { TimelineRow } from "../components/Timeline";
import ProfilePicture from "../assets/ImageProfile.jpeg";

export default function About() {
  return (
    <main data-key="-2" className="aboutWrapper">
      <section className="bio">
        <img src={ProfilePicture}></img>
        <p>
          <b>les paul ranalan</b> is a final-year software engineering student
          that specializes in frontend development and ui/ux design. his design
          philosophy mostly centers around simplicity and minimalism, whilst
          keeping features functional and intuituve.
        </p>
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
