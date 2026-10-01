import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TAO × Humana — TAO Filmes",
  description: "Parceria entre a TAO Filmes e a Humana.",
};

export default function HumanaPage() {
  return (
    <section className="flex min-h-dvh items-center justify-center bg-black px-6 pt-24 pb-16 text-white">
      <div className="flex w-full max-w-[440px] flex-col items-center text-center">
        <p className="text-[11px] tracking-[0.28em] text-white/50 uppercase">
          Parceria
        </p>
        <h1 className="font-serif mt-4 text-[clamp(2.6rem,7vw,4.5rem)] leading-[0.9] tracking-[-0.03em] uppercase">
          TAO × Humana
        </h1>

        <article className="mt-12 w-full rounded-[1.75rem] bg-[#F5F5F0] px-8 py-14 text-[#0A0A0A] shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
          <h2 className="font-serif text-[clamp(2rem,5vw,3rem)] leading-[0.9] tracking-[-0.03em] uppercase">
            Projeto em andamento
          </h2>
        </article>
      </div>
    </section>
  );
}
