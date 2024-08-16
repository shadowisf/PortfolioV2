import { Cake, Glasses, GraduateHat, Location } from "../components/Icon";
import { TimelineRow } from "../components/Timeline";

export default function About() {
  return (
    <main data-key="-2" className="aboutWrapper">
      <section>
        <div className="timeline">
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
    </main>
  );
}
