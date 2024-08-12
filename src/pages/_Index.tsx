import { PixelGrid } from "../components/PixelGrid";
import Home from "./Home";
import Project from "./Project";
import { Fragment } from "react/jsx-runtime";

export default function _Index() {
  return (
    <Fragment>
      <PixelGrid />
      <Home />
      <Project />
    </Fragment>
  );
}
