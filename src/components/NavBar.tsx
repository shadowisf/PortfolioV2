import { Fragment, useEffect, useState } from "react";
import { Cross, Hamburger, Moon, Sun } from "./Icon";
import { pixelTransition } from "../utils/AnimationUtils";
import { useGlobalState } from "../utils/ControlUtil";

export default function NavBar() {
  const { openMenu, closeMenu } = pixelTransition();
  const { executeTransition } = useGlobalState();
  const [userTheme, setUserTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      setUserTheme(savedTheme);
      document.documentElement.style.setProperty("--theme", savedTheme);
    } else {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      setUserTheme(systemTheme);
      document.documentElement.style.setProperty("--theme", systemTheme);
    }
  }, []);

  // toggle between dark mode and light mode
  function executeToggleTheme() {
    const newTheme = userTheme === "dark" ? "light" : "dark";
    setUserTheme(newTheme);
    document.documentElement.style.setProperty("--theme", newTheme);

    localStorage.setItem("theme", newTheme);
  }

  return (
    <Fragment>
      <nav>
        <a
          className="logoButton"
          onClick={() => {
            executeTransition("/", false);
          }}
        >
          ᜎ᜔ᜍ᜔
          {/* ᜎᜒᜐ᜔ ᜍᜈᜎᜈ᜔ */}
        </a>

        <span className="navButtons">
          {/* nav about button */}
          <a
            onClick={() => {
              executeTransition("about", false);
            }}
          >
            about
          </a>

          {/*  nav theme toggle button */}
          <span onClick={() => executeToggleTheme()} className="themeButton">
            {userTheme === "dark" ? <Moon width="24" /> : <Sun width="24" />}
          </span>
        </span>

        {/* nav hamburger button */}
        <span className="hamburgerButton" onClick={() => openMenu()}>
          <Hamburger width="24" />
        </span>
      </nav>

      <div className="menu">
        {/* menu close button */}
        <a className="closeButton" onClick={() => closeMenu()}>
          <Cross width="24" />
        </a>
        {/* menu about button */}
        <a onClick={() => executeTransition("about", true)}>about</a>
        {/* menu theme button */}
        <a onClick={() => executeToggleTheme()} className="themeButton">
          {userTheme === "dark" ? <Moon width="24" /> : <Sun width="24" />}
        </a>
      </div>
    </Fragment>
  );
}
