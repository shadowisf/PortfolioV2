import { ProjectEntry } from "../utils/GODMODE";
import { RiGithubLine, RiFilePdf2Line } from "react-icons/ri";
import { LinkWithIcon } from "../components/Link";
//
import ImagePlugIns from "../assets/ImagePlugIns.webp";
import ImageTinyPlugIns from "../assets/ImagePlugIns_tiny.webp";
import VideoPlugIns from "../assets/VideoPlugIns.webm";
import FilePlugIns from "../assets/FilePlugIns.pdf";
//
const GitHubPlugIns = "https://github.com/shadowisf/PlugIns";

export const PlugIns: ProjectEntry = {
  name: "plug-ins",
  year: "2022",
  techStack: ["*php", "*html", "*css", "*xampp", "mariadb", "git"],
  image: ImagePlugIns,
  imageTiny: ImageTinyPlugIns,
  imageFlex: "1.879195",
  imageAlt:
    "an image of the plug-ins project. it is currently viewing the products page...",
  video: VideoPlugIns,
  videoFlex: "1.599074",
  description: (
    <>
      plug-ins is a <u>web database solution</u> that automates operations for
      an electronics retail business, combining robust backend architecture with
      user-friendly interfaces. the system demonstrates key database principles:
      <ul>
        <li>
          <b>relational design</b>: tables like <code>customer</code>,{" "}
          <code>order_</code>, and <code>product</code> are linked through
          foreign keys (e.g., <code>order_items</code> as a junction table),
          with normalization to 3nf minimizing redundancy (split address/email
          entities).
        </li>
        <li>
          <b>operational efficiency</b>: enables full crud operations via
          php-driven web forms and sql queries, with features like low-stock
          alerts and monthly sales reports.
        </li>
        <li>
          <b>data integrity</b>: enforced through constraints (primary/foreign
          keys, <code>on delete cascade</code>) and <code>check</code> rules
          (e.g., single-entity contacts per row).
        </li>
        <li>
          <b>secure web integration</b>: implements rbac (admin/staff roles) and
          md5 encryption, with php scripts dynamically rendering html forms
          based on sql queries (e.g., product category searches).
        </li>
        <li>
          <b>optimized querying</b>: uses sql views (e.g.,{" "}
          <code>products_less_than_5</code>) to simplify complex data retrieval.
        </li>
        <li>
          <b>phpmyadmin integration</b>: implemented for granular access control
          and database administration
        </li>
        <li>
          <b>auto_increment functionality</b>: utilized for seamless id
          generation across tables
        </li>
        <li>
          <b>schema documentation</b>: created detailed documentation of
          database design and relationships
        </li>
        <li>
          <b>constraint validation</b>: thoroughly tested and documented key
          constraints (primary/foreign keys, checks)
        </li>
      </ul>
    </>
  ),
  myRole: (
    <>
      plug-ins is a solo project where i:
      <ul>
        <li>
          designed the er diagram and normalized database structure to 3nf.
        </li>
        <li>
          developed 50+ sql queries (joins, subqueries) and php scripts for data
          operations.
        </li>
        <li>
          built intuitive ui forms (order placement, customer registration) with
          html/css.
        </li>
        <li>implemented security via rbac and email encryption.</li>
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
      <LinkWithIcon img={<RiGithubLine size={24} />} href={GitHubPlugIns}>
        repository
      </LinkWithIcon>
      <LinkWithIcon img={<RiFilePdf2Line size={24} />} href={FilePlugIns}>
        report
      </LinkWithIcon>
    </>
  ),
};
