"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Anton } from "next/font/google";
import { lockBodyScroll } from "@/lib/scroll-lock";

const display = Anton({ weight: "400", subsets: ["latin"] });

const MARQUEE = "O QUE FICA DEPOIS DO CORTE   ";

const LINKS = [
  { label: "Documentário", href: "/teste-2" },
  { label: "Publicidade", href: "/teste-2" },
  { label: "Animação", href: "/teste-2" },
];

const PANEL_EASE = [0.65, 0, 0.35, 1] as const;

const GIOVANNI_COPY = [
  "Giovanni Ruggeri é profissional do audiovisual com atuação em roteiro, direção, edição e composição de trilha sonora. É graduado em Audiovisual pela Universidade de Brasília (UnB), em 2022, e possui pós graduação em Direção Cinematográfica pela ESCAC, na Espanha, concluída em 2023.",
  "Há 9 anos atuando no setor audiovisual, desenvolve projetos de ficção, documentário, publicidade, animação, videoclipes e podcasts, participando de diferentes etapas da produção, da criação à finalização.",
  "É diretor dos curtas metragens Invisíveis, premiado no 13º Festival Taguatinga de Cinema, e Uma Droga Chamada Amor, selecionado para seis festivais. Também dirigiu, roteirizou e editou os projetos Upadana e Contra La Pared, ambos de 2023, além do videoclipe How Far, de 2024.",
  "Sua trajetória também inclui trabalhos em produções nacionais e internacionais, com experiência em trilha sonora e equipes de som.",
  "Entre seus projetos recentes está Dandara, série da qual é idealizador e que recebeu o Grande Prêmio de Roteiro do Festival de Sorocaba, além de ser finalista do FRAPA 2026.",
] as const;

const copyLine = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function Arrow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden className={className} fill="none">
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GiovanniPanel({ onClose }: { onClose: () => void }) {
  const [showCopy, setShowCopy] = useState(false);

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
          <Arrow className="size-4 rotate-180" />
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
            variants={copyLine}
            className={`${display.className} text-[clamp(2.4rem,4vw,3.6rem)] leading-[0.9] tracking-[-0.03em] uppercase`}
          >
            Giovanni Ruggeri
          </motion.p>
          <motion.p variants={copyLine} className="mt-4 text-sm text-black/60 md:text-base">
            Fundador e Diretor Executivo da TAO Filmes
          </motion.p>
          <motion.div
            variants={copyLine}
            className="mt-8 space-y-5 text-sm leading-relaxed text-black/80 md:text-[15px]"
          >
            {GIOVANNI_COPY.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </motion.div>
        </motion.div>
      </motion.aside>
    </motion.div>
  );
}

export function SobreSpotlight() {
  const [giovanniOpen, setGiovanniOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const closeGiovanni = useCallback(() => setGiovanniOpen(false), []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!giovanniOpen) return;
    return lockBodyScroll();
  }, [giovanniOpen]);

  return (
    <section className="relative overflow-hidden bg-black px-6 pt-28 pb-16 text-white md:px-12 md:pt-36 md:pb-24">
      <div className="mx-auto max-w-[1440px]">
        <div className="relative grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="pointer-events-none absolute inset-x-[-8vw] top-[18rem] z-0 -translate-y-1/2 overflow-hidden lg:top-[58%]">
            <div className="sobre-marquee-track flex w-max">
              {[0, 1].map((copy) => (
                <p
                  key={copy}
                  className={`${display.className} pr-6 text-[clamp(2.4rem,6.5vw,5.75rem)] tracking-[-0.02em] whitespace-nowrap text-white/20 uppercase`}
                >
                  {MARQUEE.repeat(4)}
                </p>
              ))}
            </div>
          </div>

          <div className="relative z-10 lg:col-span-5">
            <div className="flex items-center gap-4 lg:gap-5">
              <h2
                className={`${display.className} text-[clamp(2.4rem,4.2vw,3.8rem)] leading-[0.88] tracking-[-0.03em] uppercase`}
              >
                sobre a
                <br />
                TAO Filmes
              </h2>
              <img
                src="/camaleao.svg"
                alt=""
                className="h-16 w-auto shrink-0 md:h-24"
              />
            </div>

            <div className="relative mt-8 mb-8 w-[min(100%,380px)]">
              <div className="relative aspect-square overflow-hidden rounded-[1.75rem] shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
                <Image
                  src="/giovanni.png"
                  alt="Giovanni Ruggeri, fundador da TAO Filmes"
                  fill
                  unoptimized
                  className="object-cover object-[center_30%]"
                />
              </div>

              <button
                type="button"
                onClick={() => setGiovanniOpen(true)}
                className="absolute bottom-0 left-1/2 z-20 inline-flex -translate-x-1/2 translate-y-1/2 items-center gap-3 rounded-full bg-white py-2 pr-2 pl-5 text-sm font-semibold whitespace-nowrap text-black transition-transform hover:scale-[1.03]"
              >
                Sobre Giovanni
                <span className="grid size-8 place-items-center rounded-full bg-black text-white">
                  <Arrow className="size-3.5" />
                </span>
              </button>
            </div>
          </div>

          <div className="relative z-10 space-y-4 text-sm leading-relaxed text-white/70 md:text-[15px] lg:col-span-7">
            <p>
              A TAO Filmes é uma produtora audiovisual criada em 2017, no
              coração da Amazônia, em Belém do Pará. Ao longo de sua trajetória,
              a produtora vem desenvolvendo projetos para diferentes áreas do
              audiovisual, atendendo clientes e parceiros no Brasil e no
              exterior, com trabalhos realizados para mercados como Distrito
              Federal, Rio de Janeiro, São Paulo, Espanha e Guiana Francesa.
            </p>
            <p>
              Com 9 anos de atuação no mercado nacional e internacional e
              aproximadamente 60 projetos realizados, a TAO Filmes trabalha na
              criação e produção de conteúdos que unem linguagem audiovisual,
              identidade e criatividade.
            </p>
            <p>
              Nosso objetivo é consolidar a TAO Filmes como uma produtora
              audiovisual amazônica, ampliando sua atuação em projetos autorais,
              publicidade e conteúdos para diferentes mercados, sempre mantendo
              uma identidade criativa conectada ao território.
            </p>
            <p>
              A TAO Filmes se diferencia por produzir a partir de um território
              de forte identidade cultural, paisagística e humana. Integramos
              direção, montagem, desenho de som e música para construir
              projetos com linguagem própria. Acompanhamos cada produção desde
              a concepção até a finalização, adaptando nossa estrutura às
              necessidades de cada projeto.
            </p>
            <Link
              href="/teste-2"
              className="mt-2 inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.22em] uppercase transition-opacity hover:opacity-70"
            >
              Ver obra
              <Arrow className="size-3.5" />
            </Link>
          </div>
        </div>

        <div className="mt-6 mb-4 hidden items-center justify-between gap-8 lg:flex">
          <p
            className={`${display.className} min-w-0 text-[clamp(3.4rem,9vw,10.5rem)] leading-[0.78] tracking-[-0.045em] text-white/20 uppercase`}
          >
            TAO Filmes
          </p>
          <div
            className={`${display.className} shrink-0 text-right text-[clamp(2.6rem,5.2vw,5.4rem)] leading-[0.9] tracking-[-0.03em] uppercase`}
          >
            <p>Cada</p>
            <p>frame</p>
            <p>uma</p>
            <p>mudança</p>
          </div>
        </div>

        <div
          className={`${display.className} mt-8 text-right text-[clamp(2.6rem,14vw,4rem)] leading-[0.9] tracking-[-0.03em] uppercase lg:hidden`}
        >
          <p>Cada</p>
          <p>frame</p>
          <p>uma</p>
          <p>mudança</p>
        </div>

        <div className="mt-16 flex flex-col gap-5 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between md:mt-10">
          <p className="text-sm text-white/75">Desde 2017</p>
          <nav className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-white/80">
            {LINKS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="transition-colors hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {giovanniOpen && <GiovanniPanel onClose={closeGiovanni} />}
          </AnimatePresence>,
          document.body,
        )}
    </section>
  );
}
