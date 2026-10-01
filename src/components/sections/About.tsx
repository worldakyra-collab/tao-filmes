"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

const GIOVANNI_MARKS = [
  { value: "9", label: "Anos" },
  { value: "2022", label: "UnB" },
  { value: "2023", label: "ESCAC" },
  { value: "2026", label: "Dandara" },
] as const;

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
  const bgX = useTransform(scrollYProgress, [0, 1], ["4vw", "-2vw"]);
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
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] lg:aspect-auto lg:h-full lg:min-h-[640px]">
              <Image
                src="/sobre-retrato.png"
                alt="Giovanni Ruggeri, fundador da TAO Filmes"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-[center_20%]"
              />
            </div>
          </div>

          <div className="lg:col-span-5 lg:col-start-8 flex flex-col justify-end">
            <Reveal delay={0.3}>
              <div className="relative pl-8 border-l border-white/10">
                <motion.div
                  className="absolute left-0 top-0 w-px bg-brand-green"
                  style={{ height: lineWidth }}
                />
                <p className="text-xs tracking-[0.28em] text-white/40 uppercase">
                  Giovanni Ruggeri
                </p>
                <p className="mt-3 text-sm tracking-[0.16em] text-white/70 uppercase">
                  Fundador | Diretor executivo
                </p>
                <p className="mt-6 text-base leading-relaxed text-white/50 md:text-lg max-w-md">
                  Graduado em Audiovisual pela UnB (2022) e pós-graduado em
                  Direção Cinematográfica pela ESCAC, na Espanha (2023). Atua
                  há 9 anos no setor, entre roteiro, direção, edição e trilha
                  sonora, em ficção, documentário, publicidade, animação,
                  videoclipe e podcast. Dirigiu os curtas Invisíveis, premiado
                  no 13º Festival Taguatinga de Cinema, e Uma Droga Chamada
                  Amor, selecionado para seis festivais. É criador de Dandara,
                  premiado no Grande Prêmio de Roteiro do Festival de Sorocaba
                  (2026).
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.5} className="mt-16 md:mt-24">
              <div className="grid grid-cols-2 gap-x-12 gap-y-10 md:gap-x-16 md:gap-y-12">
                {GIOVANNI_MARKS.map((mark) => (
                  <div key={mark.label}>
                    <p className="font-serif text-5xl tracking-tight tabular-nums md:text-6xl">
                      {mark.value}
                    </p>
                    <p className="mt-2 text-[10px] tracking-[0.3em] text-muted uppercase">
                      {mark.label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      <motion.div
        className="font-watermark pointer-events-none absolute right-0 bottom-24 z-0 flex flex-col items-end leading-[0.82] select-none md:bottom-28"
        style={{
          x: bgX,
          opacity: bgOpacity,
          fontFamily: "var(--font-instrument-serif), Georgia, serif",
        }}
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
