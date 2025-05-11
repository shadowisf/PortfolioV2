import { ProjectEntry } from "../utils/GODMODE";
import { RiGithubLine, RiFilePdf2Line } from "react-icons/ri";
import { LinkWithIcon } from "../components/Link";
//
import ImageFeelTok from "../assets/ImageFeelTok.webp";
import ImageTinyFeelTok from "../assets/ImageFeelTok_tiny.webp";
import VideoFeelTok from "../assets/VideoFeelTok.webm";
import FileFeelTok from "../assets/FileFeelTok.pdf";
//
const GitHubFeelTok = "https://github.com/shadowisf/FeelTok";

export const FeelTok: ProjectEntry = {
  name: "feeltok",
  year: "2024",
  techStack: [
    "*next.js",
    "*expo",
    "*react",
    "*react native",
    "*typescript",
    "*firebase",
    "nosql",
    "*cloudinary",
    "*email.js",
    "*restful api",
    "git",
  ],
  image: ImageFeelTok,
  imageTiny: ImageTinyFeelTok,
  imageFlex: "1.600556",
  imageAlt:
    "image of the feeltok admin dashboard. right now, it is viewing the posts tab wherein all post details can be seen. on the very right of each post entry, there are two buttons: view and delete. clicking the view button will bring up a modal on what the post actually looks like from the user's perspective, while the delete button will delete the post.",
  video: VideoFeelTok,
  videoFlex: "0.47901",
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
          implementation
        </li>
        <li>
          <b>expo</b>: device feature access (camera/gallery) without native
          code
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
      feeltok is a group project where i:
      <ul>
        <li>designed theme system, reusable components (buttons/modals)</li>
        <li>architected firestore database schema</li>
        <li>implemented auth flows (email/google)</li>
        <li>developed image uploads to cloudinary</li>
        <li>built admin moderation tools</li>
        <li>implemented timer/reminder functionality</li>
        <li>
          implemented email.js api integration for two-factor authentication
          (2fa)
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
      <LinkWithIcon img={<RiGithubLine size={24} />} href={GitHubFeelTok}>
        repository
      </LinkWithIcon>

      <LinkWithIcon img={<RiFilePdf2Line size={24} />} href={FileFeelTok}>
        report
      </LinkWithIcon>
    </>
  ),
  attributions: ["remix icons: https://github.com/xiaochunjimmy"],
};
