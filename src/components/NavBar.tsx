import { Fragment, useEffect, useState } from "react";
import { useGlobalState } from "../utils/ControlUtil";
import { Cross, Hamburger, Moon, Sun } from "./Icon";
import gsap from "gsap";

export default function NavBar() {
  const { startTransitionGlobal } = useGlobalState();

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

  function handleMenuClick() {
    gsap.to(".menu", { display: "none", autoAlpha: "1" });
  }

  return (
    <Fragment>
      <nav className="noCursor">
        <h6 onClick={() => startTransitionGlobal(-1)} className="logoButton">
          ᜎ᜔ᜍ᜔
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

        <span className="hamburger">
          <Hamburger width="24" />
        </span>
      </nav>

      <div className="menu noCursor">
        <span className="closeButton">
          <Cross width="5vw" />
        </span>

        <span className="toThinHover" onClick={() => startTransitionGlobal(-2)}>
          about
        </span>
        <span className="toThinHover" onClick={() => startTransitionGlobal(-3)}>
          contact
        </span>
        <span onClick={() => handleThemeClick()} className="themeButton">
          {userTheme === "dark" ? <Moon width="5vw" /> : <Sun width="5vw" />}
        </span>
      </div>
    </Fragment>
  );
}
