import { Key, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./main.scss";
import { GlobalStateProvider } from "./utils/ControlUtil.tsx";
import NavBar from "./components/NavBar.tsx";
import { PixelGrid } from "./components/TransitionPanel.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer.tsx";
import Home from "./pages/Home.tsx";
import About from "./pages/About.tsx";
import Project from "./pages/Project.tsx";
import YouAreLost from "./components/YouAreLost.tsx";
import { projectData } from "./utils/GODMODE.tsx";

// firebase deploy --only hosting:les-ranalan

// firebase hosting:channel:deploy les-ranalan

const allProjectIDs = Object.keys(projectData);

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
              <>
                <NavBar />
                <Home />
              </>
            }
          />
          {/* about */}
          <Route
            path="about"
            element={
              <>
                <NavBar />
                <About />
              </>
            }
          />

          {/* projects */}
          {allProjectIDs.map((key: Key | null | undefined) => {
            const name = projectData[Number(key)].name.replace(/\s+/g, "-");
            return (
              <Route
                key={key}
                path={`/${name}`}
                element={
                  <>
                    <NavBar />
                    <Project dataID={Number(key)} />
                  </>
                }
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
