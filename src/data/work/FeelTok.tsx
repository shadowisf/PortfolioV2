import { WorkEntry } from "../../utils/types/WorkEntry";
import { LinkWithIcon } from "../../components/Link";
import { IconCards, IconOctopus } from "../../utils/iconSetting";
//
import ImageFeelTok from "@/assets/ImageFeelTok.webp";
import VideoFeelTok from "@/assets/VideoFeelTok.webm";
import FileFeelTok from "@/assets/FileFeelTok.pdf";
//
const GitHubFeelTok = "https://github.com/shadowisf/FeelTok";

export const FeelTok: WorkEntry = {
  type: "personal project",
  name: "feeltok",
  year: "2024",
  techStack: [
    "*next.js",
    "*expo",
    "*typescript",
    "*firebase",
    "*nosql",
    "*cloudinary",
    "*email.js",
    "*restful api",
    "git",
    "*jira",
    "*figma",
  ],
  image: ImageFeelTok,
  imageFlex: "1.600556",
  imageAlt:
    "an image of the feeltok admin dashboard. right now, it is viewing the posts tab wherein all post details can be seen. on the very right of each post entry, there are two buttons: view and delete. clicking the view button will bring up a modal on what the post actually looks like from the user's perspective, while the delete button will delete the post.",
  video: VideoFeelTok,
  videoFlex: "0.47901",
  status: (
    <>
      feeltok was completed on <u>december 18, 2024</u>.
    </>
  ),
  description: (
    <>
      feeltok is a <u>mobile-first social media platform</u> promoting authentic
      emotional expression through six core pillars (love, gratitude, apology,
      appreciation, mindfulness, thankfulness), built with modern serverless
      architecture. it streamlines:
      <ul>
        <li>
          <b>uploading capabilities:</b> upload photos and videos and pick
          unique emotions for each post, with captions.
        </li>
        <li>
          <b>authentication & profiles:</b> secure login with two-factor
          authentication, edit profile details, choose google sign-in or manual
          account creation with email.
        </li>
        <li>
          <b>social features:</b> view other users' profiles, dynamic post
          themes for different emotions, post comments, and a usage timer to
          prevent social media addiction.
        </li>
        <li>
          <b>reporting & moderation:</b> report posts and accounts, with admins
          able to view and manage reports via a full-featured admin panel.
        </li>
        <li>
          <b>user experience:</b> fun, engaging, and colorful light theme
          representing the six pillars.
        </li>
      </ul>
    </>
  ),
  myRole: (
    <>
      feeltok was a <u>collaborative personal project</u>, partnered with other
      developers, where i:
      <ul>
        <li>
          designed the firestore database schema for users, posts, profiles, and
          reports.
        </li>
        <li>
          implemented authentication flows including email/google sign-in and
          two-factor authentication via email.js.
        </li>
        <li>
          built cross-platform mobile ui with react native + expo, including
          camera/gallery access for uploading media.
        </li>
        <li>
          developed emotion-based post themes and reusable ui components
          (buttons, modals).
        </li>
        <li>
          implemented full crud functionality for posts, accounts, and admin
          moderation tools.
        </li>
        <li>
          created reporting system allowing users to report posts/accounts and
          admins to manage and resolve reports.
        </li>
        <li>
          ensured secure and persistent login with role-based access control.
        </li>
        <li>
          added a fun, light, and distraction-free theme focused on digital
          wellbeing, including usage timers and reminders.
        </li>
        <li>
          handled media uploads via cloudinary and implemented comprehensive
          error handling.
        </li>
      </ul>
      <br />
      this project demonstrated full-stack mobile development skills while
      addressing digital wellbeing through its emotion-focused design.
    </>
  ),
  links: (
    <>
      <LinkWithIcon
        img={<img alt="octopus icon" src={IconOctopus} />}
        href={GitHubFeelTok}
      >
        source code
      </LinkWithIcon>

      <LinkWithIcon
        img={<img alt="cards icon" src={IconCards} />}
        href={FileFeelTok}
      >
        case study
      </LinkWithIcon>
    </>
  ),
};
