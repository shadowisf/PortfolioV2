import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./main.scss";
import Index from "./pages/_Index.tsx";

const root = createRoot(document.getElementById("root")!);

root.render(
  <StrictMode>
    <Index />
  </StrictMode>
);
