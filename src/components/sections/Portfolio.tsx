"use client";

import { Anton } from "next/font/google";
import { type ReactNode, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { MediaCover } from "@/components/ui/MediaCover";
import { type Project, PROJECTS } from "@/lib/data";

const EASE = [0.33, 0, 0.2, 1] as const;
const FEATURED_COUNT = 3;
const display = Anton({ weight: "400", subsets: ["latin"] });

function ProjectImage({ project }: { project: Project }) {
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-background md:aspect-[16/11]">
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0, scale: 1.05 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.1, ease: EASE }}
      >
        {project.video ? (
          <MediaCover src={project.video} title={project.title} poster={project.image} />
        ) : null}
        <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-700 group-hover:bg-black/25" />
      </motion.div>
    </div>
  );
}

function TextLine({
  children,
  className,
  delay,
}: {
  children: ReactNode;
  className?: string;
  delay: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function ProjectCta({ href }: { href: string }) {
  const [leaving, setLeaving] = useState(false);

  return (
    <Link
      href={href}
      onClick={() => setLeaving(true)}
      className="group/cta relative mt-10 inline-flex items-center gap-3 text-[10px] tracking-[0.3em] text-foreground/50 uppercase transition-colors duration-500 hover:text-foreground"
    >
      Ver projeto
      <span className="text-sm leading-none transition-transform duration-500 group-hover/cta:translate-x-1">
        →
      </span>
      <span
        className={`absolute -bottom-2 left-0 h-px bg-gradient-to-r from-brand-blue/60 to-brand-green/60 transition-all duration-700 ${
          leaving ? "w-full translate-x-full opacity-0" : "w-0 group-hover/cta:w-full"
        }`}
      />
    </Link>
  );
}

function ProjectContent({ project }: { project: Project }) {
  return (
    <div className="flex flex-col justify-center px-2 py-8 md:px-6 lg:py-0">
      <TextLine delay={0} className="mb-6 flex items-center gap-4">
        <span className="text-xs tracking-[0.2em] text-foreground/40">{project.id}</span>
        <span className="h-px w-10 bg-gradient-to-r from-brand-blue/50 to-brand-green/50" />
      </TextLine>

      <TextLine delay={0.12}>
        <h2 className="font-serif text-4xl tracking-tight md:text-5xl lg:text-6xl">{project.title}</h2>
      </TextLine>

      <TextLine delay={0.24} className="mt-4">
        <p className="text-[10px] tracking-[0.25em] text-foreground/45 uppercase md:text-[11px]">
          {project.category} • {project.year}
        </p>
      </TextLine>

      <ProjectCta href={`/portfolio/${project.slug}`} />
    </div>
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
  const [ready, setReady] = useState(false);

  return (
    <motion.div
      className={`${ready ? "group" : ""} grid grid-cols-1 items-center gap-10 md:gap-16 lg:grid-cols-2 lg:gap-20 xl:gap-28`}
      onViewportEnter={() => {
        window.setTimeout(() => setReady(true), 1000);
      }}
      viewport={{ once: true, margin: "-80px" }}
    >
      <motion.div
        className={imageLeft ? "order-1" : "order-1 lg:order-2"}
        initial={{ opacity: 0, x: 72 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: EASE }}
      >
        <Link href={`/portfolio/${project.slug}`} className="block">
          <ProjectImage project={project} />
        </Link>
      </motion.div>
      <div className={imageLeft ? "order-2" : "order-2 lg:order-1"}>
        <ProjectContent project={project} />
      </div>
    </motion.div>
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

function BrandLine() {
  const marks = Array.from({ length: 8 }, (_, index) => index);

  return (
    <div className="relative left-1/2 my-16 w-screen -translate-x-1/2 overflow-hidden py-10 whitespace-nowrap md:my-24 md:py-14" aria-hidden>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.9, ease: EASE }}
      >
      <motion.div
        className="flex w-max items-center will-change-transform"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 55, ease: "linear", repeat: Infinity }}
      >
        {[0, 1].map((copy) => (
          <span
            key={copy}
            className={`${display.className} flex items-center text-[clamp(2.4rem,6.5vw,5.75rem)] leading-none tracking-[-0.02em] text-white/20 uppercase`}
          >
            {marks.map((index) => (
              <span key={index} className="flex items-center">
                TAO FILMES
                <span
                  className="pointer-events-none mx-[0.28em] inline-block h-[0.78em] w-[0.98em] shrink-0 select-none bg-current"
                  style={{
                    WebkitMaskImage: "url(/camaleao.svg)",
                    maskImage: "url(/camaleao.svg)",
                    WebkitMaskRepeat: "no-repeat",
                    maskRepeat: "no-repeat",
                    WebkitMaskPosition: "center",
                    maskPosition: "center",
                    WebkitMaskSize: "contain",
                    maskSize: "contain",
                  }}
                />
              </span>
            ))}
          </span>
        ))}
      </motion.div>
      </motion.div>
    </div>
  );
}

export function Portfolio() {
  const featured = PROJECTS.slice(0, FEATURED_COUNT);

  return (
    <>
      <section
        id="projetos"
        className="bg-background px-6 pt-24 pb-24 md:px-12 md:pt-32 md:pb-32"
      >
        <div className="mx-auto max-w-[1800px]">
          {featured.map((project, index) => (
            <div key={project.id}>
              {index > 0 ? <BrandLine /> : null}
              <ProjectRow project={project} index={index} />
            </div>
          ))}
        </div>
      </section>

      <PortfolioFooter />
    </>
  );
}
