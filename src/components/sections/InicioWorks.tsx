"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { HOME_WORKS, type HomeWork } from "@/lib/home-works";
import { posterFor, resolveMedia, youtubeId } from "@/lib/portfolio-videos";
import { loadPoster } from "@/lib/work-poster";
import { MediaCover } from "@/components/ui/MediaCover";
import { Reveal } from "@/components/ui/Reveal";

function titleSize(title: string) {
  const longest = Math.max(...title.split(/\s+/).map((word) => word.length));
  if (longest > 10 || title.length > 16) return "text-[clamp(1.7rem,3vw,3.25rem)]";
  if (longest > 6 || title.length > 8) return "text-[clamp(2rem,4vw,4.25rem)]";
  return "text-[clamp(2.6rem,5.2vw,5.5rem)]";
}

function WorkFrame({ work }: { work: HomeWork }) {
  const youtube = youtubeId(work.video);
  const [poster, setPoster] = useState(youtube ? `https://i.ytimg.com/vi/${youtube}/maxresdefault.jpg` : "");

  useEffect(() => {
    if (youtube) return;
    const media = resolveMedia(work.video);
    const src = media.kind === "file" ? media.src : work.video;
    let cancelled = false;
    void loadPoster(src).then((url) => {
      if (!cancelled && url) setPoster(url);
    });
    return () => {
      cancelled = true;
    };
  }, [work.video, youtube]);

  return (
    <div className="relative aspect-[5/3] w-full shrink-0 overflow-hidden bg-black md:w-[38%]">
      {poster ? (
        <img
          src={poster}
          alt=""
          className="absolute inset-0 h-full w-full origin-center scale-[1.35] object-cover"
          onLoad={(event) => {
            if (event.currentTarget.naturalWidth >= 400) return;
            const fallback = posterFor(work.video);
            setPoster((current) => (fallback && current !== fallback ? fallback : ""));
          }}
          onError={() => {
            const fallback = posterFor(work.video);
            setPoster((current) => (fallback && current !== fallback ? fallback : ""));
          }}
        />
      ) : (
        <MediaCover src={work.video} title={work.title} />
      )}
    </div>
  );
}

export function InicioWorks() {
  return (
    <section className="px-6 pt-16 pb-8 md:px-12 md:pt-24 lg:px-16">
      <div className="mx-auto max-w-[1600px]">
        {HOME_WORKS.map((work, index) => {
          const imageOnLeft = index % 2 === 0;

          return (
            <Reveal key={work.slug} delay={0.05}>
              <article className="border-b border-white/80">
                <Link
                  href={`/servicos/${work.slug}`}
                  className={`group flex flex-col gap-6 py-8 md:flex-row md:items-center md:gap-12 md:py-12 ${
                    imageOnLeft ? "" : "md:flex-row-reverse"
                  }`}
                >
                  <WorkFrame work={work} />
                  <h2
                    className={`min-w-0 flex-1 text-center font-serif leading-[0.9] tracking-tight uppercase ${titleSize(work.title)}`}
                  >
                    {work.title}
                  </h2>
                </Link>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
