"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { resolveMedia, youtubeEmbed, youtubeId } from "@/lib/portfolio-videos";
import { CoverEmbedStyle } from "@/components/ui/cover-embed-style";

export function MediaCover({
  src,
  title,
  poster,
  quiet = false,
  href,
  className = "absolute inset-0 h-full w-full",
}: {
  src: string;
  title?: string;
  poster?: string;
  quiet?: boolean;
  href?: string;
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

  return <FileCover src={media.src} title={title} quiet={quiet} href={href} className={className} />;
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
  quiet = false,
  href,
  className,
}: {
  src: string;
  title?: string;
  quiet?: boolean;
  href?: string;
  className: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const pausedByUser = useRef(false);
  const [muted, setMuted] = useState(true);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    video.muted = true;
    video.preload = "none";
    video.src = src;

    const onOtherSound = (event: Event) => {
      const other = (event as CustomEvent<HTMLVideoElement>).detail;
      if (other !== video) {
        video.muted = true;
        setMuted(true);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) {
          if (video.preload === "none") video.preload = "metadata";
          if (!pausedByUser.current) void video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { rootMargin: "200px 0px" },
    );

    observer.observe(video);
    window.addEventListener("tao-video-sound", onOtherSound);
    return () => {
      observer.disconnect();
      window.removeEventListener("tao-video-sound", onOtherSound);
    };
  }, [src]);

  function togglePlay() {
    const video = ref.current;
    if (!video) return;
    if (video.paused) {
      pausedByUser.current = false;
      setPaused(false);
      void video.play();
    } else {
      pausedByUser.current = true;
      setPaused(true);
      video.pause();
    }
  }

  function stay(event: React.MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
  }

  function toggleSound() {
    const video = ref.current;
    if (!video) return;
    const next = !video.muted;
    video.muted = next;
    if (!next) {
      video.volume = 1;
      window.dispatchEvent(new CustomEvent("tao-video-sound", { detail: video }));
      pausedByUser.current = false;
      setPaused(false);
      void video.play();
    }
    setMuted(next);
  }

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
        className="pointer-events-none h-full w-full scale-[1.18] object-cover"
      />
      {href ? <Link href={href} aria-label={title || "Ver trabalho"} className="absolute inset-0 z-10" /> : null}
      {quiet ? null : (
      <button
        type="button"
        onMouseDown={stay}
        onClick={(event) => {
          stay(event);
          togglePlay();
        }}
        aria-label={paused ? "Continuar" : "Pausar"}
        className="absolute bottom-4 left-4 z-20 grid h-11 w-11 place-items-center rounded-full bg-black/70 text-white ring-1 ring-white/30"
      >
        {paused ? <PlayIcon /> : <PauseIcon />}
      </button>
      )}
      {quiet ? null : (
      <button
        type="button"
        onMouseDown={stay}
        onClick={(event) => {
          stay(event);
          toggleSound();
        }}
        aria-label={muted ? "Ligar som" : "Tirar som"}
        className="absolute right-4 bottom-4 z-20 grid h-11 w-11 place-items-center rounded-full bg-black/70 text-white ring-1 ring-white/30"
      >
        <SpeakerIcon muted={muted} />
      </button>
      )}
    </div>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
      <path d="M7 5h3.2v14H7V5Zm6.8 0H17v14h-3.2V5Z" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
      <path d="M8 5.5v13l11-6.5-11-6.5Z" />
    </svg>
  );
}

function SpeakerIcon({ muted }: { muted: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <path d="M4 10v4h3.2L12 18.2V5.8L7.2 10H4Z" strokeLinejoin="round" />
      {muted ? (
        <path d="M16 10.2 20 14.2M20 10.2l-4 4" strokeLinecap="round" />
      ) : (
        <path d="M15.5 9.2a3.2 3.2 0 0 1 0 5.6" strokeLinecap="round" />
      )}
    </svg>
  );
}
