import { signal } from "@preact/signals-react";

export const isMobile = signal(false);

export function checkIfMobile() {
  const handleResize = () => {
    isMobile.value = window.matchMedia("(max-width: 1000px)").matches;
  };

  window.addEventListener("resize", handleResize);

  return () => {
    window.removeEventListener("resize", handleResize);
  };
}
