import { Fragment, useEffect, useState } from "react";
import { pixelTransition } from "../utils/AnimationUtils";
import { useGlobalState } from "../utils/ControlUtil";
import {
  RiSunLine,
  RiMoonLine,
  RiMenu4Line,
  RiCloseLargeFill,
} from "react-icons/ri";
import { Link } from "react-router-dom";

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

    closeMenu();
  }

  return (
    <Fragment>
      <nav>
        <Link
          to={"/"}
          className="logoButton"
          onClick={(e) => executeTransition(e, "/", false)}
        >
          ᜎ᜔ᜍ᜔
          {/* ᜎᜒᜐ᜔ ᜍᜈᜎᜈ᜔ */}
        </Link>

        <span className="navButtons">
          {/* nav about button */}
          <Link
            to={"about"}
            onClick={(e) => executeTransition(e, "about", false)}
          >
            about
          </Link>

          {/*  nav theme toggle button */}
          <span onClick={() => executeToggleTheme()} className="themeButton">
            {userTheme === "dark" ? (
              <RiSunLine size={24} />
            ) : (
              <RiMoonLine size={24} />
            )}
          </span>
        </span>

        {/* nav hamburger button */}
        <span className="hamburgerButton" onClick={() => openMenu()}>
          <RiMenu4Line size={24} />
        </span>
      </nav>

      <div className="menu">
        {/* menu close button */}
        <a className="closeButton" onClick={() => closeMenu()}>
          <RiCloseLargeFill size={24} />
        </a>

        {/* menu about button */}
        <Link to={"about"} onClick={(e) => executeTransition(e, "about", true)}>
          about
        </Link>

        {/* menu theme button */}
        <a onClick={() => executeToggleTheme()} className="themeButton">
          {userTheme === "dark" ? <RiSunLine /> : <RiMoonLine />}
        </a>
      </div>
    </Fragment>
  );
}
