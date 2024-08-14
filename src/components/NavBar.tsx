import { Fragment } from "react";
import { useGlobalState } from "../utils/ControlUtil";
import { Hamburger } from "./Icon";

export default function NavBar() {
  const { startTransitionGlobal } = useGlobalState();

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
        </span>

        <span className="hamburger">
          <Hamburger width="24" />
        </span>
      </nav>
    </Fragment>
  );
}
