import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./main.scss";
import { GlobalStateProvider } from "./utils/ControlUtil.tsx";
import NavBar from "./components/NavBar.tsx";
import { PixelGrid } from "./components/TransitionGrid.tsx";
import About from "./pages/About.tsx";
import Home from "./pages/Home.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { getAllProjectIDs, getProjectName } from "./utils/ProjectUtils.tsx";
import Project from "./pages/Project.tsx";
import { Footer } from "./components/Footer.tsx";
import YouAreLost from "./components/YouAreLost.tsx";
import Test from "./pages/Test.tsx";

// firebase deploy --only hosting:les-ranalan

const root = createRoot(document.getElementById("root")!);

root.render(
  <StrictMode>
    <BrowserRouter>
      <GlobalStateProvider>
        <NavBar />
        <PixelGrid />

        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="about" element={<About />} />
          {getAllProjectIDs().map((dataID) => {
            const cleanName = getProjectName(dataID)?.replace(/\s+/g, "-");

            return (
              <Route
                key={dataID}
                path={cleanName}
                element={<Project dataID={dataID} />}
              />
            );
          })}

          <Route path="*" element={<YouAreLost />} />
          <Route path="test" element={<Test />} />
        </Routes>

        <Footer />
      </GlobalStateProvider>
    </BrowserRouter>
  </StrictMode>
);
