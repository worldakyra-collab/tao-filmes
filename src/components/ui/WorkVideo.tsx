"use client";

import { useEffect, useRef, useState } from "react";
import { resolveMedia, youtubeEmbed, youtubeId } from "@/lib/portfolio-videos";

function SpeakerIcon({ muted }: { muted: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <path d="M4 10v4h3.2L12 18.2V5.8L7.2 10H4Z" strokeLinejoin="round" />
      {muted ? (
        <path d="M16 10.2 20 14.2M20 10.2l-4 4" strokeLinecap="round" />
      ) : (
        <>
          <path d="M15.5 9.2a3.2 3.2 0 0 1 0 5.6" strokeLinecap="round" />
          <path d="M17.8 7a6.2 6.2 0 0 1 0 10" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}

export function WorkVideo({ src }: { src: string }) {
  const youtube = youtubeId(src);
  if (youtube) {
    return (
      <div className="relative mt-10 aspect-video overflow-hidden rounded-[2rem] bg-neutral-950 isolate [clip-path:inset(0_round_2rem)]">
        <iframe
          src={youtubeEmbed(youtube, { mute: true, loop: true })}
          title="Vídeo"
          className="pointer-events-none absolute top-1/2 left-1/2 h-[130%] w-[130%] -translate-x-1/2 -translate-y-1/2 border-0"
          allow="autoplay; encrypted-media"
        />
        <div className="video-overlay pointer-events-none absolute inset-0" />
      </div>
    );
  }

  const media = resolveMedia(src);
  if (media.kind === "embed") {
    return (
      <div className="relative mt-10 aspect-video overflow-hidden rounded-[2rem] bg-neutral-950 isolate [clip-path:inset(0_round_2rem)]">
        <iframe
          src={media.src}
          title="Vídeo"
          className="pointer-events-none absolute inset-0 h-full w-full border-0"
          allow="autoplay; encrypted-media"
        />
        <div className="video-overlay pointer-events-none absolute inset-0" />
      </div>
    );
  }

  return <FileWorkVideo src={media.src} />;
}

function FileWorkVideo({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const userPaused = useRef(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let frame = 0;
    const tick = () => {
      const duration = video.duration;
      if (duration) {
        const percent = `${(video.currentTime / duration) * 100}%`;
        if (fillRef.current) fillRef.current.style.width = percent;
        if (headRef.current) headRef.current.style.left = percent;
        trackRef.current?.setAttribute("aria-valuenow", String(Math.round((video.currentTime / duration) * 100)));
      }
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (userPaused.current) return;
      void video.play().catch(() => {});
    };

    video.addEventListener("loadeddata", start);
    if (video.readyState >= 2) start();
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      video.removeEventListener("loadeddata", start);
    };
  }, [src]);

  function toggleSound() {
    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !video.muted;
    video.muted = nextMuted;
    if (!nextMuted) {
      video.volume = 1;
      void video.play();
    }
    setMuted(nextMuted);
  }

  function seek(event: React.MouseEvent<HTMLDivElement>) {
    const video = videoRef.current;
    const track = trackRef.current;
    if (!video || !track || !Number.isFinite(video.duration)) return;

    const rect = track.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
    video.currentTime = ratio * video.duration;
    if (!userPaused.current) void video.play();
  }

  return (
    <div className="relative mt-10 overflow-hidden rounded-[2rem] bg-neutral-950 isolate [clip-path:inset(0_round_2rem)]">
      <video
        ref={videoRef}
        src={src}
        autoPlay
        muted
        loop
        playsInline
        disablePictureInPicture
        disableRemotePlayback
        controls={false}
        controlsList="nodownload nofullscreen noremoteplayback noplaybackrate"
        className="pointer-events-none aspect-video w-full object-cover"
      />

      <div className="video-overlay pointer-events-none absolute inset-0 z-10" />

      <div className="absolute inset-x-0 bottom-0 z-10 flex items-center gap-4 px-5 pb-4">
        <div
          ref={trackRef}
          role="slider"
          aria-label="Tempo do vídeo"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={0}
          tabIndex={0}
          onClick={seek}
          onKeyDown={(event) => {
            const video = videoRef.current;
            if (!video || !Number.isFinite(video.duration)) return;
            const step = video.duration * 0.05;
            if (event.key === "ArrowRight") video.currentTime = Math.min(video.duration, video.currentTime + step);
            if (event.key === "ArrowLeft") video.currentTime = Math.max(0, video.currentTime - step);
          }}
          className="relative h-4 min-w-0 flex-1 cursor-pointer"
        >
          <div className="absolute top-1/2 right-0 left-0 h-px -translate-y-1/2 bg-white/35" />
          <div ref={fillRef} className="absolute top-1/2 left-0 h-px w-0 -translate-y-1/2 bg-white" />
          <div ref={headRef} className="absolute top-1/2 left-0 h-2.5 w-px -translate-x-1/2 -translate-y-1/2 bg-white" />
        </div>
      </div>

      <button
        type="button"
        onClick={toggleSound}
        aria-pressed={!muted}
        aria-label={muted ? "Ativar som" : "Mutar"}
        className="absolute right-4 bottom-12 z-10 grid h-11 w-11 place-items-center rounded-full bg-black/60 text-white ring-1 ring-white/30 backdrop-blur-md transition-colors hover:bg-black/80"
      >
        <SpeakerIcon muted={muted} />
      </button>
    </div>
  );
}
