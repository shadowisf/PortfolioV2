import { LinkWithIcon } from "../components/Link";
import { Fragment } from "react/jsx-runtime";
import { RiFilePdf2Line, RiGithubLine } from "react-icons/ri";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/all";
gsap.registerPlugin(gsap, ScrollToPlugin);
//
import ImageV1Portfolio1 from "../assets/ImageV1Portfolio1.webp";
import ImageV1Portfolio2 from "../assets/ImageV1Portfolio2.webp";
import VideoV1Portfolio from "../assets/VideoV1Portfolio.webm";
//
import ImageV2Portfolio1 from "../assets/ImageV2Portfolio1.webp";
import ImageV2Portfolio2 from "../assets/ImageV2Portfolio2.webp";
import ImageV2Portfolio3 from "../assets/ImageV2Portfolio3.webp";
import VideoV2Portfolio from "../assets/VideoV2Portfolio.webm";
//
import ImageApolloHospital1 from "../assets/ImageApolloHospital1.webp";
import ImageApolloHospital2 from "../assets/ImageApolloHospital2.webp";
import FileApolloHospital1 from "../assets/FileApolloHospital1.PDF";
import FileApolloHospital2 from "../assets/FileApolloHospital2.PDF";
import VideoApolloHospital from "../assets/VideoApolloHospital.webm";
//
import ImageCircuitCentral1 from "../assets/ImageCircuitCentral1.webp";
import ImageCircuitCentral2 from "../assets/ImageCircuitCentral2.webp";
import FileCircuitCentral1 from "../assets/FileCircuitCentral1.PDF";
import FileCircuitCentral2 from "../assets/FileCircuitCentral2.PDF";
import VideoCircuitCentral from "../assets/VideoCircuitCentral.webm";
//
import ImagePlugInsDatabase1 from "../assets/ImagePlugInsDatabase1.webp";
import ImagePlugInsDatabase2 from "../assets/ImagePlugInsDatabase2.webp";
import FilePlugInsDatabase from "../assets/FilePlugInsDatabase.PDF";
import VideoPlugInsDatabase from "../assets/VIdeoPlugInsDatabase.webm";
//
import ImageFunculator1 from "../assets/ImageFunCulator1.webp";
import ImageFunculator2 from "../assets/ImageFunCulator2.webp";
import ImageFunculator3 from "../assets/ImageFunCulator3.webp";
import FileFunculator from "../assets/FileFunCulator.PDF";
import VideoFunCulator from "../assets/VideoFunCulator.webm";
//
import ImageBellHospital1 from "../assets/ImageBellHospital1.webp";
import ImageBellHospital2 from "../assets/ImageBellHospital2.webp";
import FileBellHospital from "../assets/FileBellHospital.PDF";
import VideoBellHospital from "../assets/VideoBellHospital.webm";
import { GoPackage } from "react-icons/go";
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
    techStack: ["typescript", "*react", "*html", "*sass", "*firebase", "git"],
    image: [ImageV2Portfolio1, ImageV2Portfolio2, ImageV2Portfolio3],
    video: VideoV2Portfolio,
    imageAlts: [
      "image of the about section in my portfolio v2 project. there is a picture of me and a text introducing myself, with a button at the very bottom which downloads my resume. at the bottom portion, there is a timeline where it showcases all important events that happened in my life. on the right side of the timeline, it showcases my skillset wherein you can filter by my skill level such as all, expert, intermediate, and beginner.",
      "image of the home section in my portfolio v2 project. the left side shows all of the different projects i have done. on the right is the video or image preview of the selected project on hover.",
      "image of the project section in my portfolio v2 project. it is currently viewing the portfolio v1 project. each project has a short description and its tech stack. additionally, there's links to its github repository and technical report. as you scroll down there are images and videos of that specific project.",
    ],
    description: (
      <Fragment>
        portfolio v2 is the redesign of my portfolio website from v1. this was
        when i realized that my initial design philosophy to minimalism needed
        rethinking. most of the libraries and frameworks are still the same.
        however, some were removed to make the website less resource-intensive
        and more performant. the content remains the same as v1, showcasing my{" "}
        <u>projects, life history, research, and all things me!</u> but now with
        better optimization, design, animations, and a cleaner aesthetic.
      </Fragment>
    ),
    coreConcept: `portfolio v2 is centered around green sock animation platform (gsap), an animation framework for javascript (and/or typescript). through this, it gave me more freedom and control in animating html elements through javascript, rather than sticking to pure css. additionally, my react concepts were expanded further than portfolio v1, such concepts are contexts, react routers, and portals.`,
    myRole: "this was a solo project. every tech stack was implemented by me.",
    links: (
      <LinkWithIcon
        img={<RiGithubLine size={24} />}
        href="https://github.com/shadowisf/PortfolioReactV2"
      >
        repository
      </LinkWithIcon>
    ),
    attributions: [
      "medium zoom: https://github.com/francoischalifour",
      "gsap: https://github.com/jackdoyle",
      "remix icons: https://github.com/kamijin-fanta",
    ],
  },
  {
    id: 5,
    name: "portfolio v1",
    year: "2024",
    techStack: ["typescript", "*react", "*html", "*sass", "*firebase", "git"],
    image: [ImageV1Portfolio1, ImageV1Portfolio2],
    imageAlts: [
      "image of the about section in my portfolio project. it has a cartoon illustration of me and and text introducing myself.",
      "image of the project section in my portfolio project. it is currently viewing the circuitcentral project, displaying a short description and its tech stack. additionally, there's links to its github repository and technical report.",
    ],
    video: VideoV1Portfolio,
    description: (
      <Fragment>
        portfolio v1 is the original design of my portfolio website and it was
        of cartoonish design inspired by a few websites i saw on the awwwards
        website. through this, i was able to{" "}
        <u>grasp and understand more about html, css, and typescript</u> as a
        baseline for web development.
      </Fragment>
    ),
    coreConcept:
      "portfolio v1 is centered around the concepts based on the react framework via typescript (these concepts can also be applied in javascript with react). such concepts are functional components which are basically a group of html elements that can be placed within a web page repeatedly. additionally, there are states, hooks, props, and a lot more.",
    myRole: "this was a solo project. every tech stack was implemented by me.",
    links: (
      <Fragment>
        <LinkWithIcon
          img={<GoPackage size={24} />}
          href="https://v1-lesranalan.web.app"
        >
          demo
        </LinkWithIcon>

        <LinkWithIcon
          img={<RiGithubLine size={24} />}
          href="https://github.com/shadowisf/PortfolioReactV1"
        >
          repository
        </LinkWithIcon>
      </Fragment>
    ),
    attributions: [
      "typedcss: https://github.com/brandonmcconnell",
      "react-toastify: https://github.com/fkhadra",
      "medium zoom: https://github.com/francoischalifour",
      "theme engine: https://www.linkedin.com/in/frankmyles/",
      "gsap: https://github.com/jackdoyle",
      "remix icons: https://github.com/xiaochunjimmy",
    ],
  },
  {
    id: 4,
    name: "circuitcentral",
    year: "2024",
    techStack: ["*c-sharp", "*windows forms", "*transact-sql", "git"],
    image: [ImageCircuitCentral1, ImageCircuitCentral2],
    imageAlt: [
      "first image of the circuitcentral project; it is viewing the products section wherein it is displaying a list of tech products that a user can add to their cart. additionally, the ui has buttons for CRUD operations.",
      "second image of the circuitcentral project; it is viewing the orders section wherein it displays a list of products that are currently in a cart. additionally, the ui has buttons for CRUD operations.",
    ],
    video: VideoCircuitCentral,
    description: (
      <Fragment>
        circuitcentral is an <u>e-commerce management system</u> that sells
        electronic devices. it covers ordering products, viewing product
        catalogs, and handling entity (customer, staff, supplier) information.
        its system features fundamental crud operations: create, read, update,
        and delete within the microsoft sql server database. additionally, it
        features search filtering on all records, error handling of all user
        events, input validation, and a login system for two user types: user
        and admin.
      </Fragment>
    ),
    coreConcept:
      "circuitcentral is centered around creating windows-only applications with the use of c# via object-oriented programming (oop); this means creating objects and methods that are to be executed repeatedly. additionally it also covers test cases through microsoft visual studio 2022, version control via git, and all things .net or microsoft related; hence most of the tech stack are frameworks/applications by microsoft.",
    myRole: "this was a solo project. every tech stack was implemented by me.",
    links: (
      <Fragment>
        <LinkWithIcon
          img={<RiGithubLine size={24} />}
          href={CircuitCentralGithub}
        >
          repository
        </LinkWithIcon>

        <LinkWithIcon
          img={<RiFilePdf2Line size={24} />}
          href={FileCircuitCentral2}
        >
          proposal report
        </LinkWithIcon>

        <LinkWithIcon
          img={<RiFilePdf2Line size={24} />}
          href={FileCircuitCentral1}
        >
          implementation report
        </LinkWithIcon>
      </Fragment>
    ),
  },
  {
    id: 3,
    name: "apollo hospital",
    year: "2023",
    techStack: [
      "*flask",
      "python",
      "django",
      "javascript",
      "*html",
      "*bootstrap css",
      "*mysql",
      "pythonanywhere",
    ],
    image: [ImageApolloHospital1, ImageApolloHospital2],
    imageAlts: [
      "first image of the apollo hospital project; it is viewing the home page wherein it displays an illustration of a doctor treating its patient, with the title of the website whch is apollo hospital.",
      "second image of the apollo hospital project; it is viewing the patient records section wherein it displays the list of patient information. additionally, the ui has buttons for CRUD operations.",
    ],
    video: VideoApolloHospital,
    description: (
      <Fragment>
        apollo hospital is a <u>hospital management system</u> that covers
        handling patient and doctor information, scheduling appointments with
        patients, and managing patient's prescription and payables. its system
        features fundamental crud operations: create, read, update, delete
        within the mysql database. additionally, it has a login system for three
        user types (receptionist, doctor, staff), error handling, input
        validation, and search filtering of records.
      </Fragment>
    ),
    coreConcept:
      "apollo hospital is centered around software engineering principles such as software development life cycle (sdlc). in which engineers use models to represent processes such as project planning, development, testing,and future proofing. through this, we are able to efficiently execute each process and create this project.",
    myRole:
      " apollo hospital was a group project. i designed and implemented the front-end: overall theme, buttons, navbar, modals, webpages via html,bootstrap css and javascript. additionally, i implemented half of the back-end: database schema via xampp's mariadb database, error handling, and callouts via django.",
    links: (
      <Fragment>
        <LinkWithIcon
          img={<GoPackage size={24} />}
          href="https://apollohospital.pythonanywhere.com"
          onClick={() => {
            alert(
              "note: you have sign-up first and then login to test the app. click close to continue."
            );
          }}
        >
          demo
        </LinkWithIcon>

        <LinkWithIcon
          img={<RiGithubLine size={24} />}
          href={ApolloHospitalGithub}
        >
          repository
        </LinkWithIcon>

        <LinkWithIcon
          img={<RiFilePdf2Line size={24} />}
          href={FileApolloHospital1}
        >
          report
        </LinkWithIcon>

        <LinkWithIcon
          img={<RiFilePdf2Line size={24} />}
          href={FileApolloHospital2}
        >
          documentation
        </LinkWithIcon>
      </Fragment>
    ),
  },
  {
    id: 2,
    name: "funculator",
    year: "2022",
    techStack: ["*java", "*swing"],
    image: [ImageFunculator1, ImageFunculator2, ImageFunculator3],
    imageAlts: [
      "first image of the funculator project. it is currently viewing the index page where it is displaying a calculator with a face in pixel art form. additionally, there is buttons for start and exit on the right.",
      "second image of the funculator project. it is currently viewing the menu section where it is displaying all of the possible operations such as factorial, min&max, fibonacci, etc.",
      "first image of the funculator project. it is currently viewing the index page where it is displaying a calculator with a face in pixel art form. additionally, there is buttons for start and exit on the right.",
    ],
    video: VideoFunCulator,
    description: (
      <Fragment>
        funculator is an <u>all-in-one calculator application</u> for students.
        its system features a login system for one user type (students) and a
        menu that features all mathematical operations a student needs;
        arithmetics, fibonacci sequences, area of different shapes, etc. the
        design aesthetic for this project was heavily inspired by vibrant pixel
        art and sprites.
      </Fragment>
    ),
    coreConcept: (
      <Fragment>
        funculator is centered around conditional statements and loops in java
        and how it can be used for math operations. <em>for</em> loops and
        <em>while</em> loops are especially present within fibonacci sequence,
        factorial, and average. while <em>if</em> statements are present in
        arithmetic, and odd/even.
      </Fragment>
    ),
    myRole:
      "funculator was a group project. i designed and implemented the front-end: the general theme, buttons, menu, calculator and avatar via gimp and imported in swing. additionally, i implemented half of the back-end or math operations: factorial, fibonacci, average, and min/max via java.",
    links: (
      <Fragment>
        <LinkWithIcon img={<RiGithubLine size={24} />} href={FunculatorGithub}>
          repository
        </LinkWithIcon>

        <LinkWithIcon img={<RiFilePdf2Line size={24} />} href={FileFunculator}>
          report
        </LinkWithIcon>
      </Fragment>
    ),
  },
  {
    id: 1,
    name: "bell hospital",
    year: "2022",
    techStack: ["*java", "*cli", "*file handling"],
    image: [ImageBellHospital1, ImageBellHospital2],
    imageAlts: [
      "first image of the bell hospital project. it is currently viewing the starting page (note that this is a CLI project) where it is displaying all of the possible sections such as patients, doctors, appointments, etc.",
      "second image of the bell hospital project. it is currently viewing the patients records section where it is displaying all patient information (note that this is a CLI project). additionally, there are commands for CRUD operations.",
    ],
    video: VideoBellHospital,
    description: (
      <Fragment>
        bell hospital is a <u>hospital management system</u> that is intended to
        be used with a command line interface (cli). it covers handling entity
        (patient and doctor) information, appointment scheduling, and managing
        of pharmaceutical information. its system feature crud operations:
        create, read, update, and delete via file handling, this means that data
        is stored in a .txt file in a local directory. additionally, it has
        error handling and persistent data after program reload.
      </Fragment>
    ),
    coreConcept:
      "bell hospital is centered around object-oriented programming (oop) via java. this means creating objects and methods to be repeatedly executed in the application.",
    myRole:
      "bell hospital was a solo project. every tech stack was implemented by me.",
    links: (
      <Fragment>
        <LinkWithIcon
          img={<RiGithubLine size={24} />}
          href={BellHospitalGithub}
        >
          repository
        </LinkWithIcon>

        <LinkWithIcon
          img={<RiFilePdf2Line size={24} />}
          href={FileBellHospital}
        >
          report
        </LinkWithIcon>
      </Fragment>
    ),
  },
  {
    id: 0,
    name: "plug-ins database",
    year: "2022",
    techStack: ["*php", "*html", "*css", "*mariadb"],
    image: [ImagePlugInsDatabase1, ImagePlugInsDatabase2],
    imageAlts: [
      "first image of the plug-ins project. it is currently viewing the index customer page where it is displaying input fields for basic customer information such as name, contact number, address, etc. additionally, it has buttons for inserting the customer information into the database.",
      "second image of the plug-ins project. it is currently viewing the products page where it is displaying the list of products and their respective information such as price, category, stock quantity, etc.",
    ],
    video: VideoPlugInsDatabase,
    description: (
      <Fragment>
        plug-ins database is a <u>database solution</u> for a store that sells
        electronic devices. it covers handling of entity information (customer,
        product, order) within xampp's mariadb database. additionally, it has
        search filtering and a retrieve method through html and php.
      </Fragment>
    ),
    coreConcept:
      "plug-ins database is centered around database concepts such as normal forms, integrity constraints, and querying, hence the lack of user interface (lol). through that, i implemented sql queries, applied integrity constraints and applied all stages of normal forms such as first normal form (1nf), second normal form (2nf), and third normal form (3nf).",
    myRole:
      "plug-ins database was a solo project. every tech stack was implemented by me.",
    links: (
      <Fragment>
        <LinkWithIcon
          img={<RiGithubLine size={24} />}
          href={PlugInsDatabaseGithub}
        >
          repository
        </LinkWithIcon>

        <LinkWithIcon
          img={<RiFilePdf2Line size={24} />}
          href={FilePlugInsDatabase}
        >
          report
        </LinkWithIcon>
      </Fragment>
    ),
  },
];

export type ProjectProps = {
  dataID: number;
  onClick?: () => void;
};

export function getProjectName(dataID: number) {
  return projectData.find((proj) => proj.id === dataID)?.name;
}

export function getProjectVideo(dataID: number) {
  return projectData.find((proj) => proj.id === dataID)?.video;
}

export function getProjectYear(dataID: number) {
  const project = projectData.find((proj) => proj.id === dataID);
  return project ? project.year : [];
}

export function getProjectImage(dataID: number) {
  const project = projectData.find((proj) => proj.id === dataID);
  return project && Array.isArray(project.image) ? project.image : [];
}

export function getProjectImageAlts(dataID: number) {
  const project = projectData.find((proj) => proj.id === dataID);
  return project && Array.isArray(project.imageAlts) ? project.imageAlts : [];
}

export function getProjectDescription(dataID: number) {
  const project = projectData.find((proj) => proj.id === dataID);
  return project ? project.description : [];
}

export function getProjectCoreConcept(dataID: number) {
  const project = projectData.find((proj) => proj.id === dataID);
  return project ? project.coreConcept : [];
}

export function getProjectMyRole(dataID: number) {
  const project = projectData.find((proj) => proj.id === dataID);
  return project ? project.myRole : [];
}

export function getProjectLinks(dataID: number) {
  const project = projectData.find((proj) => proj.id === dataID);
  return project ? project.links : [];
}

export function getProjectTechStack(dataID: number) {
  const project = projectData.find((proj) => proj.id === dataID);
  return project ? project.techStack : [];
}

export function getAllProjectIDs() {
  return projectData.map((proj) => proj.id);
}
