import { WorkEntry } from "../../utils/types/WorkEntry";
import { LinkWithIcon, LinkWithNoIcon } from "../../components/Link";
import { IconGlobe, IconOctopus } from "../../utils/iconSetting";
//
import ImageV1Portfolio from "@/assets/ImageV1Portfolio.webp";
import VideoV1Portfolio from "@/assets/VideoV1Portfolio.webm";
//
const GitHubV1Portfolio = "https://github.com/shadowisf/PortfolioV1";
const DemoV1Portfolio = "https://v1-lesranalan.web.app";

const minMaxWidth = getComputedStyle(document.documentElement)
  .getPropertyValue("--minMaxWidth")
  .trim();
const isMobile = window.matchMedia(minMaxWidth).matches;

export const PortfolioV1: WorkEntry = {
  type: "personal project",
  name: "portfolio v1",
  year: "2024",
  techStack: ["vite", "*react.js", "*typescript", "*scss", "*firebase", "git"],
  image: ImageV1Portfolio,
  imageFlex: "1.6",
  imageAlt:
    "an image of the about section in my portfolio project. it has a cartoon illustration of me and and text introducing myself.",
  video: VideoV1Portfolio,
  videoFlex: "1.599074",
  status: (
    <>
      portfolio v1 was completed on <u>september 23, 2024</u>.
    </>
  ),
  description: (
    <>
      portfolio v1 is a <u>dynamic and cartoonish-themed personal website</u>{" "}
      designed to showcase creativity while exploring foundational web
      development technologies. inspired by award-winning designs from{" "}
      <LinkWithNoIcon
        className="infoOnHover top"
        href="https://www.awwwards.com/"
        data-tooltip={isMobile ? "" : "tryhards love this website"}
      >
        awwwards
      </LinkWithNoIcon>
      , this project blends playful aesthetics with functional interactivity.
      key features include:
      <ul>
        <li>
          <b>responsive and adaptive design:</b> works seamlessly across desktop
          and mobile screens.
        </li>
        <li>
          <b>interactive elements:</b> animated transitions, dynamic content,
          playful ui interactions, and font animations.
        </li>
        <li>
          <b>creative layout:</b> unique, award-inspired designs that reflect
          personality and style.
        </li>
        <li>
          <b>dynamic color themes:</b> ability to randomly generate new color
          themes.
        </li>
      </ul>
    </>
  ),
  myRole: (
    <>
      portfolio v1 was a <u>solo personal project</u> where i:
      <ul>
        <li>
          designed and implemented a playful, cartoonish interface inspired by
          awwwards designs.
        </li>
        <li>
          structured content and layouts for a smooth, responsive experience
          across devices.
        </li>
        <li>
          ensured interactive features like animations and dynamic transitions
          worked consistently.
        </li>
        <li>
          continuously iterated on design and content to keep the portfolio
          fresh and evolving.
        </li>
      </ul>
      <br />
      this project established my core react.js/typescript skills while
      exploring creative frontend design.
    </>
  ),
  links: (
    <>
      <LinkWithIcon
        img={<img alt="globe icon" src={IconGlobe} />}
        href={DemoV1Portfolio}
      >
        live website
      </LinkWithIcon>

      <LinkWithIcon
        img={<img alt="octopus icon" src={IconOctopus} />}
        href={GitHubV1Portfolio}
      >
        source code
      </LinkWithIcon>
    </>
  ),
};
