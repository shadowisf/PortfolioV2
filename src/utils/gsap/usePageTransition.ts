import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export function usePageTransition() {
  const { contextSafe } = useGSAP();

  const duration = 0.75;
  const ease = "power4.inOut";

  const openMenu = contextSafe(() => {
    gsap.set(".transitionGrid", { display: "grid" });

    gsap.fromTo(
      ".transitionItem",
      { y: "-100vh" },
      {
        y: 0,
        duration: duration,
        ease: ease,
        onComplete: () => {
          gsap.to(".menu", {
            display: "flex",
            autoAlpha: "1",
            duration: duration,
          });
        },
      }
    );
  });

  const closeMenu = contextSafe(() => {
    gsap.to(".menu", {
      display: "none",
      autoAlpha: "0",
      duration: duration,
      onComplete: () => {
        gsap.to(".transitionItem", {
          y: "100vh",
          duration: duration,
          ease: ease,
          onComplete: () => {
            gsap.set(".transitionGrid", { display: "none" });
          },
        });
      },
    });
  });

  return {
    closeMenu,
    openMenu,
  };
}
