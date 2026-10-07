"use client";

import { useEffect, useRef } from "react";
import { resolveMedia, youtubeEmbed, youtubeId } from "@/lib/portfolio-videos";
import { CoverEmbedStyle } from "@/components/ui/cover-embed-style";

export function MediaCover({
  src,
  title,
  poster,
  className = "absolute inset-0 h-full w-full",
}: {
  src: string;
  title?: string;
  poster?: string;
  className?: string;
}) {
  const youtube = youtubeId(src);
  if (youtube) {
    return <YoutubeCover id={youtube} title={title} poster={poster} className={className} />;
  }

  const media = resolveMedia(src);

  if (media.kind === "embed") {
    return <EmbedCover src={media.src} title={title} className={className} />;
  }

  return <FileCover src={media.src} title={title} className={className} />;
}

function YoutubeCover({
  id,
  title,
  className,
}: {
  id: string;
  title?: string;
  poster?: string;
  className: string;
}) {
  return (
    <div className={`${className} overflow-hidden`}>
      <iframe
        src={youtubeEmbed(id, { mute: true, loop: true })}
        title={title || "Vídeo"}
        className="pointer-events-none absolute top-1/2 left-1/2 h-[130%] w-[130%] -translate-x-1/2 -translate-y-1/2 border-0"
        allow="autoplay; encrypted-media"
      />
    </div>
  );
}

function EmbedCover({
  src,
  title,
  className,
  youtube = false,
}: {
  src: string;
  title?: string;
  className: string;
  youtube?: boolean;
}) {
  const frameRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!youtube) return;
    const frame = frameRef.current;
    const listen = () => {
      frame?.contentWindow?.postMessage(JSON.stringify({ event: "listening" }), "*");
    };
    frame?.addEventListener("load", listen);
    return () => frame?.removeEventListener("load", listen);
  }, [youtube]);

  return (
    <div className={`cover-embed ${className}`}>
      <CoverEmbedStyle />
      <iframe
        ref={frameRef}
        src={src}
        title={title || "Vídeo"}
        className="pointer-events-none border-0"
        allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
        referrerPolicy="strict-origin-when-cross-origin"
      />
      <div className="absolute inset-0 z-10" />
    </div>
  );
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

    video.muted = true;
    video.preload = "auto";
    video.src = src;
    const start = () => {
      video.muted = true;
      void video.play().catch(() => {});
    };
    video.addEventListener("loadeddata", start);
    video.load();
    return () => video.removeEventListener("loadeddata", start);
  }, [src]);

  return (
    <div className={className}>
      <video
        ref={ref}
        muted
        loop
        playsInline
        autoPlay
        preload="auto"
        aria-label={title}
        disablePictureInPicture
        disableRemotePlayback
        controls={false}
        className="pointer-events-none h-full w-full object-cover"
      />
    </div>
  );
}
