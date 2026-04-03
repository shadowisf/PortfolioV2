import { WorkEntry } from "../../utils/types/WorkEntry";
import { LinkWithIcon } from "../../components/Link";
import { IconOctopus } from "../../utils/iconSetting";
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
  videoFlex: "",
  status: (
    <>
      project was completed on <u>december 20, 2023</u>.
    </>
  ),
  description: (
    <>
      project is a <u>web-based hospital management system</u> for managing
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
      project was a <u>collaborative personal project</u>, partnered with other
      developers, where i:
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
      <LinkWithIcon img={<img alt="globe icon" src={IconOctopus} />} href={""}>
        placeholder
      </LinkWithIcon>
    </>
  ),
};
