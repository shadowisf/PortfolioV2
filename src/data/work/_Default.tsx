import { WorkEntry } from "../../utils/types/WorkEntry";
import { ActionLink } from "../../components/Link";
// import { IconOctopus } from "../../utils/iconSetting";
//
/* INSERT MEDIA HERE */
//
/* INSERT REFERENCES HERE */

export const Project: WorkEntry = {
  type: "",
  name: "",
  year: "",
  techStack: [""],
  image: "",
  imageFlex: "",
  imageAlt: "",
  video: "",
  videoPreview: "",
  videoPoster: "",
  videoFlex: "",
  status: (
    <>
      completed on <u>december 20, 2023</u>.
    </>
  ),
  description: (
    <>
      a <u>web-based hospital management system</u> for managing
      patient, doctor, and staff records. key features include:
      <ul>
        <li>
          <b>dynamic workflow:</b> starts from patient registration →
          receptionist → doctor appointments → laboratory → prescriptions →
          billing.
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
      </ul>
      <br />
      this project enhanced my full-stack development skills while solving real
      healthcare management challenges through technology.
    </>
  ),
  links: (
    <>
      <ActionLink /* img={<img alt="globe icon" src={IconOctopus} />} */ href={""}>
        placeholder
      </ActionLink>
    </>
  ),
};
