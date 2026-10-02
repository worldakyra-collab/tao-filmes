"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  type MotionValue,
} from "framer-motion";
import { Archivo_Black, Cormorant_Garamond } from "next/font/google";
import { PORTFOLIO_VIDEOS } from "@/lib/portfolio-videos";
import { MediaCover } from "@/components/ui/MediaCover";

const displaySans = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-il-display",
});

/** Serif de alto contraste, mais próxima do Didot do Il Capo */
const displaySerif = Cormorant_Garamond({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-il-serif",
});

export type WorkItem = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  client: string;
  number: string;
  video: string;
};

const WORKS: WorkItem[] = [
  {
    id: "01",
    slug: "roadside",
    title: "A Tabi Film",
    subtitle: "Iconic Shoe Masterpiece",
    client: "Maison Margiela",
    number: "01",
    video: PORTFOLIO_VIDEOS[0],
  },
  {
    id: "02",
    slug: "olhar",
    title: "Il Tappeto Verde",
    subtitle: "Junior Project",
    client: "Juventus — Artissima",
    number: "02",
    video: PORTFOLIO_VIDEOS[1],
  },
  {
    id: "03",
    slug: "nagano-prefeature",
    title: "Dans Valentino",
    subtitle: "Le Pavillon Des Folies",
    client: "Valentino",
    number: "03",
    video: PORTFOLIO_VIDEOS[2],
  },
  {
    id: "04",
    slug: "alem-do-horizonte",
    title: "Mosaico",
    subtitle: "Bren Heritage Film",
    client: "Buccellati",
    number: "04",
    video: PORTFOLIO_VIDEOS[3],
  },
  {
    id: "05",
    slug: "nos-bastidores",
    title: "Maison De L'Amour",
    subtitle: "A Defining Fashion Film",
    client: "Gucci",
    number: "05",
    video: PORTFOLIO_VIDEOS[4],
  },
];

function titleLines(title: string) {
  const words = title.trim().split(/\s+/);
  if (words.length <= 2) return words;
  const bottomCount = words.length >= 4 ? 2 : 1;
  return [
    words.slice(0, words.length - bottomCount).join(" "),
    words.slice(words.length - bottomCount).join(" "),
  ];
}

function WorkVideo({ src, title }: { src: string; title: string }) {
  return <MediaCover src={src} title={title} />;
}

function VerTrabalhoButton({ slug }: { slug: string }) {
  return (
    <Link
      href={`/servicos/${slug}`}
      className="pointer-events-auto mt-8 inline-flex items-center justify-center rounded-full border border-white/40 bg-white/15 px-8 py-3 text-[11px] tracking-[0.24em] text-white uppercase shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] backdrop-blur-md transition-colors duration-300 hover:border-white/60 hover:bg-white/25"
    >
      Ver trabalho
    </Link>
  );
}

function WorkPanel({ work }: { work: WorkItem }) {
  const lines = titleLines(work.title);

  return (
    <article className="relative h-dvh w-screen shrink-0 overflow-hidden bg-black">
      <WorkVideo src={work.video} title={work.title} />
      <div className="absolute inset-0 bg-black/25" />

      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center">
        <h2 className="flex flex-col items-center">
          {lines.map((line) => (
            <span
              key={`${work.id}-${line}`}
              className={`${displaySerif.className} block text-[clamp(3rem,9vw,7rem)] leading-[0.92] font-medium tracking-[0.02em] text-white uppercase`}
            >
              {line}
            </span>
          ))}
        </h2>
        <p
          className={`${displaySerif.className} mt-6 max-w-[90vw] text-balance text-[clamp(0.7rem,1.35vw,0.95rem)] tracking-[0.18em] text-white uppercase sm:tracking-[0.32em]`}
        >
          {work.subtitle}
        </p>
        <VerTrabalhoButton slug={work.slug} />
      </div>
    </article>
  );
}

/**
 * Carrossel horizontal gigante: scroll vertical move as slides.
 * A atual sai para a esquerda; a próxima entra pela direita.
 */
export function IlCapoWorksRail() {
  const containerRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${(WORKS.length - 1) * 100}%`],
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      ref={containerRef}
      aria-label="Trabalhos"
      className={`${displaySans.variable} ${displaySerif.variable} relative z-10`}
      style={{ height: `${WORKS.length * 100}vh` }}
    >
      <div className="sticky top-0 h-dvh overflow-hidden bg-black">
        <motion.div
          className="flex h-full w-max will-change-transform"
          style={mounted ? { x } : undefined}
        >
          {WORKS.map((work) => (
            <WorkPanel key={work.id} work={work} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function TitleLine({
  text,
  progress,
  delay,
}: {
  text: string;
  progress: MotionValue<number>;
  delay: number;
}) {
  const y = useTransform(
    progress,
    [0, 0.35 + delay, 0.75 + delay, 1],
    ["110%", "110%", "0%", "0%"],
  );
  const opacity = useTransform(
    progress,
    [0, 0.4 + delay, 0.7 + delay, 1],
    [0, 0, 1, 1],
  );

  return (
    <div className="overflow-hidden leading-[0.92]">
      <motion.span
        className={`${displaySerif.className} block text-[clamp(3rem,9vw,7rem)] font-medium tracking-[0.02em] text-white uppercase`}
        style={{ y, opacity }}
      >
        {text}
      </motion.span>
    </div>
  );
}

function usePhone() {
  const [phone, setPhone] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)");
    const sync = () => setPhone(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);
  return phone;
}

function StackSlide({
  work,
  index,
}: {
  work: WorkItem;
  index: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const phone = usePhone();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], phone ? [1, 1] : [0.82, 1]);
  const mediaY = useTransform(scrollYProgress, [0, 1], phone ? ["0%", "0%"] : ["10%", "0%"]);
  const overlay = useTransform(scrollYProgress, [0, 1], [0.5, 0.22]);
  const overlayBg = useMotionTemplate`rgba(0,0,0,${overlay})`;

  const subtitleY = useTransform(
    scrollYProgress,
    [0, 0.55, 0.85, 1],
    [24, 24, 0, 0],
  );
  const subtitleOpacity = useTransform(
    scrollYProgress,
    [0, 0.55, 0.85, 1],
    [0, 0, 1, 1],
  );

  const lines = titleLines(work.title);

  return (
    <article
      ref={ref}
      className="relative h-[120vh]"
      style={{ zIndex: index + 1 }}
    >
      <div className="sticky top-0 flex h-dvh items-center justify-center overflow-hidden bg-black">
        <motion.div
          className="absolute inset-0 origin-center overflow-hidden will-change-transform"
          style={{ scale, y: mediaY }}
        >
          <WorkVideo src={work.video} title={work.title} />
          <motion.div
            className="absolute inset-0"
            style={{ backgroundColor: overlayBg }}
          />
        </motion.div>

        <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center">
          <h2 className="flex flex-col items-center">
            {lines.map((line, i) => (
              <TitleLine
                key={`${work.id}-${line}`}
                text={line}
                progress={scrollYProgress}
                delay={i * 0.06}
              />
            ))}
          </h2>
          <motion.p
            className={`${displaySerif.className} mt-6 max-w-[90vw] text-balance text-[clamp(0.7rem,1.35vw,0.95rem)] tracking-[0.18em] text-white uppercase sm:tracking-[0.32em]`}
            style={{ y: subtitleY, opacity: subtitleOpacity }}
          >
            {work.subtitle}
          </motion.p>
          <motion.div
            className="pointer-events-auto"
            style={{ y: subtitleY, opacity: subtitleOpacity }}
          >
            <VerTrabalhoButton slug={work.slug} />
          </motion.div>
        </div>
      </div>
    </article>
  );
}

/**
 * Cards empilhados com vídeo — usados no /teste-2 depois do carrossel.
 */
export function IlCapoWorksStack() {
  return (
    <section
      aria-label="Trabalhos em cards"
      className={`${displaySans.variable} ${displaySerif.variable} relative z-10 bg-black`}
    >
      {WORKS.map((work, index) => (
        <StackSlide key={`stack-${work.id}`} work={work} index={index} />
      ))}
    </section>
  );
}
