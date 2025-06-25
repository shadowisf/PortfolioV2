import {
  RiSunLine,
  RiMoonLine,
  RiMenu4Line,
  RiCloseLargeFill,
} from "react-icons/ri";
import { Link } from "react-router-dom";
import { useGlobalState } from "../providers/GlobalStateProvider";
import { usePageTransition } from "../utils/gsap/usePageTransition";
import { workMapping } from "../utils/workMapping";

export default function NavBar() {
  const { openMenu, closeMenu } = usePageTransition();
  const { executeTransition, userTheme, handleToggleTheme, setInMenu } =
    useGlobalState();

  return (
    <>
      {/* desktop nav */}
      <div className="navAlt">
        <Link
          to="/"
          className="logoButton alt"
          onClick={(e) => {
            e.preventDefault();
            executeTransition("/");
          }}
        >
          ᜎ᜔ᜍ᜔
        </Link>

        <span className="navButtons alt">
          <div className="selectContainer">
            <select
              onChange={(e) => executeTransition(e.target.value)}
              value={"work"}
            >
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
            onClick={(e) => {
              e.preventDefault();
              executeTransition("about");
            }}
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

      {/* mobile nav */}
      <nav>
        <Link to="/" className="logoButton">
          ᜎ᜔ᜍ᜔
        </Link>

        <span className="navButtons">
          <div className="selectContainer">
            <select
              onChange={(e) => executeTransition(e.target.value)}
              value={"work"}
            >
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

          <Link to="about">about</Link>

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

        <button
          className="hamburgerButton"
          onClick={() => {
            setInMenu(true);
            openMenu();
          }}
        >
          <RiMenu4Line size={24} />
        </button>
      </nav>

      <div className="menu">
        <button
          className="closeButton"
          onClick={() => {
            setInMenu(false);
            closeMenu();
          }}
        >
          <RiCloseLargeFill size={24} />
        </button>

        <div className="selectContainer alt">
          work
          <select
            onChange={(e) => executeTransition(e.target.value)}
            value={"work"}
          >
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
          onClick={(e) => {
            e.preventDefault();
            executeTransition("about");
          }}
        >
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
