import { useEffect, useState } from "react";
import { pageTransition } from "../utils/AnimationUtils";
import { delay, useGlobalState } from "../utils/ControlUtil";
import {
  RiSunLine,
  RiMoonLine,
  RiMenu4Line,
  RiCloseLargeFill,
} from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";
import { projectData } from "../utils/GODMODE";

export default function NavBar() {
  const { openMenu, closeMenu } = pageTransition();
  const { executeTransition, isMobile } = useGlobalState();

  const [userTheme, setUserTheme] = useState("light");
  const [isProjectPage, setIsProjectPage] = useState(false);

  const location = useLocation();

  useEffect(() => {
    async function handleChangeProjectPage() {
      if (isMobile) {
        await delay(500);
      }

      if (location.pathname === "/" || location.pathname === "/about") {
        setIsProjectPage(false);
      } else {
        setIsProjectPage(true);
      }
    }

    handleChangeProjectPage();
  }, [location.pathname]);

  useEffect(() => {
    if (!isMobile) {
      closeMenu();
    }
  }, [isMobile]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";

    const theme = savedTheme || systemTheme;

    setUserTheme(theme);

    document.documentElement.style.setProperty("--theme", theme);
  }, []);

  function handleToggleTheme(menu: boolean) {
    const newTheme = userTheme === "dark" ? "light" : "dark";

    setUserTheme(newTheme);

    document.documentElement.style.setProperty("--theme", newTheme);

    localStorage.setItem("theme", newTheme);

    if (menu) {
      closeMenu();
    }
  }

  function handleProjectSelect(
    e: React.ChangeEvent<HTMLSelectElement>,
    menu: boolean
  ) {
    const projectPath = e.target.value;

    if (projectPath) {
      executeTransition(null, projectPath, menu);
    }
  }

  return (
    <>
      {/* Alternate Navigation */}
      <div className="navAlt">
        <Link
          to="/"
          className="logoButton alt"
          onClick={(e) => executeTransition(e, "/", false)}
        >
          ᜎ᜔ᜍ᜔
        </Link>

        <span className="navButtons alt">
          {isProjectPage && (
            <div className="selectContainer">
              <select
                onChange={(e) => handleProjectSelect(e, false)}
                defaultValue={"projects"}
                value={"projects"}
              >
                <option value={"projects"} disabled>
                  switch projects
                </option>
                {Object.keys(projectData)
                  .reverse()
                  .map((id) => {
                    const project = projectData[Number(id)];
                    const title = project.name.replace(/\s+/g, "-");
                    return (
                      <option key={id} value={title}>
                        {project.name}
                      </option>
                    );
                  })}
              </select>
            </div>
          )}

          <Link
            to="about"
            onClick={(e) => executeTransition(e, "about", false)}
          >
            about
          </Link>

          <button
            onClick={() => handleToggleTheme(false)}
            className="themeButton"
          >
            {userTheme === "dark" ? (
              <RiSunLine size={24} />
            ) : (
              <RiMoonLine size={24} />
            )}
          </button>
        </span>
      </div>

      {/* Main Navigation */}
      <nav>
        <Link
          to="/"
          className="logoButton"
          onClick={(e) => executeTransition(e, "/", false)}
        >
          ᜎ᜔ᜍ᜔
        </Link>

        <span className="navButtons">
          {isProjectPage && (
            <div className="selectContainer">
              <select
                onChange={(e) => handleProjectSelect(e, false)}
                defaultValue={"projects"}
                value={"projects"}
              >
                <option value={"projects"} disabled>
                  switch projects
                </option>
                {Object.keys(projectData)
                  .reverse()
                  .map((id) => {
                    const project = projectData[Number(id)];
                    const title = project.name.replace(/\s+/g, "-");
                    return (
                      <option key={id} value={title}>
                        {project.name}
                      </option>
                    );
                  })}
              </select>
            </div>
          )}

          <Link
            to="about"
            onClick={(e) => executeTransition(e, "about", false)}
          >
            about
          </Link>

          <button
            onClick={() => handleToggleTheme(false)}
            className="themeButton"
          >
            {userTheme === "dark" ? (
              <RiSunLine size={24} />
            ) : (
              <RiMoonLine size={24} />
            )}
          </button>
        </span>

        <button className="hamburgerButton" onClick={openMenu}>
          <RiMenu4Line size={24} />
        </button>
      </nav>

      {/* Menu */}
      <div className="menu">
        <button className="closeButton" onClick={closeMenu}>
          <RiCloseLargeFill size={24} />
        </button>

        {isProjectPage && (
          <div className="selectContainer alt">
            switch projects
            <select
              onChange={(e) => handleProjectSelect(e, true)}
              defaultValue={"projects"}
              value={"projects"}
            >
              <option value={"projects"} disabled>
                switch projects
              </option>
              {Object.keys(projectData)
                .reverse()
                .map((id) => {
                  const project = projectData[Number(id)];
                  const title = project.name.replace(/\s+/g, "-");
                  return (
                    <option key={id} value={title}>
                      {project.name}
                    </option>
                  );
                })}
            </select>
          </div>
        )}

        <Link to="about" onClick={(e) => executeTransition(e, "about", true)}>
          about
        </Link>

        <button onClick={() => handleToggleTheme(true)} className="themeButton">
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
