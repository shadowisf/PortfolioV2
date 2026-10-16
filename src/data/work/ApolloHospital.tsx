import { WorkEntry } from "../../utils/types/WorkEntry";
import { ActionLink } from "../../components/Link";
// import { IconGlobe, IconCards, IconOctopus } from "../../utils/iconSetting";
//
import ImageApolloHospital from "@/assets/images/ImageApolloHospital.webp";
import VideoApolloHospital from "@/assets/videos_master/VideoApolloHospital.webm";
import VideoApolloHospitalPreview from "@/assets/video_previews/VideoApolloHospital.webm";
import VideoApolloHospitalPoster from "@/assets/video_posters/VideoApolloHospital.webp";
import FileApolloHospital from "@/assets/files/FileApolloHospital.pdf";
//
const GitHubApolloHospital = "https://github.com/shadowisf/ApolloHospital";
const DemoApolloHospital = "https://apollohospital.pythonanywhere.com";

export const ApolloHospital: WorkEntry = {
  type: "personal project",
  name: "apollo",
  year: "2023",
  tagline: "a hospital management system",
  techStack: [
    "*django",
    "*python",
    "javascript",
    "*bootstrap css",
    "*xampp",
    "*mariadb",
    "*pythonanywhere",
    "git",
  ],
  keyStack: ["bootstrap css", "django", "mariadb"],
  image: ImageApolloHospital,
  imageFlex: "1.876047",
  imageAlt:
    "an image of the apollo hospital project; it is viewing the patient records section wherein it displays the list of patient information. additionally, the ui has buttons for CRUD operations.",
  video: VideoApolloHospital,
  videoPreview: VideoApolloHospitalPreview,
  videoPoster: VideoApolloHospitalPoster,
  videoFlex: "1.599074",
  status: (
    <>
      completed on <u>december 20, 2023</u>.
    </>
  ),
  description: (
    <>
      a <u>web-based hospital management system</u> for managing patient,
      doctor, and staff records. key features include:
      <ul>
        <li>
          <b>dynamic workflow:</b> starts from patient registration →
          receptionist → doctor appointments → laboratory → prescriptions →
          billing.
        </li>
        <li>
          <b>downloadable records:</b> pdf export of patient records for easy
          reference and sharing.
        </li>
        <li>
          <b>role-based dashboards & authentication:</b> each user has secure
          login credentials with access and create/read/update/delete (crud)
          privileges based on their role.
        </li>
        <li>
          <b>simple ui & layout:</b> straightforward tables and clear interface
          for fast navigation and usability.
        </li>
      </ul>
    </>
  ),
  myRole: (
    <>
      working alongside other developers, i handled the following:
      <ul>
        <li>
          designed 10+ interactive webpages (html/css/bootstrap) with consistent
          ui/ux, including patient/appointment tables with search/filter
          functionality and modal forms for data entry and error callouts
          (javascript).
        </li>
        <li>
          architected mysql database schema via entity-relationship diagram
          (erd) with xampp, ensuring referential integrity.
        </li>
        <li>
          implemented flask routes for data operations (e.g.,{" "}
          <code>..app.route('/add_patient', methods=['POST']</code>).
        </li>
        <li>
          added input validation (e.g., date formats) and error handling (sql
          exceptions, duplicate prevention).
        </li>
        <li>
          coordinated frontend-backend workflows (ajax calls, json responses),
          pdf report generation, and documented api endpoints.
        </li>
        <li>
          ensured each user role (patient, receptionist, doctor, staff) had a
          dedicated dashboard with full CRUD operations.
        </li>
      </ul>
      <br />
      this project enhanced my full-stack development skills while solving real
      healthcare management challenges through technology.
    </>
  ),
  links: (
    <>
      <ActionLink /* img={<img alt="globe icon" src={IconGlobe} />} */
        href={DemoApolloHospital}
      >
        live website
      </ActionLink>

      <ActionLink /* img={<img alt="octopus icon" src={IconOctopus} />} */
        href={GitHubApolloHospital}
      >
        source code
      </ActionLink>

      <ActionLink /* img={<img alt="cards icon" src={IconCards} />} */
        href={FileApolloHospital}
      >
        case study
      </ActionLink>
    </>
  ),
};
