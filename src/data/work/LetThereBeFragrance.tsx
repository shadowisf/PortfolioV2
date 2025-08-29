import { LinkWithIcon } from "../../components/Link";
import { IconGlobe, IconOctopus } from "../../utils/iconSetting";
import { WorkEntry } from "../../utils/types/WorkEntry";
//
import ImageLetThereBeFragrance from "@/assets/ImageLetThereBeFragrance.webp";
import VideoLetThereBeFragrance from "@/assets/VideoLetThereBeFragrance.webm";
//
const GitHubLetThereBeFragrance =
  "https://github.com/shadowisf/LetThereBeFragrance";
const DemoLetThereBeFragrance = "https://let-there-be-fragrance.vercel.app";

export const LetThereBeFragrance: WorkEntry = {
  type: "freelance project",
  name: "let there be fragrance",
  year: "2025",
  techStack: [
    "*next.js",
    "*typescript",
    "*tailwind css",
    "*framer motion",
    "*supabase",
    "*postgresql",
    "*stripe",
    "*restful api",
    "git",
    "*figma",
  ],
  image: ImageLetThereBeFragrance,
  imageFlex: "1.6",
  imageAlt:
    "an image of let there be fragrance e-commerce website. right now, it's in the product catalogue page where it shows a grid of all of the fragrances. on the top side, there are filter options such as 2025 collection, for her, for him, etc. on the other right of that is a sort by option such as alphaetical from a to z or vice versa, price low to high or vice versa, etc.",
  video: VideoLetThereBeFragrance,
  videoFlex: "1.601113",
  status: (
    <>
      let there be fragrance is currently under <u>active development</u>.
    </>
  ),
  description: (
    <>
      let there be fragrance is a niche fragrance house, offering a curated
      collection of different and unique scents. i developed a{" "}
      <u>web-based e-commerce platform</u> focused on delivering a smooth
      shopping experience through fast performance, intuitive ui, and essential
      user-centric features:
      <ul>
        <li>
          <b>shopping bag & wishlist system</b>: persistent cart and wishlist
          with real-time sync using Supabase.
        </li>
        <li>
          <b>dynamic filtering & sorting</b>: filter by category, price, rating,
          and availability.
        </li>
        <li>
          <b>checkout flow</b>: multi-step checkout with order summary and
          confirmation screen.
        </li>
        <li>
          <b>design & animations</b>: user-focused design with animations to
          enhance navigation and overall shopping experience.
        </li>
        <li>
          <b>authentication & profile dashboards</b>: secure user login with
          personal dashboards for managing orders, wishlist, and account
          settings.
        </li>
      </ul>
    </>
  ),
  myRole: (
    <>
      let there be fragrance is a <u>collaborative freelance project</u>,
      partnered with a visual designer and a project coordinator, where i:
      <ul>
        <li>
          implemented next.js (typescript) frontend with server-side rendering,
          reusable components, and optimized SEO and performance.
        </li>
        <li>
          designed the full system architecture including product, order, and
          user schemas in supabase/postgresql.
        </li>
        <li>
          implemented user authentication, and integrated supabase for cart and
          wishlist persistence with row-level security.
        </li>
        <li>
          developed a fully functional shopping bag, wishlist, and checkout flow
          with validation and loading states.
        </li>
        <li>
          added responsive user interface & animations using tailwind css and
          framer motion to enhance navigation and microinteractions.
        </li>
        <li>
          implemented reusable components for product grids, modals, and
          filtering menus.
        </li>
      </ul>
      <br />
      this project showcased my ability to build a full-stack e-commerce
      platform with clean ui, real-time functionality, and a focus on user
      experience.
    </>
  ),
  links: (
    <>
      <LinkWithIcon
        img={<img alt="globe icon" src={IconGlobe} />}
        href={DemoLetThereBeFragrance}
      >
        preview website
      </LinkWithIcon>

      <LinkWithIcon
        img={<img alt="octopus icon" src={IconOctopus} />}
        href={GitHubLetThereBeFragrance}
      >
        source code
      </LinkWithIcon>
    </>
  ),
};
