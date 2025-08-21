import { LinkWithIcon } from "../../components/Link";
import { IconGlobe, IconOctopus } from "../../utils/iconSetting";
import { WorkEntry } from "../../utils/types/WorkEntry";
//
import ImageWhealthyVessel from "@/assets/ImageWhealthyVessel.webp";
import VideoWhealthyVessel from "@/assets/VideoWhealthyVessel.webm";
//
const GitHubWhealthyVessel = "https://github.com/shadowisf/WhealthyVessel";
const DemoWhealthyVessel = "https://whealthy-vessel.vercel.app";

export const WhealthyVessel: WorkEntry = {
  name: "whealthy vessel",
  year: "2025",
  techStack: ["vite", "*react.js", "*typescript", "*scss", "git"],
  image: ImageWhealthyVessel,
  imageFlex: "1.6",
  imageAlt:
    "an image of the whealthy vessel website, it is currently in the recipe corner page. on the top of the page, there is a banner with a background image and a text saying recipe corner. just below that, there are shortcut buttons such as entree and dessert. below the said banner are the grid of all recipes.",
  video: VideoWhealthyVessel,
  videoFlex: "1.601113",
  status: (
    <>
      whealthy vessel is currently a <u>work in progress</u>.
    </>
  ),
  description: (
    <>
      whealthy vessel is a <u>showcase website</u> built to highlight the
      premium quality and features of the brand's cookware products. it
      features:
      <ul>
        <li>
          <b>poduct showcase system</b>: interactive display of various cookware
          items with media-rich content.
        </li>
        <li>
          <b>component-based architecture</b>: reusable and modular components
          for scalability and maintainability.
        </li>
        <li>
          <b>responsive scss styling</b>: handcrafted layouts using scss with
          mobile-first responsiveness.
        </li>
        <li>
          <b>performance-first setup</b>: built using vite for fast load times
          and optimized builds.
        </li>
        <li>
          <b>react.js (typescript)</b>: strongly typed frontend with dynamic
          routing and clean state management.
        </li>
      </ul>
    </>
  ),
  myRole: (
    <>
      whealthy vessel is a <u>collaborative freelance project</u> where i:
      <ul>
        <li>
          developed key site features, including product gallery layouts, hover
          animations, and smooth scroll experiences.
        </li>
        <li>
          configured vite build tooling for optimal performance and fast dev
          experience.
        </li>
        <li>
          maintained semantic html and accessibility-friendly markup to support
          a broad user base.
        </li>
        <li>
          version-controlled the project using git with organized branching and
          commit practices.
        </li>
      </ul>
      <br />
      this project allowed me to combine performance-focused frontend
      engineering with a clean product showcase experience, aligned with brand
      aesthetics.
    </>
  ),
  links: (
    <>
      <LinkWithIcon
        img={<img alt="globe icon" src={IconGlobe} />}
        href={DemoWhealthyVessel}
      >
        live website
      </LinkWithIcon>

      <LinkWithIcon
        img={<img alt="octopus icon" src={IconOctopus} />}
        href={GitHubWhealthyVessel}
      >
        source code
      </LinkWithIcon>
    </>
  ),
};
