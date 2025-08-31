import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export function useHomeAnimation() {
  const { contextSafe } = useGSAP();

  const startup = contextSafe(() => {
    const rightContainer = document.querySelector(".homeWrapper .hero")
      ?.childNodes as NodeListOf<HTMLElement>;

    const projectTile = document.querySelectorAll(".homeWrapper .tile");

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
      gsap.set([rightContainer, projectTile], {
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

  const previewMap: Record<
    string,
    { container: Element; video?: HTMLVideoElement }
  > = {};

  previewContainer?.forEach((container) => {
    const key = container.getAttribute("data-key");
    if (!key) return;
    previewMap[key] = {
      container,
      video: container.querySelector("video") ?? undefined,
    };
  });

  const togglePreview = contextSafe((targetID: number) => {
    const entry = previewMap[String(targetID)];
    if (!entry) return;

    const { container, video } = entry;

    gsap.to(container, previewEnter);
    gsap.to(heroContainer, previewExit);

    if (video) {
      if (!video.src) {
        const dataSrc = video.getAttribute("data-src");
        if (dataSrc) {
          video.src = dataSrc;
          video.preload = "auto";
        }
      }

      if (video.readyState >= 4) {
        video.play().catch(() => {});
      } else {
        video.addEventListener(
          "canplaythrough",
          () => {
            video.play().catch(() => {});
          },
          { once: true }
        );
      }
    }
  });

  const resetPreview = contextSafe(() => {
    Object.values(previewMap).forEach(({ container, video }) => {
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
      const entry = previewMap[String(targetID)];
      if (!entry) return;

      const { container } = entry;

      const quickX = gsap.quickTo(container, "xPercent", { duration: 0.2 });
      const quickY = gsap.quickTo(container, "yPercent", { duration: 0.2 });

      quickX((event.clientX / window.innerWidth) * 10 - 2);
      quickY((event.clientY / window.innerHeight) * 10 - 2);
    }
  );

  let swirlTween: gsap.core.Tween | null = null;
  let isTweening = false;

  const swirlOnHover = contextSafe(() => {
    const swirlEmoji = document.querySelector(".homeWrapper .hero .swirlEmoji");
    if (!swirlEmoji || isTweening) return;

    swirlTween = gsap.to(swirlEmoji, {
      rotate: "-=360",
      duration: 1,
      repeat: -1,
      ease: "none",
      onStart: () => {
        isTweening = true;
      },
    });
  });

  const swirlOnLeave = contextSafe(() => {
    const swirlEmoji = document.querySelector(".homeWrapper .hero .swirlEmoji");
    if (!swirlEmoji || !isTweening) return;

    isTweening = false;

    swirlTween?.kill();
    swirlTween = null;

    gsap.to(swirlEmoji, {
      rotate: 0,
      duration: 1,
      ease: "power2.out",
      overwrite: true,
    });
  });

  return {
    startup,
    togglePreview,
    resetPreview,
    movePreview,
    swirlOnHover,
    swirlOnLeave,
  };
}
