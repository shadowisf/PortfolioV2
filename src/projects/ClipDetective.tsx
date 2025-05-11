import { ProjectEntry } from "../utils/GODMODE";
import { GoPackage } from "react-icons/go";
import { RiGithubLine } from "react-icons/ri";
import { LinkWithIcon } from "../components/Link";
//
import ImageClipDetective from "../assets/ImageClipDetective.webp";
import ImageTinyClipDetective from "../assets/ImageClipDetective_tiny.webp";
import VideoClipDetective from "../assets/VideoClipDetective.webm";
//
const GitHubClipDetective = "https://github.com/shadowisf/ClipDetective";
const DemoClipDetective = "https://clipdetective-2b40e.web.app";

export const ClipDetective: ProjectEntry = {
  name: "clipdetective",
  year: "2024",
  techStack: [
    "*vite",
    "*react",
    "*typescript",
    "*html",
    "*tailwind css",
    "*firebase",
    "nosql",
    "git",
  ],
  image: ImageClipDetective,
  imageTiny: ImageTinyClipDetective,
  imageFlex: "1.6",
  imageAlt:
    "image of the index page of the clipdetective web app. there is a text introducing the website, a text saying 'can you guess 5-second clips from movies/series?', and three buttons at the bottom: an option to play with series, to play with movies, and a help button.",
  video: VideoClipDetective,
  videoFlex: "1.599074",
  description: (
    <>
      clipdetective is a web-based mini game that challenges users to identify
      scenes from shows and movies i’ve binge-watched. designed as a solo side
      project, it pushed me to work independently with react and tailwind css,
      avoiding tutorials or external guides. key features include:
      <ul>
        <li>
          <b>interactive quizzes</b>: users guess clips from random snippets of
          my favorite media.
        </li>
        <li>
          <b>self-directed learning</b>: built entirely through personal
          problem-solving and documentation.
        </li>
        <li>
          <b>minimalist design</b>: tailwind’s utility-first css for rapid,
          clean styling.
        </li>
        <li>
          <b>react implementation</b>: real-time state management for scores and
          progress
        </li>
        <li>
          <b>dynamic rendering</b>: conditionally displays questions, feedback
          and results
        </li>
        <li>
          <b>custom logic</b>: clip randomization and non-repeating question
          flow
        </li>
      </ul>
    </>
  ),
  myRole: (
    <>
      clipdetective is a solo project where i:
      <ul>
        <li>structured the quiz flow and ui entirely from scratch.</li>
        <li>
          wrote react hooks for state, built clip-triggering logic, and styled
          with tailwind.
        </li>
        <li>handpicked and edited clips for the game library.</li>
        <li>debugged challenges like clip preloading and score persistence.</li>
      </ul>
      <br />
      this passion project demonstrates my ability to independently
      conceptualize, build and ship complete web applications while expanding my
      react expertise.
    </>
  ),
  links: (
    <>
      <LinkWithIcon img={<GoPackage size={24} />} href={DemoClipDetective}>
        live website
      </LinkWithIcon>

      <LinkWithIcon img={<RiGithubLine size={24} />} href={GitHubClipDetective}>
        repository
      </LinkWithIcon>
    </>
  ),
};
