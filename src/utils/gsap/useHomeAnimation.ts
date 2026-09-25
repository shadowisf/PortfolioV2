import { useGSAP } from "@gsap/react";
import gsap from "gsap";

// chromium spins up (and keeps) a decode pipeline for every <video> that has a
// source attached -- even a paused one. mounting all fourteen previews at once
// is what stalls the main thread, so previews start with no src and we only
// ever keep the few most recently hovered ones loaded.
const MAX_LOADED_PREVIEWS = 3;
const loadedPreviews: HTMLVideoElement[] = [];

function attachPreviewSource(video: HTMLVideoElement) {
  const src = video.dataset.src;
  if (!src) return;

  // most recently hovered goes to the back of the eviction queue
  const queued = loadedPreviews.indexOf(video);
  if (queued > -1) loadedPreviews.splice(queued, 1);
  loadedPreviews.push(video);

  if (video.dataset.loaded !== "true") {
    video.src = src;
    video.dataset.loaded = "true";
    video.load();
  }

  while (loadedPreviews.length > MAX_LOADED_PREVIEWS) {
    const stale = loadedPreviews.shift()!;
    stale.pause();
    stale.removeAttribute("src");
    delete stale.dataset.loaded;
    stale.load(); // releases the decoder and falls back to the poster
  }
}

// which tile the cursor is on, so a slow load cannot play over a later hover
let activePreviewKey: string | null = null;

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

  let previewMap: Record<
    string,
    { container: Element; video?: HTMLVideoElement }
  > = {};
  let heroContainer: Element | null = null;
  let initialized = false;

  function ensureInitialized() {
    if (initialized) return;
    const previewContainer = document.querySelectorAll(
      ".homeWrapper .preview"
    );
    heroContainer = document.querySelector(".homeWrapper .hero");
    if (!previewContainer.length) return;

    previewContainer.forEach((container) => {
      const key = container.getAttribute("data-key");
      if (!key) return;
      previewMap[key] = {
        container,
        video: container.querySelector("video") ?? undefined,
      };
    });
    initialized = true;
  }

  const togglePreview = contextSafe((targetID: number) => {
    ensureInitialized();
    const key = String(targetID);
    const entry = previewMap[key];
    if (!entry) return;

    const { container, video } = entry;
    activePreviewKey = key;

    gsap.to(container, previewEnter);
    gsap.to(heroContainer, previewExit);

    if (video) {
      attachPreviewSource(video);

      const playVideo = () => {
        if (activePreviewKey !== key) return; // cursor already moved on
        video.play().catch(() => {});
      };

      if (video.readyState >= 3) {
        playVideo();
      } else {
        video.addEventListener("canplay", playVideo, { once: true });
      }
    }
  });

  const resetPreview = contextSafe(() => {
    ensureInitialized();
    activePreviewKey = null;

    Object.values(previewMap).forEach(({ container, video }) => {
      if (video && video.dataset.loaded === "true") {
        video.pause();
        video.currentTime = 0;
      }
      gsap.to(container, previewExit);
    });

    gsap.to(heroContainer, previewEnter);
  });

  const movePreview = contextSafe(
    (targetID: number, event: React.MouseEvent) => {
      ensureInitialized();
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
