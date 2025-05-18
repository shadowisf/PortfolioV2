import { ProjectEntry } from "../utils/_GODMODE";
import { GoPackage } from "react-icons/go";
import { RiGithubLine } from "react-icons/ri";
import { LinkWithIcon } from "../components/Link";
//
import ImageV1Portfolio from "../assets/ImageV1Portfolio.webp";
import VideoV1Portfolio from "../assets/VideoV1Portfolio.webm";
//
const GitHubV1Portfolio = "https://github.com/shadowisf/PortfolioV1";
const DemoV1Portfolio = "https://v1-lesranalan.web.app";

export const PortfolioV1: ProjectEntry = {
  name: "portfolio v1",
  year: "2024",
  techStack: ["vite", "*react.js", "*typescript", "*scss", "*firebase", "git"],
  image: ImageV1Portfolio,
  imageFlex: "1.6",
  imageAlt:
    "image of the about section in my portfolio project. it has a cartoon illustration of me and and text introducing myself.",
  video: VideoV1Portfolio,
  videoFlex: "1.599074",
  description: (
    <>
      portfolio v1 is a <u>dynamic and cartoonish-themed personal website</u>{" "}
      designed to showcase creativity while exploring foundational web
      development technologies. inspired by award-winning designs from awwwards,
      this project blends playful aesthetics with functional interactivity. key
      features include:
      <ul>
        <li>
          <b>react.js (typescript) framework</b>: leveraged functional
          components, hooks (e.g., <code>useState</code>), and props for
          reusable ui elements.
        </li>
        <li>
          <b>responsive design</b>: fluid layouts adapting to desktop and mobile
          screens.
        </li>
        <li>
          <b>interactive elements</b>: animated transitions and dynamic content
          rendering.
        </li>
        <li>
          <b>modern workflows</b>: component-based architecture and state-driven
          rendering.
        </li>
      </ul>
    </>
  ),
  myRole: (
    <>
      portfolio v1 is a <u>solo project</u> where i:
      <ul>
        <li>
          translated awwwards-inspired aesthetics into a cohesive and custom ui.
        </li>
        <li>
          implemented react.js (typescript) components, structured css with bem
          naming conventions, and debugged rendering issues.
        </li>
        <li>
          ensured cross-browser compatibility and performance via lazy loading.
        </li>
        <li>
          refactored code to improve readability (e.g., abstracting repeated
          logic into utility functions).
        </li>
      </ul>
      <br />
      this project established my core react.js/typescript skills while
      exploring creative frontend design.
    </>
  ),
  links: (
    <>
      <LinkWithIcon img={<GoPackage size={24} />} href={DemoV1Portfolio}>
        live website
      </LinkWithIcon>

      <LinkWithIcon img={<RiGithubLine size={24} />} href={GitHubV1Portfolio}>
        repository
      </LinkWithIcon>
    </>
  ),
  attributions: [
    "typedcss: https://github.com/brandonmcconnell",
    "react-toastify: https://github.com/fkhadra",
    "medium zoom: https://github.com/francoischalifour",
    "theme engine: https://www.linkedin.com/in/frankmyles/",
    "gsap: https://github.com/jackdoyle",
    "remix icons: https://github.com/xiaochunjimmy",
  ],
};
