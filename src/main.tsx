import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./main.scss";
import { GlobalStateProvider } from "./utils/ControlUtil.tsx";
import NavBar from "./components/NavBar.tsx";
import { PixelGrid } from "./components/PixelGrid.tsx";
import About from "./pages/About.tsx";
import Home from "./pages/Home.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Test from "./pages/Test.tsx";
import { getAllProjectIDs, getProjectName } from "./utils/ProjectUtils.tsx";
import Project from "./pages/Project.tsx";
import { Footer } from "./components/Footer.tsx";

const root = createRoot(document.getElementById("root")!);

root.render(
  <StrictMode>
    <BrowserRouter>
      <GlobalStateProvider>
        <NavBar />
        <PixelGrid />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          {/* <Route path="test" element={<Test />} /> */}
          {getAllProjectIDs().map((id) => (
            <Route
              key={id}
              path={getProjectName(id)?.replace(/\s+/g, "-")}
              element={<Project dataID={id} />}
            />
          ))}
        </Routes>

        <Footer />
      </GlobalStateProvider>
    </BrowserRouter>
  </StrictMode>
);
