import { Fragment, useEffect, useState } from "react";
import { useGlobalState } from "../utils/ControlUtil";
import { Cross, Hamburger, Moon, Reset, Sun } from "./Icon";
import { navBarAnimation, pixelTransition } from "../utils/AnimationUtils";

export default function NavBar() {
  const { isCustomTheme } = useGlobalState();
  const { executePixelTransition } = pixelTransition();
  const { openMenu, closeMenu, handleMenuButtonClick } = navBarAnimation();
  const { resetThemeGlobal } = useGlobalState();
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

  function handleNavThemeClick() {
    const newTheme = userTheme === "dark" ? "light" : "dark";
    setUserTheme(newTheme);
    document.documentElement.style.setProperty("--theme", newTheme);

    localStorage.setItem("theme", newTheme);
  }

  return (
    <Fragment>
      <nav className="noCursor">
        <h6
          onClick={() => executePixelTransition(-1)}
          className="logoButton toThinHover"
        >
          ᜎ᜔ᜍ᜔
          {/* ᜎᜒᜐ᜔ ᜍᜈᜎᜈ᜔ */}
        </h6>

        <span className="navButtons">
          {/* nav about button */}
          <h6
            onClick={() => executePixelTransition(-2)}
            className="toThinHover"
          >
            about
          </h6>

          {/* nav contact button */}
          <h6
            onClick={() => executePixelTransition(-3)}
            className="toThinHover"
          >
            contact
          </h6>
          {isCustomTheme ? (
            // nav reset button
            <span className="resetButton" onClick={() => resetThemeGlobal()}>
              <Reset width="24" />
            </span>
          ) : (
            // nav theme button
            <span onClick={() => handleNavThemeClick()} className="themeButton">
              {userTheme === "dark" ? <Moon width="24" /> : <Sun width="24" />}
            </span>
          )}
        </span>

        {/* nav hamburger button */}
        <span className="hamburgerButton" onClick={openMenu}>
          <Hamburger width="24" />
        </span>
      </nav>

      <div className="menu noCursor">
        {/* menu close button */}
        <span className="closeButton" onClick={() => closeMenu(() => {})}>
          <Cross width="24" />
        </span>

        {/* menu about button */}
        <span className="toThinHover" onClick={() => handleMenuButtonClick(-2)}>
          about
        </span>

        {/* menu contact button */}
        <span className="toThinHover" onClick={() => handleMenuButtonClick(-3)}>
          contact
        </span>
        {isCustomTheme ? (
          // menu reset button
          <span className="resetButton" onClick={() => resetThemeGlobal()}>
            <Reset width="24" />
          </span>
        ) : (
          // menu theme button
          <span onClick={() => handleNavThemeClick()} className="themeButton">
            {userTheme === "dark" ? <Moon width="24" /> : <Sun width="24" />}
          </span>
        )}
      </div>
    </Fragment>
  );
}
