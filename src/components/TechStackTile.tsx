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
import { GoCommandPalette } from "react-icons/go";
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
} from "react-icons/si";

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
};

type TechStackTileProps = {
  techStackItem: string;
  classNameContainer: string;
  classNameIcon: string;
  dataKey?: string;
  preview: boolean;
};

export default function TechStackTile({
  techStackItem,
  classNameContainer,
  classNameIcon,
  dataKey,
  preview,
}: TechStackTileProps) {
  const unwantedChars = /[3210*]/g;

  const cleanItem = techStackItem.replace(unwantedChars, "");
  const data = techStackStyling[cleanItem];

  if (!data) {
    return null;
  }
  return preview ? (
    <small
      className={classNameContainer}
      style={{ backgroundColor: data.color }}
    >
      <span className={classNameIcon}>{data.icon}</span>
      {cleanItem}
    </small>
  ) : (
    <span
      className={classNameContainer}
      style={{ backgroundColor: data.color }}
      data-key={dataKey}
    >
      <span className={classNameIcon}>{data.icon}</span>
      {cleanItem}
    </span>
  );
}
