import { ProjectTile } from "../components/ProjectTile";
import { generateTheme } from "../utils/ColorUtils";
import gsap from "gsap";
import { LinkNoIcon } from "../components/Link";
import CV from "../assets/FileCV.PDF";
import { getProjectIDs } from "../utils/ProjectUtils";
import { signal } from "@preact/signals-react";
import ProjectPreview from "../components/ProjectPreview";

const firstTime = signal(true);
const count = signal(0);

export default function Home() {
  function handleNameClick() {
    if (count.value === 10) {
      generateTheme();

      const highlightedTexts = [".homeWrapper .name", ".projectWrapper .title"];

      const fadedTexts = [
        ".homeWrapper .year",
        ".projectWrapper .year",
        ".homeWrapper .links",
      ];

      if (firstTime) {
        gsap.to(highlightedTexts, {
          backgroundColor: "var(--text-color)",
          color: "var(--background-color",
        });
        gsap.to(fadedTexts, {
          autoAlpha: "0.5",
        });

        firstTime.value = false;
      }
    } else {
      count.value = count.value + 1;
    }
  }

  return (
    <main className="homeWrapper">
      <section className="left">
        {getProjectIDs().map((id) => (
          <ProjectTile key={id} dataID={id} />
        ))}
      </section>
      <section className="right">
        {getProjectIDs().map((id) => (
          <ProjectPreview key={id} dataID={id} />
        ))}

        <div className="hero">
          <h1
            className="accent name noCursor"
            onClick={() => handleNameClick()}
          >
            les ranalan
            {/* ᜎ᜔ᜍ᜔ */}
            {/* ᜎᜒᜐ᜔ ᜍᜈᜎᜈ᜔ */}
          </h1>
          <h5>frontend software engineer</h5>

          <br />

          <div className="links faded noCursor">
            <LinkNoIcon className="faded">about me</LinkNoIcon>•
            <LinkNoIcon className="faded">contact me</LinkNoIcon>•
            <LinkNoIcon className="faded" href={CV}>
              view my cv
            </LinkNoIcon>
          </div>
        </div>
      </section>
    </main>
  );
}
