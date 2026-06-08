"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { type Project, PROJECTS } from "@/lib/data";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

function ProjectMeta({ project }: { project: Project }) {
  return (
    <div className="space-y-3">
      <span className="text-[10px] tracking-[0.3em] uppercase text-muted">
        {project.category} — {project.year}
      </span>
      <h3 className="font-serif text-3xl md:text-5xl tracking-tight group-hover:translate-x-2 transition-transform duration-700">
        {project.title}
      </h3>
      <div className="flex items-center gap-3 pt-2">
        <span className="h-px w-0 group-hover:w-12 bg-brand-green transition-all duration-700" />
        <span className="text-[10px] tracking-[0.3em] uppercase text-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          Ver projeto
        </span>
      </div>
    </div>
  );
}

function ProjectLeft({ project }: { project: Project }) {
  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className="group grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end"
    >
      <div className="lg:col-span-8 lg:col-start-1">
        <ParallaxImage
          src={project.image}
          alt={project.title}
          className="aspect-[16/10] md:aspect-[16/9]"
        />
      </div>
      <div className="lg:col-span-3 lg:col-start-10 lg:-mt-32 relative z-10 px-2 lg:px-0">
        <Reveal delay={0.2}>
          <ProjectMeta project={project} />
        </Reveal>
      </div>
    </Link>
  );
}

function ProjectRight({ project }: { project: Project }) {
  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className="group grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end"
    >
      <div className="lg:col-span-3 lg:col-start-1 lg:mb-32 order-2 lg:order-1 px-2 lg:px-0">
        <Reveal delay={0.2}>
          <ProjectMeta project={project} />
        </Reveal>
      </div>
      <div className="lg:col-span-9 lg:col-start-4 order-1 lg:order-2">
        <ParallaxImage
          src={project.image}
          alt={project.title}
          className="aspect-[4/5] md:aspect-[3/4]"
        />
      </div>
    </Link>
  );
}

function ProjectFull({ project }: { project: Project }) {
  return (
    <Link href={`/portfolio/${project.slug}`} className="group relative block">
      {project.video ? (
        <div className="relative aspect-[21/9] overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover scale-105 group-hover:scale-100 transition-transform duration-[2s]"
          >
            <source src={project.video} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-700" />
        </div>
      ) : (
        <ParallaxImage
          src={project.image}
          alt={project.title}
          className="aspect-[21/9]"
        />
      )}
      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 bg-gradient-to-t from-background via-background/60 to-transparent">
        <Reveal>
          <ProjectMeta project={project} />
        </Reveal>
      </div>
    </Link>
  );
}

function ProjectOffset({ project }: { project: Project }) {
  return (
    <Link href={`/portfolio/${project.slug}`} className="group relative block">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        <div className="lg:col-span-7 lg:col-start-2">
          <ParallaxImage
            src={project.image}
            alt={project.title}
            className="aspect-[3/4] md:aspect-[4/5]"
          />
        </div>
        <div className="lg:col-span-4 lg:col-start-9 flex items-end -mt-16 lg:-mt-0 lg:-ml-24 relative z-10 p-6 lg:p-0">
          <Reveal delay={0.3}>
            <div className="bg-background/80 backdrop-blur-sm p-8 md:p-12 border border-white/5">
              <ProjectMeta project={project} />
            </div>
          </Reveal>
        </div>
      </div>
    </Link>
  );
}

function ProjectItem({ project }: { project: Project }) {
  switch (project.layout) {
    case "left":
      return <ProjectLeft project={project} />;
    case "right":
      return <ProjectRight project={project} />;
    case "full":
      return <ProjectFull project={project} />;
    case "offset":
      return <ProjectOffset project={project} />;
  }
}

type PortfolioProps = {
  standalone?: boolean;
};

export function Portfolio({ standalone = false }: PortfolioProps) {
  return (
    <section className="px-6 md:px-12 py-24 md:py-32">
      <div className="mx-auto max-w-[1800px]">
        {!standalone && <SectionLabel number="01" title="Portfólio" />}

        <div className="space-y-32 md:space-y-48">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
            >
              <ProjectItem project={project} />
            </motion.div>
          ))}
        </div>

        <Reveal className="mt-32 md:mt-48 text-center">
          <Link
            href="/contato"
            className="inline-flex items-center gap-6 text-xs tracking-[0.3em] uppercase text-white/40 hover:text-white transition-colors duration-500 group"
          >
            <span className="h-px w-12 bg-white/20 group-hover:w-20 group-hover:bg-brand-green transition-all duration-700" />
            Ver todos os projetos
            <span className="h-px w-12 bg-white/20 group-hover:w-20 group-hover:bg-brand-blue transition-all duration-700" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
