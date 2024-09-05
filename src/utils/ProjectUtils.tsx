import { LinkWithIcon } from "../components/Link";
import { Fragment } from "react/jsx-runtime";
import { RiFilePdf2Line, RiGithubLine } from "react-icons/ri";
import { GoPackage } from "react-icons/go";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/all";
gsap.registerPlugin(gsap, ScrollToPlugin);
//
/* import ImagePlugInsDatabase from "../assets/ImagePlugInsDatabase.webp";
import ImageTinyPlugInsDatabase from "../assets/ImagePlugInsDatabase_tiny.webp";
import FilePlugInsDatabase from "../assets/FilePlugInsDatabase.PDF";
import VideoPlugInsDatabase from "../assets/VIdeoPlugInsDatabase.webm";
const GitHubPlugInsDatabase = "https://github.com/shadowisf/PlugInsDatabase"; */
//
import ImageBellHospital from "../assets/ImageBellHospital.webp";
import ImageTinyBellHospital from "../assets/ImageBellHospital_tiny.webp";
import FileBellHospital from "../assets/FileBellHospital.PDF";
import VideoBellHospital from "../assets/VideoBellHospital.webm";
const GitHubBellHospital = "https://github.com/shadowisf/BellHospital";
//
import ImageFunculator from "../assets/ImageFunCulator.webp";
import ImageTinyFunculator from "../assets/ImageFunCulator_tiny.webp";
import FileFunculator from "../assets/FileFunCulator.PDF";
import VideoFunCulator from "../assets/VideoFunCulator.webm";
const GitHubFunCulator = "https://github.com/shadowisf/FunCulator";
//
import ImageApolloHospital from "../assets/ImageApolloHospital.webp";
import ImageTinyApolloHospital from "../assets/ImageApolloHospital_tiny.webp";
import FileApolloHospital from "../assets/FileApolloHospital.PDF";
import VideoApolloHospital from "../assets/VideoApolloHospital.webm";
const GitHubApolloHospital = "https://github.com/shadowisf/ApolloHospital";
const DemoApolloHospital = "https://apollohospital.pythonanywhere.com";
//
import ImageCircuitCentral from "../assets/ImageCircuitCentral.webp";
import ImageTinyCircuitCentral from "../assets/ImageCircuitCentral_tiny.webp";
import FileCircuitCentral from "../assets/FileCircuitCentral.PDF";
import VideoCircuitCentral from "../assets/VideoCircuitCentral.webm";
const GitHubCircuitCentral = "https://github.com/shadowisf/CircuitCentral";
//
import ImageV1Portfolio from "../assets/ImageV1Portfolio.webp";
import ImageTinyV1Portfolio from "../assets/ImageV1Portfolio_tiny.webp";
import VideoV1Portfolio from "../assets/VideoV1Portfolio.webm";
const GitHubV1Portfolio = "https://github.com/shadowisf/PortfolioReactV1";
const DemoV1Portfolio = "https://v1-lesranalan.web.app";
//
import ImageV2Portfolio from "../assets/ImageV2Portfolio.webp";
import ImageTinyV2Portfolio from "../assets/ImageV2Portfolio_tiny.webp";
import VideoV2Portfolio from "../assets/VideoV2Portfolio.webm";
const GitHubV2Portfolio = "https://github.com/shadowisf/PortfolioReactV2";
//
export const projectData: {
  [key: number]: {
    name: string;
    year: string;
    techStack: string[];
    image: string;
    imageTiny: string;
    imageFlex: string;
    imageAlt: string;
    video: string;
    videoFlex: string;
    description: JSX.Element;
    coreConcept: JSX.Element | string;
    myRole: string;
    links: JSX.Element;
    attributions?: string[];
  };
} = {
  // plug-ins database
  /* 0: {
    name: "plug-ins database",
    year: "2022",
    techStack: ["*php", "*html", "*css", "*mariadb"],
    image: ImagePlugInsDatabase,
    imageTiny: ImageTinyPlugInsDatabase,
    imageFlex: "1.879195",
    imageAlt:
      "an image of the plug-ins project. it is currently viewing the products page where it is displaying the list of products and their respective information such as price, category, stock quantity, etc.",
    video: VideoPlugInsDatabase,
    videoFlex: "1.599074",
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
          href={GitHubPlugInsDatabase}
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
  }, */

  // bell hospital
  1: {
    name: "bell hospital",
    year: "2022",
    techStack: ["*java", "*cli", "*file handling"],
    image: ImageBellHospital,
    imageTiny: ImageTinyBellHospital,
    imageFlex: "1.518182",
    imageAlt:
      "an image of the bell hospital project. it is currently viewing the patients records section where it is displaying all patient information (note that this is a CLI project). additionally, there are commands for CRUD operations.",
    video: VideoBellHospital,
    videoFlex: "1.598148",
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
          href={GitHubBellHospital}
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

  // funculator
  2: {
    name: "funculator",
    year: "2022",
    techStack: ["*java", "*swing"],
    image: ImageFunculator,
    imageTiny: ImageTinyFunculator,
    imageFlex: "1.864078",
    imageAlt:
      "an image of the funculator project. it is currently viewing the menu section where it is displaying all of the possible operations such as factorial, min&max, fibonacci, etc.",
    video: VideoFunCulator,
    videoFlex: "1.891626",
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
        <LinkWithIcon img={<RiGithubLine size={24} />} href={GitHubFunCulator}>
          repository
        </LinkWithIcon>

        <LinkWithIcon img={<RiFilePdf2Line size={24} />} href={FileFunculator}>
          report
        </LinkWithIcon>
      </Fragment>
    ),
  },

  // apollo hospital
  3: {
    name: "apollo hospital",
    year: "2023",
    techStack: [
      "*flask",
      "*django",
      "python",
      "javascript",
      "*html",
      "*bootstrap css",
      "*mysql",
      "pythonanywhere",
    ],
    image: ImageApolloHospital,
    imageTiny: ImageTinyApolloHospital,
    imageFlex: "1.876047",
    imageAlt:
      "an image of the apollo hospital project; it is viewing the patient records section wherein it displays the list of patient information. additionally, the ui has buttons for CRUD operations.",
    video: VideoApolloHospital,
    videoFlex: "1.599074",
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
          href={DemoApolloHospital}
          onClick={() => {
            alert(
              "note: you have sign-up first and then login to test the app. click close to continue."
            );
          }}
        >
          live website
        </LinkWithIcon>

        <LinkWithIcon
          img={<RiGithubLine size={24} />}
          href={GitHubApolloHospital}
        >
          repository
        </LinkWithIcon>

        <LinkWithIcon
          img={<RiFilePdf2Line size={24} />}
          href={FileApolloHospital}
        >
          report
        </LinkWithIcon>
      </Fragment>
    ),
  },

  // circuitcentral
  4: {
    name: "circuitcentral",
    year: "2024",
    techStack: ["*c-sharp", "*windows forms", "*transact-sql", "git"],
    image: ImageCircuitCentral,
    imageTiny: ImageTinyCircuitCentral,
    imageFlex: "1.683857",
    imageAlt:
      "an image of the circuitcentral project; it is viewing the orders section wherein it displays a list of products that are currently in a cart. additionally, the ui has buttons for CRUD operations.",
    video: VideoCircuitCentral,
    videoFlex: "1.687037",
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
      </Fragment>
    ),
  },

  // portfoliov v1
  5: {
    name: "portfolio v1",
    year: "2024",
    techStack: ["typescript", "*react", "*html", "*sass", "*firebase", "git"],
    image: ImageV1Portfolio,
    imageTiny: ImageTinyV1Portfolio,
    imageFlex: "1.6",
    imageAlt:
      "image of the about section in my portfolio project. it has a cartoon illustration of me and and text introducing myself.",
    video: VideoV1Portfolio,
    videoFlex: "1.599074",
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
        <LinkWithIcon img={<GoPackage size={24} />} href={DemoV1Portfolio}>
          live website
        </LinkWithIcon>

        <LinkWithIcon img={<RiGithubLine size={24} />} href={GitHubV1Portfolio}>
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

  // portfolio v2
  6: {
    name: "portfolio v2",
    year: "2024",
    techStack: ["typescript", "*react", "*html", "*sass", "*firebase", "git"],
    image: ImageV2Portfolio,
    imageTiny: ImageTinyV2Portfolio,
    imageFlex: "1.6",
    imageAlt:
      "image of the about section in my portfolio v2 project. there is a picture of me and a text introducing myself, with a button at the very bottom which downloads my resume. at the bottom portion, there is a timeline where it showcases all important events that happened in my life. on the right side of the timeline, it showcases my skillset wherein you can filter by my skill level such as all, expert, intermediate, and beginner.",
    video: VideoV2Portfolio,
    videoFlex: "1.598148",
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
      <Fragment>
        <LinkWithIcon img={<RiGithubLine size={24} />} href={GitHubV2Portfolio}>
          repository
        </LinkWithIcon>
      </Fragment>
    ),
    attributions: [
      "zoom-vanilla.js: https://github.com/spinningarrow",
      "gsap: https://github.com/jackdoyle",
      "remix icons: https://github.com/kamijin-fanta",
    ],
  },
};

export function getProjectData(dataID: number) {
  return projectData[dataID];
}

export function getAllProjectIDs() {
  return Object.keys(projectData);
}

export type ProjectProps = {
  dataID: number;
  onClick?: () => void;
};
