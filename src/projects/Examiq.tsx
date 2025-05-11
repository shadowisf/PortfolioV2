import { ProjectEntry } from "../utils/GODMODE";
import { RiGithubLine, RiFilePdf2Line } from "react-icons/ri";
import { LinkWithIcon } from "../components/Link";
//

import ImageExamiq from "../assets/ImageExamiq.webp";
import ImageTinyExamiq from "../assets/ImageExamiq_tiny.webp";
import VideoExamiq from "../assets/VideoExamiq.webm";
import FileExamiq from "../assets/FileExamiq.pdf";
import { GoPackage } from "react-icons/go";
//
const GitHubExamiq = "https://github.com/shadowisf/Examiq";
const DemoExamiq = "https://examiq-seven.vercel.app";

export const Examiq: ProjectEntry = {
  name: "examiq",
  year: "2025",
  techStack: [
    "*next.js",
    "*react",
    "*typescript",
    "*html",
    "*scss",
    "*supabase",
    "postgresql",
    "*webgazer.js",
    "*deepseek",
    "*restful api",
    "git",
  ],
  image: ImageExamiq,
  imageTiny: ImageTinyExamiq,
  imageFlex: "1.735986",
  imageAlt: "",
  video: VideoExamiq,
  videoFlex: "1.726",
  description: (
    <>
      examiq is a <u>web-based ai-powered proctoring system</u> that features
      gaze tracking, input tracking, and behavior tracking to prevent cheating
      during remote assessments. it offers:
      <ul>
        <li>
          <b>role-based dashboards</b>: unique dashboards based on role
          (admin/teacher/student).
        </li>
        <li>
          <b>privacy-focused design</b>: client-side gaze analysis, encrypted
          data.
        </li>
        <li>
          <b>next.js (typescript)</b>: server-rendered frontend with
          role-specific user interfaces.
        </li>
        <li>
          <b>supabase</b>: postgresql database with real-time auth and crud
          operations.
        </li>
        <li>
          <b>ai integration</b>: webgazer.js for gaze-tracking (no external data
          transfer) deepseek v3 api for grading open-ended responses.
        </li>
      </ul>
    </>
  ),
  myRole: (
    <>
      examiq is a solo project where i:
      <ul>
        <li>designed erd/dfd diagrams and implemented Supabase schema</li>
        <li>
          built all frontend components (next.js) including admin user
          management, teacher exam/course creation, and student exam interface
          with gaze calibration.
        </li>
        <li>
          integrated webgazer.js for real-time cheating detection and configured
          deepseek v3 for automated essay grading.
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
        img={<GoPackage size={24} />}
        href={DemoExamiq}
        onClick={() => {
          alert(
            "note: you have sign-up first and then login to test the app. click close to continue."
          );
        }}
      >
        live website
      </LinkWithIcon>

      <LinkWithIcon img={<RiGithubLine size={24} />} href={GitHubExamiq}>
        repository
      </LinkWithIcon>

      <LinkWithIcon img={<RiFilePdf2Line size={24} />} href={FileExamiq}>
        report
      </LinkWithIcon>
    </>
  ),
  attributions: ["remix icons: https://github.com/xiaochunjimmy"],
};
