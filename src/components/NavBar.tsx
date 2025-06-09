import { useEffect } from "react";
import {
  RiSunLine,
  RiMoonLine,
  RiMenu4Line,
  RiCloseLargeFill,
} from "react-icons/ri";
import { Link } from "react-router-dom";
import { useGlobalState } from "../providers/GlobalStateProvider";
import { usePageTransition } from "../utils/gsap/usePageTransition";
import { workMapping } from "../utils/_logic/workMapping";

export default function NavBar() {
  const { openMenu, closeMenu } = usePageTransition();
  const { executeTransition, isMobile, userTheme, handleToggleTheme } =
    useGlobalState();

  useEffect(() => {
    if (!isMobile) {
      closeMenu(true);
    }
  }, [isMobile]);

  function handleWorkSelect(
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
            <select onChange={(e) => handleWorkSelect(e, false)} value={"work"}>
              <option value={"work"} disabled>
                work
              </option>
              {Object.keys(workMapping)
                .reverse()
                .map((id) => {
                  const project = workMapping[Number(id)];
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
            <select onChange={(e) => handleWorkSelect(e, false)} value={"work"}>
              <option value={"work"} disabled>
                work
              </option>
              {Object.keys(workMapping)
                .reverse()
                .map((id) => {
                  const project = workMapping[Number(id)];
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
          <select onChange={(e) => handleWorkSelect(e, true)} value={"work"}>
            <option value={"work"} disabled>
              work
            </option>
            {Object.keys(workMapping)
              .reverse()
              .map((id) => {
                const project = workMapping[Number(id)];
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
