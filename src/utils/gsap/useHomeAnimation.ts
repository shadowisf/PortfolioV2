import { webkitOnly } from "../webkit";

// Once a video has a frame of its own on the screen: the frame handed to the
// compositor (requestVideoFrameCallback), and the screen drawn once more
// after it. Not at "playing", which Safari sends before it has drawn
// anything -- what covered the video until then (Safari's still, a held
// frame) went at once, and the tile showed blank for a moment, a flicker,
// most of all on one loaded afresh. Not called at all for a video let go of
// meanwhile.
export function onceFrameShown(video: HTMLVideoElement, then: () => void) {
  const shown = () =>
    requestAnimationFrame(() => {
      if (video.getAttribute("src")) then();
    });
  if ("requestVideoFrameCallback" in video) video.requestVideoFrameCallback(shown);
  else shown();
}

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

// Where a preview takes up from: where it was last left, if it has been
// let go since (data-resume, keepPlace), or else the point its project
// chose (data-start).
const resumeAt = (video: HTMLVideoElement) =>
  Number(video.dataset.resume ?? video.dataset.start) || 0;

// Let go of to make room, a preview that has played keeps its place: where
// it was paused, to carry on from, and the frame it was paused on, held
// over it -- so letting it go shows nothing at all, where it once jumped the
// tile back to its first frame and started it over on the next hover. The
// frame is drawn onto a canvas laid over the video, in its place and shape
// and grey (.cardStill), the moment before its source goes, and stays until
// the video has drawn a frame of its own again. Drawn and shown at once,
// nothing in between: a still made into an image first let the video's own
// poster -- its first frame -- show for a moment, a flicker, before it came.
//
// Whether letting it go will now show nothing: true for one that has not
// played (it rests on the frame its poster already shows), and for one whose
// frame was drawn -- not for one whose frame came out blank, as Safari can
// draw a video, which is then best kept.
function keepPlace(video: HTMLVideoElement) {
  if (video.dataset.played !== "true") return true;
  if (!video.videoWidth) return false;
  video.dataset.resume = String(video.currentTime);
  video.parentElement?.querySelector(".cardStill")?.remove();

  const canvas = document.createElement("canvas");
  canvas.className = "cardStill";
  // as sharp as the tile is shown, no sharper
  const shown = video.clientWidth * window.devicePixelRatio;
  const scale = Math.min(1, shown / video.videoWidth || 1);
  canvas.width = Math.round(video.videoWidth * scale);
  canvas.height = Math.round(video.videoHeight * scale);
  const drawing = canvas.getContext("2d", { willReadFrequently: true });
  if (!drawing) return false;
  drawing.drawImage(video, 0, 0, canvas.width, canvas.height);
  // drawn at all? nine points across it, none with anything in
  const blank = [0.25, 0.5, 0.75].every((fx) =>
    [0.25, 0.5, 0.75].every((fy) => {
      const [r, g, b, a] = drawing.getImageData(canvas.width * fx, canvas.height * fy, 1, 1).data;
      return a === 0 || r + g + b === 0;
    })
  );
  if (blank) return false;
  // A clip cut out of its recording (feeltok's phone) is see-through round
  // the cut-out, the panel's grey showing -- but Safari draws its hevc,
  // alpha and all, as solid, black where it should be clear. Its still has
  // the same cut-out, so the frame is cut back to that; on a clip with
  // none, the still is solid throughout and nothing is cut.
  const still = video.parentElement?.querySelector<HTMLImageElement>(".cardPoster");
  if (still?.complete && still.naturalWidth) {
    drawing.globalCompositeOperation = "destination-in";
    drawing.drawImage(still, 0, 0, canvas.width, canvas.height);
  }
  // exactly where the video is -- its frame's box is not always the one it
  // is placed in (a phone's tile lets it go: display: contents) -- and
  // fitted into it as the video is
  const style = getComputedStyle(video);
  Object.assign(canvas.style, {
    top: `${video.offsetTop}px`,
    left: `${video.offsetLeft}px`,
    width: `${video.offsetWidth}px`,
    height: `${video.offsetHeight}px`,
    objectFit: style.objectFit,
    objectPosition: style.objectPosition,
  });
  // over the video and Safari's poster, under the loading ring and stack
  (video.parentElement?.querySelector(".cardPoster") ?? video).after(canvas);
  // gone once the video has a frame of its own up (onceFrameShown) -- not
  // at the unseen warm-up's "playing" (primePreview), which may draw none
  video.addEventListener("playing", () => onceFrameShown(video, () => canvas.remove()), {
    once: true,
  });
  return true;
}

// on the screen, any of it
function onScreen(video: HTMLVideoElement) {
  const box = video.getBoundingClientRect();
  return box.bottom > 0 && box.top < window.innerHeight && box.right > 0 && box.left < window.innerWidth;
}

function attachPreviewSource(video: HTMLVideoElement) {
  const src = video.dataset.src;
  if (!src) return;

  // most recently used goes to the back of the eviction queue
  const queued = loadedPreviews.indexOf(video);
  if (queued > -1) loadedPreviews.splice(queued, 1);
  loadedPreviews.push(video);

  if (video.dataset.unloading === "true") {
    // taken back up before it was let go (unload): it still has its source
    delete video.dataset.unloading;
    video.dataset.loaded = "true";
  } else if (video.dataset.loaded !== "true") {
    // loaded and buffering ahead of a hover, not waiting for one
    video.preload = "auto";
    video.src = src;
    video.dataset.loaded = "true";
    video.load();
  }

  // Room made -- never by one that is playing: off the screen first, where
  // there is nothing to see go, the longest unused of those; then the
  // longest unused on it, if it can go unseen (keepPlace); else none.
  while (loadedPreviews.length > MAX_LOADED_PREVIEWS) {
    const idle = loadedPreviews.filter((v) => v.dataset.wanted !== "true");
    const order = [...idle.filter((v) => !onScreen(v)), ...idle.filter(onScreen)];
    const freed = order.find(unload);
    if (!freed) break;
    loadedPreviews.splice(loadedPreviews.indexOf(freed), 1);
  }
}

// Let go of a preview to free its decoder: its paused frame put up over it
// first (keepPlace), and its source taken away only two frames on, once that
// frame is surely on the screen. Both at once, Safari cleared the video the
// moment its source went but showed the frame only a frame later -- a blank
// flash, then the picture. Wanted again in between, it simply stays. One on
// the screen whose frame could not be held is not let go at all (false).
function unload(stale: HTMLVideoElement) {
  stale.pause();
  if (!keepPlace(stale) && onScreen(stale)) return false;
  delete stale.dataset.loaded;
  stale.dataset.unloading = "true";
  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      if (stale.dataset.unloading !== "true") return;
      delete stale.dataset.unloading;
      // Safari's own still (.cardPoster) back up in the same moment the
      // video clears -- not when its "emptied" comes, a moment on, the tile
      // blank in between
      delete stale.dataset.played;
      delete stale.dataset.playing;
      stale.removeAttribute("src");
      stale.preload = "none";
      delete stale.dataset.warmed;
      stale.load(); // releases the decoder
    })
  );
  return true;
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
  const startAt = resumeAt(video);
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
  const from = resumeAt(video);

  const seekAndPlay = () => {
    if (video.dataset.wanted !== "true") return; // no longer wanted
    // still short of where it takes up from means it has not played yet,
    // or was let go and loaded again (keepPlace). The seek is frame-exact,
    // so even a start a few frames in (a fraction of a second) is honoured;
    // the leeway is under a frame.
    if (video.currentTime < from - 0.01) {
      video.currentTime = from;
    }
    delete video.dataset.resume;
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

// Pause it where it is, so the next hover carries on from there -- and let
// go of any buffering it was caught in, which no "playing" will now clear.
export function stopPreview(video: HTMLVideoElement) {
  delete video.dataset.wanted;
  delete video.dataset.waiting;
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
