import mediumZoom from "medium-zoom";
import { Fragment, useEffect } from "react";
import ProjectPage from "../components/ProjectPage";
import { getProjectIDs } from "../utils/ProjectUtils";

export default function Project() {
  useEffect(() => {
    const zoom = mediumZoom("img", {
      background: "var(--background-color)",
    });
    // https://github.com/francoischalifour/medium-zoom

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
