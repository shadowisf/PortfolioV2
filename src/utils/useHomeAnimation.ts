import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export function useHomeAnimation() {
  const { contextSafe } = useGSAP();

  /* const startup = contextSafe(() => {
    const rightContainer = document.querySelector(".homeWrapper .hero")
      ?.childNodes as NodeListOf<HTMLElement>;

    const projectTile = document.querySelectorAll(".homeWrapper .tile");
    const navs = ["nav", ".navAlt"];

    const startupDuration = 1;
    const startupDelay = 0.25;
    const startupEase = "power2.out";
    const startupStagger = 0.05;
    const startupScaleInitial = 0.75;

    const tl = gsap.timeline({
      defaults: {
        duration: startupDuration,
        ease: startupEase,
      },
      delay: startupDelay,
    });

    gsap.set([rightContainer, projectTile], {
      autoAlpha: 0,
      scale: startupScaleInitial,
      pointerEvents: "none",
    });

    gsap.set([...navs], {
      autoAlpha: 0,
    });

    tl.to(navs, { autoAlpha: 1 }, 0);

    tl.to(
      rightContainer,
      {
        autoAlpha: 1,
        scale: 1,
        stagger: startupStagger,
      },
      "<"
    );

    tl.to(
      projectTile,
      {
        autoAlpha: 1,
        scale: 1,
        stagger: { each: startupStagger, from: "end" },
      },
      "<"
    );

    tl.add(() => {
      gsap.set([...navs, rightContainer, projectTile], {
        clearProps: "pointerEvents",
      });
      gsap.set("body", { clearProps: "overflow" });
    });
  }); */

  const previewContainer = document.querySelectorAll(".homeWrapper .preview");
  const heroContainer = document.querySelector(".homeWrapper .hero");

  const previewEnter = {
    transform: "scale(1)",
    autoAlpha: 1,
    duration: 0.1,
    ease: "power2.inOut",
  };

  const previewExit = {
    transform: "scale(0.95)",
    autoAlpha: 0,
    duration: 0.1,
    ease: "power2.inOut",
  };

  const togglePreview = contextSafe((targetID: number) => {
    previewContainer?.forEach((container) => {
      const dataKey = container.getAttribute("data-key");
      const video = container.querySelector("video");

      if (dataKey === targetID.toString()) {
        if (video) {
          if (video.readyState >= 2) {
            video.play();
          } else {
            video.addEventListener(
              "loadeddata",
              () => {
                video.play();
              },
              { once: true }
            );
          }
        }

        gsap.to(container, previewEnter);
        gsap.to(heroContainer, previewExit);
      }
    });
  });

  const resetPreview = contextSafe(() => {
    previewContainer?.forEach((container) => {
      const video = container.querySelector("video");
      if (video) {
        video.currentTime = 0;
        video.pause();
      }

      gsap.to(container, previewExit);
    });
    gsap.to(heroContainer, previewEnter);
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

  let swirlTween: gsap.core.Tween | null = null;

  const swirlOnHover = contextSafe(() => {
    const swirlEmoji = document.querySelector(".homeWrapper .hero .swirlEmoji");

    const rotationStr = gsap.getProperty(swirlEmoji, "rotation") as string;
    const currentRotation = parseFloat(rotationStr) || 0;

    swirlTween?.kill();

    swirlTween = gsap.to(swirlEmoji, {
      rotate: currentRotation - 360,
      duration: 1,
      repeat: -1,
      ease: "none",
    });
  });

  const swirlOnLeave = contextSafe(() => {
    const swirlEmoji = document.querySelector(".homeWrapper .hero .swirlEmoji");

    swirlTween?.kill();
    swirlTween = null;

    gsap.to(swirlEmoji, {
      rotate: 0,
      duration: 1,
      ease: "power2.out",
    });
  });

  return {
    /* startup, */
    togglePreview,
    resetPreview,
    movePreview,
    swirlOnHover,
    swirlOnLeave,
  };
}
