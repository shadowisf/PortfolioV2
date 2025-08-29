import { WorkEntry } from "../../utils/types/WorkEntry";
import { LinkWithIcon } from "../../components/Link";
import { IconGlobe, IconOctopus } from "../../utils/iconSetting";
//
import ImageClipDetective from "@/assets/ImageClipDetective.webp";
import VideoClipDetective from "@/assets/VideoClipDetective.webm";
//
const GitHubClipDetective = "https://github.com/shadowisf/ClipDetective";
const DemoClipDetective = "https://clipdetective-2b40e.web.app";

export const ClipDetective: WorkEntry = {
  type: "personal project",
  name: "clipdetective",
  year: "2024",
  techStack: [
    "vite",
    "*react.js",
    "*typescript",
    "*tailwind css",
    "*firebase",
    "*nosql",
    "git",
  ],
  image: ImageClipDetective,
  imageFlex: "1.6",
  imageAlt:
    "an image of the index page of the clipdetective web app. there is a text introducing the website, a text saying 'can you guess 5-second clips from movies/series?', and three buttons at the bottom: an option to play with series, to play with movies, and a help button.",
  video: VideoClipDetective,
  videoFlex: "1.599074",
  status: (
    <>
      clipdetective is currently under <u>active development</u>.
    </>
  ),
  description: (
    <>
      clipdetective is a <u>web-based mini game</u> that challenges users to
      identify scenes from shows and movies i’ve binge-watched. it pushed me to
      work independently with react.js and tailwind css, avoiding tutorials or
      external guides. key features include:
      <ul>
        <li>
          <b>interactive quizzes:</b> users guess clips from random snippets of
          media.
        </li>
        <li>
          <b>letter-by-letter clues:</b> incomplete words are revealed one
          letter at a time to help the player.
        </li>
        <li>
          <b>dynamic feedback:</b> real-time scoring and results to keep users
          engaged.
        </li>
        <li>
          <b>minimalist design:</b> clean and intuitive user interface for
          smooth gameplay.
        </li>
      </ul>
    </>
  ),
  myRole: (
    <>
      clipdetective was a <u>solo personal project</u> where i:
      <ul>
        <li>
          structured the full quiz flow, including non-repeating questions and
          clip randomization logic.
        </li>
        <li>
          implemented real-time state management with react.js hooks for scores,
          progress, and feedback.
        </li>
        <li>
          styled the entire application using tailwind css for a clean and
          responsive UI.
        </li>
        <li>
          built dynamic rendering to conditionally display questions, feedback,
          and results.
        </li>
        <li>preloaded and managed media clips to ensure smooth gameplay.</li>
        <li>
          debugged issues such as score persistence, clip triggering, and user
          interface responsiveness.
        </li>
        <li>handpicked and edited all clips for the game library.</li>
        <li>
          worked independently, conceptualizing, building, and shipping the full
          web application.
        </li>
      </ul>
      <br />
      this project demonstrates my ability to independently conceptualize, build
      and ship complete web applications while expanding my react.js expertise.
    </>
  ),
  links: (
    <>
      <LinkWithIcon
        img={<img alt="globe icon" src={IconGlobe} />}
        href={DemoClipDetective}
      >
        live website
      </LinkWithIcon>

      <LinkWithIcon
        img={<img alt="octopus icon" src={IconOctopus} />}
        href={GitHubClipDetective}
      >
        source code
      </LinkWithIcon>
    </>
  ),
};
