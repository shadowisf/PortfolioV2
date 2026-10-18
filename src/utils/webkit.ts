// Safari, and every browser on ios (all of them webkit). Their videos come
// as hevc where there is a copy (videoPreviewHevc): vp9 they decode in
// software on many macs, if at all, and a 1080p60 clip stalled on its
// loading ring.
const ua = typeof navigator === "undefined" ? "" : navigator.userAgent;
export const webkitOnly =
  /iP(hone|ad|od)/.test(ua) ||
  (/Safari\//.test(ua) && !/Chrome|Chromium|Edg|Firefox|OPR/.test(ua));
