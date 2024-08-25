import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Flip, ScrollToPlugin, ScrollTrigger } from "gsap/all";
import { useGlobalState } from "./ControlUtil";

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

export function projectTileAnimation(
  previewContainer: NodeListOf<Element> | null,
  heroContainer: Element | null
) {
  const { contextSafe } = useGSAP();

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

  return {
    togglePreview,
    resetPreview,
    movePreview,
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
  const allSkills = gsap.utils.toArray(".skills .item") as HTMLElement[];

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
    const allTimeline = document.querySelector(".aboutWrapper .timeline div")
      ?.childNodes as NodeListOf<HTMLElement>;

    const animationDuration = "0.25";
    const staggerTime = 0.15;
    const scaleInitial = "0.75";
    const animationDelay = "0.75";

    gsap.set(allTimeline, {
      autoAlpha: "0",
    });

    gsap.set(".bio", {
      scale: scaleInitial,
      autoAlpha: "0",
      onComplete: () => {
        gsap.to(".bio", {
          delay: animationDelay,
          scale: "1",
          autoAlpha: "1",
          duration: animationDuration,
        });
      },
    });

    gsap.set([".timeline", ".skillset"], {
      autoAlpha: "0",
      scale: scaleInitial,
      onComplete: () => {
        gsap.to(".timeline", {
          scrollTrigger: {
            trigger: ".timeline",
            start: "top center",
          },
          scale: "1",
          autoAlpha: "1",
          duration: animationDuration,
          onComplete: () => {
            gsap.to(allTimeline, {
              autoAlpha: "1",
              duration: animationDuration,
              stagger: staggerTime,
              onComplete: () => {
                gsap.to(".skillset", {
                  scale: "1",
                  autoAlpha: "1",
                  duration: animationDuration,
                  scrollTrigger: {
                    trigger: ".skillset",
                    start: "top center",
                  },
                });
              },
            });
          },
        });
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
  const { firstTime, setFirstTime } = useGlobalState();

  const startup = contextSafe(() => {
    const right = document.querySelector(".hero")
      ?.childNodes as NodeListOf<HTMLElement>;

    const moveIntoPlaceDuration = "1";
    const moveIntoPlaceDelay = firstTime ? "0" : "0.5";
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

    gsap.set(right, {
      y: "100vh",
      pointerEvents: "none",
      autoAlpha: "0",
      onComplete: () => {
        gsap.to(right, {
          y: 0,
          delay: moveIntoPlaceDelay,
          duration: moveIntoPlaceDuration,
          ease: moveIntoPlaceEase,
          stagger: moveIntoPlaceStagger,
          autoAlpha: "1",
        });
      },
    });

    gsap.set(".tile", {
      x: "-100vw",
      pointerEvents: "none",
      onComplete: () => {
        gsap.to(".tile", {
          x: 0,
          delay: moveIntoPlaceDelay,
          duration: moveIntoPlaceDuration,
          ease: moveIntoPlaceEase,
          stagger: moveIntoPlaceStagger,
          onComplete: () => {
            gsap.to(".tile", {
              clearProps: "pointerEvents",
            });

            gsap.to("nav", {
              clearProps: "pointerEvents",
            });

            gsap.to(right, {
              clearProps: "pointerEvents",
            });

            gsap.set("body", { clearProps: "overflow" });

            setFirstTime(false);
          },
        });
      },
    });
  });

  return { startup };
}
