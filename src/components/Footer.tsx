import { useEffect } from "react";
import gsap from "gsap";
import { useGlobalState } from "../providers/GlobalStateProvider";

export default function Footer() {
  const { isMobile } = useGlobalState();

  // the same reveal NavBar uses, on the same beat, so both ends of the page
  // arrive together instead of the footer just being there from the start
  useEffect(() => {
    gsap.set("footer", { autoAlpha: 0 });

    const tween = gsap.to("footer", {
      autoAlpha: 1,
      duration: 1,
      delay: isMobile ? 1.25 : 0.25,
      ease: "power2.out",
    });

    return () => {
      tween.kill();
    };
  }, []);

  return <footer>september 2026</footer>;
}
