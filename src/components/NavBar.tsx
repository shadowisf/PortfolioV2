import { useEffect } from "react";
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
  const { executeTransition, isMobile, userTheme, handleToggleTheme } =
    useGlobalState();

  useEffect(() => {
    if (!isMobile) {
      closeMenu(true);
    }
  }, [isMobile]);

  function handleworkelect(
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
      <div className="navAlt">
        <Link
          to="/"
          className="logoButton alt"
          onClick={(e) => executeTransition(e, "/", false)}
        >
          ᜎ᜔ᜍ᜔
        </Link>

        <span className="navButtons alt">
          <div className="selectContainer">
            <select onChange={(e) => handleworkelect(e, false)} value={"work"}>
              <option value={"work"} disabled>
                work
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

      <nav>
        <Link
          to="/"
          className="logoButton"
          onClick={(e) => executeTransition(e, "/", false)}
        >
          ᜎ᜔ᜍ᜔
        </Link>

        <span className="navButtons">
          <div className="selectContainer">
            <select onChange={(e) => handleworkelect(e, false)} value={"work"}>
              <option value={"work"} disabled>
                work
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

      <div className="menu">
        <button className="closeButton" onClick={() => closeMenu(false)}>
          <RiCloseLargeFill size={24} />
        </button>

        <div className="selectContainer alt">
          work
          <select onChange={(e) => handleworkelect(e, true)} value={"work"}>
            <option value={"work"} disabled>
              work
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
