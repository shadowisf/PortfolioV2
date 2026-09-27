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
    stale.load(); // releases the decoder; the box keeps its shape via aspectRatio
  }
}

// which tile the cursor is on, so a slow load cannot play over a later hover
let activePreviewKey: string | null = null;

// A preview that is already in the http cache decodes its first frame in a few
// tens of milliseconds, but readyState is still 0 the instant the source is
// attached. Showing the spinner immediately meant every tile flashed one on the
// way past. So it waits: if the clip beats this, no spinner is ever shown, and
// only a load that is genuinely slow gets one.
const SPINNER_DELAY_MS = 220;

// Module level, like activePreviewKey: the tile being left and the tile being
// entered are different component instances, so the leave must cancel a pending
// show from the enter.
let spinnerTimer: number | null = null;

function cancelSpinnerDelay() {
  if (spinnerTimer !== null) {
    window.clearTimeout(spinnerTimer);
    spinnerTimer = null;
  }
}

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
    { container: Element; video?: HTMLVideoElement; spinner?: HTMLElement }
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
        spinner: container.querySelector<HTMLElement>(".spinner") ?? undefined,
      };
    });
    initialized = true;
  }

  const togglePreview = contextSafe((targetID: number) => {
    ensureInitialized();
    const key = String(targetID);
    const entry = previewMap[key];
    if (!entry) return;

    const { container, video, spinner } = entry;
    activePreviewKey = key;

    gsap.to(container, previewEnter);
    gsap.to(heroContainer, previewExit);

    if (video) {
      attachPreviewSource(video);

      // readyState 2 is HAVE_CURRENT_DATA -- the first frame has decoded and
      // there is finally something in the box. anything below that and the
      // box is blank, which is the only time a spinner earns its place.
      cancelSpinnerDelay();

      if (spinner) {
        // always start down, even when the box is empty -- it only comes up if
        // the clip is still not ready once the delay is out
        gsap.set(spinner, { autoAlpha: 0 });

        if (video.readyState < 2) {
          spinnerTimer = window.setTimeout(() => {
            spinnerTimer = null;
            // cursor moved on, or the clip arrived while we waited
            if (activePreviewKey !== key || video.readyState >= 2) return;
            gsap.to(spinner, { autoAlpha: 1, duration: 0.15 });
          }, SPINNER_DELAY_MS);
        }
      }

      // Deliberately unguarded by activePreviewKey: hiding a spinner is always
      // safe, and every guard here was just another way to leave one stranded
      // over a playing clip.
      const hideSpinner = () => {
        if (!spinner) return;
        // timeupdate fires several times a second, so bail once it is already
        // down rather than spawning a tween per frame of playback
        if (Number(gsap.getProperty(spinner, "opacity")) === 0) return;
        gsap.to(spinner, { autoAlpha: 0, duration: 0.2, overwrite: "auto" });
      };

      // Several events, not just loadeddata: that one fires once per load, and
      // seeking to this project's start can drop readyState back below 2
      // without it ever firing again. timeupdate is the backstop -- it fires
      // several times a second while playing, so a visible frame always wins.
      // Assigned rather than addEventListener so re-hovering replaces the
      // handlers instead of stacking more.
      video.onloadeddata = hideSpinner;
      video.oncanplay = hideSpinner;
      video.onplaying = hideSpinner;
      video.ontimeupdate = () => {
        if (video.readyState >= 2) hideSpinner();
      };

      // previews run the full length of the clip now, so each project picks
      // where its hover starts rather than the cut being baked into the file
      const startAt = Number(video.dataset.start) || 0;

      // looping natively would return to 0, not to the chosen start. assigning
      // the property (rather than addEventListener) keeps this idempotent
      // across re-hovers and evictions.
      video.onended = () => {
        video.currentTime = startAt;
        video.play().catch(() => {});
      };

      const seekAndPlay = () => {
        if (activePreviewKey !== key) return; // cursor already moved on
        // a seek lands on the nearest keyframe, so only correct a real drift
        if (Math.abs(video.currentTime - startAt) > 0.5) {
          video.currentTime = startAt;
        }
        video.play().catch(() => {});
      };

      // readyState 1 is HAVE_METADATA -- seeking before that is not allowed
      if (video.readyState >= 1) {
        seekAndPlay();
      } else {
        video.addEventListener("loadedmetadata", seekAndPlay, { once: true });
      }
    }
  });

  const resetPreview = contextSafe(() => {
    ensureInitialized();
    activePreviewKey = null;

    cancelSpinnerDelay();

    Object.values(previewMap).forEach(({ container, video, spinner }) => {
      if (spinner) gsap.set(spinner, { autoAlpha: 0 });
      if (video && video.dataset.loaded === "true") {
        video.pause();
        // back to this project's own start, not to zero
        video.currentTime = Number(video.dataset.start) || 0;
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
