"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { type Project } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { WorkVideo } from "@/components/ui/WorkVideo";

type ProjectDetailProps = {
  project: Project;
};

export function ProjectDetail({ project }: ProjectDetailProps) {
  return (
    <article>
      <section className="px-6 pt-28 pb-24 md:px-12 md:pt-36 md:pb-32">
        <div className="mx-auto grid max-w-[1800px] grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-24">
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
                Voltar
              </Link>
            </Reveal>

            <div className="mt-10">
              <motion.p
                className="mb-4 text-[10px] tracking-[0.3em] text-white/40 uppercase"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                {project.category} — {project.year}
              </motion.p>
              <motion.h1
                className="font-serif text-5xl tracking-tight md:text-6xl lg:text-7xl"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                {project.title}
              </motion.h1>
            </div>

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

            {project.video ? (
              <Reveal delay={0.3} className="mt-16 md:mt-24">
                <WorkVideo src={project.video} />
              </Reveal>
            ) : null}
          </div>
        </div>
      </section>
    </article>
  );
}
