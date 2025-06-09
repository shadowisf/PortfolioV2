import { WorkEntry } from "../../utils/types/WorkEntry";
import { LinkWithIcon } from "../../components/Link";
//
import ImageFunculator from "@/assets/ImageFunCulator.webp";
import VideoFunCulator from "@/assets/VideoFunCulator.webm";
import FileFunculator from "@/assets/FileFunCulator.pdf";
//
const GitHubFunCulator = "https://github.com/shadowisf/FunCulator";

export const FunCulator: WorkEntry = {
  name: "funculator",
  year: "2022",
  techStack: ["*java", "*swing", "git"],
  image: ImageFunculator,
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
          <code>calculateArea()</code>, <code>convertToBinary()</code>) to
          ensure modularity.
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
          <b>efficient algorithms</b>: for/while loops power factorial,
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
      funculator is a <u>group project</u> where i:
      <ul>
        <li>
          designed pixel-art ui (gimp) and integrated @/assets into swing
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
      <LinkWithIcon
        img={<img src="src/@/assets/IconOctopus.svg" />}
        href={GitHubFunCulator}
      >
        source code
      </LinkWithIcon>

      <LinkWithIcon
        img={<img src="src/@/assets/IconMemo.svg" />}
        href={FileFunculator}
      >
        case study
      </LinkWithIcon>
    </>
  ),
};
