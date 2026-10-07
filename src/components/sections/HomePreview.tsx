"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

const PAGES = [
  {
    href: "/servicos",
    title: "Serviços",
    number: "02",
    image:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1200&q=80",
  },
  {
    href: "/sobre",
    title: "Sobre",
    number: "03",
    image:
      "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=1200&q=80",
  },
  {
    href: "/equipe",
    title: "Equipe",
    number: "04",
    image:
      "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=1200&q=80",
  },
  {
    href: "/contato",
    title: "Contato",
    number: "05",
    image:
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1200&q=80",
  },
] as const;

export function HomePreview() {
  return (
    <section id="explore" className="px-6 md:px-12 py-32 md:py-48">
      <div className="mx-auto max-w-[1800px]">
        <Reveal>
          <p className="text-[10px] tracking-[0.3em] uppercase text-muted mb-16 md:mb-24">
            Explore
          </p>
        </Reveal>

        <div className="space-y-0">
          {PAGES.map((page, index) => (
            <Reveal key={page.href} delay={index * 0.1}>
              <Link
                href={page.href}
                className="group grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-center py-12 md:py-16 border-t border-white/5 last:border-b"
              >
                <div className="md:col-span-2">
                  <span className="text-[10px] tracking-[0.3em] uppercase text-muted">
                    {page.number}
                  </span>
                </div>

                <div className="md:col-span-5">
                  <h2 className="font-serif text-4xl md:text-6xl tracking-tight group-hover:translate-x-3 transition-transform duration-700">
                    {page.title}
                  </h2>
                  <div className="mt-4 flex items-center gap-3">
                    <span className="h-px w-0 group-hover:w-16 bg-brand-green transition-all duration-700" />
                    <span className="text-[10px] tracking-[0.3em] uppercase text-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      Entrar
                    </span>
                  </div>
                </div>

                <div className="md:col-span-4 md:col-start-9 relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={page.image}
                    alt={page.title}
                    fill
                    className="object-cover opacity-60 group-hover:opacity-90 group-hover:scale-105 transition-all duration-[1.5s]"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
