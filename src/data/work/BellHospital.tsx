import { WorkEntry } from "../../utils/types/WorkEntry";
import { LinkWithIcon } from "../../components/Link";
import { IconCards, IconOctopus } from "../../utils/iconSetting";
//
import ImageBellHospital from "@/assets/ImageBellHospital.webp";
import VideoBellHospital from "@/assets/VideoBellHospital.webm";
import FileBellHospital from "@/assets/FileBellHospital.pdf";
//
const GitHubBellHospital = "https://github.com/shadowisf/BellHospital";

export const BellHospital: WorkEntry = {
  type: "personal project",
  name: "bell hospital",
  year: "2022",
  techStack: ["*java", "*cli", "*file handling", "git"],
  image: ImageBellHospital,
  imageFlex: "1.518182",
  imageAlt:
    "an image of the bell hospital project. it is currently viewing the patients records section where it is displaying all patient information (note that this is a CLI project). additionally, there are commands for CRUD operations.",
  video: VideoBellHospital,
  videoFlex: "1.598148",
  status: (
    <>
      bell hospital was completed on <u>december 21, 2022</u>.
    </>
  ),
  description: (
    <>
      bell hospital is a <u>cli-based hospital management system</u> built with
      java to streamline healthcare administration. the system combines oop
      principles with practical file-based persistence to manage:
      <ul>
        <li>
          <b>core entities</b>: patient/doctor records, appointment scheduling
          (linking entities), and medicine inventory (tracking dosage/expiry).
        </li>
        <li>
          <b>oop implementation</b>: encapsulation via self-contained classes
          (patient, doctor, etc.), reusable modules for file i/o and search
          operations, and abstraction through methods like{" "}
          <code>getAppointmentDoctorID()</code>.
        </li>
        <li>
          <b>data persistence</b>: uses <code>ObjectOutputStream</code>/
          <code>ObjectInputStream</code> to save encrypted .txt files,
          maintaining data between sessions.
        </li>
        <li>
          <b>file-based crud</b>: full create/read/update/delete (crud)
          operations with serialized storage.
        </li>
        <li>
          <b>advanced search</b>: multi-filter queries (date ranges, id lookups,
          medicine expiry).
        </li>
        <li>
          <b>error resilience</b>: input validation and graceful exception
          handling.
        </li>
        <li>
          <b>modular architecture</b>: designed for future expansion
          (billing/lab modules).
        </li>
      </ul>
    </>
  ),
  myRole: (
    <>
      bell hospital is a <u>solo side project</u> where i:
      <ul>
        <li>
          designed class structures mirroring real-world relationships
          (patient↔appointment).
        </li>
        <li>
          implemented file operations using java i/o streams for data
          persistence.
        </li>
        <li>built search algorithms for appointments and inventory.</li>
        <li>wrote documented, maintainable code with robust error handling.</li>
        <li>created user-friendly console prompts and menus.</li>
      </ul>
      <br />
      this project solidified my java oop skills while solving practical data
      management challenges in a clinical context.
    </>
  ),
  links: (
    <>
      <LinkWithIcon
        img={<img alt="octopus icon" src={IconOctopus} />}
        href={GitHubBellHospital}
      >
        source code
      </LinkWithIcon>

      <LinkWithIcon
        img={<img alt="cards icon" src={IconCards} />}
        href={FileBellHospital}
      >
        case study
      </LinkWithIcon>
    </>
  ),
};
