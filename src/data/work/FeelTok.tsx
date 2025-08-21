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
          <b>react native (typescript)</b>: component-based ui with
          cross-platform compatibility.
        </li>
        <li>
          <b>firebase backend</b>: firestore for user/post data and auth for
          email/google sign-in.
        </li>
        <li>
          <b>cloudinary</b>: image storage for profiles/posts.
        </li>
        <li>
          <b>emailjs</b>: email-based two-factor authentication (2fa)
          implementation.
        </li>
        <li>
          <b>expo</b>: device feature access (camera/gallery) without native
          code.
        </li>
        <li>
          <b>moderation tools</b>: admin dashboard for content/user management.
        </li>
        <li>
          <b>wellbeing features</b>: usage timer to prevent over-engagement.
        </li>
      </ul>
    </>
  ),
  myRole: (
    <>
      feeltok is a <u>collaborative side project</u> where i:
      <ul>
        <li>designed theme system, reusable components (buttons/modals).</li>
        <li>architected firestore database schema.</li>
        <li>implemented authentication flows (email/google).</li>
        <li>developed image uploads to cloudinary.</li>
        <li>built admin moderation tools.</li>
        <li>implemented timer/reminder functionality.</li>
        <li>
          implemented email.js api integration for two-factor authentication
          (2fa).
        </li>
        <li>ensured comprehensive error handling.</li>
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
