import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useGlobalState } from "./ControlUtil";
import { ScrollToPlugin } from "gsap/all";

gsap.registerPlugin(gsap, useGSAP, ScrollToPlugin);

export function startUpAnimation() {
  const { contextSafe } = useGSAP();

  const tileStartUp = contextSafe(() => {
    gsap.set(".homeWrapper .tile", {
      x: "-=150",
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

export function pixelTransition() {
  const { contextSafe } = useGSAP();
  const { setCurrentPage, currentPage } = useGlobalState();
  const { scrollToTop } = scrollingAnimation();

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

  const changePage = contextSafe((target: number) => {
    const allPages = document.querySelectorAll("main[data-key]");

    gsap.set(allPages, { display: "none" });

    allPages.forEach((page) => {
      const dataKey = page.getAttribute("data-key");

      if (dataKey === target.toString()) {
        const displayStyle =
          dataKey === "-1" || dataKey === "-3" ? "flex" : "block";
        gsap.set(page, { display: displayStyle });
      }
    });
  });

  const executePixelTransition = (page: number, skipStart?: boolean) => {
    if (page === currentPage) {
      return;
    } else if (skipStart) {
      scrollToTop(0);

      setCurrentPage(page);
      changePage(page);
      endTransition();
    } else {
      setCurrentPage(page);
      startTransition(() => {
        scrollToTop(0);
        changePage(page);
        endTransition();
      });
    }
  };

  return { startTransition, endTransition, changePage, executePixelTransition };
}

export function scrollingAnimation() {
  const { contextSafe } = useGSAP();

  const scrollToTop = contextSafe((duration: number) => {
    gsap.to(window, { scrollTo: { x: "0", y: "0" }, duration: duration });
  });

  return { scrollToTop };
}

export function navBarAnimation() {
  const { startTransition, endTransition } = pixelTransition();
  const { currentPage } = useGlobalState();
  const { contextSafe } = useGSAP();
  const { executePixelTransition } = pixelTransition();

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

  const handleMenuButtonClick = contextSafe((page: number) => {
    if (page === currentPage) {
      closeMenu();
    } else {
      closeMenu(() => executePixelTransition(page, true));
    }
  });

  const handleMenuResetButtonClick = contextSafe(() => {
    gsap;
  });

  return {
    openMenu,
    closeMenu,
    handleMenuButtonClick,
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
          gsap.set(container, {
            xPercent: (event.clientX / window.innerWidth) * 10 - 1.5,
            yPercent: (event.clientY / window.innerHeight) * 10 - 2,
          });
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
