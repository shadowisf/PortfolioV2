import { ProjectEntry } from "../utils/_GODMODE";
import { RiGithubLine, RiFilePdf2Line } from "react-icons/ri";
import { LinkWithIcon } from "../components/Link";
//
import ImageCircuitCentral from "../assets/ImageCircuitCentral.webp";
import VideoCircuitCentral from "../assets/VideoCircuitCentral.webm";
import FileCircuitCentral from "../assets/FileCircuitCentral.pdf";
//
const GitHubCircuitCentral = "https://github.com/shadowisf/CircuitCentral";

export const CircuitCentral: ProjectEntry = {
  name: "circuitcentral",
  year: "2024",
  techStack: [
    "*c#",
    "*windows forms",
    "*microsoft sql server",
    "*transact-sql",
    "git",
  ],
  image: ImageCircuitCentral,
  imageFlex: "1.683857",
  imageAlt:
    "an image of the circuitcentral project; it is viewing the orders section wherein it displays a list of products that are currently in a cart. additionally, the ui has buttons for CRUD operations.",
  video: VideoCircuitCentral,
  videoFlex: "1.687037",
  description: (
    <>
      circuitcentral is a <u>windows forms e-commerce management system</u> for
      managing electronic product sales. it streamlines:
      <ul>
        <li>
          <b>user workflows</b>: customer product browsing, order creation, and
          order tracking.
        </li>
        <li>
          <b>admin operations</b>: create/read/update/delete (crud) operations
          for customers, staff, suppliers, and products via winforms ui.
        </li>
        <li>
          <b>
            data integrity: relational database with foreign key constraints
            (customer ↔ order ↔ product) and input validation.
          </b>
        </li>
        <li>
          <b>role-based access</b>: separate views for customers (order-focused)
          and admins with full create/read/update/delete (crud) privileges.
        </li>
        <li>
          <b>winforms ui</b>: data grid view tables, modal forms, and
          role-specific views.
        </li>
        <li>
          <b>sql server</b>: optimized queries with joins and transaction
          management.
        </li>
        <li>
          <b>error handling</b>: null checks, duplicate prevention, and
          constraint management.
        </li>
      </ul>
    </>
  ),
  myRole: (
    <>
      circuitcentral is a <u>solo project</u> where i:
      <ul>
        <li>
          designed 10+ winforms screens (login, product catalog, order
          management) with consistent ui patterns and implemented dynamic
          tables, search filters, and image handling (local path storage).
        </li>
        <li>
          developed sql server schema with 8+ relational tables and stored
          procedures.
        </li>
        <li>
          wrote c# classes for create/read/update/delete (crud) operations,
          error handling, and role-based routing.
        </li>
        <li>refactored code using oop patterns to improve maintainability.</li>
        <li>
          created 20+ unit tests (visual studio) covering all entities and
          managed version control via github with iterative commits.
        </li>
      </ul>
      <br />
      this project demonstrated my full-stack windows application development
      skills while addressing real e-commerce management needs.
    </>
  ),
  links: (
    <>
      <LinkWithIcon
        img={<RiGithubLine size={24} />}
        href={GitHubCircuitCentral}
      >
        repository
      </LinkWithIcon>

      <LinkWithIcon
        img={<RiFilePdf2Line size={24} />}
        href={FileCircuitCentral}
      >
        report
      </LinkWithIcon>
    </>
  ),
};
