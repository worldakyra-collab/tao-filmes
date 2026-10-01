"use client";

import Image from "next/image";
import { Archivo_Black } from "next/font/google";

const display = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
});

export function AboutSplit() {
  function scrollDown() {
    window.scrollBy({ top: window.innerHeight * 0.92, behavior: "smooth" });
  }

  return (
    <section className="relative grid grid-cols-1 bg-black text-[#f3f0e8] lg:grid-cols-2">
      <Image
        src="/sobre-retrato.png"
        alt="Retrato"
        width={1024}
        height={768}
        className="block h-auto w-full"
        sizes="(min-width: 1024px) 50vw, 100vw"
      />

      <div className="flex flex-col justify-between px-7 py-8 md:px-12 md:py-10 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 lg:px-14 lg:py-10">
        <div className="flex items-start justify-between gap-6">
          <span
            aria-hidden
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f3f0e8] text-[11px] text-black"
          >
            T
          </span>
          <p className="text-sm text-[#f3f0e8]/80 md:text-[15px]">
            (Produtora audiovisual)
          </p>
        </div>

        <div className="flex flex-1 flex-col justify-center py-8 md:py-10">
          <h2
            className={`${display.className} text-[clamp(2.5rem,4.2vw,4.6rem)] leading-[0.9] tracking-[-0.03em] uppercase`}
          >
            Transformação
            <br />
            em movimento
          </h2>
          <p className="mt-8 max-w-md text-[15px] leading-relaxed text-[#f3f0e8]/75 md:text-base">
            TAO nasceu da ideia de constante mudança. Transformamos visões em
            imagens que permanecem, do conceito à tela.
          </p>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={scrollDown}
            className="inline-flex items-center gap-3 text-[11px] tracking-[0.22em] uppercase transition-opacity hover:opacity-60"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#f3f0e8]/30">
              <svg viewBox="0 0 12 12" className="h-3 w-3" aria-hidden>
                <path d="M6 1.5v7M3.2 6.2 6 9.2l2.8-3" fill="none" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </span>
            Role para baixo
          </button>
          <span className="text-sm tabular-nums">03</span>
        </div>
      </div>
    </section>
  );
}
