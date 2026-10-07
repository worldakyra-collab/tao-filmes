"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Anton } from "next/font/google";
import { HOME_WORKS, type HomeWork } from "@/lib/home-works";
import { loadPoster } from "@/lib/work-poster";
import { MediaCover } from "@/components/ui/MediaCover";

const display = Anton({ weight: "400", subsets: ["latin"] });

type Skin = "hero" | "portrait" | "news" | "quote" | "editorial" | "dark" | "list" | "red";

type Slot = {
  work: number;
  skin: Skin;
  w: number;
  h: string;
  rot: number;
};

const ROW_SEEDS: Slot[][] = [
  [
    { work: 5, skin: "list", w: 280, h: "h-[92%]", rot: -3.2 },
    { work: 1, skin: "portrait", w: 520, h: "h-[92%]", rot: 2.2 },
    { work: 8, skin: "red", w: 420, h: "h-[92%]", rot: -1.8 },
    { work: 2, skin: "news", w: 500, h: "h-[92%]", rot: 2.8 },
    { work: 6, skin: "dark", w: 360, h: "h-[92%]", rot: -2.4 },
  ],
  [
    { work: 3, skin: "editorial", w: 400, h: "h-[92%]", rot: 1.8 },
    { work: 0, skin: "hero", w: 640, h: "h-[92%]", rot: -1.2 },
    { work: 6, skin: "news", w: 480, h: "h-[92%]", rot: 2.4 },
    { work: 4, skin: "quote", w: 520, h: "h-[92%]", rot: -2.1 },
  ],
  [
    { work: 7, skin: "portrait", w: 500, h: "h-[92%]", rot: -2.4 },
    { work: 4, skin: "quote", w: 540, h: "h-[92%]", rot: 1.6 },
    { work: 9, skin: "dark", w: 380, h: "h-[92%]", rot: -2.8 },
    { work: 8, skin: "editorial", w: 440, h: "h-[92%]", rot: 2.2 },
    { work: 2, skin: "red", w: 400, h: "h-[92%]", rot: -1.5 },
  ],
];

const ROW_PHASE = ["0s", "-16s", "-29s"];
const ROW_ENTER = ["0s", "0.12s", "0.24s"];

function fill(seed: Slot[], minWidth = 3600) {
  const out: Slot[] = [];
  let width = 0;
  let index = 0;
  while (width < minWidth && index < 48) {
    const slot = seed[index % seed.length];
    out.push({
      ...slot,
      work: (slot.work + index) % HOME_WORKS.length,
    });
    width += slot.w + 14;
    index += 1;
  }
  return out;
}

const ROWS = ROW_SEEDS.map((seed) => fill(seed));

function titleClass(title: string) {
  if (title.length > 18) return "text-[clamp(26px,2.1vw,42px)]";
  if (title.length > 11) return "text-[clamp(34px,2.8vw,56px)]";
  return "text-[clamp(44px,3.8vw,76px)]";
}

function usePoster(src: string) {
  const [poster, setPoster] = useState("");
  useEffect(() => {
    let cancelled = false;
    void loadPoster(src).then((url) => {
      if (!cancelled && url) setPoster(url);
    });
    return () => {
      cancelled = true;
    };
  }, [src]);
  return poster;
}

function CardMedia({
  work,
  video = false,
  className = "h-full w-full",
}: {
  work: HomeWork;
  video?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const poster = usePoster(work.video);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || !video) return;
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin: "80px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [video]);

  return (
    <div ref={ref} className={`relative overflow-hidden bg-neutral-950 ${className}`}>
      {video ? (
        active ? <MediaCover src={work.video} /> : null
      ) : poster ? (
        <img src={poster} alt="" draggable={false} className="absolute inset-0 h-full w-full object-cover" />
      ) : null}
    </div>
  );
}

function Label({ children, className = "" }: { children: string; className?: string }) {
  return (
    <p className={`font-[family-name:var(--font-inicio-sans)] text-[9px] tracking-[0.2em] uppercase ${className}`}>
      {children}
    </p>
  );
}

function CardFace({ work, skin }: { work: HomeWork; skin: Skin }) {
  if (skin === "hero") {
    return (
      <div className="relative h-full bg-black text-white">
        <CardMedia work={work} video className="absolute inset-0" />
        <div className="absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-black/55 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute inset-x-0 top-0 flex items-center justify-between px-4 py-3">
          <Label>Obras</Label>
          <Label>Tao Filmes</Label>
          <Label>{work.year}</Label>
        </div>
        <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
          <Label className="text-white/75">{work.category}</Label>
          <p className={`mt-1 uppercase leading-[0.8] ${titleClass(work.title)}`}>{work.title}</p>
        </div>
      </div>
    );
  }

  if (skin === "portrait") {
    return (
      <div className="grid h-full grid-cols-[1.15fr_0.9fr] bg-[#f4f0e8] text-[#161616]">
        <div className="flex min-w-0 flex-col justify-between p-4 md:p-5">
          <Label className="text-black/55">Tao Filmes</Label>
          <p className={`uppercase leading-[0.8] ${titleClass(work.title)}`}>{work.title}</p>
          <Label className="text-black/55">{work.category}</Label>
        </div>
        <CardMedia work={work} video className="h-full min-h-0 w-full" />
      </div>
    );
  }

  if (skin === "news") {
    return (
      <div className="flex h-full flex-col bg-[#f7f3ec] p-4 text-[#161616] md:p-5">
        <p className={`uppercase leading-[0.8] text-[#ff2d2d] ${titleClass(work.title)}`}>{work.title}</p>
        <p className="font-serif text-[clamp(20px,1.8vw,32px)] leading-none text-[#1a1a1a] italic">
          {work.category}
        </p>
        <div className="mt-auto grid grid-cols-2 gap-2 pt-3">
          <CardMedia work={work} className="aspect-[16/10]" />
          <div className="flex flex-col justify-between bg-[#f0d2d0] p-2.5">
            <Label className="text-black/50">{work.year}</Label>
            <p className="font-[family-name:var(--font-inicio-sans)] line-clamp-3 text-[11px] leading-snug">
              {work.lead}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (skin === "quote") {
    return (
      <div className="flex h-full flex-col justify-between bg-[#24352c] p-5 text-[#f4f0e8]">
        <Label className="text-white/55">{work.category}</Label>
        <p className="line-clamp-5 text-[clamp(16px,1.35vw,26px)] leading-[0.96] uppercase">“{work.lead}”</p>
        <Label className="text-white/55">{work.year}</Label>
      </div>
    );
  }

  if (skin === "editorial") {
    return (
      <div className="flex h-full flex-col bg-[#f6f1e8] p-5 text-[#171717]">
        <Label className="text-black/45">Tao Filmes</Label>
        <p className={`mt-auto uppercase leading-[0.82] ${titleClass(work.title)}`}>{work.title}</p>
        <p className="font-serif text-[clamp(18px,1.5vw,28px)] leading-none italic">{work.category}</p>
        <p className="font-[family-name:var(--font-inicio-sans)] mt-3 line-clamp-3 text-[12px] leading-snug text-black/70">
          {work.lead}
        </p>
      </div>
    );
  }

  if (skin === "red") {
    return (
      <div className="flex h-full flex-col justify-between bg-[#ff2d2d] p-5 text-[#fff7f4]">
        <Label>Tao Filmes</Label>
        <p className="line-clamp-5 text-[clamp(16px,1.4vw,28px)] leading-[0.95] uppercase">“{work.lead}”</p>
        <Label>{work.title}</Label>
      </div>
    );
  }

  if (skin === "list") {
    return (
      <div className="flex h-full flex-col justify-between bg-[#1a3328] p-4 text-[#f4f0e8] md:p-5">
        <Label className="text-white/60">Tao Filmes</Label>
        <p className={`uppercase leading-[0.82] ${titleClass(work.title)}`}>{work.title}</p>
        <div>
          <Label className="text-white/55">{work.category}</Label>
          <p className="font-[family-name:var(--font-inicio-sans)] mt-1 text-[12px] tracking-[0.14em]">{work.year}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full bg-black text-white">
      <CardMedia work={work} className="absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10" />
      <div className="relative flex h-full flex-col justify-end p-5">
        <Label className="text-white/60">{work.category}</Label>
        <p className={`mt-1 uppercase leading-[0.82] ${titleClass(work.title)}`}>{work.title}</p>
      </div>
    </div>
  );
}

function CollageCard({ slot, clone }: { slot: Slot; clone: boolean }) {
  const work = HOME_WORKS[slot.work];

  return (
    <div className={`shrink-0 ${slot.h}`} style={{ width: slot.w, transform: `rotate(${slot.rot}deg)` }}>
      <Link
        href={`/servicos/${work.slug}`}
        tabIndex={clone ? -1 : undefined}
        aria-hidden={clone || undefined}
        aria-label={clone ? undefined : `${work.title}. Ver trabalho`}
        className="group relative block h-full w-full overflow-hidden shadow-[0_14px_36px_rgba(0,0,0,0.55)] ring-1 ring-white/15"
      >
        <CardFace work={work} skin={slot.skin} />
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-black/45 opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
          <span className="font-[family-name:var(--font-inicio-sans)] rounded-full border border-white/55 bg-white/20 px-6 py-3 text-[11px] tracking-[0.2em] text-white uppercase shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] backdrop-blur-md">
            Ver trabalho
          </span>
        </div>
      </Link>
    </div>
  );
}

function CollageRow({
  slots,
  phase,
  enter,
}: {
  slots: Slot[];
  phase: string;
  enter: string;
}) {
  return (
    <div className="inicio-marquee-row min-h-0 flex-1" style={{ animationDelay: enter }}>
      <div
        className="inicio-marquee-track flex h-full w-max items-center"
        style={{ animationDuration: "52s", animationDelay: phase }}
      >
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="flex h-full items-center gap-[14px] pr-[14px]"
            aria-hidden={copy === 1 || undefined}
          >
            {slots.map((slot, index) => (
              <CollageCard key={`${slot.skin}-${slot.work}-${index}-${copy}`} slot={slot} clone={copy === 1} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function InicioCollage() {
  return (
    <div className={`absolute inset-0 z-0 overflow-hidden bg-black ${display.className}`}>
      <div className="inicio-collage-stage">
        <div className="flex h-full flex-col py-2 -space-y-10">
          {ROWS.map((slots, index) => (
            <CollageRow
              key={index}
              slots={slots}
              phase={ROW_PHASE[index] ?? "0s"}
              enter={ROW_ENTER[index] ?? "0s"}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
