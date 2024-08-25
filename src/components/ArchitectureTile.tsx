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
  SiXampp,
  SiPhp,
  SiPostgresql,
  SiSvelte,
  SiTailwindcss,
} from "react-icons/si";

export const architectureStyling: Record<
  string,
  { icon: JSX.Element; color: string }
> = {
  typescript: {
    icon: <BiLogoTypescript />,
    color: "rgb(49, 120, 198)",
  },
  react: {
    icon: <FaReact />,
    color: "rgb(77, 167, 197)",
  },
  html: {
    icon: <FaHtml5 />,
    color: "rgb(211, 88, 53)",
  },
  css: {
    icon: <FaCss3Alt />,
    color: "rgb(46, 107, 180)",
  },
  sass: {
    icon: <FaSass />,
    color: "#cc6699",
  },
  firebase: {
    icon: <BiLogoFirebase />,
    color: "rgb(222, 157, 58)",
  },
  git: {
    icon: <FaGitAlt />,
    color: "rgb(205, 86, 64)",
  },
  "c-sharp": {
    icon: <SiCsharp />,
    color: "rgb(148, 111, 211)",
  },
  "windows forms": {
    icon: <SiFramework />,
    color: "gray",
  },
  "microsoft sql server": {
    icon: <SiMicrosoftsqlserver />,
    color: "rgb(184, 54, 53)",
  },
  java: {
    icon: <FaJava />,
    color: "rgb(223, 82, 65)",
  },
  flask: {
    icon: <SiFlask />,
    color: "rgb(53, 107, 114)",
  },
  django: {
    icon: <SiDjango />,
    color: "rgb(80, 157, 116)",
  },
  "bootstrap css": {
    icon: <FaBootstrap />,
    color: "#7952b3",
  },
  xampp: {
    icon: <SiXampp />,
    color: "rgb(234, 130, 61)",
  },
  swing: {
    icon: <SiFramework />,
    color: "gray",
  },
  cli: {
    icon: <GoCommandPalette />,
    color: "gray",
  },
  "file handling": {
    icon: <SiFramework />,
    color: "gray",
  },
  php: {
    icon: <SiPhp />,
    color: "#777BB4",
  },
  mysql: {
    icon: <GrMysql />,
    color: "rgb(41, 96, 132)",
  },
  python: {
    icon: <FaPython />,
    color: "rgb(70, 109, 150)",
  },
  postgresql: {
    icon: <SiPostgresql />,
    color: "rgb(64, 101, 141)",
  },
  javascript: {
    icon: <BiLogoJavascript />,
    color: "rgb(210, 174, 68)",
  },
  "restful api": {
    icon: <SiFramework />,
    color: "var(--faded-color)",
  },
  angular: {
    icon: <FaAngular />,
    color: "rgb(167, 58, 56)",
  },
  vue: {
    icon: <FaVuejs />,
    color: "rgb(100, 181, 135)",
  },
  svelte: {
    icon: <SiSvelte />,
    color: "rgb(235, 79, 39)",
  },
  "tailwind css": {
    icon: <SiTailwindcss />,
    color: "rgb(94, 200, 183)",
  },
};

type ArchitectureTileProps = {
  architecture: string;
  classNameContainer: string;
  classNameIcon: string;
  dataKey?: string;
  preview: boolean;
};

export default function ArchitectureTile({
  architecture,
  classNameContainer,
  classNameIcon,
  dataKey,
  preview,
}: ArchitectureTileProps) {
  const unwantedChars = /[3210*]/g;

  const cleanItem = architecture.replace(unwantedChars, "");
  const data = architectureStyling[cleanItem];

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
