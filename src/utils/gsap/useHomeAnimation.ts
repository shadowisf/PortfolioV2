import { webkitOnly } from "../webkit";

// Hover playback for the home page's project tiles.

// chromium spins up (and keeps) a decode pipeline for every <video> that has a
// source attached -- even a paused one. mounting every preview at once is what
// stalls the main thread, so previews start with no src, and only those near
// the screen are loaded (primeWhenNear) -- the few most recently used, about a
// screen's worth and the next.
//
// Safari (webkit) loads fewer: each may buffer far ahead, several at once,
// leaving the one hovered to wait behind them on its loading ring. (Readied
// with only their start, preload "metadata", every hover waited on the
// network instead.)
const MAX_LOADED_PREVIEWS = webkitOnly ? 4 : 6;
const loadedPreviews: HTMLVideoElement[] = [];

function attachPreviewSource(video: HTMLVideoElement) {
  const src = video.dataset.src;
  if (!src) return;

  // most recently used goes to the back of the eviction queue
  const queued = loadedPreviews.indexOf(video);
  if (queued > -1) loadedPreviews.splice(queued, 1);
  loadedPreviews.push(video);

  if (video.dataset.loaded !== "true") {
    // loaded and buffering ahead of a hover, not waiting for one
    video.preload = "auto";
    video.src = src;
    video.dataset.loaded = "true";
    video.load();
  }

  // the longest unused goes -- never one that is playing
  while (loadedPreviews.length > MAX_LOADED_PREVIEWS) {
    const index = loadedPreviews.findIndex((v) => v.dataset.wanted !== "true");
    if (index === -1) break;
    const [stale] = loadedPreviews.splice(index, 1);
    stale.pause();
    stale.removeAttribute("src");
    stale.preload = "none";
    delete stale.dataset.loaded;
    delete stale.dataset.warmed;
    stale.load(); // releases the decoder and shows the poster again
  }
}

// Ready a preview before it is wanted: loaded, decoded and paused on the
// frame its hover starts on -- the frame its poster already shows, so nothing
// changes to the eye -- so a hover only has to press play. Seeking there
// means decoding from the keyframe before it, up to two seconds of clip;
// done now, that is time no one waits through.
//
// Safari, besides, does not get a paused clip that has never played ready to
// play: the hover still waited on its decoder starting and the data at the
// start point coming in, behind the loading ring. So there it is warmed as
// well -- played, muted, the moment it can, and paused at once -- unseen:
// the tile neither colours nor comes forward for it (ProjectCard), and the
// still is the same grey frame. A hover then only has to carry on.
export function primePreview(video: HTMLVideoElement) {
  attachPreviewSource(video);
  const startAt = Number(video.dataset.start) || 0;
  const park = () => {
    if (video.paused && video.currentTime < startAt - 0.01) video.currentTime = startAt;
    if (webkitOnly) video.addEventListener("canplay", () => warm(video), { once: true });
  };
  if (video.readyState >= 1) park();
  else video.addEventListener("loadedmetadata", park, { once: true });
}

function warm(video: HTMLVideoElement) {
  if (video.dataset.warmed || video.dataset.wanted === "true") return;
  video.dataset.warming = "true";
  video
    .play()
    .then(() => {
      // wanted meanwhile, it simply plays on
      if (video.dataset.wanted !== "true") video.pause();
      video.dataset.warmed = "true";
    })
    .catch(() => {})
    .finally(() => delete video.dataset.warming);
}

// Prime each preview as its tile comes within a couple of hundred pixels of
// the screen. One watcher for every tile; the function hands back its undo.
let nearScreen: IntersectionObserver | null = null;

export function primeWhenNear(video: HTMLVideoElement) {
  nearScreen ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) primePreview(entry.target as HTMLVideoElement);
      }
    },
    { rootMargin: "200px" }
  );
  nearScreen.observe(video);
  return () => nearScreen?.unobserve(video);
}

// Play a tile's preview -- the first time from the point that project chose
// (data-start), after that from wherever the last hover left it -- and loop
// back to that point rather than to zero.
export function playPreview(video: HTMLVideoElement) {
  // wanted until stopped: a slow load starts only if it still is -- whether
  // the cursor has moved on, or (on mobile) the tile has scrolled away
  video.dataset.wanted = "true";
  attachPreviewSource(video);

  const startAt = Number(video.dataset.start) || 0;
  video.onended = () => {
    video.currentTime = startAt;
    video.play().catch(() => {});
  };

  const seekAndPlay = () => {
    if (video.dataset.wanted !== "true") return; // no longer wanted
    // still short of its start means it has not played yet (or was evicted
    // and reloaded). The seek is frame-exact, so even a start a few frames in
    // (a fraction of a second) is honoured; the leeway is under a frame.
    if (video.currentTime < startAt - 0.01) {
      video.currentTime = startAt;
    }
    // caught still warming (Safari), already moving: no "playing" to come
    if (!video.paused) video.dataset.playing = "true";
    video.play().catch(() => {});
  };

  // readyState 1 is HAVE_METADATA -- seeking before that is not allowed
  if (video.readyState >= 1) {
    seekAndPlay();
  } else {
    video.addEventListener("loadedmetadata", seekAndPlay, { once: true });
  }
}

// Pause it where it is, so the next hover carries on from there.
export function stopPreview(video: HTMLVideoElement) {
  delete video.dataset.wanted;
  if (video.dataset.loaded !== "true") return;
  video.pause();
}

// The swirl that sat beside the name in the old home hero, and its spin --
// switched off, and kept here as a comment.
//
// export function useSwirl() {
//   const { contextSafe } = useGSAP();
//
//   let swirlTween: gsap.core.Tween | null = null;
//   let isTweening = false;
//
//   const swirlOnHover = contextSafe(() => {
//     const swirlEmoji = document.querySelector(".homeWrapper .hero .swirlEmoji");
//     if (!swirlEmoji || isTweening) return;
//
//     swirlTween = gsap.to(swirlEmoji, {
//       rotate: "-=360",
//       duration: 1,
//       repeat: -1,
//       ease: "none",
//       onStart: () => {
//         isTweening = true;
//       },
//     });
//   });
//
//   const swirlOnLeave = contextSafe(() => {
//     const swirlEmoji = document.querySelector(".homeWrapper .hero .swirlEmoji");
//     if (!swirlEmoji || !isTweening) return;
//
//     isTweening = false;
//
//     swirlTween?.kill();
//     swirlTween = null;
//
//     gsap.to(swirlEmoji, {
//       rotate: 0,
//       duration: 1,
//       ease: "power2.out",
//       overwrite: true,
//     });
//   });
//
//   return { swirlOnHover, swirlOnLeave };
// }
