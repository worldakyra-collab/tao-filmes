"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { BRAND } from "@/lib/constants";
import { PROJECTS } from "@/lib/data";

const EASE = [0.22, 1, 0.36, 1] as const;

function padIndex(index: number) {
  return String(index + 1).padStart(2, "0");
}

export function HomeShowcase() {
  const [active, setActive] = useState(0);
  const project = PROJECTS[active];

  const goTo = useCallback((index: number) => {
    const next = (index + PROJECTS.length) % PROJECTS.length;
    setActive(next);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") goTo(active + 1);
      if (event.key === "ArrowLeft") goTo(active - 1);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active, goTo]);

  return (
    <section
      id="home-showcase"
      className="relative h-dvh w-full overflow-hidden bg-black"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={project.id}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <Image
            src={project.image}
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>
      </AnimatePresence>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/25" />

      <p className="absolute top-[58px] left-4 z-10 text-[10px] uppercase tracking-[0.28em] text-white md:left-6">
        Pausa
        <span className="ml-3 text-white/70">00:00:00</span>
      </p>

      <div
        className="absolute right-4 bottom-[4.5rem] z-20 block overflow-hidden rounded-md md:right-6 md:bottom-20"
        style={{ width: "min(26vw, 300px)", aspectRatio: "16 / 9" }}
      >
        <Image
          src={PROJECTS[4].image}
          alt=""
          fill
          className="object-cover"
          sizes="300px"
        />
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10">
        <div className="relative flex items-center justify-between gap-3 px-4 pt-3 pb-5 md:px-6 md:pb-6">
          <div className="flex items-center gap-5">
            <a
              href={BRAND.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] uppercase tracking-[0.26em] text-white underline decoration-white/80 underline-offset-4"
            >
              Instagram
            </a>
          </div>

          <div className="absolute left-1/2 hidden -translate-x-1/2 items-end gap-1.5 sm:flex">
            {PROJECTS.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => goTo(index)}
                className="flex flex-col items-center gap-1.5 px-1.5"
                aria-label={`Projeto ${padIndex(index)}`}
              >
                <span
                  className={`text-[11px] tracking-[0.18em] ${
                    index === active ? "text-white" : "text-white/35"
                  }`}
                >
                  {padIndex(index)}
                </span>
                <span className="flex h-2.5 items-end">
                  <span
                    className={`block h-2.5 w-px ${
                      index === active ? "bg-white" : "bg-white/30"
                    }`}
                  />
                </span>
                {index === active && (
                  <span className="h-2 w-2 rounded-full bg-white" />
                )}
              </button>
            ))}
            <span className="pointer-events-none absolute right-0 bottom-[9px] left-0 h-px bg-white/30" />
          </div>

          <p className="text-right text-[10px] uppercase tracking-[0.22em] text-white">
            Produtora audiovisual
          </p>
        </div>
      </div>
    </section>
  );
}
