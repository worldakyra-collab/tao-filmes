"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";

export const CURTAIN_STRIP_COUNT = 8;
export const CURTAIN_DURATION = 1.25;
export const CURTAIN_STAGGER = 0.14;
export const CURTAIN_EASE = [0.65, 0, 0.35, 1] as const;
/** Tempo preso com a tela coberta antes de abrir a próxima página */
export const CURTAIN_HOLD_MS = 1100;

export function curtainTotalMs() {
  return (
    (CURTAIN_STRIP_COUNT - 1) * CURTAIN_STAGGER * 1000 +
    CURTAIN_DURATION * 1000 +
    60
  );
}

export type CurtainPhase = "hidden" | "closing" | "covered" | "opening";

type PageCurtainProps = {
  phase: CurtainPhase;
  onClosed?: () => void;
  onOpened?: () => void;
};

export function PageCurtain({ phase, onClosed, onOpened }: PageCurtainProps) {
  useEffect(() => {
    if (phase !== "closing" || !onClosed) return;
    const timer = window.setTimeout(onClosed, curtainTotalMs());
    return () => window.clearTimeout(timer);
  }, [phase, onClosed]);

  useEffect(() => {
    if (phase !== "opening" || !onOpened) return;
    const timer = window.setTimeout(onOpened, curtainTotalMs());
    return () => window.clearTimeout(timer);
  }, [phase, onOpened]);

  if (phase === "hidden") return null;

  return (
    <div
      className={`pointer-events-auto fixed inset-0 z-[100] flex flex-col ${
        phase === "opening" ? "bg-transparent" : "bg-white"
      }`}
      aria-hidden
    >
      {Array.from({ length: CURTAIN_STRIP_COUNT }, (_, index) => {
        const delay =
          phase === "closing" || phase === "opening"
            ? index * CURTAIN_STAGGER
            : 0;
        const transition =
          phase === "covered"
            ? { duration: 0 }
            : {
                duration: CURTAIN_DURATION,
                delay,
                ease: CURTAIN_EASE,
              };

        const leftX = phase === "opening" ? "-105%" : "0%";
        const rightX = phase === "opening" ? "105%" : "0%";

        return (
          <div
            key={index}
            className="relative flex w-full flex-1 overflow-hidden"
            style={{ marginTop: index === 0 ? 0 : -1 }}
          >
            <motion.div
              className="relative z-10 h-full w-[51%] shrink-0 bg-white will-change-transform"
              initial={phase === "closing" ? { x: "-105%" } : false}
              animate={{ x: leftX }}
              transition={transition}
            />
            <motion.div
              className="absolute top-0 right-0 z-10 h-full w-[51%] bg-white will-change-transform"
              initial={phase === "closing" ? { x: "105%" } : false}
              animate={{ x: rightX }}
              transition={transition}
            />
          </div>
        );
      })}
    </div>
  );
}
