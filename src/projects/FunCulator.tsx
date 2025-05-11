import { ProjectEntry } from "../utils/GODMODE";
import { RiGithubLine, RiFilePdf2Line } from "react-icons/ri";
import { LinkWithIcon } from "../components/Link";
//
import ImageFunculator from "../assets/ImageFunCulator.webp";
import ImageTinyFunculator from "../assets/ImageFunCulator_tiny.webp";
import VideoFunCulator from "../assets/VideoFunCulator.webm";
import FileFunculator from "../assets/FileFunCulator.pdf";
//
const GitHubFunCulator = "https://github.com/shadowisf/FunCulator";

export const FunCulator: ProjectEntry = {
  name: "funculator",
  year: "2022",
  techStack: ["*java", "*swing", "git"],
  image: ImageFunculator,
  imageTiny: ImageTinyFunculator,
  imageFlex: "1.864078",
  imageAlt:
    "an image of the funculator project. it is currently viewing the menu section where it is displaying all of the possible operations such as factorial, min&max, fibonacci, etc.",
  video: VideoFunCulator,
  videoFlex: "1.891626",
  description: (
    <>
      funculator is an <u>all-in-one calculator application</u> designed to
      support students with diverse mathematical operations, built using java’s
      core programming paradigms:
      <ul>
        <li>
          <b>multi-mode functionality</b>: arithmetic, fibonacci sequences,
          number conversions (binary/hex), area/volume calculations, and
          statistical tools (min/max, averages).
        </li>
        <li>
          <b>oop design</b>: encapsulated methods (e.g.,{" "}
          <code>calculatearea()</code>, <code>converttobinary()</code>) ensure
          modularity.
        </li>
        <li>
          <b>dynamic gui</b>: swing components (jframe, jbutton) with
          pixel-art-inspired ui and event-driven workflows.
        </li>
        <li>
          <b>error handling</b>: robust validation for edge cases (e.g.,
          negative factorials, invalid inputs) via try-catch blocks.
        </li>
        <li>
          <b>efficient algorithms</b>: loops (for/while) power factorial,
          fibonacci, and averaging operations.
        </li>
        <li>
          <b>user authentication</b>: a login system with input validation for
          secure access.
        </li>
        <li>
          <b>runtime data handling</b>: file-less operations for optimized
          performance.
        </li>
      </ul>
      <br />
      built with object-oriented programming (oop) principles, it employs
      file-less data handling (runtime-only) and robust error checks to ensure
      stability during input-heavy operations (e.g., factorial overflows).
    </>
  ),
  myRole: (
    <>
      funculator is a group project where i:
      <ul>
        <li>
          designed pixel-art ui (gimp) and integrated assets into swing
          (jpanels, event listeners).
        </li>
        <li>
          implemented 5+ core features (factorial, fibonacci, average, min/max,
          number conversions) using loops and conditionals.
        </li>
        <li>
          added validation for edge cases (e.g., negative factorials, invalid
          number systems).
        </li>
        <li>
          coordinated modular integration (e.g., linking login to menu via
          jframe navigation).
        </li>
      </ul>
      <br />
      this project demonstrated my ability to merge oop principles, ui design,
      and algorithmic logic into a cohesive educational tool.
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
};
