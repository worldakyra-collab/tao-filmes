"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { MediaCover } from "@/components/ui/MediaCover";
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

function MarqueeMark() {
  return (
    <span
      aria-hidden
      className="mx-[0.28em] inline-block h-[0.78em] w-[0.98em] shrink-0 bg-current"
      style={{
        WebkitMaskImage: "url(/camaleao.svg)",
        maskImage: "url(/camaleao.svg)",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        WebkitMaskSize: "contain",
        maskSize: "contain",
      }}
    />
  );
}

function MarqueeRow({
  text,
  direction,
}: {
  text: string;
  direction: "left" | "right";
}) {
  const marks = Array.from({ length: 8 }, (_, index) => index);

  return (
    <div className="w-full overflow-hidden whitespace-nowrap">
      <motion.div
        className="flex w-max items-center will-change-transform"
        animate={
          direction === "left" ? { x: ["0%", "-50%"] } : { x: ["-50%", "0%"] }
        }
        transition={{ duration: 55, ease: "linear", repeat: Infinity }}
      >
        {[0, 1].map((copy) => (
          <span
            key={copy}
            className="flex items-center font-serif text-[clamp(2.4rem,6.5vw,5.75rem)] leading-none tracking-[-0.02em] text-white/20 uppercase"
          >
            {marks.map((index) => (
              <span key={index} className="flex items-center">
                {text}
                <MarqueeMark />
              </span>
            ))}
          </span>
        ))}
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
  const scrollHintOpacity = useTransform(scrollProgress, [0, 0.1], [1, 0]);
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
        className="pointer-events-none absolute inset-0 z-0"
        style={mounted ? { opacity: marqueeOpacity } : { opacity: 0 }}
        aria-hidden
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 md:gap-5">
          <MarqueeRow text={marqueeText} direction="left" />
          <MarqueeRow text={marqueeText} direction="right" />
        </div>
      </motion.div>

      <div className="absolute inset-0 z-10 flex items-center justify-center">
      <motion.div
        className="overflow-hidden bg-neutral-900 shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
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
          <MediaCover src={mediaSrc} title={title} className="h-full w-full" />
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
      </div>

      <motion.div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex flex-col items-center gap-3 bg-gradient-to-t from-black/70 via-black/35 to-transparent pt-24 pb-8 md:pb-10"
        style={mounted ? { opacity: scrollHintOpacity } : undefined}
      >
        <p className="font-[family-name:var(--font-dm-sans)] text-[11px] tracking-[0.32em] text-white uppercase md:text-xs">
          Role o scroll
        </p>
        <motion.span
          aria-hidden
          className="block h-8 w-px origin-top bg-white"
          animate={{ scaleY: [0.35, 1, 0.35], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.7, ease: "easeInOut", repeat: Infinity }}
        />
      </motion.div>
    </motion.div>
  );
};

export default ScrollExpandMedia;
