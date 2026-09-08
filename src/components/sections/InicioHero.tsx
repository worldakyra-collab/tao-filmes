"use client";

import { AnimatePresence, animate, motion, useMotionValue, useMotionValueEvent } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { emitHomeSound } from "@/lib/home-chrome";
import { lockBodyScroll } from "@/lib/scroll-lock";
import { SITE_VIDEO_1, SITE_VIDEO_2 } from "@/lib/data";
import { usePageTransition } from "@/components/layout/PageTransition";
import { MenuButton, SiteMenu } from "@/components/layout/SiteMenu";
import {
  CURTAIN_DURATION,
  CURTAIN_EASE,
  CURTAIN_STAGGER,
  CURTAIN_STRIP_COUNT,
} from "@/components/layout/PageCurtain";

type Slide = {
  title: string;
  location: string;
  cardTitle: string;
  video: string;
};

const SLIDES: Slide[] = [
  {
    title: "Saint Antönien",
    location: "Switzerland Alps",
    cardTitle: "SAINT ANTÖNIEN",
    video: SITE_VIDEO_1,
  },
  {
    title: "Nagano Prefecture",
    location: "Japan Alps",
    cardTitle: "NAGANO PREFECTURE",
    video: SITE_VIDEO_2,
  },
  {
    title: "Marrakech Merzouga",
    location: "Sahara Desert — Morocco",
    cardTitle: "MARRAKECH MERZOUGA",
    video: SITE_VIDEO_1,
  },
  {
    title: "Yosemite",
    location: "Sierra Nevada — United States",
    cardTitle: "YOSEMITE NATIONAL PARK",
    video: SITE_VIDEO_2,
  },
];

const HOLD_MS = 1500;
const SLIDE_MS = 9000;
const EXPAND_MS = 1.15;
const EXPAND_EASE = [0.76, 0, 0.24, 1] as const;

type Rect = { top: number; left: number; width: number; height: number };

function formatTime(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function InicioReveal({ onDone }: { onDone: () => void }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const hold = window.setTimeout(() => setOpen(true), HOLD_MS);
    return () => window.clearTimeout(hold);
  }, []);

  useEffect(() => {
    if (!open) return;

    const totalMs =
      (CURTAIN_STRIP_COUNT - 1) * CURTAIN_STAGGER * 1000 +
      CURTAIN_DURATION * 1000 +
      120;
    const done = window.setTimeout(onDone, totalMs);
    return () => window.clearTimeout(done);
  }, [open, onDone]);

  return (
    <div
      className="pointer-events-auto fixed inset-0 z-[90] flex flex-col"
      aria-hidden
    >
      {Array.from({ length: CURTAIN_STRIP_COUNT }, (_, index) => (
        <div
          key={index}
          className="relative flex w-full flex-1 overflow-hidden"
          style={{ marginTop: index === 0 ? 0 : -1 }}
        >
          <motion.div
            className="relative z-10 h-full w-[51%] shrink-0 bg-white will-change-transform"
            initial={{ x: "0%" }}
            animate={{ x: open ? "-105%" : "0%" }}
            transition={{
              duration: CURTAIN_DURATION,
              delay: open ? index * CURTAIN_STAGGER : 0,
              ease: CURTAIN_EASE,
            }}
          />
          <motion.div
            className="absolute top-0 right-0 z-10 h-full w-[51%] bg-white will-change-transform"
            initial={{ x: "0%" }}
            animate={{ x: open ? "105%" : "0%" }}
            transition={{
              duration: CURTAIN_DURATION,
              delay: open ? index * CURTAIN_STAGGER : 0,
              ease: CURTAIN_EASE,
            }}
          />
        </div>
      ))}
    </div>
  );
}

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      aria-hidden
    >
      {dir === "left" ? (
        <path d="M14.5 6 8.5 12l6 6" />
      ) : (
        <path d="M9.5 6l6 6-6 6" />
      )}
    </svg>
  );
}

function SoundToggle() {
  const [on, setOn] = useState(false);

  const update = (next: boolean) => {
    setOn(next);
    emitHomeSound(next);
  };

  return (
    <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-white">
      <span className="text-white/55">Som:</span>
      <button
        type="button"
        onClick={() => update(false)}
        className={`relative pb-0.5 ${on ? "text-white/35 hover:text-white" : "text-white"}`}
      >
        Desligado
        {!on && (
          <span className="absolute right-0 -bottom-0.5 left-0 h-px bg-white" />
        )}
      </button>
      <button
        type="button"
        onClick={() => update(true)}
        className={`relative pb-0.5 ${on ? "text-white" : "text-white/35 hover:text-white"}`}
      >
        Ligado
        {on && (
          <span className="absolute right-0 -bottom-0.5 left-0 h-px bg-white" />
        )}
      </button>
    </div>
  );
}

function ExpandOverlay({
  slide,
  from,
  target,
  onFilled,
}: {
  slide: Slide;
  from: Rect;
  target: Rect;
  onFilled: (src: string) => void;
}) {
  const finished = useRef(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (finished.current) return;
      finished.current = true;
      onFilled(slide.video);
    }, EXPAND_MS * 1000 + 40);
    return () => window.clearTimeout(timer);
    // Só no mount: evita resetar o timer se onFilled mudar de identidade.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      className="pointer-events-none absolute z-[15] overflow-hidden bg-neutral-950 will-change-transform"
      initial={{
        top: from.top,
        left: from.left,
        width: from.width,
        height: from.height,
        borderRadius: 6,
      }}
      animate={{
        top: target.top,
        left: target.left,
        width: target.width,
        height: target.height,
        borderRadius: 0,
      }}
      transition={{ duration: EXPAND_MS, ease: EXPAND_EASE }}
    >
      <video
        src={slide.video}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover object-[center_40%]"
      />
    </motion.div>
  );
}

function preloadVideo(src: string) {
  return new Promise<void>((resolve) => {
    const video = document.createElement("video");
    video.preload = "auto";
    video.muted = true;
    video.playsInline = true;
    const done = () => resolve();
    video.onloadeddata = done;
    video.onerror = done;
    video.src = src;
    video.load();
  });
}

export function InicioHero() {
  const pathname = usePathname();
  const { arrivedViaCurtain, phase } = usePageTransition();
  const [menuOpen, setMenuOpen] = useState(false);
  const [revealDone, setRevealDone] = useState(
    () => arrivedViaCurtain || phase === "opening" || phase === "covered",
  );
  const [index, setIndex] = useState(0);
  const [titleIndex, setTitleIndex] = useState(0);
  const [showTitle, setShowTitle] = useState(true);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [bgSrc, setBgSrc] = useState(SLIDES[0].video);
  const [expand, setExpand] = useState<{
    slide: Slide;
    from: Rect;
    target: Rect;
    nextIndex: number;
  } | null>(null);
  const [cardFromRight, setCardFromRight] = useState(false);
  const expandRef = useRef(expand);
  expandRef.current = expand;
  const handingOff = useRef(false);

  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLElement>(null);
  const progress = useMotionValue(0);
  const [progressPct, setProgressPct] = useState(0);

  const waiting = SLIDES[(index + 1) % SLIDES.length];
  const isBusy = Boolean(expand);
  const pageReady = revealDone && phase === "hidden";

  const finishReveal = useCallback(() => {
    setRevealDone(true);
  }, []);

  useEffect(() => {
    if (arrivedViaCurtain || phase === "covered" || phase === "opening") {
      setRevealDone(true);
    }
  }, [arrivedViaCurtain, phase]);

  useMotionValueEvent(progress, "change", (latest) => {
    setProgressPct(latest * 100);
    setElapsedMs(latest * SLIDE_MS);
  });

  useEffect(() => {
    void preloadVideo(waiting.video);
  }, [waiting.video]);

  const beginExpand = useCallback(
    (nextIndex: number) => {
      if (isBusy || !pageReady || handingOff.current) return;
      const card = cardRef.current;
      const section = sectionRef.current;
      if (!card || !section) return;

      const cardRect = card.getBoundingClientRect();
      const sectionRect = section.getBoundingClientRect();
      progress.stop();
      progress.set(0);
      setElapsedMs(0);
      setProgressPct(0);
      setShowTitle(false);
      void preloadVideo(SLIDES[nextIndex].video);
      setExpand({
        slide: SLIDES[nextIndex],
        from: {
          top: cardRect.top - sectionRect.top,
          left: cardRect.left - sectionRect.left,
          width: cardRect.width,
          height: cardRect.height,
        },
        target: {
          top: 0,
          left: 0,
          width: sectionRect.width,
          height: sectionRect.height,
        },
        nextIndex,
      });
    },
    [isBusy, progress, pageReady],
  );

  const goNext = useCallback(() => {
    beginExpand((index + 1) % SLIDES.length);
  }, [index, beginExpand]);

  const goPrev = useCallback(() => {
    beginExpand((index - 1 + SLIDES.length) % SLIDES.length);
  }, [index, beginExpand]);

  const onExpandFilled = useCallback(
    (src: string) => {
      const currentExpand = expandRef.current;
      if (!currentExpand || handingOff.current) return;
      handingOff.current = true;

      const next = currentExpand.nextIndex;

      // Mesma imagem do cover (já decodificada) — troca sob o overlay e libera no próximo frame.
      setBgSrc(src);
      setIndex(next);

      requestAnimationFrame(() => {
        setExpand(null);
        setCardFromRight(true);
        progress.set(0);
        setElapsedMs(0);
        setProgressPct(0);
        setTitleIndex(next);
        setShowTitle(true);
        handingOff.current = false;
      });
    },
    [progress],
  );

  useEffect(() => {
    if (!pageReady || isBusy || menuOpen) return;

    progress.set(0);
    const controls = animate(progress, 1, {
      duration: SLIDE_MS / 1000,
      ease: "linear",
      onComplete: () => {
        beginExpand((index + 1) % SLIDES.length);
      },
    });

    return () => controls.stop();
  }, [pageReady, isBusy, menuOpen, index, progress, beginExpand]);

  useEffect(() => {
    if (pageReady) return;
    return lockBodyScroll();
  }, [pageReady]);

  useEffect(() => {
    if (!menuOpen) return;

    const unlock = lockBodyScroll();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      unlock();
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <section
      ref={sectionRef}
      className="relative h-dvh w-full overflow-hidden font-[family-name:var(--font-inicio-sans)] text-white"
    >
      {!revealDone && <InicioReveal onDone={finishReveal} />}

      <video
        key={bgSrc}
        src={bgSrc}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover object-[center_40%]"
      />

      {expand && (
        <ExpandOverlay
          slide={expand.slide}
          from={expand.from}
          target={expand.target}
          onFilled={onExpandFilled}
        />
      )}

      <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-r from-black/45 via-black/20 to-black/10" />
      <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-black/35 via-transparent to-black/20" />

      <div className="relative z-30 flex h-full flex-col">
        <header className="flex items-start justify-between gap-6 pl-4 pr-8 pt-5 md:pl-6 md:pr-12 md:pt-6 lg:pl-8 lg:pr-16">
          <div className="min-w-0 overflow-hidden">
            <div className="relative min-h-[clamp(1.8rem,4vw,3.2rem)]">
              <AnimatePresence mode="wait" initial={false}>
                {showTitle && (
                  <motion.h1
                    key={titleIndex}
                    className="font-[family-name:var(--font-inicio-display)] text-[clamp(1.8rem,4vw,3.2rem)] leading-[0.92] font-semibold tracking-[-0.04em] uppercase whitespace-nowrap"
                    initial={{ x: -56, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -72, opacity: 0 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {SLIDES[titleIndex].title}
                  </motion.h1>
                )}
              </AnimatePresence>
            </div>
            <div className="mt-4">
              <SoundToggle />
            </div>
          </div>
          <MenuButton
            open={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
          />
        </header>

        <div className="min-h-0 flex-1" />

        <div className="px-8 pb-6 md:px-12 lg:px-16">
          <div className="flex items-end gap-4">
            <div className="flex shrink-0 items-center gap-2.5 pb-1">
              <button
                type="button"
                onClick={goPrev}
                disabled={isBusy}
                aria-label="Anterior"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/70 transition-opacity disabled:opacity-40"
              >
                <Chevron dir="left" />
              </button>
              <button
                type="button"
                onClick={goNext}
                disabled={isBusy}
                aria-label="Próximo"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/70 transition-opacity disabled:opacity-40"
              >
                <Chevron dir="right" />
              </button>
            </div>

            <div className="mb-6 flex min-w-8 flex-1 flex-col justify-end gap-2">
              <span className="text-[12px] tracking-[0.08em] text-white/85 tabular-nums">
                {formatTime(elapsedMs)}
              </span>
              <div className="relative h-px w-full overflow-hidden bg-white/25">
                <div
                  className="absolute inset-y-0 left-0 bg-white"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>

            <div className="relative h-[170px] w-[270px] shrink-0 overflow-hidden">
              <AnimatePresence initial={false}>
                {!isBusy && (
                  <motion.article
                    key={(index + 1) % SLIDES.length}
                    ref={cardRef}
                    className="absolute inset-0 overflow-hidden rounded-[6px] bg-neutral-900 shadow-[0_12px_30px_rgba(0,0,0,0.35)]"
                    initial={cardFromRight ? { x: "115%" } : { x: 0 }}
                    animate={{ x: 0 }}
                    exit={{ opacity: 0, transition: { duration: 0.05 } }}
                    transition={{
                      duration: 0.8,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <video
                      src={waiting.video}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="absolute inset-0 h-full w-full object-cover object-[center_40%]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 px-3 pb-3">
                      <p className="text-[10px] text-white/85">
                        {waiting.location}
                      </p>
                      <p className="mt-0.5 text-[11px] leading-tight font-semibold tracking-[0.04em]">
                        {waiting.cardTitle}
                      </p>
                    </div>
                  </motion.article>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      <SiteMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        pathname={pathname}
      />
    </section>
  );
}
