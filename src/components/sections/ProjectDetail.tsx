"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { type Project } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";

type ProjectDetailProps = {
  project: Project;
};

export function ProjectDetail({ project }: ProjectDetailProps) {
  return (
    <article>
      <section className="relative h-[70vh] md:h-[80vh] w-full overflow-hidden">
        {project.video ? (
          <>
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
              poster={project.image}
            >
              <source src={project.video} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
          </>
        ) : (
          <>
            <Image
              src={project.image}
              alt={project.title}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent" />
          </>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 lg:p-16">
          <div className="mx-auto max-w-[1800px]">
            <motion.p
              className="text-[10px] tracking-[0.3em] uppercase text-white/40 mb-4"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {project.category} — {project.year}
            </motion.p>
            <motion.h1
              className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-tight"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {project.title}
            </motion.h1>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-24 md:py-32">
        <div className="mx-auto max-w-[1800px] grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          <div className="lg:col-span-4">
            <Reveal>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-4 text-[10px] tracking-[0.3em] uppercase text-white/40 hover:text-white transition-colors duration-500 group"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="group-hover:-translate-x-1 transition-transform duration-500"
                >
                  <path d="M13 8H3M3 8L7 4M3 8L7 12" />
                </svg>
                Voltar ao portfólio
              </Link>
            </Reveal>

            <Reveal delay={0.2} className="mt-16 space-y-8">
              {project.client && (
                <div>
                  <p className="text-[10px] tracking-[0.3em] uppercase text-muted mb-2">
                    Cliente
                  </p>
                  <p className="text-sm text-white/60">{project.client}</p>
                </div>
              )}
              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase text-muted mb-2">
                  Categoria
                </p>
                <p className="text-sm text-white/60">{project.category}</p>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase text-muted mb-2">
                  Ano
                </p>
                <p className="text-sm text-white/60">{project.year}</p>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal delay={0.15}>
              <p className="text-base md:text-lg text-white/50 leading-relaxed md:leading-loose max-w-2xl">
                {project.description}
              </p>
            </Reveal>

            <Reveal delay={0.3} className="mt-16 md:mt-24">
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </article>
  );
}
