"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { BRAND, PAGE_META } from "@/lib/constants";
import { SERVICES } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";

const EASE = [0.22, 1, 0.36, 1] as const;
const meta = PAGE_META.servicos;

export function Services() {
  return (
    <>
      <section className="relative min-h-dvh w-full overflow-hidden">
        <Image
          src={meta.heroImage}
          alt=""
          fill
          priority
          className="object-cover object-[center_35%]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

        <div className="relative z-10 flex min-h-dvh flex-col justify-end px-6 pb-16 pt-32 md:px-12 md:pb-24">
          <div className="mx-auto w-full max-w-[1800px]">
            <motion.p
              className="font-serif text-[clamp(2.75rem,8vw,7.5rem)] leading-[0.92] tracking-tight"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: EASE }}
            >
              {BRAND.name}
            </motion.p>

            <motion.h1
              className="mt-6 max-w-3xl text-[clamp(1.35rem,2.4vw,2rem)] font-light leading-snug text-white/85 md:mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.45, ease: EASE }}
            >
              Serviços audiovisuais com intenção cinematográfica.
            </motion.h1>

            <motion.p
              className="mt-4 max-w-md text-sm leading-relaxed text-white/45"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              Do clipe à campanha, da peça digital ao projeto autoral — cada
              entrega nasce do olhar da {BRAND.name}.
            </motion.p>

            <motion.div
              className="mt-10"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.9, ease: EASE }}
            >
              <Link
                href="/contato"
                className="inline-flex items-center gap-3 text-[11px] tracking-[0.28em] uppercase text-white transition-opacity hover:opacity-60"
              >
                <span className="h-px w-10 bg-brand-green" />
                Falar com a gente
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/5 px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-[1800px]">
          <Reveal>
            <p className="text-[10px] tracking-[0.3em] text-muted uppercase">
              {meta.number} — {meta.subtitle}
            </p>
          </Reveal>

          <div className="mt-14 space-y-0 md:mt-20">
            {SERVICES.map((service, index) => {
              const reverse = index % 2 === 1;

              return (
                <article
                  key={service.id}
                  id={service.id}
                  className="grid grid-cols-1 items-center gap-8 border-t border-white/5 py-14 md:grid-cols-12 md:gap-12 md:py-20"
                >
                  <Reveal
                    className={`md:col-span-5 ${reverse ? "md:order-2" : ""}`}
                    delay={0.05}
                  >
                    <div className="relative aspect-[4/5] overflow-hidden md:aspect-[3/4]">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-[1.4s] ease-out hover:scale-[1.03]"
                        sizes="(max-width: 768px) 100vw, 42vw"
                      />
                    </div>
                  </Reveal>

                  <Reveal
                    className={`md:col-span-6 ${reverse ? "md:order-1 md:col-start-1" : "md:col-start-7"}`}
                    delay={0.15}
                    direction={reverse ? "left" : "right"}
                  >
                    <p className="text-[10px] tracking-[0.3em] text-muted uppercase">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h2 className="mt-4 font-serif text-4xl tracking-tight md:text-5xl lg:text-6xl">
                      {service.title}
                    </h2>
                    <p className="mt-6 max-w-md text-sm leading-relaxed text-white/45">
                      {service.description}
                    </p>
                    <Link
                      href="/contato"
                      className="mt-8 inline-flex items-center gap-3 text-[10px] tracking-[0.28em] uppercase text-white/55 transition-colors hover:text-white"
                    >
                      Solicitar
                      <span className="h-px w-8 bg-brand-green" />
                    </Link>
                  </Reveal>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-white/5 px-6 py-28 md:px-12 md:py-36">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(61,107,79,0.18),transparent_60%)]" />
        <div className="relative mx-auto max-w-[1800px] text-center">
          <Reveal>
            <p className="font-serif text-[clamp(2rem,5vw,4.5rem)] leading-[1.05] tracking-tight text-balance">
              Tem um projeto em mente?
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-white/40">
              Conta pra gente o que você quer transformar em imagem e som.
            </p>
          </Reveal>
          <Reveal delay={0.25} className="mt-10">
            <Link
              href="/contato"
              className="inline-flex items-center gap-3 border border-white/25 px-8 py-4 text-[11px] tracking-[0.28em] uppercase transition-colors hover:border-white hover:bg-white hover:text-black"
            >
              Ir para contato
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
