"use client";

import { motion } from "framer-motion";

type SectionLabelProps = {
  number: string;
  title: string;
};

export function SectionLabel({ number, title }: SectionLabelProps) {
  return (
    <div className="flex items-center gap-6 mb-16 md:mb-24">
      <motion.span
        className="text-xs tracking-[0.3em] uppercase text-muted"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {number}
      </motion.span>
      <motion.div
        className="h-px flex-1 max-w-16 bg-white/10"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        style={{ originX: 0 }}
      />
      <motion.h2
        className="font-serif text-3xl md:text-5xl tracking-tight"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {title}
      </motion.h2>
    </div>
  );
}
