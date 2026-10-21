"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Anton } from "next/font/google";
import { COLABORACAO } from "@/lib/colaboracao";
import { lockBodyScroll } from "@/lib/scroll-lock";

const display = Anton({ weight: "400", subsets: ["latin"] });
const PANEL_EASE = [0.65, 0, 0.35, 1] as const;

const EASE = [0.22, 1, 0.36, 1] as const;

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: reduce ? 0 : 0.8, delay: reduce ? 0 : delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function Hero() {
  const [videoFailed, setVideoFailed] = useState(false);
  const reduce = useReducedMotion();
  const { hero } = COLABORACAO;
  const trackRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const locked = useRef(false);

  useEffect(() => {
    if (reduce) return;

    let frame = 0;

    const apply = () => {
      if (locked.current) return;

      const distance = window.innerHeight;
      const y = window.scrollY;
      const progress = Math.min(1, Math.max(0, y / distance));
      const panel = panelRef.current;
      if (panel) panel.style.height = `calc(100vh - ${progress * 45}vh)`;
      if (gradientRef.current) gradientRef.current.style.opacity = String(progress);
      if (heroTextRef.current) heroTextRef.current.style.opacity = String(1 - progress);

      if (progress < 1) return;

      locked.current = true;
      const track = trackRef.current;
      if (track) track.style.height = "55vh";
      if (panel) {
        panel.style.position = "relative";
        panel.style.height = "55vh";
      }
      const root = document.documentElement;
      const previous = root.style.scrollBehavior;
      root.style.scrollBehavior = "auto";
      window.scrollTo(0, Math.max(0, y - distance));
      root.style.scrollBehavior = previous;
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(apply);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    apply();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [reduce]);

  return (
    <div ref={trackRef} id="inicio" className="relative h-[155vh]">
      <section ref={panelRef} className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        {videoFailed ? (
          <Image src={hero.poster} alt="" fill priority className="object-cover" sizes="100vw" />
        ) : (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster={hero.poster}
            onError={() => setVideoFailed(true)}
          >
            <source src={hero.video} type="video/mp4" />
          </video>
        )}
        <div className="video-overlay absolute inset-0" />
        <div
          ref={gradientRef}
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/30 opacity-0"
        />

        <div
          ref={heroTextRef}
          className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
        >
          <p className="mb-6 text-[10px] tracking-[0.5em] text-white/40 uppercase">Colaboração</p>
          <h1 className="max-w-4xl font-serif text-5xl leading-[0.9] tracking-tight uppercase md:text-7xl lg:text-8xl">
            <span className="block">Tao</span>
            <span className="block">× Humana</span>
          </h1>
          <div className="mt-10 flex max-w-xl items-center gap-3 sm:gap-4">
            <span className="h-px w-6 shrink-0 bg-brand-green sm:w-8" />
            <p className="text-balance text-xs tracking-[0.08em] text-white/50 uppercase sm:text-sm sm:tracking-[0.15em]">{hero.line}</p>
            <span className="h-px w-8 shrink-0 bg-brand-blue" />
          </div>
          <a
            href="#sobre"
            className="absolute bottom-12 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 text-white/40 transition-colors duration-500 hover:text-white/70"
          >
            <span className="text-[10px] tracking-[0.4em] uppercase">Scroll</span>
            <span className="relative h-12 w-px overflow-hidden bg-white/20">
              <span
                className={`absolute top-0 left-0 h-1/2 w-full bg-brand-green ${reduce ? "" : "motion-safe:animate-[colab-scroll_1.8s_ease-in-out_infinite]"}`}
              />
            </span>
          </a>
        </div>
      </section>
    </div>
  );
}

function ColaboracaoPanel({ onClose }: { onClose: () => void }) {
  const [showCopy, setShowCopy] = useState(false);
  const { panel } = COLABORACAO.sobre;

  useEffect(() => {
    const timer = window.setTimeout(() => setShowCopy(true), 900);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <motion.div className="fixed inset-0 z-[80]">
      <motion.button
        type="button"
        aria-label="Fechar"
        className="absolute inset-0 bg-black/40 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.45 }}
        onClick={onClose}
      />
      <motion.aside
        role="dialog"
        aria-modal="true"
        aria-label={panel.title}
        className="absolute inset-y-0 right-0 flex w-full flex-col bg-white text-black md:w-1/2"
        initial={{ x: "100%" }}
        animate={{ x: "0%" }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.9, ease: PANEL_EASE }}
      >
        <button
          type="button"
          aria-label="Fechar"
          onClick={onClose}
          className="absolute top-8 left-6 z-10 grid size-12 place-items-center rounded-full bg-white text-black shadow-[0_8px_24px_rgba(0,0,0,0.18)] ring-1 ring-black/10 md:left-0 md:-translate-x-1/2"
        >
          <span aria-hidden className="text-lg leading-none">
            ←
          </span>
        </button>
        <motion.div
          className="flex-1 overflow-y-auto px-8 pt-24 pb-12 md:px-14 md:pt-28"
          initial="hidden"
          animate={showCopy ? "show" : "hidden"}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
          }}
        >
          <motion.p
            variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
            className={`${display.className} text-[clamp(2.4rem,4vw,3.6rem)] leading-[0.9] tracking-[-0.03em] uppercase`}
          >
            {panel.title}
          </motion.p>
          <motion.p
            variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
            className="mt-4 text-sm text-black/60 md:text-base"
          >
            {panel.role}
          </motion.p>
          <motion.div
            variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
            className="mt-8 space-y-5 text-sm leading-relaxed text-black/80 md:text-[15px]"
          >
            {panel.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </motion.div>
        </motion.div>
      </motion.aside>
    </motion.div>
  );
}

function Sobre() {
  const { sobre, brands } = COLABORACAO;
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    return lockBodyScroll();
  }, [open]);

  return (
    <section id="sobre" className="scroll-mt-24 bg-black px-6 pt-24 pb-8 text-white md:px-12 md:pt-28 md:pb-10">
      <div className="mx-auto grid max-w-[1180px] items-center gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-10">
        <motion.div
          initial={reduce ? false : { clipPath: "inset(0 100% 0 0)" }}
          whileInView={{ clipPath: "inset(0 0% 0 0)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.05, ease: EASE }}
        >
          <div>
            <p className="text-[11px] tracking-[0.28em] text-white/45 uppercase">{sobre.kicker}</p>
            <h2 className="mt-5 max-w-md text-[clamp(2.1rem,4vw,3.35rem)] leading-[1.08] font-medium tracking-tight whitespace-pre-line text-white/95">
              {sobre.title}
            </h2>
          </div>
          <div>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-white/65">{sobre.text}</p>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="group/cta relative mt-6 inline-flex items-center gap-3 text-[11px] tracking-[0.28em] text-white/55 uppercase transition-colors duration-500 hover:text-white"
            >
              {sobre.moreLabel}
              <span aria-hidden className="text-sm leading-none transition-transform duration-500 group-hover/cta:translate-x-1">
                →
              </span>
              <span className="absolute -bottom-2 left-0 h-px w-0 bg-gradient-to-r from-brand-blue/60 to-brand-green/60 transition-all duration-700 group-hover/cta:w-full" />
            </button>
          </div>
        </motion.div>

        <div className="relative mx-auto w-full max-w-[640px]">
          <div className="grid grid-cols-2 items-center gap-4 sm:gap-6">
            <motion.div
              className="relative aspect-[4/5] -rotate-2 overflow-hidden rounded-[1.6rem] shadow-[0_18px_50px_rgba(0,0,0,0.35)]"
              initial={reduce ? false : { x: "46%" }}
              whileInView={{ x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.05, ease: EASE }}
            >
              <Image src={sobre.images[0].src} alt={sobre.images[0].alt} fill className="object-cover" sizes="320px" />
            </motion.div>
            <motion.div
              className="relative aspect-[4/5] rotate-2 overflow-hidden rounded-[1.6rem] shadow-[0_18px_50px_rgba(0,0,0,0.35)]"
              initial={reduce ? false : { x: "-46%" }}
              whileInView={{ x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.05, ease: EASE }}
            >
              <Image src={sobre.images[1].src} alt={sobre.images[1].alt} fill className="object-cover" sizes="320px" />
            </motion.div>
          </div>

          <motion.div
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
            initial={reduce ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: reduce ? 0 : 0.85, ease: EASE }}
          >
            <svg viewBox="0 0 640 420" className="h-full w-full" aria-hidden>
              <path
                d="M150 210 C 230 80, 410 80, 490 210"
                fill="none"
                stroke="rgba(255,255,255,0.45)"
                strokeWidth="1.2"
              />
            </svg>
            <div className="absolute flex flex-col items-center gap-4">
              <div className="flex items-center gap-3 sm:gap-5">
                <span className="grid h-[4.4rem] w-[4.4rem] place-items-center rounded-full border border-white/70 bg-black/75 px-1.5 text-center text-[8px] leading-[1.05] tracking-[0.08em] uppercase backdrop-blur-sm sm:h-[5.4rem] sm:w-[5.4rem] sm:text-[10px] sm:tracking-[0.14em]">
                  {brands.tao.name}
                </span>
                <span className="text-sm text-white/80">×</span>
                <span className="grid h-[4.4rem] w-[4.4rem] place-items-center rounded-full border border-white/70 bg-black/75 px-1.5 text-center text-[8px] leading-[1.05] tracking-[0.08em] uppercase backdrop-blur-sm sm:h-[5.4rem] sm:w-[5.4rem] sm:text-[10px] sm:tracking-[0.14em]">
                  {brands.humana.name}
                </span>
              </div>
              <a
                href={brands.humana.href}
                target="_blank"
                rel="noreferrer"
                className="pointer-events-auto text-[11px] tracking-[0.22em] text-white uppercase underline underline-offset-4"
              >
                {brands.humana.linkLabel}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
      {mounted &&
        createPortal(
          <AnimatePresence>{open && <ColaboracaoPanel onClose={close} />}</AnimatePresence>,
          document.body,
        )}
    </section>
  );
}

function Trabalhos() {
  const { trabalhos } = COLABORACAO;
  const reduce = useReducedMotion();
  const [extra, setExtra] = useState<{ id: string; title: string; video: string }[]>([]);

  useEffect(() => {
    void fetch("/api/painel/trabalhos")
      .then((response) => response.json())
      .then((data: { id: string; title: string; video: string }[]) => {
        if (Array.isArray(data)) setExtra(data);
      })
      .catch(() => {});
  }, []);

  const cards = [
    ...extra.map((item) => ({
      key: item.id,
      label: item.title,
      image: "",
      alt: item.title,
      video: item.video,
    })),
    ...trabalhos.items.map((item) => ({
      key: item.label,
      label: item.label,
      image: item.image,
      alt: item.alt,
      video: "",
    })),
  ];

  return (
    <section id="trabalhos" className="scroll-mt-24 bg-black px-6 pt-8 pb-16 text-white md:px-12 md:pt-10 md:pb-20">
      <div className="mx-auto max-w-[1180px]">
        <motion.div
          className="mb-10 md:mb-12"
          initial={reduce ? false : { clipPath: "inset(0 100% 0 0)" }}
          whileInView={{ clipPath: "inset(0 0% 0 0)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <p className="text-[11px] tracking-[0.28em] text-white/45 uppercase">{trabalhos.kicker}</p>
          <h2 className="mt-4 max-w-md text-[clamp(2.1rem,4vw,3.2rem)] leading-[1.08] font-medium tracking-tight">
            {trabalhos.title}
            {trabalhos.accent ? <span className="block text-white/45">{trabalhos.accent}</span> : null}
          </h2>
        </motion.div>

        <motion.ul
          className="grid grid-cols-1 gap-4 overflow-hidden md:grid-cols-3 md:gap-5"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {cards.map((item, index) => (
            <li key={item.key} className="relative">
              <motion.div
                className="relative"
                style={{ zIndex: cards.length - index }}
                variants={{
                  hidden: reduce
                    ? { x: 0, opacity: 1 }
                    : { x: index === 0 ? "-115%" : "calc(-100% - 1.25rem)", opacity: 0 },
                  show: {
                    x: 0,
                    opacity: 1,
                    transition: reduce
                      ? { duration: 0 }
                      : {
                          x: { duration: 0.8, delay: index * 0.85, ease: EASE },
                          opacity: { duration: 0.2, delay: index * 0.85 },
                        },
                  },
                }}
              >
                <article className="group relative aspect-[16/11] overflow-hidden rounded-2xl bg-neutral-900">
                  {item.video ? (
                    <video
                      src={item.video}
                      muted
                      loop
                      playsInline
                      autoPlay
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  ) : (
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      className="object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.04]"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  )}
                  <div className="absolute inset-x-3 bottom-3">
                    <p className="inline-flex max-w-full items-center gap-2 rounded-full bg-black/45 px-2.5 py-1.5 text-[11px] text-white backdrop-blur-sm">
                      <span className="grid size-6 shrink-0 place-items-center rounded-full bg-white/15">
                        <svg viewBox="0 0 12 12" className="size-2.5 translate-x-px" aria-hidden>
                          <path d="M3 1.8v8.4L10.2 6 3 1.8Z" fill="currentColor" />
                        </svg>
                      </span>
                      <span className="truncate">{item.label}</span>
                    </p>
                  </div>
                </article>
              </motion.div>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

function Proposito() {
  const { brands } = COLABORACAO;
  const reduce = useReducedMotion();

  return (
    <section id="proposito" className="scroll-mt-24 bg-black text-white">
      <div className="flex flex-col justify-end px-3 pt-10 pb-6 md:px-5 md:pt-14 md:pb-8">
        <div id="contato" className="flex scroll-mt-28 justify-center px-3 pb-6 md:px-6">
          <motion.div
            className="flex min-h-24 items-center justify-center gap-5 md:gap-7"
            initial={reduce ? false : { y: -36, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <Link href={brands.tao.href} aria-label={brands.tao.name} className="transition-opacity hover:opacity-70">
              <img src="/camaleao.svg" alt="TAO Filmes" className="h-16 w-auto md:h-20" />
            </Link>
            <span aria-hidden className="text-2xl text-white/80">
              ×
            </span>
            <a href={brands.humana.href} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-3 transition-opacity hover:opacity-70">
              <img src="/humana-logo.png" alt="Humana & Trad" className="h-14 w-auto md:h-16" />
              <span className="text-[11px] tracking-[0.22em] text-white uppercase underline underline-offset-4">
                {brands.humana.linkLabel}
              </span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function ColaboracaoPage() {
  return (
    <div id="colaboracao" className="bg-black text-white">
      <Hero />
      <Sobre />
      <Trabalhos />
      <Proposito />

      <style>{`
        @keyframes colab-scroll {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(220%); }
        }
      `}</style>
    </div>
  );
}
