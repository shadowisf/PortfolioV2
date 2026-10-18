import { WorkEntry } from "../../utils/types/WorkEntry";
import { ActionLink, InlineLink } from "../../components/Link";
// import { IconGlobe, IconOctopus } from "../../utils/iconSetting";
//
import ImageV1Portfolio from "@/assets/images/ImageV1Portfolio.webp";
import VideoV1Portfolio from "@/assets/videos_master/VideoV1Portfolio.webm";
import VideoV1PortfolioPreview from "@/assets/video_previews/VideoV1Portfolio.webm";
import VideoV1PortfolioPreviewHevc from "@/assets/video_previews/VideoV1Portfolio.mp4";
import VideoV1PortfolioPoster from "@/assets/video_posters/VideoV1Portfolio.webp";
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
  videoPreview: VideoV1PortfolioPreview,
  videoPreviewHevc: VideoV1PortfolioPreviewHevc,
  videoPoster: VideoV1PortfolioPoster,
  videoFlex: "1.599074",
  status: (
    <>
      completed on <u>september 23, 2024</u>.
    </>
  ),
  description: (
    <>
      a <u>dynamic and cartoonish-themed personal website</u> designed to
      showcase creativity while exploring foundational web development
      technologies. inspired by award-winning designs from{" "}
      <InlineLink
        className="infoOnHover top"
        href="https://www.awwwards.com/"
        data-tooltip={isMobile ? "" : "tryhards love this website"}
      >
        awwwards
      </InlineLink>
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
      i built this on my own, from start to finish:
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
      <ActionLink /* img={<img alt="globe icon" src={IconGlobe} />} */
        href={DemoV1Portfolio}
      >
        live website
      </ActionLink>

      <ActionLink /* img={<img alt="octopus icon" src={IconOctopus} />} */
        href={GitHubV1Portfolio}
      >
        source code
      </ActionLink>
    </>
  ),
};
