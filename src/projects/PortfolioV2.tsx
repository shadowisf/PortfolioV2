import { ProjectEntry } from "../utils/GODMODE";
import { GoPackage } from "react-icons/go";
import { RiGithubLine } from "react-icons/ri";
import { LinkWithIcon } from "../components/Link";
//
import ImageV2Portfolio from "../assets/ImageV2Portfolio.webp";
import ImageTinyV2Portfolio from "../assets/ImageV2Portfolio_tiny.webp";
import VideoV2Portfolio from "../assets/VideoV2Portfolio.webm";
//
const GitHubV2Portfolio = "https://github.com/shadowisf/PortfolioV2";
const DemoV2Portfolio = "https://les-ranalan.web.app";

export const PortfolioV2: ProjectEntry = {
  name: "portfolio v2",
  year: "2024",
  techStack: [
    "vite",
    "*react.js",
    "*typescript",
    "*scss",
    "*gsap",
    "*firebase",
    "git",
  ],
  image: ImageV2Portfolio,
  imageTiny: ImageTinyV2Portfolio,
  imageFlex: "1.6",
  imageAlt:
    "image of the about section in my portfolio v2 project. there is a picture of me and a text introducing myself, with a button at the very bottom which downloads my resume. at the bottom portion, there is a timeline where it showcases all important events that happened in my life. on the right side of the timeline, it showcases my skillset wherein you can filter by my skill level such as all, expert, intermediate, and beginner.",
  video: VideoV2Portfolio,
  videoFlex: "1.598148",
  description: (
    <>
      portfolio v2 is a <u>complete redesign of my original portfolio</u>,
      moving beyond the cartoonish minimalism of v1 into a more refined,
      performance-focused experience. while keeping the core content (projects,
      bio, research), this iteration prioritizes:
      <ul>
        <li>
          <b>optimized performance</b>: removed bulky libraries and streamlined
          assets for faster loading.
        </li>
        <li>
          <b>enhanced animations</b>: replaced css animations with gsap for
          smoother, more controlled motion design.
        </li>
        <li>
          <b>cleaner aesthetics</b>: balanced visual hierarchy and whitespace
          for better readability.
        </li>
        <li>
          <b>performance focus</b>: lazy loading, image optimization, dependency
          optimization.
        </li>
        <li>
          <b>scalable architecture</b>: modular components with typescript
          interfaces.
        </li>
      </ul>
    </>
  ),
  myRole: (
    <>
      portfolio v2 is a <u>solo project</u> where i:
      <ul>
        <li>
          audited v1’s pain points and iterated on layout, color, and motion.
        </li>
        <li>crafted gsap sequences (e.g., mobile transitions).</li>
        <li>migrated from css to scss modules, trimmed unused dependencies.</li>
        <li>ported all v1 content while improving its presentation.</li>
      </ul>
      <br />
      this project demonstrates my growth in creating polished, high-performance
      frontend experiences while maintaining content integrity.
    </>
  ),
  links: (
    <>
      <LinkWithIcon img={<GoPackage size={24} />} href={DemoV2Portfolio}>
        live website
      </LinkWithIcon>

      <LinkWithIcon img={<RiGithubLine size={24} />} href={GitHubV2Portfolio}>
        repository
      </LinkWithIcon>
    </>
  ),
  attributions: [
    "zoom-vanilla.js: https://github.com/spinningarrow",
    "gsap: https://github.com/jackdoyle",
    "remix icons: https://github.com/kamijin-fanta",
  ],
};
