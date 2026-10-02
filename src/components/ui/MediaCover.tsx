"use client";

import { useEffect, useRef } from "react";
import { resolveMedia, youtubeId } from "@/lib/portfolio-videos";
import { YoutubeFrame } from "@/components/ui/YoutubeFrame";

export function MediaCover({
  src,
  title,
  className = "absolute inset-0 h-full w-full",
}: {
  src: string;
  title?: string;
  className?: string;
}) {
  const youtube = youtubeId(src);
  if (youtube) {
    return <YoutubeFrame videoId={youtube} title={title} className={className} />;
  }

  const media = resolveMedia(src);

  if (media.kind === "embed") {
    return (
      <iframe
        src={media.src}
        title={title || "Vídeo"}
        className={`${className} pointer-events-none border-0`}
        allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    );
  }

  return <FileCover src={media.src} title={title} className={className} />;
}

function FileCover({
  src,
  title,
  className,
}: {
  src: string;
  title?: string;
  className: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const start = () => {
      video.muted = true;
      void video.play().catch(() => {});
    };
    start();
    video.addEventListener("loadeddata", start);
    return () => video.removeEventListener("loadeddata", start);
  }, [src]);

  return (
    <video
      ref={ref}
      src={src}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-label={title}
      disablePictureInPicture
      disableRemotePlayback
      controls={false}
      className={`${className} object-cover`}
    />
  );
}
