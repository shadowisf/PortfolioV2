import { lazy, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./main.scss";
import { GlobalStateProvider } from "./utils/ControlUtil.tsx";
import NavBar from "./components/NavBar.tsx";
import { PixelGrid } from "./components/TransitionPanel.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { getAllProjectIDs, getProjectData } from "./utils/ProjectUtils.tsx";
import { Footer } from "./components/Footer.tsx";
import YouAreLost from "./components/YouAreLost.tsx";
import Home from "./pages/Home.tsx";

// firebase deploy --only hosting:les-ranalan

const About = lazy(() => import("./pages/About.tsx"));
const Project = lazy(() => import("./pages/Project.tsx"));

const allProjectIDs = getAllProjectIDs();

const root = createRoot(document.getElementById("root")!);

root.render(
  <StrictMode>
    <BrowserRouter>
      <GlobalStateProvider>
        <PixelGrid />

        <Routes>
          {/* home */}
          <Route path="/" element={[<Home />, <NavBar />]} />
          {/* about */}
          <Route path="about" element={[<About />, <NavBar />]} />

          {/* projects */}
          {allProjectIDs.map((key) => {
            const name = getProjectData(Number(key)).name.replace(/\s+/g, "-");
            return (
              <Route
                key={key}
                path={`/${name}`}
                element={[<Project dataID={Number(key)} />, <NavBar />]}
              />
            );
          })}

          {/* lost */}
          <Route path="*" element={<YouAreLost />} />
        </Routes>

        <Footer />
      </GlobalStateProvider>
    </BrowserRouter>
  </StrictMode>
);
