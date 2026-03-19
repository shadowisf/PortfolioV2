import { useState, useEffect } from "react";
import { workMapping } from "./workMapping";

export function useVideoPreloader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const projects = Object.values(workMapping);
    const videoUrls = projects
      .map((p) => p.video)
      .filter((v) => v && v.length > 0);

    if (videoUrls.length === 0) {
      setProgress(100);
      setDone(true);
      return;
    }

    let loaded = 0;
    const total = videoUrls.length;

    const promises = videoUrls.map((url) => {
      return new Promise<void>((resolve) => {
        const video = document.createElement("video");
        video.preload = "auto";
        video.muted = true;
        video.playsInline = true;

        const onReady = () => {
          loaded++;
          setProgress(Math.round((loaded / total) * 100));
          resolve();
        };

        video.addEventListener("canplaythrough", onReady, { once: true });
        video.addEventListener("error", onReady, { once: true });

        video.src = url;
        video.load();
      });
    });

    Promise.all(promises).then(() => {
      setDone(true);
    });
  }, []);

  return { progress, done };
}
