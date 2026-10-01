"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type PageHeroProps = {
  title: string;
  subtitle: string;
  number?: string;
  image?: string;
  video?: string;
};

export function PageHero({ title, subtitle, number, image, video }: PageHeroProps) {
  return (
    <section className="relative h-[55vh] md:h-[60vh] w-full overflow-hidden flex items-end">
      {video ? (
        <>
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
            poster={image}
          >
            <source src={video} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent" />
        </>
      ) : (
        image && (
          <>
            <Image
              src={image}
              alt=""
              fill
              priority
              className="object-cover opacity-30"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
          </>
        )
      )}

      <div className="relative z-10 w-full px-6 md:px-12 pb-16 md:pb-24 pt-32">
        <div className="mx-auto max-w-[1800px]">
          <motion.div
            className="flex items-center gap-6 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {number ? (
              <>
                <span className="text-[10px] tracking-[0.3em] uppercase text-muted">
                  {number}
                </span>
                <span className="h-px w-12 bg-white/10" />
              </>
            ) : null}
            <span className="text-[10px] tracking-[0.3em] uppercase text-white/30">
              {subtitle}
            </span>
          </motion.div>

          <motion.h1
            className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {title}
          </motion.h1>
        </div>
      </div>
    </section>
  );
}
