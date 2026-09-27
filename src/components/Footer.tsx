import { useEffect } from "react";
import gsap from "gsap";
import { useGlobalState } from "../providers/GlobalStateProvider";

export default function Footer() {
  const { isMobile, contentReady } = useGlobalState();

  // the same reveal NavBar uses, on the same beat, so the two ends of the page
  // arrive together once the home loading bar hands over
  useEffect(() => {
    gsap.set("footer", { autoAlpha: 0 });

    if (!contentReady) return;

    const tween = gsap.to("footer", {
      autoAlpha: 1,
      duration: 1,
      delay: isMobile ? 1.25 : 0.25,
      ease: "power2.out",
    });

    return () => {
      tween.kill();
    };
  }, [contentReady]);

  return <footer>september 2026</footer>;
}
