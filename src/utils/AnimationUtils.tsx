import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useGlobalState } from "./ControlUtil";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(gsap, useGSAP);

export function pixelTransition() {
  const { contextSafe } = useGSAP();
  const { currentPage } = useGlobalState();
  const navigate = useNavigate();

  // ON COMPLETE REQUIRED
  const startTransition = contextSafe((onComplete?: () => void) => {
    gsap.set(".pixelGrid", { display: "grid" });
    gsap.fromTo(
      ".pixelItem",
      { opacity: "0" },
      {
        opacity: "1",
        duration: "0.005",
        stagger: { amount: 0.5, from: "random" },
        onComplete: () => {
          onComplete && onComplete();
        },
      }
    );
  });

  const endTransition = contextSafe(() => {
    setTimeout(() => {
      gsap.to(".pixelItem", {
        opacity: "0",
        duration: "0.005",
        stagger: { amount: 0.5, from: "random" },
        onComplete: () => {
          gsap.set(".pixelGrid", { display: "none" });
        },
      });
    }, 100);
  });

  const executeTransition = contextSafe((url: string, skipStart?: boolean) => {

    if (url === currentPage) {
      return;
    } else if (skipStart === true) {
      closeMenu(() => {
        navigate(url);
      });
    } else {
      startTransition(() => {
        navigate(url);
      });
    }
  });

  return { startTransition, endTransition, executeTransition };
}

export function navBarAnimation() {
  const { startTransition, endTransition } = pixelTransition();
  const { contextSafe } = useGSAP();

  const openMenu = contextSafe(() => {
    startTransition(() => {
      setTimeout(() => {
        gsap.to(".menu", {
          display: "flex",
          autoAlpha: "1",
          duration: "0.5",
        });
      }, 200);
    });
  });

  // ON COMPLETE REQUIRED
  const closeMenu = contextSafe((onComplete?: () => void) => {
    gsap.to(".menu", {
      display: "none",
      autoAlpha: "0",
      duration: "0.5",
      onComplete: () => {
        onComplete && onComplete();
        endTransition();
      },
    });
  });

  return {
    openMenu,
    closeMenu,
  };
}

export function projectTileAnimation(container: NodeListOf<Element> | null) {
  const { contextSafe } = useGSAP();
  const previewContainer = container;

  const animationEnter = {
    scale: "1",
    autoAlpha: "1",
    duration: "0.1",
    ease: "power2.inOut",
  };

  const animationExit = {
    scale: "0.95",
    autoAlpha: "0",
    duration: "0.1",
    ease: "power2.inOut",
  };

  const togglePreview = contextSafe((targetID: number) => {
    previewContainer?.forEach((container) => {
      const dataKey = container.getAttribute("data-key");

      if (dataKey === targetID.toString()) {
        gsap.to(container, animationEnter);
        gsap.to(".homeWrapper .hero", animationExit);
      }
    });
  });

  const resetPreview = contextSafe(() => {
    previewContainer?.forEach((container) => {
      gsap.to(container, animationExit);
    });
    gsap.to(".homeWrapper .hero", animationEnter);
  });

  const movePreview = contextSafe(
    (targetID: number, event: React.MouseEvent) => {
      previewContainer?.forEach((container) => {
        const dataKey = container.getAttribute("data-key");

        if (dataKey === targetID.toString()) {
          const quickX = gsap.quickTo(container, "xPercent", {
            duration: 0.2,
          });
          const quickY = gsap.quickTo(container, "yPercent", {
            duration: 0.2,
          });

          quickX((event.clientX / window.innerWidth) * 10 - 2);
          quickY((event.clientY / window.innerHeight) * 10 - 2);
        }
      });
    }
  );

  return {
    togglePreview,
    resetPreview,
    movePreview,
  };
}
