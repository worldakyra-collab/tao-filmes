export const PORTFOLIO_VIDEOS = [
  "https://www.youtube.com/watch?v=nvWnxO4nS_4",
  "https://drive.google.com/file/d/16mBAtVSWEQg73REo2fFsejcdFLfT1KjX/view",
  "https://drive.google.com/file/d/16mBAtVSWEQg73REo2fFsejcdFLfT1KjX/view",
  "https://www.youtube.com/watch?v=Q2qkleDzqPQ",
  "https://vimeo.com/898379443",
] as const;

export type ResolvedMedia =
  | { kind: "file"; src: string; poster?: string }
  | { kind: "embed"; src: string; poster?: string };

export function youtubeId(url: string) {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/,
  );
  return match?.[1];
}

export function youtubeEmbed(id: string, options?: { mute?: boolean; loop?: boolean }) {
  const params = new URLSearchParams({
    autoplay: "1",
    rel: "0",
    controls: "0",
    modestbranding: "1",
    iv_load_policy: "3",
    fs: "0",
    disablekb: "1",
    playsinline: "1",
    cc_load_policy: "0",
  });
  if (options?.mute) params.set("mute", "1");
  if (options?.loop) {
    params.set("loop", "1");
    params.set("playlist", id);
  }
  return `https://www.youtube-nocookie.com/embed/${id}?${params}`;
}

function vimeoId(url: string) {
  const match = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  return match?.[1];
}

function driveId(url: string) {
  const match = url.match(/drive\.google\.com\/file\/d\/([^/?]+)/);
  return match?.[1];
}

export function posterFor(url: string) {
  const youtube = youtubeId(url);
  if (youtube) return `https://i.ytimg.com/vi/${youtube}/hqdefault.jpg`;
  return undefined;
}

export function resolveMedia(
  url: string,
  options?: { controls?: boolean },
): ResolvedMedia {
  if (youtubeId(url)) {
    return { kind: "file", src: "" };
  }

  const vimeo = vimeoId(url);
  if (vimeo) {
    const params = new URLSearchParams({
      autoplay: "1",
      muted: "1",
      loop: "1",
      autopause: "0",
      quality: "4k",
    });
    if (!options?.controls) params.set("background", "1");
    return {
      kind: "embed",
      src: `https://player.vimeo.com/video/${vimeo}?${params}`,
    };
  }

  const drive = driveId(url);
  if (drive) {
    return {
      kind: "file",
      src: "/video/reel.mp4",
    };
  }

  return { kind: "file", src: url };
}
