import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./main.scss";
import { GlobalStateProvider } from "./utils/ControlUtil.tsx";
import { Footer } from "./components/Footer.tsx";
import NavBar from "./components/NavBar.tsx";
import { PixelGrid } from "./components/PixelGrid.tsx";
import About from "./pages/About.tsx";
import Contact from "./pages/Contact.tsx";
import Home from "./pages/Home.tsx";
import Project from "./pages/Project.tsx";

const root = createRoot(document.getElementById("root")!);

root.render(
  <StrictMode>
    <GlobalStateProvider>
      <PixelGrid />
      <NavBar />

      <Home />
      <Project />
      <About />
      <Contact />

      <Footer />
    </GlobalStateProvider>
  </StrictMode>
);
