"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { BRAND } from "@/lib/constants";
import { HERO_VIDEO } from "@/lib/data";
import { ScrollIndicator } from "@/components/ui/ScrollIndicator";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section ref={ref} className="relative h-screen w-full overflow-hidden">
      <motion.div className="absolute inset-0" style={{ scale }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          poster="https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1920&q=80"
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
        <div className="video-overlay absolute inset-0" />
      </motion.div>

      <motion.div
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
        style={{ opacity, y: textY }}
      >
        <motion.p
          className="mb-6 text-[10px] tracking-[0.5em] uppercase text-white/40"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          Produtora Audiovisual
        </motion.p>

        <motion.h1
          className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-tight text-balance max-w-4xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          {BRAND.tagline}
        </motion.h1>

        <motion.div
          className="mt-10 flex items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
        >
          <span className="h-px w-8 bg-brand-green" />
          <p className="text-sm tracking-[0.15em] uppercase text-white/50">
            Belém do Pará, Brasil
          </p>
          <span className="h-px w-8 bg-brand-blue" />
        </motion.div>
      </motion.div>

      <ScrollIndicator />
    </section>
  );
}
