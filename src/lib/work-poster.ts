import { posterFor } from "@/lib/portfolio-videos";

const posterCache = new Map<string, string>();
const posterTasks = new Map<string, Promise<string>>();

export function loadPoster(src: string) {
  if (posterCache.has(src)) return Promise.resolve(posterCache.get(src) ?? "");
  const pending = posterTasks.get(src);
  if (pending) return pending;

  const remotePoster = posterFor(src);
  if (remotePoster) {
    posterCache.set(src, remotePoster);
    return Promise.resolve(remotePoster);
  }

  if (/vimeo\.com|drive\.google\.com/.test(src)) {
    posterCache.set(src, "");
    return Promise.resolve("");
  }

  const task = new Promise<string>((resolve) => {
    const video = document.createElement("video");
    video.muted = true;
    video.playsInline = true;
    video.preload = "auto";
    video.src = src;

    const finish = () => {
      const width = video.videoWidth || 1280;
      const height = video.videoHeight || 720;
      const scale = Math.min(1, 960 / width);
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(width * scale);
      canvas.height = Math.round(height * scale);
      const ctx = canvas.getContext("2d");
      if (!ctx || !video.videoWidth) {
        resolve("");
        return;
      }
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const url = canvas.toDataURL("image/jpeg", 0.8);
      posterCache.set(src, url);
      resolve(url);
      video.pause();
      video.removeAttribute("src");
      video.load();
    };

    video.addEventListener("seeked", finish, { once: true });
    video.addEventListener(
      "loadeddata",
      () => {
        const mark = Math.min(1.2, Math.max(0.45, (video.duration || 2) * 0.22));
        if (Math.abs(video.currentTime - mark) < 0.05) finish();
        else video.currentTime = mark;
      },
      { once: true },
    );
    video.addEventListener("error", () => resolve(""), { once: true });
  });

  posterTasks.set(src, task);
  return task;
}
