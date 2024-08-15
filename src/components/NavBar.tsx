import { Fragment, useEffect, useState } from "react";
import { useGlobalState } from "../utils/ControlUtil";
import { Cross, Hamburger, Moon, Sun } from "./Icon";
import gsap from "gsap";
import { pixelTransition } from "./PixelGrid";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(gsap, useGSAP);

export default function NavBar() {
  const { startTransitionGlobal, currentPage } = useGlobalState();
  const { startTransition, endTransition } = pixelTransition();
  const { contextSafe } = useGSAP();
  const [userTheme, setUserTheme] = useState("light dark");

  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setUserTheme("dark");
      document.documentElement.style.setProperty("--theme", "dark");
    } else {
      setUserTheme("light");
      document.documentElement.style.setProperty("--theme", "light");
    }
  }, []);

  function handleThemeClick() {
    const newTheme = userTheme === "dark" ? "light" : "dark";
    setUserTheme(newTheme);
    document.documentElement.style.setProperty("--theme", newTheme);
  }

  const handleHamburgerClick = contextSafe(() => {
    startTransition(() => {
      gsap.to(".menu", {
        display: "flex",
        autoAlpha: "1",
        duration: "0.5",
      });
    });
  });

  const handleCloseClick = contextSafe(() => {
    gsap.to(".menu", {
      display: "none",
      autoAlpha: "0",
      duration: "0.5",
      onComplete: () => {
        endTransition();
      },
    });
  });

  const handleNavButtonClick = contextSafe((page: number) => {
    if (page === currentPage) {
      gsap.to(".menu", {
        display: "none",
        autoAlpha: "0",
        duration: "0.5",
        onComplete: () => {
          endTransition();
        },
      });
    } else {
      gsap.to(".menu", {
        display: "none",
        autoAlpha: "0",
        duration: "0.5",
        onComplete: () => {
          startTransitionGlobal(page, true);
        },
      });
    }
  });

  return (
    <Fragment>
      <nav className="noCursor">
        <h6
          onClick={() => startTransitionGlobal(-1)}
          className="logoButton toThinHover"
        >
          ᜎ᜔ᜍ᜔
          {/* ᜎᜒᜐ᜔ ᜍᜈᜎᜈ᜔ */}
        </h6>

        <span className="navButtons">
          <h6 onClick={() => startTransitionGlobal(-2)} className="toThinHover">
            about
          </h6>
          <h6 onClick={() => startTransitionGlobal(-3)} className="toThinHover">
            contact
          </h6>
          <span onClick={() => handleThemeClick()} className="themeButton">
            {userTheme === "dark" ? <Moon width="24" /> : <Sun width="24" />}
          </span>
        </span>

        <span
          className="hamburgerButton"
          onClick={() => handleHamburgerClick()}
        >
          <Hamburger width="24" />
        </span>
      </nav>

      <div className="menu noCursor">
        <span className="closeButton" onClick={() => handleCloseClick()}>
          <Cross width="24" />
        </span>

        <span className="toThinHover" onClick={() => handleNavButtonClick(-2)}>
          about
        </span>
        <span className="toThinHover" onClick={() => handleNavButtonClick(-3)}>
          contact
        </span>
        <span onClick={() => handleThemeClick()} className="themeButton">
          {userTheme === "dark" ? <Moon width="24" /> : <Sun width="24" />}
        </span>
      </div>
    </Fragment>
  );
}
