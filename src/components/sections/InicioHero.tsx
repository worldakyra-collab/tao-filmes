"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { HOME_WORKS, type HomeWork } from "@/lib/home-works";
import { loadPoster } from "@/lib/work-poster";
import { MediaCover } from "@/components/ui/MediaCover";

const ROW_PHASE = ["0s", "-19s", "-37s"];
const ROW_ENTER = ["0s", "0.14s", "0.28s"];

function splitWorks(rowCount: number) {
  const rows: HomeWork[][] = Array.from({ length: rowCount }, () => []);
  HOME_WORKS.forEach((work, index) => {
    rows[index % rowCount].push(work);
  });
  return rows;
}

function WorkCard({ work, clone }: { work: HomeWork; clone?: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [poster, setPoster] = useState("");
  const [active, setActive] = useState(false);

  useEffect(() => {
    let cancelled = false;
    void loadPoster(work.video).then((url) => {
      if (!cancelled && url) setPoster(url);
    });
    return () => {
      cancelled = true;
    };
  }, [work.video]);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin: "80px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Link
      ref={ref}
      href={`/servicos/${work.slug}`}
      tabIndex={clone ? -1 : undefined}
      aria-hidden={clone || undefined}
      aria-label={clone ? undefined : `${work.title}. Ver trabalho`}
      className="group relative block h-full w-full overflow-hidden bg-neutral-950"
    >
      {poster ? (
        <img src={poster} alt="" className="absolute inset-0 h-full w-full object-cover" />
      ) : null}
      {active ? (
        <MediaCover src={work.video} title={work.title} />
      ) : null}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent px-4 pt-12 pb-3.5 transition-opacity duration-300 group-hover:opacity-0 group-focus-visible:opacity-0">
        <p className="truncate text-[11px] leading-none font-medium tracking-[0.16em] uppercase md:text-xs">
          {work.title}
        </p>
        <p className="mt-1.5 truncate text-[9px] leading-none tracking-[0.16em] text-white/75 uppercase md:text-[10px]">
          {work.category} / {work.year}
        </p>
      </div>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/45 opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
        <span className="rounded-full border border-white/55 bg-white/20 px-7 py-3.5 text-[12px] tracking-[0.22em] text-white uppercase shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] backdrop-blur-md">
          Ver trabalho
        </span>
      </div>
    </Link>
  );
}

function MarqueeRow({
  works,
  phase,
  enter,
  cardClassName,
}: {
  works: HomeWork[];
  phase: string;
  enter: string;
  cardClassName: string;
}) {
  const duration = `${Math.round(18 * works.length)}s`;

  return (
    <div className="inicio-marquee-row min-h-0 flex-1" style={{ animationDelay: enter }}>
      <div
        className="inicio-marquee-track flex h-full w-max"
        style={{ animationDuration: duration, animationDelay: phase }}
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex h-full gap-[7px] pr-[7px]" aria-hidden={copy === 1 || undefined}>
            {works.map((work) => (
              <div key={`${work.slug}-${copy}`} className={`h-full shrink-0 ${cardClassName}`}>
                <WorkCard work={work} clone={copy === 1} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function InicioHero() {
  const rows = splitWorks(3);

  return (
    <section className="relative h-dvh overflow-hidden font-[family-name:var(--font-inicio-sans)] text-white">
      <div className="flex h-full flex-col gap-[7px] py-[7px]">
        {rows.map((works, index) => (
          <MarqueeRow
            key={index}
            works={works}
            phase={ROW_PHASE[index] ?? "0s"}
            enter={ROW_ENTER[index] ?? "0s"}
            cardClassName={
              works.length <= 3
                ? "w-[86vw] sm:w-[36vw]"
                : "w-[78vw] sm:w-[30vw] lg:w-[27vw]"
            }
          />
        ))}
      </div>
    </section>
  );
}
