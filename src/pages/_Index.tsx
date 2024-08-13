import { PixelGrid } from "../components/PixelGrid";
import Home from "./Home";
import Project from "./Project";
import { GlobalStateProvider } from "../utils/ControlUtil";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function _Index() {
  useGSAP(() => {
    gsap.set(pixelGridTarget, { display: "none" });
  });

  const pixelGridTarget = ".pixelGrid";

  return (
    <GlobalStateProvider>
      <PixelGrid />

      <Home />

      <Project />
    </GlobalStateProvider>
  );
}
