import { Key, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./main.scss";
import { GlobalStateProvider } from "./utils/ControlUtils.tsx";
import NavBar from "./components/NavBar.tsx";
import { PixelGrid } from "./components/TransitionPanel.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer.tsx";
import Home from "./pages/Home.tsx";
import About from "./pages/About.tsx";
import Project from "./pages/Work.tsx";
import YouAreLost from "./components/YouAreLost.tsx";
import { projectData } from "./utils/_GODMODE.tsx";

// firebase deploy --only hosting:les-ranalan

// firebase hosting:channel:deploy les-ranalan

const allProjectIDs = Object.keys(projectData);

const root = createRoot(document.getElementById("root")!);

root.render(
  <StrictMode>
    <BrowserRouter>
      <GlobalStateProvider>
        <PixelGrid />
        <NavBar />

        <Routes>
          {/* home */}
          <Route path="/" element={<Home />} />
          {/* about */}
          <Route path="about" element={<About />} />

          {/* projects */}
          {allProjectIDs.map((key: Key | null | undefined) => {
            const name = projectData[Number(key)].name.replace(/\s+/g, "-");
            return (
              <Route
                key={key}
                path={`/${name}`}
                element={<Project dataID={Number(key)} />}
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
