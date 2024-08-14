import { PixelGrid } from "../components/PixelGrid";
import Home from "./Home";
import Project from "./Project";
import { GlobalStateProvider } from "../utils/ControlUtil";
import NavBar from "../components/NavBar";
import { Fragment } from "react/jsx-runtime";
import Contact from "./Contact";
import About from "./About";
import { Footer } from "../components/Footer";

export default function _Index() {
  return (
    <Fragment>
      <PixelGrid />
      <NavBar />

      <GlobalStateProvider>
        <Home />
      </GlobalStateProvider>

      <Project />
      <About />
      <Contact />

      <Footer />
    </Fragment>
  );
}
