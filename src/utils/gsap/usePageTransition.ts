import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useGlobalState } from "../../providers/GlobalStateProvider";

export function usePageTransition() {
  const { contextSafe } = useGSAP();
  const { setInMenu } = useGlobalState();

  const duration = 0.75;
  const ease = "power4.inOut";

  const startTransition = contextSafe((whenDone?: () => void) => {
    gsap.set(".transitionGrid", { display: "grid" });
    gsap.fromTo(
      ".transitionItem",
      { y: "-100vh" },
      {
        y: 0,
        duration: duration,
        ease: ease,
        onComplete: whenDone,
      }
    );
  });

  const endTransition = contextSafe(() => {
    gsap.to(".transitionItem", {
      y: "100vh",
      duration: duration,
      ease: ease,
      onComplete: () => {
        gsap.set(".transitionGrid", { display: "none" });
      },
    });
  });

  const openMenu = contextSafe(() => {
    startTransition(() => {
      gsap.to(".menu", {
        display: "flex",
        autoAlpha: "1",
        duration: duration,
      });
    });

    setInMenu(true);
  });

  const closeMenu = contextSafe((instant: boolean) => {
    if (instant) {
      gsap.to(".menu", {
        display: "none",
        autoAlpha: "0",
        duration: "0",
        onComplete: () => {
          endTransition();
        },
      });
    } else {
      gsap.to(".menu", {
        display: "none",
        autoAlpha: "0",
        duration: duration,
        onComplete: () => {
          endTransition();
        },
      });
    }

    setInMenu(false);
  });

  return {
    /* startTransition,
    endTransition, */
    closeMenu,
    openMenu,
  };
}
