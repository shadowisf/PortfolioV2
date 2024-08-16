import mediumZoom from "medium-zoom";
import { Fragment, useEffect } from "react";
import ProjectPage from "../components/ProjectPage";
import { getProjectIDs } from "../utils/ProjectUtils";
import gsap from "gsap";

export default function Project() {
  useEffect(() => {
    const zoom = mediumZoom("img", {
      background: "var(--background-color)",
    });

    zoom.on("open", () => {
      gsap.set("nav", { zIndex: "0" });
    });

    zoom.on("close", () => {
      gsap.set("nav", { zIndex: "1" });
    });

    return () => {
      zoom.detach();
    };
  }, []);

  return (
    <Fragment>
      {getProjectIDs().map((id) => (
        <ProjectPage key={id} dataID={id} />
      ))}
    </Fragment>
  );
}
