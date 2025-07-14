import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useGlobalState } from "../../providers/GlobalStateProvider";

export function useWorkAnimation() {
  const { contextSafe } = useGSAP();
  const { isMobile, inMenu, skipStart, setSkipStart } = useGlobalState();

  const startup = contextSafe(() => {
    if (skipStart) {
      setSkipStart(false);
      return;
    }

    const nav = document.querySelector(".projectNav");
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
    const startupDelay = isMobile && inMenu ? 1.25 : 0.25;
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

    // Initial state
    const allElements = [
      header,
      year,
      ...techStackItems,
      ...media,
      links,
      paragraph,
      bottomNav,
      nav,
    ];

    gsap.set(allElements, {
      autoAlpha: 0,
      scale: startupScaleInitial,
      pointerEvents: "none",
    });

    // Title
    tl.to([nav, header, year], {
      autoAlpha: 1,
      scale: 1,
      stagger: 0.1,
    })

      // Tech stack
      .to(
        techStackItems,
        {
          autoAlpha: 1,
          scale: 1,
          stagger: startupStagger,
        },
        "<"
      )

      // Media
      .to(
        media,
        {
          autoAlpha: 1,
          scale: 1,
          stagger: startupStagger,
        },
        "<"
      )

      // Content
      .to(
        [links, paragraph, bottomNav],
        {
          autoAlpha: 1,
          scale: 1,
          stagger: 0.05,
        },
        "<"
      )

      // Cleanup
      .add(() => {
        gsap.set(allElements, {
          clearProps: "pointerEvents",
        });
      });
  });

  return { startup };
}
