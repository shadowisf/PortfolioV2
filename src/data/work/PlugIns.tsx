import { WorkEntry } from "../../utils/types/WorkEntry";
import { LinkWithIcon } from "../../components/Link";
import { IconCards, IconOctopus } from "../../utils/iconSetting";
//
import ImagePlugIns from "@/assets/ImagePlugIns.webp";
import VideoPlugIns from "@/assets/VideoPlugIns.webm";
import FilePlugIns from "@/assets/FilePlugIns.pdf";
//
const GitHubPlugIns = "https://github.com/shadowisf/PlugIns";

export const PlugIns: WorkEntry = {
  type: "personal project",
  name: "plug-ins",
  year: "2023",
  techStack: ["*php", "*xampp", "*mariadb", "git"],
  image: ImagePlugIns,
  imageFlex: "1.879195",
  imageAlt:
    "an image of the plug-ins project. it is currently viewing the products page",
  video: VideoPlugIns,
  videoFlex: "1.599074",
  status: (
    <>
      plug-ins was completed on <u>april 19, 2023</u>.
    </>
  ),
  description: (
    <>
      plug-ins is a <u>web database solution</u> that automates operations for
      an electronics retail business, combining robust backend architecture with
      user-friendly interfaces. the system demonstrates key database principles.
      key features include:
      <ul>
        <li>
          <b>relational design</b>: tables like <code>customer</code>,{" "}
          <code>order_</code>, and <code>product</code> are linked through
          foreign keys (e.g., <code>order_items</code> as a junction table),
          with normalization to third normal form (3nf) minimizing redundancy
          (split address/email entities).
        </li>
        <li>
          <b>operational efficiency</b>: enables full create/read/update/delete
          (crud) operations via php-driven web forms and sql queries, with
          features like low-stock alerts and monthly sales reports.
        </li>
        <li>
          <b>data integrity</b>: enforced through constraints (primary/foreign
          keys, on delete cascade) and check rules (e.g., single-entity contacts
          per row).
        </li>
        <li>
          <b>optimized querying</b>: uses sql views (e.g.,{" "}
          <code>products_less_than_5</code>) to simplify complex data retrieval.
        </li>
        <li>
          <b>phpmyadmin integration</b>: implemented for granular access control
          and database administration.
        </li>
        <li>
          <b>auto_increment functionality</b>: utilized for seamless id
          generation across tables.
        </li>
        <li>
          <b>schema documentation</b>: created detailed documentation of
          database design and relationships.
        </li>
        <li>
          <b>constraint validation</b>: thoroughly tested and documented key
          constraints (primary/foreign keys, checks).
        </li>
      </ul>
    </>
  ),
  myRole: (
    <>
      plug-ins is a <u>solo side project</u> where i:
      <ul>
        <li>
          designed the er diagram and normalized database structure to third
          normal form (3nf).
        </li>
        <li>
          developed 50+ sql queries (joins, subqueries) and php scripts for data
          operations.
        </li>
        <li>
          built intuitive ui forms (order placement, customer registration) with
          html/css.
        </li>
        <li>
          documented all design decisions, constraints, and test cases with
          screenshots.
        </li>
      </ul>
      <br />
      this end-to-end project showcased my ability to architect, secure, and
      document a production-ready database system.
    </>
  ),
  links: (
    <>
      <LinkWithIcon
        img={<img alt="octopus icon" src={IconOctopus} />}
        href={GitHubPlugIns}
      >
        source code
      </LinkWithIcon>

      <LinkWithIcon
        img={<img alt="card icon" src={IconCards} />}
        href={FilePlugIns}
      >
        case study
      </LinkWithIcon>
    </>
  ),
};
