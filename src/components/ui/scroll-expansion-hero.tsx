"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";

interface ScrollExpandMediaProps {
  mediaType?: "video" | "image";
  mediaSrc: string;
  posterSrc?: string;
  title?: string;
  marqueeText?: string;
  /** Fração da viewport usada só para encolher (0.6–1.2). */
  shrinkViewportRatio?: number;
}

function MarqueeRow({
  text,
  direction,
}: {
  text: string;
  direction: "left" | "right";
}) {
  const chunk = `${text}  ·  `.repeat(10);

  return (
    <div className="w-full overflow-hidden whitespace-nowrap">
      <motion.div
        className="flex w-max will-change-transform"
        animate={
          direction === "left"
            ? { x: ["0%", "-50%"] }
            : { x: ["-50%", "0%"] }
        }
        transition={{
          duration: 55,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        <span className="pr-8 font-[family-name:var(--font-dm-sans)] text-[clamp(2.75rem,8vw,6rem)] font-bold tracking-[0.12em] text-white uppercase">
          {chunk}
        </span>
        <span className="pr-8 font-[family-name:var(--font-dm-sans)] text-[clamp(2.75rem,8vw,6rem)] font-bold tracking-[0.12em] text-white uppercase">
          {chunk}
        </span>
      </motion.div>
    </div>
  );
}

/**
 * Hero sticky: encolhe com o scroll da página.
 * O conteúdo seguinte (z-index maior) sobe e cobre — sem “vão” preto.
 */
const ScrollExpandMedia = ({
  mediaType = "video",
  mediaSrc,
  posterSrc,
  title,
  marqueeText = "TAO FILMES",
  shrinkViewportRatio = 0.9,
}: ScrollExpandMediaProps) => {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [viewport, setViewport] = useState({ w: 1200, h: 800 });

  const { scrollY } = useScroll();

  useEffect(() => {
    setMounted(true);
    const updateSize = () => {
      setViewport({ w: window.innerWidth, h: window.innerHeight });
      setIsMobile(window.innerWidth < 768);
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const endW = isMobile ? 260 : 320;
  const endH = isMobile ? 400 : 500;
  const shrinkDistance = Math.max(viewport.h * shrinkViewportRatio, 1);

  const scrollProgress = useTransform(scrollY, [0, shrinkDistance], [0, 1], {
    clamp: true,
  });

  const mediaWidth = useTransform(scrollProgress, [0, 1], [viewport.w, endW]);
  const mediaHeight = useTransform(scrollProgress, [0, 1], [viewport.h, endH]);
  const borderRadius = useTransform(scrollProgress, [0, 1], [0, 18]);
  const marqueeOpacity = useTransform(scrollProgress, [0.1, 0.45, 1], [0, 1, 1]);
  const mediaRadius = useMotionTemplate`${borderRadius}px`;

  // Fade quando os trabalhos começam a cobrir o hero
  const coverFade = useTransform(
    scrollY,
    [shrinkDistance, shrinkDistance + viewport.h * 0.35],
    [1, 0],
    { clamp: true },
  );

  return (
    <motion.div
      className="relative h-full w-full overflow-hidden bg-black"
      style={mounted ? { opacity: coverFade } : undefined}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 flex flex-col items-center justify-center gap-3 md:gap-5"
        style={mounted ? { opacity: marqueeOpacity } : { opacity: 0 }}
        aria-hidden
      >
        <MarqueeRow text={marqueeText} direction="left" />
        <MarqueeRow text={marqueeText} direction="right" />
      </motion.div>

      <motion.div
        className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 overflow-hidden bg-neutral-900 shadow-[0_20px_60px_rgba(0,0,0,0.35)] will-change-transform"
        style={
          mounted
            ? {
                width: mediaWidth,
                height: mediaHeight,
                borderRadius: mediaRadius,
              }
            : {
                width: "100%",
                height: "100%",
                borderRadius: 0,
              }
        }
      >
        {mediaType === "video" ? (
          mediaSrc.includes("youtube.com") ? (
            <iframe
              width="100%"
              height="100%"
              src={
                mediaSrc.includes("embed")
                  ? mediaSrc +
                    (mediaSrc.includes("?") ? "&" : "?") +
                    "autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1"
                  : mediaSrc.replace("watch?v=", "embed/") +
                    "?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1&playlist=" +
                    mediaSrc.split("v=")[1]
              }
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <video
              src={mediaSrc}
              poster={posterSrc}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="h-full w-full object-cover"
              controls={false}
              disablePictureInPicture
              disableRemotePlayback
            />
          )
        ) : (
          <Image
            src={mediaSrc}
            alt={title || "Media"}
            width={1280}
            height={720}
            className="h-full w-full object-cover"
            priority
          />
        )}
      </motion.div>
    </motion.div>
  );
};

export default ScrollExpandMedia;
