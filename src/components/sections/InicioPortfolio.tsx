"use client";

import { useEffect, useRef } from "react";
import { Portfolio } from "@/components/sections/Portfolio";
import { ScrollIndicator } from "@/components/ui/ScrollIndicator";
import { PAGE_META } from "@/lib/constants";
import { HERO_VIDEO } from "@/lib/data";

const meta = PAGE_META.portfolio;

export function InicioPortfolio() {
  const trackRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const lockY = useRef<number | null>(null);

  useEffect(() => {
    let frame = 0;

    const paint = (progress: number) => {
      const panel = panelRef.current;
      if (panel) panel.style.height = `calc(100vh - ${progress * 45}vh)`;
      if (gradientRef.current) gradientRef.current.style.opacity = String(progress);
      if (titleRef.current) titleRef.current.style.opacity = String(progress);
      if (heroTextRef.current) heroTextRef.current.style.opacity = String(1 - progress);
    };

    const apply = () => {
      if (lockY.current != null) return;

      const distance = window.innerHeight;
      const y = window.scrollY;
      const progress = Math.min(1, Math.max(0, y / distance));
      paint(progress);

      if (progress < 1) return;

      lockY.current = distance;
      const track = trackRef.current;
      const panel = panelRef.current;
      if (track) track.style.height = "55vh";
      if (panel) {
        panel.style.position = "relative";
        panel.style.height = "55vh";
      }
      const root = document.documentElement;
      const previous = root.style.scrollBehavior;
      root.style.scrollBehavior = "auto";
      window.scrollTo(0, Math.max(0, y - distance));
      root.style.scrollBehavior = previous;
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(apply);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    apply();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <div ref={trackRef} className="relative h-[155vh]">
        <section ref={panelRef} className="sticky top-0 h-screen w-full overflow-hidden">
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
          <div
            ref={gradientRef}
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40 opacity-0"
          />

          <div
            ref={heroTextRef}
            className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
          >
            <p className="mb-6 text-[10px] tracking-[0.5em] text-white/40 uppercase">
              Produtora Audiovisual
            </p>
            <h1 className="max-w-4xl font-serif text-5xl leading-[0.9] tracking-tight uppercase md:text-7xl lg:text-8xl">
              <span className="block">Tao</span>
              <span className="block">Filmes</span>
            </h1>
            <div className="mt-10 flex items-center gap-4">
              <span className="h-px w-8 bg-brand-green" />
              <p className="text-sm tracking-[0.15em] text-white/50 uppercase">Belém do Pará, Brasil</p>
              <span className="h-px w-8 bg-brand-blue" />
            </div>
            <ScrollIndicator />
          </div>

          <div
            ref={titleRef}
            className="pointer-events-none absolute inset-x-0 bottom-0 z-10 px-6 pb-10 opacity-0 md:px-12 md:pb-14"
          >
            <div className="mx-auto max-w-[1800px]">
              <div className="mb-6 flex items-center gap-6">
                <span className="text-[10px] tracking-[0.3em] text-muted uppercase">{meta.number}</span>
                <span className="h-px w-12 bg-white/10" />
                <span className="text-[10px] tracking-[0.3em] text-white/30 uppercase">
                  {meta.subtitle}
                </span>
              </div>
              <p className="font-serif text-5xl tracking-tight md:text-7xl lg:text-8xl">Início</p>
            </div>
          </div>
        </section>
      </div>
      <Portfolio />
    </>
  );
}
