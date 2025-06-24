import { useGSAP } from "@gsap/react";
import { useGlobalState } from "../../providers/GlobalStateProvider";
import { Flip } from "gsap/all";
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";

gsap.registerPlugin(Flip, ScrollTrigger);

export function useAboutAnimation() {
  const { contextSafe } = useGSAP();
  const { isMobile } = useGlobalState();

  const startup = contextSafe(() => {
    const scrollPrompt = document.querySelector(".aboutWrapper .scrollPrompt");
    const scrollPromptMobile = document.querySelector(
      ".aboutWrapper .scrollPrompt.mobile"
    );

    const bioSpinner = document.querySelector(".aboutWrapper .bio .spinner");
    const bioPicture = document.querySelector(
      ".aboutWrapper .bio .profilePicture"
    );
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

    // initial state
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

  const waveOnHover = contextSafe(() => {
    const waveEmoji = document.querySelectorAll(
      ".aboutWrapper .bio .waveEmoji"
    );

    gsap.set(waveEmoji, { transformOrigin: "70% 70%" });

    if (!gsap.isTweening(waveEmoji)) {
      gsap.fromTo(
        waveEmoji,
        { rotation: 0 },
        {
          keyframes: [
            { rotation: 14, duration: 0.25 },
            { rotation: -8, duration: 0.25 },
            { rotation: 14, duration: 0.25 },
            { rotation: -4, duration: 0.25 },
            { rotation: 10, duration: 0.25 },
            { rotation: 0, duration: 0.25 },
          ],
          ease: "power2.inOut",
        }
      );
    }
  });

  return {
    startup,
    resetSkill,
    filterSkill,
    waveOnHover,
  };
}
