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
  type: "freelance project",
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
      whealthy vessel is currently under <u>active development</u>.
    </>
  ),
  description: (
    <>
      whealthy vessel is a high-quality and premium cookware brand, offering
      health-focused solutions and culinary excellence. i developed a{" "}
      <u>corporate-style website</u>, showcasing the quality and features of the
      brand's products and also to provide better user experience for employees.
      key features include:
      <ul>
        <li>
          <b>poduct showcase system</b>: interactive display of various cookware
          items with media-rich content.
        </li>
        <li>
          <b>employee operations management</b>: internal portal for staff to
          manage tasks, access resources, and monitor operational workflows.
        </li>
        <li>
          <b>recipe system</b>: displays curated, unique recipes to highlight
          product use and inspire users in their culinary journey.
        </li>
        <li>
          <b>dual language support</b>: fully supports english and arabic
          interfaces for a bilingual user experience.
        </li>
      </ul>
    </>
  ),
  myRole: (
    <>
      whealthy vessel is a <u>collaborative freelance project</u>, partnered
      with a project coordinator, where i:
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
          implemented react.js (typescript) frontend with dynamic routing and
          clean state management.
        </li>
        <li>created responsive scss styling for mobile-first layouts.</li>
        <li>
          developed component-based architecture with reusable, modular
          components for scalability and maintainability.
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
        preview website
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
