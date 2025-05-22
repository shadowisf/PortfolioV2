import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Flip, ScrollToPlugin, ScrollTrigger } from "gsap/all";
import { useGlobalState } from "./ControlUtils";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger, Flip);

export function pageTransition() {
  const { contextSafe } = useGSAP();

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
  const { isMobile } = useGlobalState();

  const startup = contextSafe(() => {
    const scrollPrompt = document.querySelector(".aboutWrapper .scrollPrompt");
    const scrollPromptMobile = document.querySelector(
      ".aboutWrapper .scrollPrompt.mobile"
    );

    const bioSpinner = document.querySelector(".aboutWrapper .bio .spinner");
    const bioPicture = document.querySelector(".aboutWrapper .bio img");
    const bioContent = document.querySelector(".aboutWrapper .bio .content")
      ?.childNodes as NodeListOf<Element>;
    const bioContentHS = document.querySelector(".aboutWrapper .bio #hs");

    const timelineContainer = document.querySelector(".aboutWrapper .timeline");
    const timelineAllRows = document.querySelector(
      ".aboutWrapper .timeline .timelineRows"
    )?.childNodes as NodeListOf<Element>;

    const skillsetContainer = document.querySelector(".aboutWrapper .skillset");
    const skillsetAllSkills = document.querySelector(
      ".aboutWrapper .skillset .skills"
    )?.childNodes as NodeListOf<Element>;

    const startupDuration = 1;
    const startupStagger = 0.025;
    const startupScaleInitial = 0.95;
    const startupDelay = isMobile ? 1.25 : 0.75;
    const startupEase = "power2.out";

    const timelineDuration = 1;
    const timelineDelay = 0.5;
    const timelineStagger = 0.1;

    const skillsetDuration = 1;
    const skillsetDelay = 0.5;
    const skillsetStagger = 0.1;

    gsap.set([scrollPrompt, timelineAllRows, skillsetAllSkills], {
      autoAlpha: "0",
    });

    gsap.set(
      [
        bioSpinner,
        bioPicture,
        bioContent,
        bioContentHS,
        timelineContainer,
        skillsetContainer,
      ],
      {
        transform: `scale(${startupScaleInitial})`,
        autoAlpha: "0",
        pointerEvents: "none",
        onComplete: () => {
          // bio
          gsap.to([bioSpinner, bioPicture, bioContentHS], {
            delay: startupDelay,
            transform: "scale(1)",
            autoAlpha: "1",
            duration: startupDuration,
            ease: startupEase,
          });
          gsap.to(bioContent, {
            delay: startupDelay,
            stagger: startupStagger,
            transform: "scale(1)",
            autoAlpha: "1",
            duration: startupDuration,
            ease: startupEase,
            onComplete: () => {
              gsap.set([bioSpinner, bioPicture, bioContent, bioContentHS], {
                clearProps: "pointerEvents",
              });
            },
          });

          // scroll prompt
          gsap.to(scrollPrompt, {
            delay: startupDelay,
            transform: "scale(1)",
            autoAlpha: "1",
            duration: startupDuration,
            ease: startupEase,
          });

          // timeline
          gsap.to(timelineContainer, {
            scrollTrigger: {
              trigger: timelineContainer,
              start: "top center",
            },
            autoAlpha: 1,
            transform: "scale(1)",
            duration: timelineDuration,
            onStart: () => {
              gsap.to(scrollPrompt, {
                transform: `scale(${startupScaleInitial})`,
                autoAlpha: "0",
                duration: startupDuration,
                ease: startupEase,
              });
            },
          });
          gsap.to(timelineAllRows, {
            delay: timelineDelay,
            scrollTrigger: {
              trigger: timelineContainer,
              start: "top center",
            },
            autoAlpha: 1,
            duration: timelineDuration,
            stagger: timelineStagger,
            onComplete: () => {
              gsap.set([timelineContainer, timelineAllRows], {
                clearProps: "pointerEvents",
              });
            },
          });

          // skillset
          gsap.to(skillsetContainer, {
            scrollTrigger: {
              trigger: skillsetContainer,
              start: "top center",
            },
            transform: "scale(1)",
            autoAlpha: 1,
            duration: skillsetDuration,
            onStart: () => {
              gsap.to(scrollPromptMobile, {
                transform: `scale(${startupScaleInitial})`,
                autoAlpha: "0",
                duration: startupDuration,
                ease: startupEase,
              });
            },
          });
          gsap.to(skillsetAllSkills, {
            delay: skillsetDelay,
            scrollTrigger: {
              trigger: skillsetContainer,
              start: "top center",
            },
            autoAlpha: 1,
            duration: skillsetDuration,
            stagger: skillsetStagger,
            onComplete: () => {
              gsap.set([skillsetContainer, skillsetAllSkills], {
                clearProps: "pointerEvents",
              });
            },
          });
        },
      }
    );
  });

  const skillFlip = contextSafe((state: Flip.FlipState) => {
    const duration = 0.7;
    const ease = "power2.inOut";
    const staggerEach = 0.08;

    Flip.from(state, {
      duration: duration,
      ease: ease,
      stagger: {
        each: staggerEach,
        from: "start",
      },
      absolute: true,
      onEnter: (elements) =>
        gsap.fromTo(
          elements,
          { autoAlpha: 0, scale: 0 },
          { autoAlpha: 1, scale: 1, duration: 1 }
        ),
      onLeave: (elements) =>
        gsap.to(elements, { autoAlpha: 0, scale: 0, duration: 1 }),
    });
  });

  const resetSkill = contextSafe((event: React.MouseEvent) => {
    const skillsetAllSkills = document.querySelector(
      ".aboutWrapper .skillset .skills"
    )?.childNodes as NodeListOf<Element>;

    if (event.button === 0) {
      const allOptions = document.querySelectorAll(
        ".aboutWrapper .skillset option"
      );

      const state = Flip.getState(skillsetAllSkills);

      skillsetAllSkills.forEach((skill) => {
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

      skillFlip(state);
    }
  });

  const filterSkill = contextSafe(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const skillsetAllSkills = document.querySelector(
        ".aboutWrapper .skillset .skills"
      )?.childNodes as NodeListOf<Element>;

      const selectedValue = event.target.value;

      const state = Flip.getState(skillsetAllSkills);

      if (selectedValue === "0") {
        skillsetAllSkills.forEach((skill) => {
          gsap.set(skill, { display: "flex" });
        });
      } else {
        skillsetAllSkills.forEach((skill) => {
          const dataKey = skill.getAttribute("data-key");

          if (dataKey?.match(selectedValue)) {
            gsap.set(skill, { display: "flex" });
          } else {
            gsap.set(skill, { display: "none" });
          }
        });
      }

      skillFlip(state);
    }
  );

  return {
    resetSkill,
    filterSkill,
    startup,
  };
}

export function homeAnimation() {
  const { contextSafe } = useGSAP();

  const startup = contextSafe(() => {
    const rightContainer = document.querySelector(".homeWrapper .hero")
      ?.childNodes as NodeListOf<HTMLElement>;

    const projectTile = document.querySelectorAll(".homeWrapper .tile");

    const startupDuration = "1";
    const startupDelay = "0.75";
    const startupEase = "power2.out";
    const startupStagger = 0.05;

    const startupScaleInitial = 0.75;

    gsap.set(["nav", ".navAlt"], {
      autoAlpha: 0,
      pointerEvents: "none",
      onComplete: () => {
        gsap.to(["nav", ".navAlt"], {
          autoAlpha: 1,
          delay: startupDelay,
          duration: startupDuration,
          ease: startupEase,
        });
      },
    });

    gsap.set(rightContainer, {
      autoAlpha: 0,
      transform: `scale(${startupScaleInitial})`,
      pointerEvents: "none",
      onComplete: () => {
        gsap.to(rightContainer, {
          autoAlpha: 1,
          transform: "scale(1)",
          delay: startupDelay,
          duration: startupDuration,
          ease: startupEase,
          stagger: startupStagger,
        });
      },
    });

    gsap.set(projectTile, {
      autoAlpha: 0,
      transform: `scale(${startupScaleInitial})`,
      pointerEvents: "none",
      onComplete: () => {
        gsap.to(projectTile, {
          autoAlpha: 1,
          transform: "scale(1)",
          delay: startupDelay,
          duration: startupDuration,
          ease: startupEase,
          stagger: { each: startupStagger, from: "end" },
          onComplete: () => {
            gsap.to(projectTile, {
              clearProps: "pointerEvents",
              duration: 0.001,
            });

            gsap.to(["nav", ".navAlt"], {
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

  const previewContainer = document.querySelectorAll(".homeWrapper .preview");
  const heroContainer = document.querySelector(".homeWrapper .hero");

  const previewEnter = {
    transform: "scale(1)",
    autoAlpha: "1",
    duration: "0.1",
    ease: "power2.inOut",
  };

  const previewExit = {
    transform: "scale(0.95)",
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

  return {
    startup,
    togglePreview,
    resetPreview,
    movePreview,
  };
}
