import { IconType } from "react-icons";
import { AiFillApi } from "react-icons/ai";
import {
  BiLogoFirebase,
  BiLogoJavascript,
  BiLogoTypescript,
} from "react-icons/bi";
import { BsDatabase } from "react-icons/bs";
import { DiMsqlServer } from "react-icons/di";
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
import { GiSpermWhale } from "react-icons/gi";
import { GoCommandPalette } from "react-icons/go";
import { GrMysql } from "react-icons/gr";
import {
  SiDotnet,
  SiFlask,
  SiDjango,
  SiFramework,
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
  SiSupabase,
  SiXampp,
  SiVercel,
  SiGreensock,
  SiFramer,
  SiPocketbase,
  SiJira,
  SiFigma,
  SiWebflow,
} from "react-icons/si";

export const techStackStyling: Record<
  string,
  { icon: IconType; color: string }
> = {
  typescript: {
    icon: BiLogoTypescript,
    color: "light-dark(rgb(49, 120, 198), rgb(30, 100, 180))",
  },
  "react.js": {
    icon: FaReact,
    color: "light-dark(rgb(77, 167, 197), rgb(60, 140, 170))",
  },
  html: {
    icon: FaHtml5,
    color: "light-dark(rgb(231, 100, 60), rgb(170, 70, 45))",
  },
  css: {
    icon: FaCss3Alt,
    color: "light-dark(rgb(56, 133, 207), rgb(35, 85, 140))",
  },
  scss: {
    icon: FaSass,
    color: "light-dark(rgb(204, 102, 153),rgb(166, 77, 127))",
  },
  firebase: {
    icon: BiLogoFirebase,
    color: "light-dark(rgb(222, 157, 58), rgb(180, 120, 45))",
  },
  sql: {
    icon: BsDatabase,
    color: "light-dark(rgb(206, 140, 140), rgb(173, 121, 121))",
  },
  git: {
    icon: FaGitAlt,
    color: "light-dark(rgb(217, 91, 68), rgb(205, 86, 64))",
  },
  "c#": {
    icon: SiDotnet,
    color: "light-dark(rgb(157, 118, 224), rgb(148, 111, 211))",
  },
  "windows forms": {
    icon: SiDotnet,
    color: "light-dark(rgb(115, 80, 255), rgb(115, 80, 255))",
  },
  "transact-sql": {
    icon: BsDatabase,
    color: "light-dark(rgb(148, 148, 148), rgb(128, 128, 128))",
  },
  java: {
    icon: FaJava,
    color: "light-dark(rgb(240, 87, 70), rgb(180, 65, 55))",
  },
  flask: {
    icon: SiFlask,
    color: "light-dark(rgb(93, 137, 142), rgb(53, 107, 114))",
  },
  django: {
    icon: SiDjango,
    color: "light-dark(rgb(80, 157, 116), rgb(70, 140, 105))",
  },
  "bootstrap css": {
    icon: FaBootstrap,
    color: "light-dark(rgb(161, 132, 202), rgb(121, 82, 179))",
  },
  swing: {
    icon: SiFramework,
    color: "light-dark(rgb(148, 148, 148), rgb(128, 128, 128))",
  },
  cli: {
    icon: GoCommandPalette,
    color: "light-dark(rgb(148, 148, 148), rgb(128, 128, 128))",
  },
  "file handling": {
    icon: SiFramework,
    color: "light-dark(rgb(148, 148, 148), rgb(128, 128, 128))",
  },
  php: {
    icon: SiPhp,
    color: "light-dark(rgb(119, 123, 180), rgb(102, 106, 163))",
  },
  mysql: {
    icon: GrMysql,
    color: "light-dark(rgb(79, 136, 169), rgb(35, 80, 115))",
  },
  python: {
    icon: FaPython,
    color: "light-dark(rgb(107, 138, 170), rgb(70, 109, 150))",
  },
  postgresql: {
    icon: SiPostgresql,
    color: "light-dark(rgb(64, 101, 141), rgb(50, 85, 115))",
  },
  javascript: {
    icon: BiLogoJavascript,
    color: "light-dark(rgb(210, 174, 68), rgb(180, 155, 55))",
  },
  "restful api": {
    icon: AiFillApi,
    color: "light-dark(rgb(181, 105, 71), rgb(130, 70, 50))",
  },
  angular: {
    icon: FaAngular,
    color: "light-dark(rgb(167, 58, 56), rgb(145, 45, 45))",
  },
  vue: {
    icon: FaVuejs,
    color: "light-dark(rgb(100, 181, 135), rgb(80, 150, 100))",
  },
  svelte: {
    icon: SiSvelte,
    color: "light-dark(rgb(235, 79, 39), rgb(200, 70, 35))",
  },
  "tailwind css": {
    icon: SiTailwindcss,
    color: "light-dark(rgb(94, 200, 183), rgb(80, 170, 160))",
  },
  mariadb: {
    icon: SiMariadb,
    color: "light-dark(rgb(167, 138, 101), rgb(150, 125, 90))",
  },
  pythonanywhere: {
    icon: SiPythonanywhere,
    color: "light-dark(rgb(85, 168, 222), rgb(70, 150, 200))",
  },
  "react native": {
    icon: FaReact,
    color: "light-dark(rgb(77, 167, 197), rgb(60, 140, 170))",
  },
  expo: {
    icon: SiExpo,
    color: "light-dark(rgb(77, 77, 77), rgb(77, 77, 77)",
  },
  "next.js": {
    icon: SiNextdotjs,
    color: "light-dark(rgb(53, 53, 53), rgb(53, 53, 53))",
  },
  cloudinary: {
    icon: SiCloudinary,
    color: "light-dark(rgb(56, 71, 190), rgb(46, 59, 152))",
  },
  vite: {
    icon: SiVite,
    color: "light-dark(rgb(174, 63, 245), rgb(121, 43, 169))",
  },
  supabase: {
    icon: SiSupabase,
    color: "light-dark(rgb(51, 121, 52), rgb(40, 96, 41))",
  },
  "email.js": {
    icon: SiFramework,
    color: "light-dark(rgb(148, 148, 148), rgb(128, 128, 128))",
  },
  "webgazer.js": {
    icon: SiFramework,
    color: "light-dark(rgb(148, 148, 148), rgb(128, 128, 128))",
  },
  deepseek: {
    icon: GiSpermWhale,
    color: "light-dark(rgb(84, 107, 246), rgb(72, 94, 214))",
  },
  nosql: {
    icon: BsDatabase,
    color: "light-dark(rgb(148, 148, 148), rgb(128, 128, 128))",
  },
  xampp: {
    icon: SiXampp,
    color: "light-dark(rgb(234, 130, 61), rgb(196, 108, 49))",
  },
  "microsoft sql server": {
    icon: DiMsqlServer,
    color: "light-dark(rgb(204, 84, 83), rgb(184, 54, 53))",
  },
  vercel: {
    icon: SiVercel,
    color: "light-dark(rgb(75, 75, 75), rgb(75, 75, 75))",
  },
  gsap: {
    icon: SiGreensock,
    color: "light-dark(rgb(151, 204, 63), rgb(127, 172, 54))",
  },
  "framer motion": {
    icon: SiFramer,
    color: "light-dark(rgb(180, 40, 192), rgb(180, 40, 192))",
  },
  pocketbase: {
    icon: SiPocketbase,
    color: "light-dark(rgb(130, 150, 156), rgb(130, 150, 156))",
  },
  jira: {
    icon: SiJira,
    color: "light-dark(rgb(35, 83, 199), rgb(35, 83, 199))",
  },
  figma: {
    icon: SiFigma,
    color: "light-dark(rgb(81, 167, 101), rgb(81, 167, 101))",
  },
  webflow: {
    icon: SiWebflow,
    color: "light-dark(rgb(51, 108, 236), rgb(51, 108, 236))",
  },
};
