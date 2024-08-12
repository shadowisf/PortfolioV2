import { PixelGrid } from "../components/PixelGrid";
import Home from "./Home";
import Project from "./Project";
import { Fragment } from "react/jsx-runtime";
import { effect } from "@preact/signals-react";
import { checkIfMobile } from "../utils/ControlUtil";

export default function _Index() {
  effect(() => {
    checkIfMobile();
  });

  return (
    <Fragment>
      <PixelGrid />
      <Home />
      <Project />
    </Fragment>
  );
}
