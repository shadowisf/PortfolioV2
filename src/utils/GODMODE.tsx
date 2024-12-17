import { LinkWithIcon } from "../components/Link";
import { RiFilePdf2Line, RiGithubLine } from "react-icons/ri";
import {
  BiLogoTypescript,
  BiLogoFirebase,
  BiLogoJavascript,
} from "react-icons/bi";
import {
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaSass,
  FaGitAlt,
  FaJava,
  FaBootstrap,
  FaPython,
  FaAngular,
  FaVuejs,
} from "react-icons/fa";
import { GoCommandPalette, GoPackage } from "react-icons/go";
import { GrMysql } from "react-icons/gr";
import {
  SiCsharp,
  SiFramework,
  SiMicrosoftsqlserver,
  SiFlask,
  SiDjango,
  SiPhp,
  SiPostgresql,
  SiSvelte,
  SiTailwindcss,
  SiMariadb,
  SiPythonanywhere,
  SiExpo,
  SiNextdotjs,
  SiCloudinary,
  SiVite,
} from "react-icons/si";
//
import ImagePlugIns from "../assets/ImagePlugIns.webp";
import ImageTinyPlugIns from "../assets/ImagePlugIns_tiny.webp";
import FilePlugIns from "../assets/FilePlugIns.pdf";
import VideoPlugIns from "../assets/VideoPlugIns.webm";
const GitHubPlugIns = "https://github.com/shadowisf/PlugIns";
//
import ImageBellHospital from "../assets/ImageBellHospital.webp";
import ImageTinyBellHospital from "../assets/ImageBellHospital_tiny.webp";
import FileBellHospital from "../assets/FileBellHospital.pdf";
import VideoBellHospital from "../assets/VideoBellHospital.webm";
const GitHubBellHospital = "https://github.com/shadowisf/BellHospital";
//
import ImageFunculator from "../assets/ImageFunCulator.webp";
import ImageTinyFunculator from "../assets/ImageFunCulator_tiny.webp";
import FileFunculator from "../assets/FileFunCulator.pdf";
import VideoFunCulator from "../assets/VideoFunCulator.webm";
const GitHubFunCulator = "https://github.com/shadowisf/FunCulator";
//
import ImageApolloHospital from "../assets/ImageApolloHospital.webp";
import ImageTinyApolloHospital from "../assets/ImageApolloHospital_tiny.webp";
import FileApolloHospital from "../assets/FileApolloHospital.pdf";
import VideoApolloHospital from "../assets/VideoApolloHospital.webm";
const GitHubApolloHospital = "https://github.com/shadowisf/ApolloHospital";
const DemoApolloHospital = "https://apollohospital.pythonanywhere.com";
//
import ImageCircuitCentral from "../assets/ImageCircuitCentral.webp";
import ImageTinyCircuitCentral from "../assets/ImageCircuitCentral_tiny.webp";
import FileCircuitCentral from "../assets/FileCircuitCentral.pdf";
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
import ImageClipDetective from "../assets/ImageClipDetective.webp";
import ImageTinyClipDetective from "../assets/ImageClipDetective_tiny.webp";
import VideoClipDetective from "../assets/VideoClipDetective.webm";
const GitHubClipDetective = "https://github.com/shadowisf/ClipDetective";
const DemoClipDetective = "https://clipdetective-2b40e.web.app";
//
import ImageFeelTok from "../assets/ImageFeelTok.webp";
import ImageTinyFeelTok from "../assets/ImageFeelTok_tiny.webp";
import VideoFeelTok from "../assets/VideoFeelTok.webm";
import FileFeelTok from "../assets/FileFeelTok.pdf";
const GitHubFeelTok = "https://github.com/shadowisf/FeelTok";
//
export const instagram = "https://www.instagram.com/les.rx/";
export const linkedin = "https://www.linkedin.com/in/ranalan/";
export const github = "https://github.com/shadowisf";
export const email = "mailto:les.ranalan@gmail.com";
export { default as cv } from "../assets/FileCV.pdf";

export const techStackStyling: Record<
  string,
  { icon: JSX.Element; color: string }
> = {
  typescript: {
    icon: <BiLogoTypescript />,
    color: "light-dark(rgb(49, 120, 198), rgb(30, 100, 180))",
  },
  react: {
    icon: <FaReact />,
    color: "light-dark(rgb(77, 167, 197), rgb(60, 140, 170))",
  },
  html: {
    icon: <FaHtml5 />,
    color: "light-dark(rgb(231, 100, 60), rgb(170, 70, 45))",
  },
  css: {
    icon: <FaCss3Alt />,
    color: "light-dark(rgb(56, 133, 207), rgb(35, 85, 140))",
  },
  sass: {
    icon: <FaSass />,
    color: "light-dark(#cc6699, #a64d7f)",
  },
  firebase: {
    icon: <BiLogoFirebase />,
    color: "light-dark(rgb(222, 157, 58), rgb(180, 120, 45))",
  },
  git: {
    icon: <FaGitAlt />,
    color: "light-dark(#d95b44, rgb(205, 86, 64))",
  },
  "c-sharp": {
    icon: <SiCsharp />,
    color: "light-dark(#9d76e0, rgb(148, 111, 211))",
  },
  "windows forms": {
    icon: <SiFramework />,
    color: "light-dark(#949494, gray)",
  },
  "transact-sql": {
    icon: <SiMicrosoftsqlserver />,
    color: "light-dark(rgb(204, 84, 83), rgb(184, 54, 53))",
  },
  java: {
    icon: <FaJava />,
    color: "light-dark(rgb(240, 87, 70), rgb(180, 65, 55))",
  },
  flask: {
    icon: <SiFlask />,
    color: "light-dark(#5d898e, rgb(53, 107, 114))",
  },
  django: {
    icon: <SiDjango />,
    color: "light-dark(rgb(80, 157, 116), rgb(70, 140, 105))",
  },
  "bootstrap css": {
    icon: <FaBootstrap />,
    color: "light-dark(#a184ca, #7952b3)",
  },
  swing: {
    icon: <SiFramework />,
    color: "light-dark(#949494, gray)",
  },
  cli: {
    icon: <GoCommandPalette />,
    color: "light-dark(#949494, gray)",
  },
  "file handling": {
    icon: <SiFramework />,
    color: "light-dark(#949494, gray)",
  },
  php: {
    icon: <SiPhp />,
    color: "light-dark(#777BB4, #666aa3)",
  },
  mysql: {
    icon: <GrMysql />,
    color: "light-dark(rgb(79, 136, 169), rgb(35, 80, 115))",
  },
  python: {
    icon: <FaPython />,
    color: "light-dark(#6b8aaa, rgb(70, 109, 150))",
  },
  postgresql: {
    icon: <SiPostgresql />,
    color: "light-dark(rgb(64, 101, 141), rgb(50, 85, 115))",
  },
  javascript: {
    icon: <BiLogoJavascript />,
    color: "light-dark(rgb(210, 174, 68), rgb(180, 155, 55))",
  },
  "restful api": {
    icon: <SiFramework />,
    color: "light-dark(#949494, gray)",
  },
  angular: {
    icon: <FaAngular />,
    color: "light-dark(rgb(167, 58, 56), rgb(145, 45, 45))",
  },
  vue: {
    icon: <FaVuejs />,
    color: "light-dark(rgb(100, 181, 135), rgb(80, 150, 100))",
  },
  svelte: {
    icon: <SiSvelte />,
    color: "light-dark(rgb(235, 79, 39), rgb(200, 70, 35))",
  },
  "tailwind css": {
    icon: <SiTailwindcss />,
    color: "light-dark(rgb(94, 200, 183), rgb(80, 170, 160))",
  },
  mariadb: {
    icon: <SiMariadb />,
    color: "light-dark(rgb(167, 138, 101), rgb(150, 125, 90))",
  },
  pythonanywhere: {
    icon: <SiPythonanywhere />,
    color: "light-dark(rgb(85, 168, 222), rgb(70, 150, 200))",
  },
  "react native": {
    icon: <FaReact />,
    color: "light-dark(rgb(77, 167, 197), rgb(60, 140, 170))",
  },
  expo: {
    icon: <SiExpo />,
    color: "light-dark(rgb(77, 77, 77), rgb(77, 77, 77)",
  },
  next: {
    icon: <SiNextdotjs />,
    color: "light-dark(rgb(53, 53, 53), rgb(53, 53, 53))",
  },
  cloudinary: {
    icon: <SiCloudinary />,
    color: "light-dark(rgb(56, 71, 190), rgb(46, 59, 152))",
  },
  vite: {
    icon: <SiVite />,
    color: "light-dark(rgb(174, 63, 245), rgb(121, 43, 169))",
  },
};

export const aboutSkillset: { [key: string]: number } = {
  // 3 for expert
  // 2 for intermediate
  // 1 for beginner
  // 0 for planning to learn
  typescript: 3,
  react: 3,
  html: 3,
  css: 3,
  "bootstrap css": 3,
  sass: 3,
  git: 3,
  firebase: 3,
  "c-sharp": 1,
  java: 2,
  python: 1,
  "transact-sql": 1,
  django: 1,
  flask: 1,
  mariadb: 3,
  mysql: 3,
  php: 1,
  javascript: 2,
  "tailwind css": 2,
  "react native": 2,
  expo: 2,
  next: 2,
};

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
    videoAlt?: string;
    videoFlex: string;
    description: JSX.Element;
    coreConcept: JSX.Element;
    myRole: JSX.Element;
    links: JSX.Element;
    attributions?: string[];
  };
} = {
  // plug-ins
  0: {
    name: "plug-ins",
    year: "2022",
    techStack: ["*php", "*html", "*css", "*mariadb"],
    image: ImagePlugIns,
    imageTiny: ImageTinyPlugIns,
    imageFlex: "1.879195",
    imageAlt:
      "an image of the plug-ins project. it is currently viewing the products page where it is displaying the list of products and their respective information such as price, category, stock quantity, etc.",
    video: VideoPlugIns,
    videoAlt: "",
    videoFlex: "1.599074",
    description: (
      <>
        plug-ins is a <u>database solution</u> for a store that sells electronic
        devices. it covers handling of entity information (customer, product,
        order) within xampp's mariadb database. additionally, it has search
        filtering and a retrieve method through html and php.
      </>
    ),
    coreConcept: (
      <>
        plug-ins is centered around database concepts such as normal forms,
        integrity constraints, and querying, hence the lack of user interface
        (lol). through that, i implemented sql queries, applied integrity
        constraints and applied all stages of normal forms such as first normal
        form (1nf), second normal form (2nf), and third normal form (3nf).
      </>
    ),
    myRole: (
      <>plug-ins was a solo project. every tech stack was implemented by me.</>
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
  },

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
    videoAlt: "",
    videoFlex: "1.598148",
    description: (
      <>
        bell hospital is a <u>hospital management system</u> that is intended to
        be used with a command line interface (cli). it covers handling entity
        (patient and doctor) information, appointment scheduling, and managing
        of pharmaceutical information. its system feature crud operations:
        create, read, update, and delete via file handling, this means that data
        is stored in a .txt file in a local directory. additionally, it has
        error handling and persistent data after program reload.
      </>
    ),
    coreConcept: (
      <>
        bell hospital is centered around object-oriented programming (oop) via
        java. this means creating objects and methods to be repeatedly executed
        in the application.
      </>
    ),
    myRole: (
      <>
        bell hospital was a solo project. every tech stack was implemented by
        me.
      </>
    ),
    links: (
      <>
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
      </>
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
    videoAlt: "",
    videoFlex: "1.891626",
    description: (
      <>
        funculator is an <u>all-in-one calculator application</u> for students.
        its system features a login system for one user type (students) and a
        menu that features all mathematical operations a student needs;
        arithmetics, fibonacci sequences, area of different shapes, etc. the
        design aesthetic for this project was heavily inspired by vibrant pixel
        art and sprites.
      </>
    ),
    coreConcept: (
      <>
        funculator is centered around conditional statements and loops in java
        and how it can be used for math operations. for loops and while loops
        are especially present within fibonacci sequence, factorial, and
        average. while if statements are present in arithmetic, and odd/even.
      </>
    ),
    myRole: (
      <>
        funculator was a group project. i designed and implemented the
        front-end: the general theme, buttons, menu, calculator and avatar via
        gimp and imported in swing. additionally, i implemented half of the
        back-end or math operations: factorial, fibonacci, average, and min/max
        via java.
      </>
    ),
    links: (
      <>
        <LinkWithIcon img={<RiGithubLine size={24} />} href={GitHubFunCulator}>
          repository
        </LinkWithIcon>

        <LinkWithIcon img={<RiFilePdf2Line size={24} />} href={FileFunculator}>
          report
        </LinkWithIcon>
      </>
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
    videoAlt: "",
    videoFlex: "1.599074",
    description: (
      <>
        apollo hospital is a <u>hospital management system</u> that covers
        handling patient and doctor information, scheduling appointments with
        patients, and managing patient's prescription and payables. its system
        features fundamental crud operations: create, read, update, delete
        within the mysql database. additionally, it has a login system for three
        user types (receptionist, doctor, staff), error handling, input
        validation, and search filtering of records.
      </>
    ),
    coreConcept: (
      <>
        apollo hospital is centered around software engineering principles such
        as software development life cycle (sdlc). in which engineers use models
        to represent processes such as project planning, development,
        testing,and future proofing. through this, we are able to efficiently
        execute each process and create this project.
      </>
    ),
    myRole: (
      <>
        apollo hospital was a group project. i designed and implemented the
        front-end: overall theme, buttons, navbar, modals, webpages via
        html,bootstrap css and javascript. additionally, i implemented half of
        the back-end: database schema via xampp's mariadb database, error
        handling, and callouts via django.
      </>
    ),
    links: (
      <>
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
      </>
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
    videoAlt: "",
    videoFlex: "1.687037",
    description: (
      <>
        circuitcentral is an <u>e-commerce management system</u> that sells
        electronic devices. it covers ordering products, viewing product
        catalogs, and handling entity (customer, staff, supplier) information.
        its system features fundamental crud operations: create, read, update,
        and delete within the microsoft sql server database. additionally, it
        features search filtering on all records, error handling of all user
        events, input validation, and a login system for two user types: user
        and admin.
      </>
    ),
    coreConcept: (
      <>
        circuitcentral is centered around creating windows-only applications
        with the use of c# via object-oriented programming (oop); this means
        creating objects and methods that are to be executed repeatedly.
        additionally it also covers test cases through microsoft visual studio
        2022, version control via git, and all things .net or microsoft related;
        hence most of the tech stack are frameworks/applications by microsoft.
      </>
    ),
    myRole: (
      <>this was a solo project. every tech stack was implemented by me.</>
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
  },

  // portfoliov v1
  5: {
    name: "portfolio v1",
    year: "2024",
    techStack: [
      "*typescript",
      "*react",
      "vite",
      "*html",
      "*sass",
      "*firebase",
      "git",
    ],
    image: ImageV1Portfolio,
    imageTiny: ImageTinyV1Portfolio,
    imageFlex: "1.6",
    imageAlt:
      "image of the about section in my portfolio project. it has a cartoon illustration of me and and text introducing myself.",
    video: VideoV1Portfolio,
    videoAlt: "",
    videoFlex: "1.599074",
    description: (
      <>
        portfolio v1 is the original design of my portfolio website and it was
        of cartoonish design inspired by a few websites i saw on the awwwards
        website. through this, i was able to{" "}
        <u>grasp and understand more about html, css, and typescript</u> as a
        baseline for web development.
      </>
    ),
    coreConcept: (
      <>
        portfolio v1 is centered around the concepts based on the react
        framework via typescript (these concepts can also be applied in
        javascript with react). such concepts are functional components which
        are basically a group of html elements that can be placed within a web
        page repeatedly. additionally, there are states, hooks, props, and a lot
        more.
      </>
    ),
    myRole: (
      <>this was a solo project. every tech stack was implemented by me.</>
    ),
    links: (
      <>
        <LinkWithIcon img={<GoPackage size={24} />} href={DemoV1Portfolio}>
          live website
        </LinkWithIcon>

        <LinkWithIcon img={<RiGithubLine size={24} />} href={GitHubV1Portfolio}>
          repository
        </LinkWithIcon>
      </>
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
    techStack: [
      "*typescript",
      "*react",
      "vite",
      "*html",
      "*sass",
      "*firebase",
      "git",
    ],
    image: ImageV2Portfolio,
    imageTiny: ImageTinyV2Portfolio,
    imageFlex: "1.6",
    imageAlt:
      "image of the about section in my portfolio v2 project. there is a picture of me and a text introducing myself, with a button at the very bottom which downloads my resume. at the bottom portion, there is a timeline where it showcases all important events that happened in my life. on the right side of the timeline, it showcases my skillset wherein you can filter by my skill level such as all, expert, intermediate, and beginner.",
    video: VideoV2Portfolio,
    videoAlt: "",
    videoFlex: "1.598148",
    description: (
      <>
        portfolio v2 is the redesign of my portfolio website from v1. this was
        when i realized that my initial design philosophy to minimalism needed
        rethinking. most of the libraries and frameworks are still the same.
        however, some were removed to make the website less resource-intensive
        and more performant. the content remains the same as v1, showcasing my{" "}
        <u>projects, life history, research, and all things me!</u> but now with
        better optimization, design, animations, and a cleaner aesthetic.
      </>
    ),
    coreConcept: (
      <>
        portfolio v2 is centered around green sock animation platform (gsap), an
        animation framework for javascript (and/or typescript). through this, it
        gave me more freedom and control in animating html elements through
        javascript, rather than sticking to pure css. additionally, my react
        concepts were expanded further than portfolio v1, such concepts are
        contexts, react routers, and portals.
      </>
    ),
    myRole: (
      <>this was a solo project. every tech stack was implemented by me.</>
    ),
    links: (
      <LinkWithIcon img={<RiGithubLine size={24} />} href={GitHubV2Portfolio}>
        repository
      </LinkWithIcon>
    ),
    attributions: [
      "zoom-vanilla.js: https://github.com/spinningarrow",
      "gsap: https://github.com/jackdoyle",
      "remix icons: https://github.com/kamijin-fanta",
    ],
  },

  // clip detective
  7: {
    name: "clipdetective",
    year: "2024",
    techStack: [
      "*typescript",
      "*react",
      "vite",
      "*html",
      "*tailwind css",
      "*firebase",
      "git",
    ],
    image: ImageClipDetective,
    imageTiny: ImageTinyClipDetective,
    imageFlex: "1.6",
    imageAlt:
      "image of the index page of the clipdetective web app. there is a text introducing the website, a text saying 'can you guess 5-second clips from movies/series?', and three buttons at the bottom: an option to play with series, to play with movies, and a help button.",
    video: VideoClipDetective,
    videoAlt: "",
    videoFlex: "1.599074",
    description: (
      <>
        clipdetective is a <u>web-based mini game</u> that test users in
        identifying different clips/scenes from shows and movies that i have
        previously binge-watched. this was a side project that was intended to
        immerse myself in doing tailwind and react projects without relying on
        external sources such as tutorials or guides, all solo.
      </>
    ),
    coreConcept: (
      <>
        clipdetective is centered around dynamic state management, dynamic
        rendering, and event handling. through this, clipdetective is able to
        dynamically change the content of the website and display it based on
        the user's inputs. an example to this would be randomly selecting a clip
        and displaying it to the user.
      </>
    ),
    myRole: (
      <>this was a solo project. every tech stack was implemented by me.</>
    ),
    links: (
      <>
        <LinkWithIcon img={<GoPackage size={24} />} href={DemoClipDetective}>
          live website
        </LinkWithIcon>

        <LinkWithIcon
          img={<RiGithubLine size={24} />}
          href={GitHubClipDetective}
        >
          repository
        </LinkWithIcon>
      </>
    ),
  },

  // WIP
  // feeltok
  8: {
    name: "feeltok",
    year: "2024",
    techStack: [
      "*typescript",
      "*react native",
      "expo",
      "*react",
      "next",
      "*firebase",
      "*cloudinary",
      "git",
    ],
    image: ImageFeelTok,
    imageTiny: ImageTinyFeelTok,
    imageFlex: "1.600556",
    imageAlt: "",
    video: VideoFeelTok,
    videoAlt: "",
    videoFlex: "0.47901",
    description: <>THIS PAGE IS WORK IN PROGRESS</>,
    coreConcept: <>THIS PAGE IS WORK IN PROGRESS</>,
    myRole: <>THIS PAGE IS WORK IN PROGRESS</>,
    links: (
      <>
        <LinkWithIcon img={<RiGithubLine size={24} />} href={GitHubFeelTok}>
          repository
        </LinkWithIcon>

        <LinkWithIcon img={<RiFilePdf2Line size={24} />} href={FileFeelTok}>
          report
        </LinkWithIcon>
      </>
    ),
    attributions: ["remix icons: https://github.com/xiaochunjimmy"],
  },
};
