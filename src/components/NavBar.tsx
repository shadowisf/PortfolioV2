import { Fragment, useEffect, useState } from "react";
import { useGlobalState } from "../utils/ControlUtil";
import { Hamburger, Moon, Sun } from "./Icon";

export default function NavBar() {
  const { startTransitionGlobal } = useGlobalState();

  const [userTheme, setUserTheme] = useState("");

  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setUserTheme("dark");
    } else {
      setUserTheme("light");
    }
  }, [window.matchMedia]);

  function handleThemeClick() {
    setUserTheme((prev) => (prev === "dark" ? "light" : "dark"));
    
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
    </Fragment>
  );
}
