import { Fragment } from "react";
import { pixelTransition } from "./PixelGrid";

export default function NavBar() {
  const { startTransition } = pixelTransition();

  return (
    <Fragment>
      <nav className="noCursor">
        <h6
          onClick={() => startTransition(-1)}
          className="logoButton toThinHover"
        >
          ᜎ᜔ᜍ᜔
        </h6>
        <span className="navButtons">
          <h6 onClick={() => startTransition(-2)} className="toThinHover">
            about
          </h6>
          <h6 onClick={() => startTransition(-3)} className="toThinHover">
            contact
          </h6>
        </span>
      </nav>
    </Fragment>
  );
}
