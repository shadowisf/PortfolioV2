import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useGlobalState } from "../../providers/GlobalStateProvider";
import { workMapping } from "../workMapping";

export function useWorkAnimation() {
  const { contextSafe } = useGSAP();
  const { currentPage, isMobile } = useGlobalState();

  const startup = contextSafe(() => {
    const projectRoutes = Object.entries(workMapping).map(([key, project]) => ({
      key: Number(key),
      path: project.name.replace(/\s+/g, "-"),
    }));

    if (projectRoutes.some((route) => route.path === currentPage)) {
      return;
    }

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
    const startupDelay = isMobile ? 1.25 : 0.25;
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
}
