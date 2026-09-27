import { ProjectTile } from "../components/ProjectTile";
import { useEffect, useLayoutEffect, useState } from "react";
import { ProjectPreview } from "../components/ProjectPreview";
import { LinkWithIcon, LinkWithNoIcon } from "../components/Link";
import { useGlobalState } from "../providers/GlobalStateProvider";
import { useScrollingAnimation } from "../utils/gsap/useScrollingAnimation";
import { useHomeAnimation } from "../utils/gsap/useHomeAnimation";
import { useGSAP } from "@gsap/react";
import { resume, email, linkedin, github } from "../utils/identitySetting";
import { workMapping } from "../utils/workMapping";
import { useVideoPreloader } from "../utils/useVideoPreloader";
import {
  IconBriefcase,
  IconMailbox,
  IconCards,
  IconOctopus,
  IconSwirl,
} from "../utils/iconSetting";

export default function Home() {
  const { setCurrentPage, isMobile, setContentReady } = useGlobalState();
  const { scrollToTop } = useScrollingAnimation();
  const { startup, swirlOnHover, swirlOnLeave } = useHomeAnimation();

  const { progress, done } = useVideoPreloader(!isMobile);
  const [loaderShown, setLoaderShown] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);
  const [showHome, setShowHome] = useState(false);

  // On a repeat visit every preview is already in the http cache, so the
  // preloader finishes almost immediately and a bar would just flash. Only put
  // one up if the fetches are still going after this long.
  useEffect(() => {
    if (done || loaderShown) return;
    const timer = window.setTimeout(() => setLoaderShown(true), 200);
    return () => window.clearTimeout(timer);
  }, [done, loaderShown]);

  useEffect(() => {
    setCurrentPage("/");
    scrollToTop(0);
  }, []);

  // A layout effect, not a passive one: NavBar and Footer sit above this in the
  // tree and their reveal runs on mount, so the flag has to be down before they
  // get a chance to fade themselves in over the loading bar. Restored on the
  // way out, or leaving mid-load would strand them hidden on the next page.
  useLayoutEffect(() => {
    setContentReady(false);
    return () => setContentReady(true);
  }, []);

  useEffect(() => {
    if (showHome) setContentReady(true);
  }, [showHome]);

  useEffect(() => {
    if (!done || fadingOut || showHome) return;
    // nothing was ever on screen to fade, so go straight in
    if (!loaderShown) {
      setShowHome(true);
      return;
    }
    setFadingOut(true);
  }, [done, fadingOut, showHome, loaderShown]);

  // transitionend never fires while the tab is in the background, so someone
  // who opened the site in an unfocused tab would come back to a loading bar
  // stuck at 100% forever. this is the backstop -- the transition is 0.5s, so
  // normally it wins the race and this never fires.
  useEffect(() => {
    if (!fadingOut || showHome) return;
    const timer = window.setTimeout(() => setShowHome(true), 800);
    return () => window.clearTimeout(timer);
  }, [fadingOut, showHome]);

  useGSAP(() => {
    if (showHome) {
      startup();
    }
  }, [showHome]);

  return (
    <>
      {!showHome && loaderShown && (
        <main
          className={`homeLoader ${fadingOut ? "fadeOut" : ""}`}
          onTransitionEnd={(e) => {
            if (fadingOut && e.target === e.currentTarget) {
              setShowHome(true);
            }
          }}
        >
          <div className="loaderContent">
            <small>{progress}%</small>
            <div className="progressBar">
              <div className="progressFill" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </main>
      )}

      {showHome && (
      <main className="homeWrapper">
      <section className="left">
        {Object.keys(workMapping).map((id) => (
          <ProjectTile key={id} dataID={Number(id)} />
        ))}
      </section>

      <section className="right">
        {Object.keys(workMapping).map((id) => (
          <ProjectPreview key={id} dataID={Number(id)} />
        ))}

        <div className="hero">
          <div className="intro">
            <h1 className="extra name accent">les ranalan</h1>
            <img
              alt="swirl icon"
              className="swirlEmoji"
              src={IconSwirl}
              onMouseEnter={swirlOnHover}
              onMouseLeave={swirlOnLeave}
            />
          </div>

          <br />
          <br />

          <h5 className="nonBold">
            ⊢ full-stack developer @{" "}
            <LinkWithNoIcon
              className="infoOnHover top"
              data-tooltip="an award-winning raw pet nutrition company"
              href="https://furchildpets.com/"
            >
              furchild
            </LinkWithNoIcon>
          </h5>

          <h5 className="nonBold">⊢ beng (hons) software engineering</h5>

          <h5 className="nonBold">⊢ united arab emirates</h5>

          <br />
          <br />

          <div className="links">
            <LinkWithIcon
              img={<img alt="resume icon" src={IconCards} />}
              href={resume}
            >
              resume
            </LinkWithIcon>

            <LinkWithIcon
              img={<img alt="mail icon" src={IconMailbox} />}
              href={email}
            >
              email
            </LinkWithIcon>

            <LinkWithIcon
              img={<img alt="briefcase icon" src={IconBriefcase} />}
              href={linkedin}
            >
              linkedin
            </LinkWithIcon>

            <LinkWithIcon
              img={<img alt="github icon" src={IconOctopus} />}
              href={github}
            >
              github
            </LinkWithIcon>
          </div>
        </div>
      </section>
      </main>
      )}
    </>
  );
}
