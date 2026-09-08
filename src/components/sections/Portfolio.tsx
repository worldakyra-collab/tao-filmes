"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { type Project, PROJECTS } from "@/lib/data";

const EASE = [0.22, 1, 0.36, 1] as const;
const FEATURED_COUNT = 3;

function ProjectCta() {
  return (
    <span className="group/cta relative inline-flex items-center gap-3 text-[10px] tracking-[0.3em] text-foreground/50 uppercase transition-colors duration-500 group-hover:text-foreground">
      Ver projeto
      <span className="text-sm leading-none transition-transform duration-500 group-hover:translate-x-1">
        →
      </span>
      <span className="absolute -bottom-2 left-0 h-px w-0 bg-gradient-to-r from-brand-blue/60 to-brand-green/60 transition-all duration-700 group-hover/cta:w-full group-hover:w-full" />
    </span>
  );
}

function ProjectImage({ project }: { project: Project }) {
  return (
    <div className="group relative aspect-[4/3] overflow-hidden bg-background md:aspect-[16/11]">
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0, scale: 1.05 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.1, ease: EASE }}
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-black/0 transition-colors duration-700 group-hover:bg-black/25" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <span className="text-[10px] tracking-[0.35em] text-foreground/80 uppercase">
            Ver projeto
          </span>
        </div>
      </motion.div>
    </div>
  );
}

function ProjectContent({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <motion.div
      className="flex flex-col justify-center px-2 py-8 md:px-6 lg:py-0"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay: index * 0.08, ease: EASE }}
    >
      <div className="mb-6 flex items-center gap-4">
        <span className="text-xs tracking-[0.2em] text-foreground/40">
          {project.id}
        </span>
        <span className="h-px w-10 bg-gradient-to-r from-brand-blue/50 to-brand-green/50" />
      </div>

      <h2 className="font-serif text-4xl tracking-tight md:text-5xl lg:text-6xl">
        {project.title}
      </h2>

      <p className="mt-4 text-[10px] tracking-[0.25em] text-foreground/45 uppercase md:text-[11px]">
        {project.category} • {project.year}
      </p>

      <p className="mt-6 max-w-md text-sm leading-relaxed text-foreground/55 md:text-[15px]">
        {project.description}
      </p>

      <div className="mt-10">
        <ProjectCta />
      </div>
    </motion.div>
  );
}

function ProjectRow({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const imageLeft = index % 2 === 0;

  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className="group block"
    >
      <div
        className={`grid grid-cols-1 items-center gap-10 md:gap-16 lg:grid-cols-2 lg:gap-20 xl:gap-28 ${
          imageLeft ? "" : ""
        }`}
      >
        <div className={imageLeft ? "order-1" : "order-1 lg:order-2"}>
          <ProjectImage project={project} />
        </div>
        <div className={imageLeft ? "order-2" : "order-2 lg:order-1"}>
          <ProjectContent project={project} index={index} />
        </div>
      </div>
    </Link>
  );
}

function PortfolioFooter() {
  return (
    <motion.div
      className="flex flex-col items-center px-6 py-32 text-center md:py-40"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: EASE }}
    >
      <span className="mb-8 h-px w-12 bg-gradient-to-r from-brand-blue/40 to-brand-green/40" />
      <p className="max-w-2xl text-sm leading-relaxed tracking-[0.12em] text-foreground/50 uppercase md:text-base">
        Cada projeto é uma nova{" "}
        <span className="bg-gradient-to-r from-brand-blue to-brand-green bg-clip-text text-transparent">
          transformação
        </span>
        .
      </p>
    </motion.div>
  );
}

export function Portfolio() {
  const featured = PROJECTS.slice(0, FEATURED_COUNT);

  return (
    <>
      <section
        id="projetos"
        className="bg-background px-6 pb-24 md:px-12 md:pb-32"
      >
        <div className="mx-auto max-w-[1800px] space-y-32 md:space-y-48 lg:space-y-56">
          {featured.map((project, index) => (
            <ProjectRow key={project.id} project={project} index={index} />
          ))}
        </div>
      </section>

      <PortfolioFooter />
    </>
  );
}
