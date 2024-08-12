import { Github, LinkedIn, PDF } from "../components/Icon";
import { LinkWithIcon } from "../components/Link";
//
import PortfolioOriginal1 from "../assets/ImageOriginalPortfolio1.webp";
import PortfolioOriginal2 from "../assets/ImageOriginalPortfolio2.webp";
//
import ApolloHospital1 from "../assets/ImageApolloHospital1.webp";
import ApolloHospital2 from "../assets/ImageApolloHospital2.webp";
import ApolloHospitalReport from "../assets/FileApolloHospital.PDF";
//
import CircuitCentral1 from "../assets/ImageCircuitCentral1.webp";
import CircuitCentral2 from "../assets/ImageCircuitCentral2.webp";
import CircuitCentralImplementationReport from "../assets/FileCircuitCentralImplementation.PDF";
import CircuitCentralProposalReport from "../assets/FileCircuitCentralProposal.PDF";
//
import PlugInsDatabase1 from "../assets/ImagePlugInsDatabase1.webp";
import PlugInsDatabase2 from "../assets/ImagePlugInsDatabase2.webp";
import PlugInsDatabaseReport from "../assets/FilePlugInsDatabase.PDF";
//
import Funculator1 from "../assets/ImageFunCulator1.webp";
import Funculator2 from "../assets/ImageFunCulator2.webp";
import Funculator3 from "../assets/ImageFunCulator3.webp";
import FunculatorReport from "../assets/FileFunCulator.PDF";
//
import BellHospital1 from "../assets/ImageBellHospital1.webp";
import BellHospital2 from "../assets/ImageBellHospital1.webp";
import BellHospitalReport from "../assets/FileBellHospital.PDF";
//
const ApolloHospitalGithub = "https://github.com/shadowisf/ApolloHospital";
const CircuitCentralGithub = "https://github.com/shadowisf/CircuitCentral";
const PlugInsDatabaseGithub = "https://github.com/shadowisf/PlugInsDatabase";
const FunculatorGithub = "https://github.com/shadowisf/FunCulator";
const BellHospitalGithub = "https://github.com/shadowisf/BellHospital";
//
export const projectData = [
  {
    id: 6,
    name: "portfolio v2",
    year: "2024",
    architecture: [
      "typescript (react)",
      "html",
      "scss",
      "firebase",
      "git",
      "ui/ux",
    ],
    image: [],
    imageAlts: [],
    content: (
      <p>
        i decided to redesign my portfolio website when i realized that my
        initial design philosophy to minimalism in user interfaces needed
        rethinking. most of the libraries and frameworks are still the same.
        however, some were removed to make the website less resource-intensive
        and more performant. the content remains the same as v1, showing my{" "}
        <u>projects, life history, research, and all things me!</u>
        <br />
        <br />
        <b>my role:</b> this was a solo project. every tech stack was
        implemented by me.
      </p>
    ),
    links: <></>,
  },
  {
    id: 5,
    name: "portfolio v1",
    year: "2024",
    architecture: [
      "typescript (react)",
      "html",
      "scss",
      "firebase",
      "git",
      "ui/ux",
    ],
    image: [PortfolioOriginal1, PortfolioOriginal2],
    imageAlts: ["", ""],
    content: (
      <p>
        the original design of my portfolio website was of cartoonish design
        inspired by a few websites i saw on the awwwards website. through this,
        i was able to{" "}
        <u>
          grasp and understand more about html, css, and javascript/typescript
        </u>{" "}
        as a baseline for web development.
        <br />
        <br />
        <b>my role:</b> this was a solo project. every tech stack was
        implemented by me.
      </p>
    ),
    links: (
      <>
        {/* typedcss */}
        <LinkWithIcon
          img={<Github />}
          href="https://github.com/brandonmcconnell"
        >
          brandon mcconnell
        </LinkWithIcon>

        {/* react-toastify */}
        <LinkWithIcon img={<Github />} href="https://github.com/fkhadra">
          fadi khadra
        </LinkWithIcon>

        {/* medium zoom */}
        <LinkWithIcon
          img={<Github />}
          href="https://github.com/francoischalifour"
        >
          françois chalifour
        </LinkWithIcon>

        {/* theme engine */}
        <LinkWithIcon
          img={<LinkedIn />}
          href="https://www.linkedin.com/in/frankmyles/"
        >
          frank myles
        </LinkWithIcon>

        {/* gsap */}
        <LinkWithIcon img={<Github />} href="https://github.com/jackdoyle">
          jack doyle
        </LinkWithIcon>

        {/* remix icons */}
        <LinkWithIcon img={<Github />} href="https://github.com/xiaochunjimmy">
          zhang xiaochun
        </LinkWithIcon>
      </>
    ),
  },
  {
    id: 4,
    name: "circuitcentral",
    year: "2024",
    architecture: [
      "c#",
      "windows forms",
      "microsoft sql server",
      "git",
      "ui/ux",
      "crud",
    ],
    image: [CircuitCentral1, CircuitCentral2],
    imageAlt: ["", ""],
    content: (
      <p>
        circuitcentral is an <u>e-commerce management system</u> that covers
        ordering products, viewing product catalogs, handling customer, staff,
        and supplier information, etc. its system features fundamental crud
        operations: create, read, update, and delete. additionally, it features
        search filtering on all records, error handling of all user events,
        input validation, and a login system for two user types.
        <br />
        <br />
        <b>my role:</b> this was a solo project. every tech stack was
        implemented by me.
      </p>
    ),
    links: (
      <>
        <LinkWithIcon img={<Github />} href={CircuitCentralGithub}>
          repository
        </LinkWithIcon>

        <LinkWithIcon img={<PDF />} href={CircuitCentralProposalReport}>
          proposal report
        </LinkWithIcon>

        <LinkWithIcon img={<PDF />} href={CircuitCentralImplementationReport}>
          implementation report
        </LinkWithIcon>
      </>
    ),
  },
  {
    id: 3,
    name: "apollo hospital",
    year: "2023",
    architecture: [
      "python (flask, django)",
      "html",
      "css (bootstrap)",
      "xampp",
      "ui/ux",
      "crud",
    ],
    image: [ApolloHospital1, ApolloHospital2],
    imageAlts: ["", ""],
    content: <p></p>,
    links: (
      <>
        <LinkWithIcon img={<Github />} href={ApolloHospitalGithub}>
          repository
        </LinkWithIcon>

        <LinkWithIcon img={<PDF />} href={ApolloHospitalReport}>
          report
        </LinkWithIcon>
      </>
    ),
  },
  {
    id: 2,
    name: "funculator",
    year: "2022",
    architecture: ["java", "swing", "ui/ux"],
    image: [Funculator1, Funculator2, Funculator3],
    imageAlts: [],
    content: <p></p>,
    links: (
      <>
        <LinkWithIcon img={<Github />} href={FunculatorGithub}>
          repository
        </LinkWithIcon>

        <LinkWithIcon img={<PDF />} href={FunculatorReport}>
          report
        </LinkWithIcon>
      </>
    ),
  },
  {
    id: 1,
    name: "bell hospital",
    year: "2022",
    architecture: ["java", "cli", "file handling", "crud"],
    image: [BellHospital1, BellHospital2],
    imageAlts: [],
    content: <p></p>,
    links: (
      <>
        <LinkWithIcon img={<Github />} href={BellHospitalGithub}>
          repository
        </LinkWithIcon>

        <LinkWithIcon img={<PDF />} href={BellHospitalReport}>
          report
        </LinkWithIcon>
      </>
    ),
  },
  {
    id: 0,
    name: "plug-ins database",
    year: "2022",
    architecture: ["php", "html", "css", "xampp", "crud"],
    image: [PlugInsDatabase1, PlugInsDatabase2],
    imageAlts: [],
    content: <p></p>,
    links: (
      <>
        <LinkWithIcon img={<Github />} href={PlugInsDatabaseGithub}>
          repository
        </LinkWithIcon>

        <LinkWithIcon img={<PDF />} href={PlugInsDatabaseReport}>
          report
        </LinkWithIcon>
      </>
    ),
  },
];

export type ProjectProps = {
  dataID: number;
  onClick?: () => void;
};

export function getProjectName(dataID: number) {
  const project = projectData.find((proj) => proj.id === dataID);
  return project ? project.name : [];
}

export function getProjectYear(dataID: number) {
  const project = projectData.find((proj) => proj.id === dataID);
  return project ? project.year : [];
}

export function getProjectImage(dataID: number) {
  const project = projectData.find((proj) => proj.id === dataID);
  return project && Array.isArray(project.image) ? project.image : [];
}

export function getProjectContent(dataID: number) {
  const project = projectData.find((proj) => proj.id === dataID);
  return project ? project.content : [];
}

export function getProjectLinks(dataID: number) {
  const project = projectData.find((proj) => proj.id === dataID);
  return project ? project.links : [];
}

export function getProjectArchitecture(dataID: number) {
  const project = projectData.find((proj) => proj.id === dataID);
  return project ? project.architecture : [];
}

export function getProjectIDs() {
  return projectData.map((proj) => proj.id);
}
