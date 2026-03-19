import { WorkEntry } from "../../utils/types/WorkEntry";
import { IconOctopus } from "../../utils/iconSetting";
import { LinkWithIcon } from "../../components/Link";
//
/* import ImageRayfitoutInternal from ""; */
/* import VideoRayfitoutInternal from ""; */
//
const GitHubRayfitoutInternal = "https://github.com/shadowisf/RayfitoutERP";

export const RayfitoutInternal: WorkEntry = {
  type: "professional experience",
  name: "rayfitout - internal",
  year: "2025",
  techStack: [
    "*next.js",
    "*scss",
    "*lucidchart",
    "*typescript",
    "*react-pdf",
    "*amazon rds",
    "*amazon cognito",
    "*amazon s3",
    "*mysql",
    "*restful api",
    "*vercel",
    "git",
    "*figma",
  ],
  image: "",
  imageFlex: "",
  imageAlt: "",
  video: "",
  videoFlex: "",
  status: (
    <>
      rayfitout - internal is a project i <u>am currently working on</u> with
      the company.
    </>
  ),
  description: (
    <>
      rayfitout is an award-winning interior design and fit-out company
      specializing in high-end residential, commercial, and bespoke joinery
      projects across the middle east, europe, and africa. i contributed to
      enhancing the company's <u>business workflow</u> with the creation of an
      enterprise resource planning (erp) application. key features include:
      <ul>
        <li>
          <b>lorem</b>: ipsum
        </li>
      </ul>
    </>
  ),
  myRole: (
    <>
      rayfitout - internal is a <u>collaborative professional project</u>,
      partnered with a ui/ux designer and a marketing manager, where i:
      <ul>
        <li>lorem</li>
      </ul>
      <br />
      this project demonstrated lorem
    </>
  ),
  links: (
    <>
      <LinkWithIcon
        img={<img alt="globe icon" src={IconOctopus} />}
        href={GitHubRayfitoutInternal}
      >
        github
      </LinkWithIcon>
    </>
  ),
};
