"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const EASE = [0.22, 1, 0.36, 1] as const;

type PortfolioHeroProps = {
  title: string;
  subtitle: string;
  image: string;
};

export function PortfolioHero({ title, subtitle, image }: PortfolioHeroProps) {
  return (
    <section className="relative min-h-[100svh] bg-background">
      <div className="mx-auto grid min-h-[100svh] max-w-[1800px] grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col justify-between px-6 pb-16 pt-32 md:px-12 md:pb-24 md:pt-40 lg:pr-16">
          <div>
            <motion.h1
              className="font-serif text-[clamp(3.5rem,9vw,7rem)] leading-[0.95] tracking-tight"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: EASE }}
            >
              {title}
            </motion.h1>

            <motion.p
              className="mt-8 max-w-md text-[11px] leading-relaxed tracking-[0.22em] text-foreground/55 uppercase md:mt-10 md:text-xs"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4, ease: EASE }}
            >
              {subtitle}
            </motion.p>

            <motion.div
              className="mt-6 h-px w-24 bg-gradient-to-r from-brand-blue/70 via-foreground/20 to-brand-green/70"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.55, ease: EASE }}
              style={{ transformOrigin: "left" }}
            />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.1 }}
          >
            <Link
              href="#projetos"
              className="group flex items-end gap-5 text-foreground/40 transition-colors duration-500 hover:text-foreground/65"
            >
              <div className="relative h-20 w-px bg-foreground/15">
                <motion.span
                  className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-foreground/50"
                  animate={{ y: [0, 56, 0] }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>
              <span className="pb-1 text-[10px] tracking-[0.35em] uppercase">
                Role para explorar
              </span>
            </Link>
          </motion.div>
        </div>

        <div className="relative min-h-[50vh] lg:min-h-0">
          <motion.div
            className="absolute inset-0 overflow-hidden"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, delay: 0.3, ease: EASE }}
          >
            <Image
              src={image}
              alt=""
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent lg:from-background/90 lg:via-background/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
