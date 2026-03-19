import { WorkEntry } from "../../utils/types/WorkEntry";
import { LinkWithIcon } from "../../components/Link";
import { IconGlobe, IconOctopus } from "../../utils/iconSetting";
//
import ImageV2Portfolio from "@/assets/ImageV2Portfolio.webp";
import VideoV2Portfolio from "@/assets/VideoV2Portfolio.webm";
//
const GitHubV2Portfolio = "https://github.com/shadowisf/PortfolioV2";
const DemoV2Portfolio = "https://les-ranalan.web.app";

export const PortfolioV2: WorkEntry = {
  type: "personal project",
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
  imageFlex: "1.6",
  imageAlt:
    "an image of the about section in my portfolio v2 project. there is a picture of me and a text introducing myself, with a button at the very bottom which downloads my resume. at the bottom portion, there is a timeline where it showcases all important events that happened in my life. on the right side of the timeline, it showcases my skillset wherein you can filter by my skill level such as all, expert, intermediate, and beginner.",
  video: VideoV2Portfolio,
  videoFlex: "1.598148",
  status: (
    <>
      portfolio v2 is currently under{" "}
      <u>active development with regular updates</u>.
    </>
  ),
  description: (
    <>
      portfolio v2 is a <u>complete redesign of my original portfolio</u>,
      moving beyond the cartoonish minimalism of v1 into a more refined,
      performance-focused experience. while keeping the core content (projects,
      bio, research). key features include:
      <ul>
        <li>
          <b>optimized performance:</b> faster loading and smooth navigation for
          a seamless experience.
        </li>
        <li>
          <b>enhanced animations:</b> smoother and more engaging motion design
          for visual appeal.
        </li>
        <li>
          <b>cleaner aesthetics:</b> balanced layout, whitespace, and
          readability for better presentation.
        </li>
        <li>
          <b>scalable content:</b> organized structure that allows for easy
          future updates.
        </li>
        <li>
          <b>refined user experience:</b> intuitive interaction and consistent
          design across devices.
        </li>
      </ul>
    </>
  ),
  myRole: (
    <>
      portfolio v2 was a <u>solo personal project</u> where i:
      <ul>
        <li>
          audited v1’s pain points and iterated on layout, color, and motion.
        </li>
        <li>
          crafted gsap sequences (e.g., startup animations, hover animations,
          mobile transitions, etc.).
        </li>
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
      <LinkWithIcon
        img={<img alt="globe icon" src={IconGlobe} />}
        href={DemoV2Portfolio}
      >
        live website
      </LinkWithIcon>

      <LinkWithIcon
        img={<img alt="octopus icon" src={IconOctopus} />}
        href={GitHubV2Portfolio}
      >
        source code
      </LinkWithIcon>
    </>
  ),
};
