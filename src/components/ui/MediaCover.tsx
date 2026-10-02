"use client";

import { useEffect, useRef, useState } from "react";
import { resolveMedia, youtubeId } from "@/lib/portfolio-videos";
import { CoverEmbedStyle } from "@/components/ui/cover-embed-style";
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
    return <EmbedCover src={media.src} title={title} className={className} />;
  }

  return <FileCover src={media.src} title={title} className={className} />;
}

function EmbedCover({
  src,
  title,
  className,
}: {
  src: string;
  title?: string;
  className: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
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

  return (
    <div ref={ref} className={`cover-embed ${className}`}>
      <CoverEmbedStyle />
      {on ? (
        <iframe
          src={src}
          title={title || "Vídeo"}
          className="pointer-events-none border-0"
          allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : null}
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
      { threshold: 0.6 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (!on) {
      video.pause();
      video.removeAttribute("src");
      video.load();
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
      className={`${className} object-cover`}
    />
  );
}
