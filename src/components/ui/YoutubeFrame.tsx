"use client";

import { useEffect, useRef, useState } from "react";
import { CoverEmbedStyle } from "@/components/ui/cover-embed-style";
import { loadYouTubeApi, type YtPlayer } from "@/lib/youtube-api";

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

export function YoutubeFrame({
  videoId,
  title,
  controls = false,
  className = "absolute inset-0 h-full w-full",
}: {
  videoId: string;
  title?: string;
  controls?: boolean;
  className?: string;
}) {
  const boxRef = useRef<HTMLDivElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YtPlayer | null>(null);
  const [near, setNear] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const userPaused = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [poster, setPoster] = useState(
    `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
  );

  useEffect(() => {
    setPoster(`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`);
  }, [videoId]);

  useEffect(() => {
    const node = boxRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setNear(entry.isIntersecting),
      { threshold: 0.6 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!near) {
      setPlaying(false);
      return;
    }

    let cancelled = false;
    const host = hostRef.current;
    if (!host) return;

    void loadYouTubeApi().then((YT) => {
      if (cancelled || !hostRef.current) return;
      playerRef.current = new YT.Player(hostRef.current, {
        videoId,
        width: "100%",
        height: "100%",
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
          loop: 1,
          playlist: videoId,
          iv_load_policy: 3,
          disablekb: 1,
          fs: 0,
          cc_load_policy: 0,
          vq: "hd2160",
          origin: window.location.origin,
        },
        events: {
          onReady: (event) => {
            event.target.mute();
            event.target.setPlaybackQuality?.("hd2160");
            event.target.playVideo();
          },
          onStateChange: (event) => {
            const isPlaying = event.data === YT.PlayerState.PLAYING;
            setPlaying(isPlaying);
            if (isPlaying) event.target.setPlaybackQuality?.("hd2160");
            if (event.data === YT.PlayerState.ENDED) event.target.playVideo();
          },
        },
      });
    });

    return () => {
      cancelled = true;
      playerRef.current?.destroy();
      playerRef.current = null;
      setPlaying(false);
    };
  }, [near, videoId]);

  useEffect(() => {
    if (!controls) return;
    let frame = 0;
    const tick = () => {
      const player = playerRef.current;
      const duration = player?.getDuration?.() ?? 0;
      const time = player?.getCurrentTime?.() ?? 0;
      if (duration) {
        const percent = `${(time / duration) * 100}%`;
        if (fillRef.current) fillRef.current.style.width = percent;
        if (headRef.current) headRef.current.style.left = percent;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [controls, videoId]);

  function togglePlay() {
    const player = playerRef.current;
    if (!player) return;
    if (playing) {
      userPaused.current = true;
      player.pauseVideo();
    } else {
      userPaused.current = false;
      player.playVideo();
    }
  }

  function toggleSound() {
    const player = playerRef.current;
    if (!player) return;
    if (muted) {
      player.unMute();
      player.setVolume(100);
      setMuted(false);
    } else {
      player.mute();
      setMuted(true);
    }
  }

  function seek(event: React.MouseEvent<HTMLDivElement>) {
    const player = playerRef.current;
    const track = trackRef.current;
    const duration = player?.getDuration?.() ?? 0;
    if (!player || !track || !duration) return;
    const rect = track.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
    player.seekTo(ratio * duration, true);
    if (!userPaused.current) player.playVideo();
  }

  return (
    <div ref={boxRef} className={`cover-embed relative overflow-hidden bg-black ${className}`}>
      <CoverEmbedStyle />
      <div ref={hostRef} className="h-full w-full" />
      <img
        src={poster}
        alt=""
        onError={() => setPoster(`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`)}
        className={`pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
          playing ? "opacity-0" : "opacity-100"
        }`}
      />
      {controls ? (
        <>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-20 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 z-10 flex items-center gap-4 px-5 pb-4">
            <button
              type="button"
              onClick={togglePlay}
              className="shrink-0 text-[10px] tracking-[0.28em] text-white uppercase"
            >
              {playing ? "Pause" : "Play"}
            </button>
            <div
              ref={trackRef}
              role="slider"
              aria-label="Tempo do vídeo"
              aria-valuemin={0}
              aria-valuemax={100}
              tabIndex={0}
              onClick={seek}
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
        </>
      ) : null}
      <span className="sr-only">{title || "Vídeo"}</span>
    </div>
  );
}
