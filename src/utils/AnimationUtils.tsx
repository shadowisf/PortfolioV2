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
    /* startTransition,
    endTransition, */
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
    const startupDelay = isMobile ? 1.25 : 0.25;
    const startupEase = "power2.out";

    const timelineStagger = 0.1;
    const skillsetStagger = 0.1;

    gsap.set([scrollPrompt, timelineAllRows, skillsetAllSkills], {
      autoAlpha: 0,
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
        autoAlpha: 0,
        pointerEvents: "none",
      }
    );

    const tl = gsap.timeline({
      defaults: {
        duration: startupDuration,
        ease: startupEase,
      },
    });

    // bio
    tl.to([bioSpinner, bioPicture, bioContentHS], {
      autoAlpha: 1,
      scale: 1,
      delay: startupDelay,
    })
      .to(
        bioContent,
        {
          autoAlpha: 1,
          scale: 1,
          stagger: startupStagger,
        },
        "-=0.75"
      )

      .add(() => {
        gsap.set([bioSpinner, bioPicture, bioContent, bioContentHS], {
          clearProps: "pointerEvents",
        });
      })

      .to(
        scrollPrompt,
        {
          autoAlpha: 1,
          scale: 1,
        },
        "-=0.6"
      )

      // timeline
      .add(() => {
        gsap.to(timelineContainer, {
          scrollTrigger: {
            trigger: timelineContainer,
            start: "top center",
          },
          autoAlpha: 1,
          scale: 1,
          duration: startupDuration,
          onStart: () => {
            gsap.to(scrollPrompt, {
              scale: startupScaleInitial,
              autoAlpha: 0,
              duration: startupDuration,
              ease: startupEase,
            });
          },
        });

        gsap.to(timelineAllRows, {
          scrollTrigger: {
            trigger: timelineContainer,
            start: "top center",
          },
          autoAlpha: 1,
          duration: startupDuration,
          stagger: timelineStagger,
          delay: 0.5,
          onComplete: () => {
            gsap.set([timelineContainer, timelineAllRows], {
              clearProps: "pointerEvents",
            });
          },
        });
      })

      // skillset
      .add(() => {
        gsap.to(skillsetContainer, {
          scrollTrigger: {
            trigger: skillsetContainer,
            start: "top center",
          },
          autoAlpha: 1,
          scale: 1,
          duration: startupDuration,
          onStart: () => {
            gsap.to(scrollPromptMobile, {
              scale: startupScaleInitial,
              autoAlpha: 0,
              duration: startupDuration,
              ease: startupEase,
            });
          },
        });

        gsap.to(skillsetAllSkills, {
          scrollTrigger: {
            trigger: skillsetContainer,
            start: "top center",
          },
          autoAlpha: 1,
          duration: startupDuration,
          stagger: skillsetStagger,
          delay: 0.5,
          onComplete: () => {
            gsap.set([skillsetContainer, skillsetAllSkills], {
              clearProps: "pointerEvents",
            });
          },
        });
      });
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
    startup,
    resetSkill,
    filterSkill,
  };
}

export function homeAnimation() {
  const { contextSafe } = useGSAP();

  const startup = contextSafe(() => {
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
  });

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

  return {
    startup,
    togglePreview,
    resetPreview,
    movePreview,
  };
}

/* export function workAnimation() {
  const { contextSafe } = useGSAP();

  const startup = contextSafe(() => {
    const header = document.querySelector(".workWrapper .header");
    const year = document.querySelector(".workWrapper .year");
    const techStackItems = document.querySelectorAll(
      ".workWrapper .techStack .item"
    );
    const media = document.querySelectorAll(".workWrapper .media > *");
    const links = document.querySelector(".workWrapper .links");
    const paragraph = document.querySelector(".workWrapper .paragraph");
    const bottomNav = document.querySelector(".workWrapper .bottomNav");

    const startupDuration = 1;
    const startupDelay = 0.25;
    const startupEase = "power2.out";
    const startupStagger = 0.075;
    const startupScaleInitial = 0.9;

    const tl = gsap.timeline({
      defaults: {
        duration: startupDuration,
        ease: startupEase,
      },
      delay: startupDelay,
    });

    gsap.set(
      [header, year, ...techStackItems, ...media, links, paragraph, bottomNav],
      {
        autoAlpha: 0,
        scale: startupScaleInitial,
        pointerEvents: "none",
      }
    );

    tl.to(header, { autoAlpha: 1, scale: 1 }, 0)
      .to(year, { autoAlpha: 1, scale: 1 }, 0)
      .to(
        techStackItems,
        { autoAlpha: 1, scale: 1, stagger: startupStagger },
        0
      )
      .to(media, { autoAlpha: 1, scale: 1, stagger: startupStagger }, 0)
      .to(links, { autoAlpha: 1, scale: 1 }, 0)
      .to(paragraph, { autoAlpha: 1, scale: 1 }, 0)
      .to(bottomNav, { autoAlpha: 1, scale: 1 }, 0)

      .add(() => {
        gsap.set(
          [
            header,
            year,
            ...techStackItems,
            ...media,
            links,
            paragraph,
            bottomNav,
          ],
          {
            clearProps: "pointerEvents",
          }
        );
      });
  });

  return { startup };
} */
