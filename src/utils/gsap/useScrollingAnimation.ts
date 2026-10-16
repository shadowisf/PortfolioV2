import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { prefersReducedMotion } from "../reducedMotion";
import { ScrollToPlugin } from "gsap/all";

gsap.registerPlugin(ScrollToPlugin);

export function useScrollingAnimation() {
  const { contextSafe } = useGSAP();

  const scrollToTop = contextSafe((duration: number) => {
    gsap.to(window, {
      scrollTo: { y: 0 },
      duration: prefersReducedMotion() ? 0 : duration,
    });
  });

  return { scrollToTop };
}
