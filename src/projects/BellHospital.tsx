import { ProjectEntry } from "../utils/GODMODE";
import { RiGithubLine, RiFilePdf2Line } from "react-icons/ri";
import { LinkWithIcon } from "../components/Link";
//
import ImageBellHospital from "../assets/ImageBellHospital.webp";
import ImageTinyBellHospital from "../assets/ImageBellHospital_tiny.webp";
import VideoBellHospital from "../assets/VideoBellHospital.webm";
import FileBellHospital from "../assets/FileBellHospital.pdf";
//
const GitHubBellHospital = "https://github.com/shadowisf/BellHospital";

export const BellHospital: ProjectEntry = {
  name: "bell hospital",
  year: "2022",
  techStack: ["*java", "*cli", "*file handling", "git"],
  image: ImageBellHospital,
  imageTiny: ImageTinyBellHospital,
  imageFlex: "1.518182",
  imageAlt:
    "an image of the bell hospital project. it is currently viewing the patients records section where it is displaying all patient information (note that this is a CLI project). additionally, there are commands for CRUD operations.",
  video: VideoBellHospital,
  videoFlex: "1.598148",
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
          operations, and abstraction through methods like
          getappointmentdoctorid()
        </li>
        <li>
          <b>data persistence</b>: uses objectoutputstream/objectinputstream to
          save encrypted .txt files, maintaining data between sessions.
        </li>
        <li>
          <b>file-based crud</b>: full create/read/update/delete operations with
          serialized storage
        </li>
        <li>
          <b>advanced search</b>: multi-filter queries (date ranges, id lookups,
          medicine expiry)
        </li>
        <li>
          <b>error resilience</b>: input validation and graceful exception
          handling
        </li>
        <li>
          <b>modular architecture</b>: designed for future expansion
          (billing/lab modules)
        </li>
      </ul>
    </>
  ),
  myRole: (
    <>
      bell hospital is a solo project where i:
      <ul>
        <li>
          designed class structures mirroring real-world relationships
          (patient↔appointment)
        </li>
        <li>
          implemented file operations using java i/o streams for data
          persistence
        </li>
        <li>built search algorithms for appointments and inventory</li>
        <li>wrote documented, maintainable code with robust error handling</li>
        <li>created user-friendly console prompts and menus</li>
      </ul>
      <br />
      this project solidified my java oop skills while solving practical data
      management challenges in a clinical context.
    </>
  ),
  links: (
    <>
      <LinkWithIcon img={<RiGithubLine size={24} />} href={GitHubBellHospital}>
        repository
      </LinkWithIcon>

      <LinkWithIcon img={<RiFilePdf2Line size={24} />} href={FileBellHospital}>
        report
      </LinkWithIcon>
    </>
  ),
};
