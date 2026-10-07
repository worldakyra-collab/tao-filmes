"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { HOME_WORKS, type HomeWork } from "@/lib/home-works";
import { resolveMedia, youtubeId } from "@/lib/portfolio-videos";

const VIMEO_STILL =
  "https://i.vimeocdn.com/video/1775074585-5e95dc2ce5adb00bfe1db0f73d16a2da44281292859c2b892fc5785ee336e354-d_1280";

function stillFor(src: string) {
  const youtube = youtubeId(src);
  if (youtube) return `https://i.ytimg.com/vi/${youtube}/maxresdefault.jpg`;
  if (src.includes("vimeo.com")) return VIMEO_STILL;
  if (src.includes("drive.google.com")) return "/video/reel.jpg";
  return "";
}

const ROW_PHASE = ["0s", "-19s", "-37s"];
const ROW_ENTER = ["0s", "0.14s", "0.28s"];

function splitWorks(rowCount: number) {
  const rows: HomeWork[][] = Array.from({ length: rowCount }, () => []);
  HOME_WORKS.forEach((work, index) => {
    rows[index % rowCount].push(work);
  });
  return rows;
}

function ReelLoop({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.muted = true;
    video.preload = "auto";
    video.src = src;
    video.style.opacity = "1";
    const start = () => {
      video.muted = true;
      void video.play().catch(() => {});
    };
    video.addEventListener("loadeddata", start);
    video.load();
    return () => video.removeEventListener("loadeddata", start);
  }, [src]);

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="none"
      disablePictureInPicture
      disableRemotePlayback
      controls={false}
      className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-0"
    />
  );
}

function WorkCard({ work, clone }: { work: HomeWork; clone?: boolean }) {
  const still = stillFor(work.video);
  const media = resolveMedia(work.video);

  return (
    <Link
      href={`/servicos/${work.slug}`}
      tabIndex={clone ? -1 : undefined}
      aria-hidden={clone || undefined}
      aria-label={clone ? undefined : `${work.title}. Ver trabalho`}
      className="group relative block h-full w-full overflow-hidden bg-neutral-950"
    >
      {still ? (
        <img
          src={still}
          alt=""
          draggable={false}
          onError={(event) => {
            const image = event.currentTarget;
            const youtube = youtubeId(work.video);
            if (!youtube || image.dataset.fallback === "1") return;
            image.dataset.fallback = "1";
            image.src = `https://i.ytimg.com/vi/${youtube}/hqdefault.jpg`;
          }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : null}
      {media.kind === "file" ? <ReelLoop src={media.src} /> : null}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent px-4 pt-12 pb-3.5 transition-opacity duration-300 group-hover:opacity-0 group-focus-visible:opacity-0">
        <p className="truncate text-[11px] leading-none font-medium tracking-[0.16em] uppercase md:text-xs">
          {work.title}
        </p>
        <p className="mt-1.5 truncate text-[9px] leading-none tracking-[0.16em] text-white/75 uppercase md:text-[10px]">
          {work.category} / {work.year}
        </p>
      </div>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
        <span className="rounded-full border border-white/55 bg-white/15 px-7 py-3.5 text-[12px] tracking-[0.22em] text-white uppercase">
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
}: {
  works: HomeWork[];
  phase: string;
  enter: string;
}) {
  const duration = `${Math.round(12 * works.length)}s`;

  return (
    <div className="inicio-marquee-row min-h-0 flex-1" style={{ animationDelay: enter }}>
      <div
        className="inicio-marquee-track flex h-full w-max"
        style={{ animationDuration: duration, animationDelay: phase }}
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex h-full gap-[7px] pr-[7px]" aria-hidden={copy === 1 || undefined}>
            {works.map((work) => (
              <div key={`${work.slug}-${copy}`} className="h-full w-[78vw] shrink-0 sm:w-[32vw] lg:w-[27vw]">
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
          />
        ))}
      </div>
    </section>
  );
}
