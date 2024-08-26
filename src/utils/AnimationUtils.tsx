import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Flip, ScrollToPlugin, ScrollTrigger } from "gsap/all";

gsap.registerPlugin(gsap, useGSAP, ScrollToPlugin, ScrollTrigger, Flip);

export function pixelTransition() {
  const { contextSafe } = useGSAP();

  const startTransition = contextSafe((whenDone?: () => void) => {
    gsap.set(".pixelGrid", { display: "grid" });
    gsap.fromTo(
      ".pixelItem",
      { opacity: "0" },
      {
        opacity: "1",
        duration: "0.005",
        stagger: { amount: 0.5, from: "random" },
        onComplete: whenDone,
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

  const closeMenu = contextSafe(() => {
    gsap.to(".menu", {
      display: "none",
      autoAlpha: "0",
      duration: "0.5",
      onComplete: () => {
        endTransition();
      },
    });
  });

  return {
    startTransition,
    endTransition,
    closeMenu,
    openMenu,
  };
}

export function scrollingAnimation() {
  const { contextSafe } = useGSAP();

  const scrollToTop = contextSafe((duration: number) => {
    gsap.to(window, { scrollTo: { y: 0 }, duration: duration });
  });

  return { scrollToTop };
}

export function aboutAnimation() {
  const { contextSafe } = useGSAP();

  const allSkills = document.querySelectorAll(".aboutWrapper .skills .item");

  const resetSkill = contextSafe((event: React.MouseEvent) => {
    if (event.button === 0) {
      const allOptions = document.querySelectorAll(
        ".aboutWrapper .skillset option"
      );
      const state = Flip.getState(allSkills);

      allSkills.forEach((skill) => {
        gsap.set(skill, {
          display: "flex",
        });
      });

      allOptions.forEach((option) => {
        const value = option.getAttribute("value");

        const optionElement = option as HTMLOptionElement;

        if (value === "0") {
          optionElement.selected = true;
        }
      });

      Flip.from(state, {
        duration: 0.7,
        ease: "power2.inOut",
        stagger: {
          each: 0.08,
          from: "start",
        },
        absolute: true,
        onEnter: (elements) =>
          gsap.fromTo(
            elements,
            { opacity: 0, scale: 0 },
            { opacity: 1, scale: 1, duration: 1 }
          ),
        onLeave: (elements) =>
          gsap.to(elements, { opacity: 0, scale: 0, duration: 1 }),
      });
    }
  });

  const filterSkill = contextSafe(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedValue = event.target.value;

      const state = Flip.getState(allSkills);

      if (selectedValue === "0") {
        allSkills.forEach((skill) => {
          gsap.set(skill, { display: "flex" });
        });
      } else {
        allSkills.forEach((skill) => {
          const dataKey = skill.getAttribute("data-key");

          if (dataKey?.startsWith(selectedValue)) {
            gsap.set(skill, { display: "flex" });
          } else {
            gsap.set(skill, { display: "none" });
          }
        });
      }

      Flip.from(state, {
        duration: 0.7,
        ease: "power2.inOut",
        stagger: {
          each: 0.08,
          from: "start",
        },
        absolute: true,
        onEnter: (elements) =>
          gsap.fromTo(
            elements,
            { opacity: 0, scale: 0 },
            { opacity: 1, scale: 1, duration: 1 }
          ),
        onLeave: (elements) =>
          gsap.to(elements, { opacity: 0, scale: 0, duration: 1 }),
      });
    }
  );

  const startup = contextSafe(() => {
    const allTimelineRows = document.querySelector(
      ".aboutWrapper .timeline div"
    )?.childNodes as NodeListOf<HTMLElement>;

    const bioContainer = document.querySelector(".aboutWrapper .bio");
    const timelineContainer = document.querySelector(".aboutWrapper .timeline");
    const skillsetContainer = document.querySelector(".aboutWrapper .skillset");

    const animationDuration = "0.25";
    const staggerTime = 0.15;
    const scaleInitial = "0.75";
    const animationDelay = "1";

    gsap.set(allTimelineRows, {
      autoAlpha: "0",
    });

    gsap.set(bioContainer, {
      scale: scaleInitial,
      autoAlpha: "0",
      onComplete: () => {
        gsap.to(bioContainer, {
          delay: animationDelay,
          scale: "1",
          autoAlpha: "1",
          duration: animationDuration,
        });
      },
    });

    gsap.set([timelineContainer, skillsetContainer], {
      autoAlpha: "0",
      scale: scaleInitial,
      onComplete: () => {
        gsap.to(timelineContainer, {
          scrollTrigger: {
            trigger: timelineContainer,
            start: "top center",
            markers: true,
          },
          scale: "1",
          autoAlpha: "1",
          duration: animationDuration,
          onComplete: () => {
            gsap.to(allTimelineRows, {
              autoAlpha: "1",
              duration: animationDuration,
              stagger: staggerTime,
            });
          },
        });
      },
    });

    gsap.to(skillsetContainer, {
      scale: "1",
      autoAlpha: "1",
      duration: animationDuration,
      scrollTrigger: {
        trigger: skillsetContainer,
        start: "top center",
        markers: true,
      },
    });
  });

  return {
    resetSkill,
    filterSkill,
    startup,
  };
}

export function homeAnimation() {
  const { contextSafe } = useGSAP();

  const previewContainer = document.querySelectorAll(".homeWrapper .preview");
  const heroContainer = document.querySelector(".homeWrapper .hero");

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
      const video = container.querySelector("video");

      if (dataKey === targetID.toString()) {
        if (video) {
          video?.play();
        }

        gsap.to(container, animationEnter);
        gsap.to(heroContainer, animationExit);
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

      gsap.to(container, animationExit);
    });
    gsap.to(heroContainer, animationEnter);
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

  const startup = contextSafe(() => {
    const rightContainer = document.querySelector(".homeWrapper .hero")
      ?.childNodes as NodeListOf<HTMLElement>;
    const projectTile = document.querySelectorAll(".homeWrapper .tile");

    const moveIntoPlaceDuration = "1";
    const moveIntoPlaceDelay = "0.75";
    const moveIntoPlaceEase = "power2.out";
    const moveIntoPlaceStagger = 0.05;

    gsap.set("body", { overflow: "hidden" });

    gsap.set("nav", {
      y: "-8vh",
      pointerEvents: "none",
      onComplete: () => {
        gsap.to("nav", {
          y: 0,
          delay: moveIntoPlaceDelay,
          duration: moveIntoPlaceDuration,
          ease: moveIntoPlaceEase,
        });
      },
    });

    gsap.set(rightContainer, {
      x: "-100vw",
      pointerEvents: "none",
      autoAlpha: 0,
      onComplete: () => {
        gsap.to(rightContainer, {
          x: 0,
          delay: moveIntoPlaceDelay,
          duration: moveIntoPlaceDuration,
          ease: moveIntoPlaceEase,
          stagger: moveIntoPlaceStagger,
          autoAlpha: 1,
        });
      },
    });

    gsap.set(projectTile, {
      x: "-100vw",
      pointerEvents: "none",
      onComplete: () => {
        gsap.to(projectTile, {
          x: 0,
          delay: moveIntoPlaceDelay,
          duration: moveIntoPlaceDuration,
          ease: moveIntoPlaceEase,
          stagger: moveIntoPlaceStagger,
          onComplete: () => {
            gsap.to(projectTile, {
              clearProps: "pointerEvents",
              duration: 0.001,
            });

            gsap.to("nav", {
              clearProps: "pointerEvents",
              duration: 0.001,
            });

            gsap.to(rightContainer, {
              clearProps: "pointerEvents",
              duration: 0.001,
            });

            gsap.set("body", { clearProps: "overflow", duration: 0.001 });
          },
        });
      },
    });
  });

  return { startup, togglePreview, resetPreview, movePreview };
}

export function projectAnimation() {
  const { contextSafe } = useGSAP();

  const startup = contextSafe(() => {
    const mediaContainer = document.querySelector(
      ".projectWrapper .content .media"
    )?.childNodes as NodeListOf<HTMLElement>;

    const animationDuration = "0.25";
    const scaleInitial = "0.75";

    mediaContainer.forEach((container) => {
      gsap.set(container, {
        autoAlpha: "0",
        scale: scaleInitial,
      });
    });

    setTimeout(() => {
      mediaContainer.forEach((container) => {
        gsap.to(container, {
          autoAlpha: "1",
          scale: "1",
          duration: animationDuration,
          scrollTrigger: {
            trigger: container,
            start: "top center",
            end: "bottom top",
          },
        });
      });
    }, 25);
  });

  return {
    startup,
  };
}
