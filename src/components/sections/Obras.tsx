"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { PROJECTS } from "@/lib/data";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Obras() {
  return (
    <section className="bg-background px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto grid max-w-[1800px] grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:gap-10">
        {PROJECTS.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: index * 0.08, ease: EASE }}
          >
            <div className="group block">
              <div className="relative aspect-[16/10] overflow-hidden bg-black">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 md:p-7">
                  <div>
                    <p className="mb-2 text-[10px] tracking-[0.28em] text-white/50 uppercase">
                      {project.id} · {project.category}
                    </p>
                    <h2 className="font-serif text-3xl tracking-tight text-white md:text-4xl lg:text-5xl">
                      {project.title}
                    </h2>
                  </div>
                  <span className="hidden text-[10px] tracking-[0.28em] text-white/55 uppercase sm:block">
                    {project.year}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
