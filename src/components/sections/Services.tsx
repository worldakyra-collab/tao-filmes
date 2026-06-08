"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { SERVICE_GRID } from "@/lib/data";

type ServicesProps = {
  standalone?: boolean;
};

export function Services({ standalone = true }: ServicesProps) {
  return (
    <section
      className={`bg-[#000000] ${standalone ? "pt-24 md:pt-28" : "border-t border-white/5"}`}
    >
      <div className="px-[3px] md:px-[3px]">
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-[3px] bg-[#000000] auto-rows-[110px] sm:auto-rows-[140px] md:auto-rows-[175px] lg:auto-rows-[220px]"
          style={{
            gridTemplateRows: "repeat(11, minmax(110px, 1fr))",
          }}
        >
          {SERVICE_GRID.map((item, index) => (
            <motion.div
              key={item.id}
              className="service-grid-item group relative overflow-hidden bg-[#000000]"
              style={{
                gridColumn: item.gridColumn,
                gridRow: item.gridRow,
              }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
            >
              <Link
                href={`/portfolio/${item.slug}`}
                className="absolute inset-0 z-10"
                aria-label={item.title ?? `Ver projeto ${item.slug}`}
              />
              <Image
                src={item.image}
                alt={item.title ?? ""}
                fill
                className="object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />

              <div className="absolute inset-0 flex items-end p-4 md:p-6 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                <h3 className="font-serif text-lg md:text-2xl lg:text-3xl tracking-tight text-white">
                  {item.title ?? "Ver projeto"}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
