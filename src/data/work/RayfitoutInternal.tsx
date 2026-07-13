import { WorkEntry } from "../../utils/types/WorkEntry";
import { IconOctopus } from "../../utils/iconSetting";
import { LinkWithIcon } from "../../components/Link";
//
import ImageRayfitoutInternal from "@/assets/ImageRayfitoutInternal.webp";
import VideoRayfitoutInternal from "@/assets/VideoRayfitoutInternal.webm";
//
const GitHubRayfitoutInternal = "https://github.com/shadowisf/RayfitoutERP";
/* const LiveRayfitoutInternal = "https://rayfitout-erp-preview.vercel.app/"; */

export const RayfitoutInternal: WorkEntry = {
  type: "professional experience",
  name: "rayfitout (internal)",
  year: "2025",
  techStack: [
    "*next.js",
    "*typescript",
    "*scss",
    "*lucidchart",
    "*react-pdf",
    "*amazon rds",
    "*amazon cognito",
    "*amazon s3",
    "*mysql",
    "*restful api",
    "*vercel",
    "git",
    "*figma",
  ],
  image: ImageRayfitoutInternal,
  imageFlex: "1.6",
  imageAlt:
    "a dashboard view of the manager user in the enterprise resource planning web application, with widgets for active material requests, pending approval of material requests, pending payments of material requests, outbound payments of local purchase orders, pending deliveries of local purchase orders. on the bottom of that are two widgets for quick approvals: initial approval and price approval for each items in a material request with approve or reject buttons and selection of vendors. on the left side of the screen is the navigation bar, with icons for dashboard, procurement tracker, projects, local purchase order list, bill of quantity list, vendor and subcontractor list, and inventory list.",
  video: VideoRayfitoutInternal,
  videoFlex: "1.7338965153",
  status: (
    <>
      rayfitout (internal) was a project <u>i previously worked on</u> with the
      company.
    </>
  ),
  description: (
    <>
      rayfitout is an award-winning interior design and fit-out company
      specializing in high-end residential, commercial, and bespoke joinery
      projects across the middle east, europe, and africa. i contributed to
      creating the company's{" "}
      <u>enterprise resource planning (erp) application</u> designed to
      streamline internal operations, procurement, and financial workflows. the
      platform centralizes key business processes into a single, efficient
      system. key features include:.
      <ul>
        <li>
          <b>material request management</b>: enables teams to create, track,
          and manage material requests with structured workflows to ensure
          timely procurement and approval processes.
        </li>
        <li>
          <b>lpo (local purchase order) system</b>: facilitates the creation and
          management of purchase orders, ensuring accurate documentation and
          smooth coordination between departments and suppliers.
        </li>
        <li>
          <b>financial file uploads</b>: allows secure uploading and
          organization of finance-related documents, improving accessibility and
          record-keeping for audits and internal tracking.
        </li>
        <li>
          <b>centralized dashboard</b>: provides a real-time overview of
          operations, including requests, orders, and inventory status, enabling
          better decision-making and monitoring.
        </li>
        <li>
          <b>inventory tracking system</b>: supports detailed tracking of
          inventory movements such as issuing and transferring materials across
          projects and locations.
        </li>
        <li>
          <b>pdf generation & reporting</b>: generates downloadable pdf
          documents for business data, including reports, purchase orders, and
          transaction summaries for seamless documentation.
        </li>
        <li>
          <b>optimized internal workflow</b>: designed to improve operational
          efficiency, reduce manual processes, and maintain consistency across
          departments.
        </li>
      </ul>
    </>
  ),
  myRole: (
    <>
      rayfitout (internal) is a <u>collaborative professional project</u> where
      i took ownership of the entire technical implementation, collaborating
      with a ui/ux designer, a marketing manager and a general operations
      manager, where i:
      <ul>
        <li>
          architected and selected the complete tech stack, ensuring
          scalability, performance, and maintainability across the application.
        </li>
        <li>
          developed the full system from frontend to backend, including database
          design, api development, and system integrations.
        </li>
        <li>
          translated high-fidelity figma designs into a functional application,
          maintaining design accuracy while optimizing for usability and
          efficiency.
        </li>
        <li>
          built core erp features such as material request workflows, lpo
          management, inventory tracking, and financial document handling.
        </li>
        <li>
          implemented a centralized dashboard with real-time data tracking to
          provide visibility into operations and business processes.
        </li>
        <li>
          designed and structured the database to handle inventory movements,
          transactions, and file management reliably.
        </li>
        <li>
          developed pdf generation and reporting features for business
          documents, ensuring consistency and professional output.
        </li>
        <li>
          optimized internal workflows by automating manual processes and
          improving system efficiency across departments.
        </li>
      </ul>
      <br />
      this project demonstrates my ability to independently design and build
      scalable, production-ready systems, translating design into robust
      technical solutions while managing the full development lifecycle.
    </>
  ),
  links: (
    <>
      {/*  <LinkWithIcon
        img={<img alt="globe icon" src={IconGlobe} />}
        href={LiveRayfitoutInternal}
      >
        preview website
      </LinkWithIcon> */}
      <LinkWithIcon
        img={<img alt="octopus icon" src={IconOctopus} />}
        href={GitHubRayfitoutInternal}
      >
        github
      </LinkWithIcon>
    </>
  ),
};
