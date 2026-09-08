"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ABOUT_STATS } from "@/lib/data";

const MANIFESTO = [
  "Somos transformação.",
  "Adaptamos. Evoluímos.",
  "Cada frame, uma mudança.",
];

type AboutProps = {
  standalone?: boolean;
};

export function About({ standalone = false }: AboutProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const lineWidth = useTransform(scrollYProgress, [0.2, 0.6], ["0%", "100%"]);
  const bgX = useTransform(scrollYProgress, [0, 0.55, 1], ["18vw", "-8vw", "-28vw"]);
  const bgOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.55, 0.85],
    [0.035, 0.08, 0.16, 0.22],
  );

  return (
    <section
      ref={ref}
      className={`relative px-6 md:px-12 py-24 md:py-32 overflow-x-hidden ${
        standalone ? "" : "border-t border-white/5"
      }`}
    >
      <div className="mx-auto max-w-[1800px] relative z-10">
        {!standalone && <SectionLabel number="03" title="Sobre" />}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="text-xs tracking-[0.3em] uppercase text-muted mb-8">
                Manifesto
              </p>
            </Reveal>

            <div className="space-y-6 md:space-y-10">
              {MANIFESTO.map((line, index) => (
                <Reveal key={line} delay={index * 0.15}>
                  <motion.p
                    className="font-serif text-4xl md:text-6xl lg:text-7xl tracking-tight text-balance leading-[1.1]"
                    whileInView={{ opacity: [0.3, 1] }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 1 }}
                  >
                    {line}
                  </motion.p>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 lg:col-start-8 flex flex-col justify-end">
            <Reveal delay={0.3}>
              <div className="relative pl-8 border-l border-white/10">
                <motion.div
                  className="absolute left-0 top-0 w-px bg-brand-green"
                  style={{ height: lineWidth }}
                />
                <p className="text-base md:text-lg text-white/50 leading-relaxed max-w-md">
                  TAO nasceu da ideia de constante mudança. Como o movimento
                  que define a vida, transformamos visões em imagens que
                  permanecem.
                </p>
                <p className="mt-8 text-sm tracking-[0.15em] uppercase text-white/30">
                  Produtora audiovisual — São Paulo
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.5} className="mt-16 md:mt-24">
              <div className="grid grid-cols-2 gap-x-12 gap-y-10 md:gap-x-16 md:gap-y-12">
                {ABOUT_STATS.map((stat, index) => (
                  <div key={stat.label}>
                    <p className="font-serif text-5xl md:text-6xl tracking-tight tabular-nums">
                      <CountUp
                        end={stat.value}
                        suffix={stat.label === "Projetos" ? "+" : ""}
                        duration={2 + index * 0.15}
                      />
                    </p>
                    <p className="mt-2 text-[10px] tracking-[0.3em] uppercase text-muted">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      <motion.div
        className="absolute right-0 top-1/2 -translate-y-1/2 font-serif pointer-events-none select-none z-0 flex flex-col items-end leading-[0.82]"
        style={{ x: bgX, opacity: bgOpacity }}
      >
        <span className="text-[13vw] md:text-[11vw] lg:text-[9vw] text-white whitespace-nowrap">
          TAO
        </span>
        <span className="text-[13vw] md:text-[11vw] lg:text-[9vw] text-white whitespace-nowrap">
          FILMES
        </span>
      </motion.div>
    </section>
  );
}
