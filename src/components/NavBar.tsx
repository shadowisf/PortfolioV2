import { useEffect, useState } from "react";
import { pageTransition } from "../utils/AnimationUtils";
import { useGlobalState } from "../utils/ControlUtil";
import {
  RiSunLine,
  RiMoonLine,
  RiMenu4Line,
  RiCloseLargeFill,
} from "react-icons/ri";
import { Link } from "react-router-dom";
import { projectData } from "../utils/GODMODE";

export default function NavBar() {
  const { openMenu, closeMenu } = pageTransition();
  const { executeTransition } = useGlobalState();

  const [userTheme, setUserTheme] = useState("light");
  const [isProjectsDropdownOpen, setIsProjectsDropdownOpen] = useState(false);

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
  function handleToggleTheme(menu: boolean) {
    const newTheme = userTheme === "dark" ? "light" : "dark";

    setUserTheme(newTheme);

    document.documentElement.style.setProperty("--theme", newTheme);

    localStorage.setItem("theme", newTheme);

    if (menu) {
      closeMenu();
    }
  }

  function handleOpenProjectDropDown(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();

    setIsProjectsDropdownOpen(!isProjectsDropdownOpen);
  }

  return (
    <>
      <div className="navAlt">
        <Link
          to={"/"}
          className="logoButton alt"
          onClick={(e) => executeTransition(e, "/", false)}
        >
          ᜎ᜔ᜍ᜔
        </Link>

        <span className="navButtons alt">
          <Link
            to={""}
            onClick={(e) => handleOpenProjectDropDown(e)}
            className="link-with-arrow"
          >
            projects
          </Link>
          {isProjectsDropdownOpen && (
            <div className="dropdownMenu">
              {Object.keys(projectData).map((project, index) => {
                const title =
                  projectData[index].name.replace(/\s+/g, "-") || "";

                return (
                  <Link
                    to="/project1"
                    onClick={(e) => {
                      executeTransition(e, title, false);
                      setIsProjectsDropdownOpen(false);
                    }}
                  >
                    {projectData[index].name}
                  </Link>
                );
              })}
            </div>
          )}

          {/* nav about button */}
          <Link
            to={"about"}
            onClick={(e) => executeTransition(e, "about", false)}
          >
            about
          </Link>

          {/*  nav theme toggle button */}
          <span
            onClick={() => {
              handleToggleTheme(false);
            }}
            className="themeButton"
          >
            {userTheme === "dark" ? (
              <RiSunLine size={24} />
            ) : (
              <RiMoonLine size={24} />
            )}
          </span>
        </span>
      </div>

      <nav>
        <Link
          to={"/"}
          className="logoButton"
          onClick={(e) => executeTransition(e, "/", false)}
        >
          ᜎ᜔ᜍ᜔
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
          <span
            onClick={() => {
              handleToggleTheme(false);
            }}
            className="themeButton"
          >
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
        <button className="closeButton" onClick={() => closeMenu()}>
          <RiCloseLargeFill size={24} />
        </button>

        {/* menu about button */}
        <Link to={"about"} onClick={(e) => executeTransition(e, "about", true)}>
          about
        </Link>

        {/* menu theme button */}
        <button
          onClick={() => {
            handleToggleTheme(true);
          }}
          className="themeButton"
        >
          {userTheme === "dark" ? (
            <RiSunLine size={64} />
          ) : (
            <RiMoonLine size={64} />
          )}
        </button>
      </div>
    </>
  );
}
