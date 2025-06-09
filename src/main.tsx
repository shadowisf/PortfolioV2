import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./main.scss";
import NavBar from "./components/NavBar.tsx";
import { PixelGrid } from "./components/TransitionPanel.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer.tsx";
import Home from "./pages/Home.tsx";
import About from "./pages/About.tsx";
import Work from "./pages/Work.tsx";
import YouAreLost from "./components/YouAreLost.tsx";
import { GlobalStateProvider } from "./providers/GlobalStateProvider.tsx";
import { workMapping } from "./utils/_logic/workMapping.ts";

// firebase deploy --only hosting:les-ranalan

// firebase hosting:channel:deploy les-ranalan

const root = createRoot(document.getElementById("root")!);

root.render(
  <StrictMode>
    <BrowserRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <GlobalStateProvider>
        <PixelGrid />
        <NavBar />

        <Routes>
          {/* home */}
          <Route path="/" element={<Home />} />
          {/* about */}
          <Route path="about" element={<About />} />

          {/* projects */}
          {Object.keys(workMapping).map((key) => {
            const name = workMapping[Number(key)].name.replace(/\s+/g, "-");
            return (
              <Route
                key={key}
                path={`/${name}`}
                element={<Work key={key} dataID={Number(key)} />}
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
