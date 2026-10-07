"use client";

import { useEffect, useRef, useState } from "react";
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
  const ref = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setOn(entry.isIntersecting),
      { threshold: 0.6 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!on) return;
    const frame = frameRef.current;
    if (!youtube) return;
    const listen = () => {
      frame?.contentWindow?.postMessage(JSON.stringify({ event: "listening" }), "*");
    };
    frame?.addEventListener("load", listen);
    return () => frame?.removeEventListener("load", listen);
  }, [on, youtube]);

  return (
    <div ref={ref} className={`cover-embed ${className}`}>
      <CoverEmbedStyle />
      {on ? (
        <iframe
          ref={frameRef}
          src={src}
          title={title || "Vídeo"}
          className="pointer-events-none border-0"
          allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : null}
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
  const [on, setOn] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => setOn(entry.isIntersecting),
      { threshold: 0.15 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (!on) {
      video.pause();
      return;
    }

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
  }, [on, src]);

  return (
    <div className={className}>
      <video
        ref={ref}
        muted
        loop
        playsInline
        preload="none"
        aria-label={title}
        disablePictureInPicture
        disableRemotePlayback
        controls={false}
        className="pointer-events-none h-full w-full object-cover"
      />
    </div>
  );
}
