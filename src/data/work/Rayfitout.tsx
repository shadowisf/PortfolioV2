import { WorkEntry } from "../../utils/types/WorkEntry";
import { IconGlobe } from "../../utils/iconSetting";
import { LinkWithIcon } from "../../components/Link";
//
import ImageRayfitout from "@/assets/ImageRayfitout.webp";
import VideoRayfitout from "@/assets/VideoRayfitout.webm";
//
const LiveRayfitout = "https://www.rayfitout.com";

export const Rayfitout: WorkEntry = {
  type: "professional experience",
  name: "rayfitout",
  year: "2025",
  techStack: ["*webflow", "*html", "*css", "*javascript", "*gsap", "*figma"],
  image: ImageRayfitout,
  imageFlex: "1.729285",
  imageAlt:
    "an image of the rayfitout website, where it showcases all their architecture and interior design projects. each project shows a unique and beautiful image of the interior of a villa.",
  video: VideoRayfitout,
  videoFlex: "1.722",
  status: (
    <>
      rayfitout is a project i <u>previously worked on</u> during my time with
      the company.
    </>
  ),
  description: (
    <>
      rayfitout is an award-winning interior design and fit-out firm
      specializing in high-end residential, commercial, and bespoke joinery
      projects across the middle east, europe, and africa. i contributed to
      enhancing the company's <u>visually appealing website</u>. it offers:
      <ul>
        <li>
          <b>featured projects gallery</b>: showcase of high-end residential,
          commercial, and aviation projects with immersive case studies.
        </li>
        <li>
          <b>product catalog features</b>: dedicated showcase for interior
          solutions—such as interior doors, wardrobes, windows, kitchen systems,
          and walk-in closets—reinforcing their bespoke offerings
        </li>
        <li>
          <b>in-depth process & services pages</b>: detailed breakdown of design
          philosophy, services, and client journey for transparency.
        </li>
        <li>
          <b>blog section</b>: content hub covering design trends, fit-out
          expertise, and company updates, supporting search engine optimization
          and thought leadership.
        </li>
        <li>
          <b>optimized web presence</b>: designed to highlight luxury branding
          and achieve strong search rankings.
        </li>
        <li>
          <b>highly visual & minimal design</b>: a visually driven website that
          emphasizes aesthetics and project photography while maintaining a
          clean, balanced layout for readability and an enhanced user
          experience.
        </li>
      </ul>
    </>
  ),
  myRole: (
    <>
      rayfitout was a <u>collaborative professional project</u>, partnered with
      a ui/ux designer and a marketing manager, where i:
      <ul>
        <li>
          implemented best search engine optimization (seo) practices, achieving
          #1 google ranking for high-value keywords and significantly increasing
          inbound traffic.
        </li>
        <li>
          developed a pixel-perfect webflow website from figma, balancing design
          accuracy, animation, and usability to deliver a polished user
          experience.
        </li>
        <li>
          fixed functional and visual bugs across screen breakpoints, boosting
          core web vitals by 40% and ensuring performance across all devices.
        </li>
        <li>
          built scalable, complex layouts and reusable components with
          animations, reducing development time for new pages and future
          updates.
        </li>
        <li>
          delivered a content management system (cms)-powered website, enabling
          seamless blog and content updates without developer involvement.
        </li>
      </ul>
      <br />
      this project demonstrated my ability to deliver high-performance,
      design-driven websites with strong search engine optimization (seo),
      responsive layouts, and smooth user experiences.
    </>
  ),
  links: (
    <>
      <LinkWithIcon
        img={<img alt="globe icon" src={IconGlobe} />}
        href={LiveRayfitout}
      >
        live website
      </LinkWithIcon>
    </>
  ),
};
