import { ProjectEntry } from "../utils/GODMODE";
import { GoPackage } from "react-icons/go";
import { RiGithubLine, RiFilePdf2Line } from "react-icons/ri";
import { LinkWithIcon } from "../components/Link";
//
import ImageApolloHospital from "../assets/ImageApolloHospital.webp";
import ImageTinyApolloHospital from "../assets/ImageApolloHospital_tiny.webp";
import VideoApolloHospital from "../assets/VideoApolloHospital.webm";
import FileApolloHospital from "../assets/FileApolloHospital.pdf";
//
const GitHubApolloHospital = "https://github.com/shadowisf/ApolloHospital";
const DemoApolloHospital = "https://apollohospital.pythonanywhere.com";

export const ApolloHospital: ProjectEntry = {
  name: "apollo hospital",
  year: "2023",
  techStack: [
    "flask",
    "*django",
    "*python",
    "javascript",
    "*html",
    "*bootstrap css",
    "*xampp",
    "mariadb",
    "pythonanywhere",
    "git",
  ],
  image: ImageApolloHospital,
  imageTiny: ImageTinyApolloHospital,
  imageFlex: "1.876047",
  imageAlt:
    "an image of the apollo hospital project; it is viewing the patient records section wherein it displays the list of patient information. additionally, the ui has buttons for CRUD operations.",
  video: VideoApolloHospital,
  videoFlex: "1.599074",
  description: (
    <>
      apollo hospital is a <u>web-based hospital management system</u> for
      managing patient, doctor, and staff records. it streamlines:
      <ul>
        <li>
          <b>core operations</b>: patient/doctor record management, appointment
          scheduling, prescription tracking, and billing.
        </li>
        <li>
          <b>user roles</b>: secure login for receptionists (crud operations),
          doctors (medical records), and staff (test reports).
        </li>
        <li>
          <b>data integrity</b>: mariadb database with relational tables
          (patient ↔ appointment ↔ doctor) and input validation to prevent
          duplicates/invalid entries.
        </li>
        <li>
          <b>workflow automation</b>: digitalized processes replace paper-based
          systems, reducing errors and improving accessibility.
        </li>
        <li>
          <b>responsive frontend</b>: bootstrap ui with dynamic tables, modals,
          and pdf report generation
        </li>
        <li>
          <b>robust backend</b>: flask routes handling crud operations with
          mysql-connector integration
        </li>
        <li>
          <b>error handling</b>: form validation, sql exception management, and
          duplicate entry prevention
        </li>
      </ul>
    </>
  ),
  myRole: (
    <>
      apollo hospital is a group project where i:
      <ul>
        <li>
          designed 10+ interactive webpages (html/css/bootstrap) with consistent
          ui/ux, including patient/appointment tables with search/filter
          functionality and modal forms for data entry and error callouts
          (javascript).
        </li>
        <li>
          architected mysql database schema (erd design) with xampp, ensuring
          referential integrity.
        </li>
        <li>
          implemented flask routes for data operations (e.g.,{" "}
          <code>@app.route('/add_patient', methods=['POST']</code>)
        </li>
        <li>
          added input validation (e.g., date formats) and error handling (sql
          exceptions).
        </li>
        <li>
          coordinated frontend-backend workflows (ajax calls, json responses)
          and documented api endpoints.
        </li>
      </ul>
      <br />
      this project enhanced my full-stack development skills while solving real
      healthcare management challenges through technology.
    </>
  ),
  links: (
    <>
      <LinkWithIcon
        img={<GoPackage size={24} />}
        href={DemoApolloHospital}
        onClick={() => {
          alert(
            "note: you have sign-up first and then login to test the app. click close to continue."
          );
        }}
      >
        live website
      </LinkWithIcon>

      <LinkWithIcon
        img={<RiGithubLine size={24} />}
        href={GitHubApolloHospital}
      >
        repository
      </LinkWithIcon>

      <LinkWithIcon
        img={<RiFilePdf2Line size={24} />}
        href={FileApolloHospital}
      >
        report
      </LinkWithIcon>
    </>
  ),
};
