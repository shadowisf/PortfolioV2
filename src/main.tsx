import { Fragment, lazy, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./main.scss";
import { GlobalStateProvider } from "./utils/ControlUtil.tsx";
import NavBar from "./components/NavBar.tsx";
import { PixelGrid } from "./components/TransitionPanel.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { getAllProjectIDs, getProjectData } from "./utils/ProjectUtils.tsx";
import { Footer } from "./components/Footer.tsx";
import Home from "./pages/Home.tsx";

// firebase deploy --only hosting:les-ranalan

const About = lazy(() => import("./pages/About.tsx"));
const Project = lazy(() => import("./pages/Project.tsx"));
const Lost = lazy(() => import("./components/YouAreLost.tsx"));

const allProjectIDs = getAllProjectIDs();

const root = createRoot(document.getElementById("root")!);

root.render(
  <StrictMode>
    <BrowserRouter>
      <GlobalStateProvider>
        <PixelGrid />

        <Routes>
          {/* home */}
          <Route
            path="/"
            element={
              <Fragment>
                <Home />
                <NavBar />
              </Fragment>
            }
          />
          {/* about */}
          <Route
            path="about"
            element={
              <Fragment>
                <About />
                <NavBar />
              </Fragment>
            }
          />

          {/* projects */}
          {allProjectIDs.map((key) => {
            const name = getProjectData(Number(key)).name.replace(/\s+/g, "-");
            return (
              <Route
                key={key}
                path={`/${name}`}
                element={
                  <Fragment>
                    <NavBar />
                    <Project dataID={Number(key)} />
                  </Fragment>
                }
              />
            );
          })}

          {/* lost */}
          <Route path="*" element={<Lost />} />
        </Routes>

        <Footer />
      </GlobalStateProvider>
    </BrowserRouter>
  </StrictMode>
);
