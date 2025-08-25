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
      let there be fragrance is a <u>web-based e-commerce platform</u> focused
      on fragrances. it is built to deliver a smooth shopping experience through
      fast performance, intuitive ui, and essential user-centric features:
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
          <b>responsive UI & animations</b>: styled with tailwind css and
          enhanced with framer motion for fluid transitions.
        </li>
        <li>
          <b>next.js (typescript)</b>: server-rendered frontend for SEO and
          performance, with reusable components.
        </li>
        <li>
          <b>supabase</b>: postgresql-powered backend with authentication,
          real-time cart/wishlist sync, and product CRUD.
        </li>
      </ul>
    </>
  ),
  myRole: (
    <>
      let there be fragrance was a <u>collaborative freelance project</u>,
      partnered with a visual designer, where i:
      <ul>
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
          added responsive animations using framer motion to enhance navigation
          and microinteractions.
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
