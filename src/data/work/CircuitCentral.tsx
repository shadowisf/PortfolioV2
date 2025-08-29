import { WorkEntry } from "../../utils/types/WorkEntry";
import { LinkWithIcon } from "../../components/Link";
import { IconCards, IconOctopus } from "../../utils/iconSetting";
//
import ImageCircuitCentral from "@/assets/ImageCircuitCentral.webp";
import VideoCircuitCentral from "@/assets/VideoCircuitCentral.webm";
import FileCircuitCentral from "@/assets/FileCircuitCentral.pdf";
//
const GitHubCircuitCentral = "https://github.com/shadowisf/CircuitCentral";

export const CircuitCentral: WorkEntry = {
  type: "personal project",
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
  status: (
    <>
      circuitcentral was completed on <u>april 29, 2024</u>.
    </>
  ),
  description: (
    <>
      circuitcentral is a <u>windows forms e-commerce management system</u> for
      managing electronic product sales. it streamlines:
      <ul>
        <li>
          <b>user experience & streamlined ordering:</b> customers can browse
          products, add multiple items to the cart, place orders easily, and
          track order status efficiently.
        </li>
        <li>
          <b>admin capabilities:</b> admins can confirm orders, add products to
          catalogs, and have full create/read/update/delete (crud) control of
          customer details, staff details, supplier details, and their sales.
        </li>
        <li>
          <b>ui & usability:</b> simple and intuitive interface with product
          images for easy identification.
        </li>
        <li>
          <b>data accuracy & validation:</b> the system prevents mistakes by
          checking for missing or incorrect information before saving.
        </li>
        <li>
          <b>role-based access & authentication:</b> separate access for
          customers and admins to protect sensitive operations.
        </li>
      </ul>
    </>
  ),
  myRole: (
    <>
      circuitcentral was a <u>solo personal project</u> where i:
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
        img={<img alt="octopus icon" src={IconOctopus} />}
        href={GitHubCircuitCentral}
      >
        source code
      </LinkWithIcon>

      <LinkWithIcon
        img={<img alt="cards icon" src={IconCards} />}
        href={FileCircuitCentral}
      >
        case study
      </LinkWithIcon>
    </>
  ),
};
