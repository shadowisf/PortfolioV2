import { Fragment, useEffect, useState } from "react";
import { useGlobalState } from "../utils/ControlUtil";
import { Cross, Hamburger, Moon, Reset, Sun } from "./Icon";
import { navBarAnimation } from "../utils/AnimationUtils";

export default function NavBar() {
  const { startTransitionGlobal, isCustomTheme } = useGlobalState();
  const { handleMenuNavButtonClick } = navBarAnimation();
  const { openMenu, closeMenu } = navBarAnimation();
  const [userTheme, setUserTheme] = useState("light");
  const { resetThemeGlobal } = useGlobalState();

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

  function handleThemeClick() {
    const newTheme = userTheme === "dark" ? "light" : "dark";
    setUserTheme(newTheme);
    document.documentElement.style.setProperty("--theme", newTheme);

    localStorage.setItem("theme", newTheme);
  }

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
          {isCustomTheme ? (
            <span className="resetButton" onClick={() => resetThemeGlobal()}>
              <Reset width="24" />
            </span>
          ) : (
            <span onClick={() => handleThemeClick()} className="themeButton">
              {userTheme === "dark" ? <Moon width="24" /> : <Sun width="24" />}
            </span>
          )}
        </span>

        <span className="hamburgerButton" onClick={openMenu}>
          <Hamburger width="24" />
        </span>
      </nav>

      <div className="menu noCursor">
        <span className="closeButton" onClick={() => closeMenu()}>
          <Cross width="24" />
        </span>

        <span
          className="toThinHover"
          onClick={() => handleMenuNavButtonClick(-2)}
        >
          about
        </span>
        <span
          className="toThinHover"
          onClick={() => handleMenuNavButtonClick(-3)}
        >
          contact
        </span>
        {isCustomTheme ? (
          <span className="resetButton" onClick={() => resetThemeGlobal()}>
            <Reset width="24" />
          </span>
        ) : (
          <span onClick={() => handleThemeClick()} className="themeButton">
            {userTheme === "dark" ? <Moon width="24" /> : <Sun width="24" />}
          </span>
        )}
      </div>
    </Fragment>
  );
}
