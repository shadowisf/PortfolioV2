import { WorkEntry } from "../../utils/types/WorkEntry";
import { LinkWithIcon } from "../../components/Link";
import { IconGlobe, IconCards, IconOctopus } from "../../utils/iconSetting";
//
import ImageExamiq from "@/assets/ImageExamiq.webp";
import VideoExamiq from "@/assets/VideoExamiq.webm";
import FileExamiq from "@/assets/FileExamiq.pdf";
//
const GitHubExamiq = "https://github.com/shadowisf/Examiq";
const DemoExamiq = "https://examiq-seven.vercel.app";

export const Examiq: WorkEntry = {
  type: "personal project",
  name: "examiq",
  year: "2025",
  techStack: [
    "*next.js",
    "*typescript",
    "*scss",
    "*supabase",
    "*postgresql",
    "*webgazer.js",
    "*deepseek",
    "*restful api",
    "*vercel",
    "git",
  ],
  image: ImageExamiq,
  imageFlex: "1.735986",
  imageAlt:
    "an image of examiq, an ai-powered proctorig system. currently, it's in the exam page wherein it's displaying all of the questions of an exam in a form format. while at it, on the top left, there is a camera showing the face of the user and the system is scanning the fact, specifically the eyes. you can then see a red dot on the screen, tracking the user's gaze.",
  video: VideoExamiq,
  videoFlex: "1.726",
  status: (
    <>
      examiq was completed on <u>may 11, 2025</u>.
    </>
  ),
  description: (
    <>
      examiq is a <u>web-based ai-powered proctoring system</u> that features
      gaze tracking, input tracking, and behavior tracking to prevent cheating
      during remote assessments. it offers:
      <ul>
        <li>
          <b>role-based authentication & dashboards</b>: persistent login with
          full-crud features for courses, exams, results, and account
          management.
        </li>
        <li>
          <b>secure monitoring</b>: client-side gaze, input, and behavior
          analysis with no external data transfer, ensuring privacy.
        </li>
        <li>
          <b>ai-powered evaluation</b>: automated grading including paragraph
          and open-ended questions via artificial intelligence, plus summarized
          results with clear cheating indicators for teachers.
        </li>
        <li>
          <b>exam duration & attempt control</b>: exams set with specific
          deadlines, allowing only one attempt per student.
        </li>
        <li>
          <b>minimal & performance-focused ui</b>: lightweight, distraction-free
          design for students to stay focused during exams.
        </li>
        <li>
          <b>unique exam items</b>: diverse question types like coding
          challenges to make exams engaging and fun.
        </li>
      </ul>
    </>
  ),
  myRole: (
    <>
      examiq was a <u>solo personal project</u> where i:
      <ul>
        <li>
          designed entity-relationship diagram (erd), data-flow diagrams (dfd)
          and implemented supabase schema.
        </li>
        <li>
          built all frontend components (next.js + typescript) including admin
          user management, teacher exam/course creation, and student exam
          interface with gaze calibration.
        </li>
        <li>
          integrated webgazer.js for real-time cheating detection and configured
          deepseek v3 api for automated essay grading.
        </li>
        <li>
          set up role-based authentication, persistent login, and dashboards
          with crud functionality.
        </li>
        <li>authored test cases for all user flows and deployed via vercel.</li>
      </ul>
      <br />
      this project demonstrated my ability to architect a privacy-conscious ai
      system while addressing ethical concerns identified in user surveys.
    </>
  ),
  links: (
    <>
      <LinkWithIcon
        img={<img alt="globe icon" src={IconGlobe} />}
        href={DemoExamiq}
      >
        live website
      </LinkWithIcon>

      <LinkWithIcon
        img={<img alt="octopus icon" src={IconOctopus} />}
        href={GitHubExamiq}
      >
        source code
      </LinkWithIcon>

      <LinkWithIcon
        img={<img alt="cards icon" src={IconCards} />}
        href={FileExamiq}
      >
        case study
      </LinkWithIcon>
    </>
  ),
};
