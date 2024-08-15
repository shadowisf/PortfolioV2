import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(gsap, useGSAP);

export function startUpAnimation() {
  const { contextSafe } = useGSAP();

  const tileStartUp = contextSafe(() => {
    gsap.set(".homeWrapper .tile", {
      x: "-150",
      autoAlpha: "0",
      filter: "blur(8px)",
      pointerEvents: "none",
      onComplete: () => {
        gsap.to(".homeWrapper .tile", {
          x: "0",
          autoAlpha: "1",
          duration: "1",
          filter: "blur(0px)",
          stagger: 0.25,
          ease: "sine.inOut",
          onComplete: () => {
            gsap.set(".tile", { clearProps: "all" });
          },
        });
      },
    });
  });

  return { tileStartUp };
}
