import { ApolloHospital } from "../projects/ApolloHospital";
import { CircuitCentral } from "../projects/CircuitCentral";
import { PortfolioV1 } from "../projects/PortfolioV1";
import { BellHospital } from "../projects/BellHospital";
import { FunCulator } from "../projects/FunCulator";
import { PlugIns } from "../projects/PlugIns";
import { PortfolioV2 } from "../projects/PortfolioV2";
import { ClipDetective } from "../projects/ClipDetective";
import { FeelTok } from "../projects/FeelTok";
/* import { WhealthyVessel } from "../projects/WhealthyVessel"; */
import { Examiq } from "../projects/Examiq";
/* import { LetThereBeFragrance } from "../projects/LetThereBeFragrance"; */
//
import { AiFillApi } from "react-icons/ai";
import {
  BiLogoFirebase,
  BiLogoJavascript,
  BiLogoTypescript,
} from "react-icons/bi";
import { BsDatabase } from "react-icons/bs";
import {
  FaAngular,
  FaBootstrap,
  FaCss3Alt,
  FaGitAlt,
  FaHtml5,
  FaJava,
  FaPython,
  FaReact,
  FaSass,
  FaVuejs,
} from "react-icons/fa";
import { GiSpermWhale } from "react-icons/gi";
import { GoCommandPalette } from "react-icons/go";
import { GrMysql } from "react-icons/gr";
import {
  SiCloudinary,
  SiCsharp,
  SiDjango,
  SiExpo,
  SiFlask,
  SiFramer,
  SiFramework,
  SiGreensock,
  SiMariadb,
  SiMicrosoftsqlserver,
  SiNextdotjs,
  SiPhp,
  SiPocketbase,
  SiPostgresql,
  SiPythonanywhere,
  SiSupabase,
  SiSvelte,
  SiTailwindcss,
  SiVercel,
  SiVite,
  SiXampp,
} from "react-icons/si";
import { ReactElement } from "react";

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
  "react.js": {
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
  scss: {
    icon: <FaSass />,
    color: "light-dark(rgb(204, 102, 153),rgb(166, 77, 127))",
  },
  firebase: {
    icon: <BiLogoFirebase />,
    color: "light-dark(rgb(222, 157, 58), rgb(180, 120, 45))",
  },
  sql: {
    icon: <BsDatabase />,
    color: "light-dark(rgb(206, 140, 140), rgb(173, 121, 121))",
  },
  git: {
    icon: <FaGitAlt />,
    color: "light-dark(rgb(217, 91, 68), rgb(205, 86, 64))",
  },
  "c#": {
    icon: <SiCsharp />,
    color: "light-dark(rgb(157, 118, 224), rgb(148, 111, 211))",
  },
  "windows forms": {
    icon: <SiFramework />,
    color: "light-dark(rgb(148, 148, 148), rgb(128, 128, 128))",
  },
  "transact-sql": {
    icon: <BsDatabase />,
    color: "light-dark(rgb(148, 148, 148), rgb(128, 128, 128))",
  },
  java: {
    icon: <FaJava />,
    color: "light-dark(rgb(240, 87, 70), rgb(180, 65, 55))",
  },
  flask: {
    icon: <SiFlask />,
    color: "light-dark(rgb(93, 137, 142), rgb(53, 107, 114))",
  },
  django: {
    icon: <SiDjango />,
    color: "light-dark(rgb(80, 157, 116), rgb(70, 140, 105))",
  },
  "bootstrap css": {
    icon: <FaBootstrap />,
    color: "light-dark(rgb(161, 132, 202), rgb(121, 82, 179))",
  },
  swing: {
    icon: <SiFramework />,
    color: "light-dark(rgb(148, 148, 148), rgb(128, 128, 128))",
  },
  cli: {
    icon: <GoCommandPalette />,
    color: "light-dark(rgb(148, 148, 148), rgb(128, 128, 128))",
  },
  "file handling": {
    icon: <SiFramework />,
    color: "light-dark(rgb(148, 148, 148), rgb(128, 128, 128))",
  },
  php: {
    icon: <SiPhp />,
    color: "light-dark(rgb(119, 123, 180), rgb(102, 106, 163))",
  },
  mysql: {
    icon: <GrMysql />,
    color: "light-dark(rgb(79, 136, 169), rgb(35, 80, 115))",
  },
  python: {
    icon: <FaPython />,
    color: "light-dark(rgb(107, 138, 170), rgb(70, 109, 150))",
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
    icon: <AiFillApi />,
    color: "light-dark(rgb(181, 105, 71), rgb(130, 70, 50))",
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
  "next.js": {
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
  supabase: {
    icon: <SiSupabase />,
    color: "light-dark(rgb(51, 121, 52), rgb(40, 96, 41))",
  },
  "email.js": {
    icon: <SiFramework />,
    color: "light-dark(rgb(148, 148, 148), rgb(128, 128, 128))",
  },
  "webgazer.js": {
    icon: <SiFramework />,
    color: "light-dark(rgb(148, 148, 148), rgb(128, 128, 128))",
  },
  deepseek: {
    icon: <GiSpermWhale />,
    color: "light-dark(rgb(84, 107, 246), rgb(72, 94, 214))",
  },
  nosql: {
    icon: <BsDatabase />,
    color: "light-dark(rgb(148, 148, 148), rgb(128, 128, 128))",
  },
  xampp: {
    icon: <SiXampp />,
    color: "light-dark(rgb(234, 130, 61), rgb(196, 108, 49))",
  },
  "microsoft sql server": {
    icon: <SiMicrosoftsqlserver />,
    color: "light-dark(rgb(204, 84, 83), rgb(184, 54, 53))",
  },
  vercel: {
    icon: <SiVercel />,
    color: "light-dark(rgb(75, 75, 75), rgb(75, 75, 75))",
  },
  gsap: {
    icon: <SiGreensock />,
    color: "light-dark(rgb(151, 204, 63), rgb(127, 172, 54))",
  },
  "framer motion": {
    icon: <SiFramer />,
    color: "light-dark(rgb(180, 40, 192), rgb(180, 40, 192))",
  },
  pocketbase: {
    icon: <SiPocketbase />,
    color: "light-dark(rgb(130, 150, 156), rgb(130, 150, 156))",
  },
};

export const aboutSkillset: { [key: string]: number } = {
  // 3 - expert
  // 2 - intermediate
  // 1 - beginner
  // 0 - planning to learn

  typescript: 3,
  "react.js": 3,
  html: 3,
  css: 3,
  scss: 3,
  firebase: 3,
  sql: 3,
  git: 3,
  "c#": 1,
  // "windows forms": 0,
  // "transact-sql": 1,
  java: 2,
  // flask: 1,
  django: 1,
  "bootstrap css": 2,
  // swing: 0,
  // cli: 0,
  // "file handling": 0,
  php: 1,
  // mysql: 3,
  python: 2,
  // postgresql: 0,
  javascript: 2,
  "restful api": 2,
  // angular: 0,
  // vue: 0,
  // svelte: 0,
  "tailwind css": 2,
  // mariadb: 3,
  // pythonanywhere: 1,
  "react native": 2,
  expo: 2,
  "next.js": 3,
  // cloudinary: 1,
  // vite: 3,
  supabase: 3,
  // email.js: 0,
  // webgazer.js: 0,
  // deepseek: 0,
  // nosql: 0,
  // xampp: 0,
  // "microsoft sql server": 0,
  // vercel: 0,
  // gsap: 0,
  // "framer motion": 0,
  // pocketbase: 0,
};

export interface ProjectEntry {
  name: string;
  year: string;
  techStack: string[];
  image: string;
  imageTiny: string;
  imageFlex: string;
  imageAlt: string;
  video: string;
  videoFlex: string;
  description: ReactElement;
  myRole: ReactElement;
  links: ReactElement;
  attributions?: string[];
}

export const projectData: {
  [key: number]: ProjectEntry;
} = {
  // all
  /* 0: PlugIns,
  1: BellHospital,
  2: FunCulator,
  3: ApolloHospital,
  4: CircuitCentral,
  5: PortfolioV1,
  6: PortfolioV2,
  7: ClipDetective,
  8: FeelTok,
  9: WhealthyVessel,
  10: Examiq,
  11: LetThereBeFragrance, */

  // filtered
  0: PlugIns,
  1: BellHospital,
  2: FunCulator,
  3: ApolloHospital,
  4: CircuitCentral,
  5: PortfolioV1,
  6: PortfolioV2,
  7: ClipDetective,
  8: FeelTok,
  9: Examiq,
};
